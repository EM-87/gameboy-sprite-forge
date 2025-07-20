import React from 'react';
import { Archetype } from '@/types';
import { renderSpriteSVG } from '@/utils/renderUtils';
import { generateVariations } from '@/utils/spriteGeneration';

interface GenerationPanelProps {
  onGenerate: (archetype: Archetype) => void;
  isGenerating: boolean;
}

export const GenerationPanel: React.FC<GenerationPanelProps> = ({
  onGenerate,
  isGenerating,
}) => {
  const archetypes: Archetype[] = [
    {
      name: 'Agua (Zelda Style)',
      data: [/* ...64 valores*/],
      analysis: { detectedType: 'water', confidence: 0.98 },
    },
    {
      name: 'Hierba (Pokémon Style)',
      data: [/* ...64 valores*/],
      analysis: { detectedType: 'terrain', confidence: 0.95 },
    },
    {
      name: 'Ladrillo (SMB Style)',
      data: [/* ...64 valores*/],
      analysis: { detectedType: 'architecture', confidence: 0.99 },
    },
    {
      name: "Flor (Link's Awakening)",
      data: [/* ...64 valores*/],
      analysis: { detectedType: 'organic', confidence: 0.92 },
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
      <h3 className="text-lg font-semibold text-green-300">Generador Dirigido</h3>
      <p className="text-sm text-gray-400">Selecciona un arquetipo base:</p>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {archetypes.map((arch, i) => (
          <button
            key={i}
            onClick={() => onGenerate(arch)}
            disabled={isGenerating}
            className="flex items-center gap-2 p-2 bg-gray-700/50 hover:bg-gray-600/70 rounded-md transition-colors disabled:opacity-50"
          >
            {renderSpriteSVG(arch.data, 24, arch.analysis.detectedType === 'water' ? ['#0f380f','#306230','#8bac0f','#9bbc0f'] : ['#00201e','#35605a','#5ea4a0','#add794'], false)}
            <span className="text-sm text-gray-200">{arch.name}</span>
          </button>
        ))}
      </div>
      {isGenerating && <p className="mt-2 text-sm text-green-300">Generando variaciones…</p>}
    </div>
  );
};
