import React, { memo } from 'react';
import { Sprite } from '@/types';
import { renderSpriteSVG } from '@/utils/renderUtils';

interface SpriteCellProps {
  sprite: Sprite;
  isSelected: boolean;
  onSelect: (sprite: Sprite) => void;
}

const SpriteCell: React.FC<SpriteCellProps> = memo(({ sprite, isSelected, onSelect }) => {
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
    <button
      aria-label={`Seleccionar sprite de tipo ${sprite.category}`}
      onClick={() => onSelect(sprite)}
      className={`relative p-1 rounded-md transition-all duration-200 ${
        isSelected ? 'bg-green-500/50 ring-2 ring-green-400' : 'bg-black/20 hover:bg-green-500/30'
      }`}
    >
      {renderSpriteSVG(sprite.data, 64, /* palette from context */, /* showGrid from context */)}
      <div
        className={`absolute bottom-0 left-0 w-full h-1 ${
          categoryColors[sprite.category] || 'bg-gray-500'
        }`}
      />
    </button>
  );
});

interface SpriteGridProps {
  sprites: Sprite[];
  selectedSprite: Sprite | null;
  onSelectSprite: (sprite: Sprite) => void;
}

export const SpriteGrid: React.FC<SpriteGridProps> = ({
  sprites,
  selectedSprite,
  onSelectSprite,
}) => {
  if (sprites.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400">
        <p>No hay sprites para mostrar.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(64px,1fr))] gap-2">
      {sprites.map(sprite => (
        <SpriteCell
          key={sprite.id}
          sprite={sprite}
          isSelected={selectedSprite?.id === sprite.id}
          onSelect={onSelectSprite}
        />
      ))}
    </div>
  );
};
