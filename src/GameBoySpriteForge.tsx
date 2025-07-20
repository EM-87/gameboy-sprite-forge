import React, { useState, useCallback, useMemo } from 'react';
import { Layers, Info, Sparkles, Database, Search } from 'lucide-react';

import { useSpriteExtractor } from '@/hooks/useSpriteExtractor';
import { ControlPanel } from '@/components/ControlPanel';
import { AnalysisPanel } from '@/components/AnalysisPanel';
import { GenerationPanel } from '@/components/GenerationPanel';
import { SpriteGrid } from '@/components/SpriteGrid';

import { Sprite, Archetype, PaletteName } from '@/types';
import { generateVariations } from '@/utils/spriteGeneration';
import { renderSpriteSVG } from '@/utils/renderUtils';

export default function GameBoySpriteForge() {
  const [mode, setMode] = useState<'extract'|'analyze'|'generate'|'library'>('extract');
  const [selectedSprite, setSelectedSprite] = useState<Sprite|Archetype|null>(null);
  const [selectedPalette, setSelectedPalette] = useState<PaletteName>('classic');
  const [showGrid, setShowGrid] = useState(true);
  const [generatedVariations, setGeneratedVariations] = useState<{data:number[],name:string}[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const { extractedSprites, processingStatus, handleFileUpload, hiddenCanvasRef } = useSpriteExtractor();

  const handleSelectSprite = useCallback((sprite: Sprite) => {
    setSelectedSprite(sprite);
    setMode('analyze');
  }, []);

  const handleGenerateVariations = useCallback((base: Sprite|Archetype) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedVariations(generateVariations(base));
      setSelectedSprite(base);
      setMode('generate');
      setIsGenerating(false);
    }, 50);
  }, []);

  const renderSprite = useCallback((data: number[], size: number) =>
    renderSpriteSVG(data, size, palettes[selectedPalette], showGrid),
    [selectedPalette, showGrid]
  );

  // Obtén sprites a mostrar según modo (extraídos o biblioteca)
  const displaySprites: Sprite[] = useMemo(() =>
    mode === 'library' ? extractedSprites : extractedSprites,
    [mode, extractedSprites]
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <canvas ref={hiddenCanvasRef} style={{ display: 'none' }} />
      <header className="bg-black/30 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-screen-2xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            Game Boy Sprite Forge
          </h1>
          <nav className="flex gap-1 bg-gray-800/50 rounded-lg p-1">
            {[
              { id: 'extract', label: 'Extraer', icon: Layers },
              { id: 'analyze', label: 'Analizar', icon: Info, disabled: !selectedSprite },
              { id: 'generate', label: 'Generar', icon: Sparkles },
              { id: 'library', label: 'Librería', icon: Database },
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => !btn.disabled && setMode(btn.id as any)}
                disabled={btn.disabled}
                className={`px-3 py-1 text-sm flex items-center gap-1 rounded-md transition ${
                  mode === btn.id ? 'bg-green-500/80 text-white' : 'text-gray-300 hover:bg-gray-700/70'
                } ${btn.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <btn.icon size={16} />
                <span className="hidden sm:inline">{btn.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto p-4 grid lg:grid-cols-3 gap-6">
        <aside>
          {mode === 'analyze' && selectedSprite ? (
            <AnalysisPanel
              sprite={selectedSprite as Sprite}
              onGenerate={handleGenerateVariations}
              renderSprite={renderSprite}
              isGenerating={isGenerating}
            />
          ) : mode === 'generate' ? (
            <GenerationPanel
              onGenerate={handleGenerateVariations}
              isGenerating={isGenerating}
            />
          ) : (
            <ControlPanel
              onFileUpload={handleFileUpload}
              processingStatus={processingStatus}
              selectedPalette={selectedPalette}
              onPaletteChange={setSelectedPalette}
              showGrid={showGrid}
              onShowGridChange={setShowGrid}
            />
          )}
        </aside>
        <section className="lg:col-span-2 p-6 bg-black/20 rounded-lg">
          {mode === 'generate' && selectedSprite ? (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Variaciones</h2>
              <div className="grid grid-cols-3 gap-4">
                {generatedVariations.map((v,i) => (
                  <div key={i} className="flex flex-col items-center bg-gray-800/50 p-2 rounded-lg">
                    {renderSprite(v.data, 96)}
                    <span className="mt-2 text-sm">{v.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {mode==='library'?'Librería':'Sprites Extraídos'} ({displaySprites.length})
                </h2>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search size={18} className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Buscar..."
                      className="bg-gray-700/50 border border-gray-600 rounded-md pl-8 pr-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
              <SpriteGrid
                sprites={displaySprites}
                selectedSprite={selectedSprite as Sprite}
                onSelectSprite={handleSelectSprite}
              />
            </>
          )}
        </section>
      </main>
    </div>
);
