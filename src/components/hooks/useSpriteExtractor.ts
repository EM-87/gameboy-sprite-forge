import { useState, useCallback, useRef } from 'react';
import { Sprite, ProcessingStatus } from '@/types';
import {
  analyzeSprite,
  generateTags
} from '@/utils/spriteAnalysis';

export const useSpriteExtractor = () => {
  const [extractedSprites, setExtractedSprites] = useState<Sprite[]>([]);
  const [processingStatus, setProcessingStatus] = useState<ProcessingStatus | null>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

  const extractSpriteData = (imageData: ImageData): number[] => {
    const { data } = imageData;
    const sprite = new Array<number>(64);
    for (let i = 0; i < 64; i++) {
      const idx = i * 4;
      if (data[idx + 3] < 128) {
        sprite[i] = 0;
      } else {
        const gray = 0.299 * data[idx] + 0.587 * data[idx+1] + 0.114 * data[idx+2];
        sprite[i] = Math.min(3, Math.floor(gray / 64));
      }
    }
    return sprite;
  };

  const isEmptySprite = (data: number[]): boolean =>
    data.every(p => p === 0);

  const processImage = useCallback(async (file: File) => {
    setProcessingStatus({ stage: 'Iniciando...', progress: 0 });
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = hiddenCanvasRef.current!;
        const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);

        const sprites: Sprite[] = [];
        const cols = Math.floor(img.width / 8);
        const rows = Math.floor(img.height / 8);

        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const imageData = ctx.getImageData(col * 8, row * 8, 8, 8);
            const spriteData = extractSpriteData(imageData);
            if (!isEmptySprite(spriteData)) {
              const analysis = analyzeSprite(spriteData);
              sprites.push({
                id: `${row}_${col}`,
                data: spriteData,
                position: { x: col, y: row },
                analysis,
                category: analysis.detectedType,
                tags: generateTags(analysis),
              });
            }
          }
          setProcessingStatus({
            stage: 'Procesando...',
            progress: 20 + (row / rows) * 60
          });
        }

        setProcessingStatus({ stage: 'Finalizando...', progress: 85 });
        setExtractedSprites(sprites);
        setProcessingStatus({ stage: 'Completo', progress: 100, total: sprites.length });
        resolve();
      };
      img.onerror = () => {
        setProcessingStatus({ stage: 'Error', progress: 0, error: 'No se pudo cargar la imagen.' });
        reject(new Error('Error loading image'));
      };
      img.src = URL.createObjectURL(file);
    });
  }, []);

  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processImage(file);
    },
    [processImage]
  );

  return {
    extractedSprites,
    processingStatus,
    handleFileUpload,
    hiddenCanvasRef,
  };
};
