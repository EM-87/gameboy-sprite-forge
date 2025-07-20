import React from 'react';
import { Sprite } from '@/types';
import { AnalysisMeter } from '../utils/AnalysisMeter';
import { renderSpriteSVG } from '@/utils/renderUtils';

interface AnalysisPanelProps {
  sprite: Sprite;
  onGenerate: (sprite: Sprite) => void;
  renderSprite: (data: number[], size: number) => JSX.Element;
  isGenerating: boolean;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({
  sprite,
  onGenerate,
  renderSprite,
  isGenerating,
}) => {
  const { category, analysis, tags } = sprite;

  const categoryColors: Record<string, string> = {
    water: 'bg-blue-500',
    terrain: 'bg-green-500',
    object: 'bg-yellow-500',
    ui_frame: 'bg-red-500',
    architecture: 'bg-purple-500',
    organic: 'bg-lime-500',
    misc: 'bg-gray-500',
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <h3 className="text-lg font-semibold text-green-300">Análisis del Sprite</h3>
      <div className="flex justify-center p-2 bg-black/30 rounded-md">
        {renderSprite(sprite.data, 128)}
      </div>
      <div
        className={`p-2 rounded-md text-center font-bold text-white ${
          categoryColors[category] || 'bg-gray-500'
        }`}
      >
        Tipo: {category.replace('_', ' ')}
      </div>
      <AnalysisMeter label="Confianza" value={analysis.confidence} />
      <AnalysisMeter label="Entropía" value={analysis.entropy} />
      <AnalysisMeter label="Tileabilidad" value={analysis.tileability} />
      <AnalysisMeter label="Densidad" value={analysis.density} />
      <AnalysisMeter label="Coherencia" value={analysis.structure.coherence} />
      <AnalysisMeter label="Simetría H" value={analysis.symmetry.horizontal} />
      <AnalysisMeter label="Simetría V" value={analysis.symmetry.vertical} />
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="bg-gray-600 text-xs font-semibold px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <button
        aria-label="Generar variaciones"
        onClick={() => onGenerate(sprite)}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-all font-bold disabled:opacity-50"
      >
        {isGenerating ? 'Generando...' : 'Generar Variaciones'}
      </button>
    </div>
);
