import { Sprite, Archetype } from '@/types';

export const generateVariations = (
  baseSprite: Sprite | Archetype
): { data: number[]; name: string }[] => {
  const base = baseSprite.data;
  return [
    // Invertido: invierte la paleta
    { data: base.map(p => 3 - p), name: 'Invertido' },
    // Espejo horizontal
    {
      data: base.map((_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        return base[row * 8 + (7 - col)];
      }),
      name: 'Espejo H',
    },
    // Espejo vertical
    {
      data: base.map((_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        return base[(7 - row) * 8 + col];
      }),
      name: 'Espejo V',
    },
    // Rotación 90° CW
    {
      data: base.map((_, i) => {
        const row = Math.floor(i / 8);
        const col = i % 8;
        // (row, col) -> (col, 7 - row)
        return base[col * 8 + (7 - row)];
      }),
      name: 'Rotar 90°',
    },
    // Shift de paleta
    {
      data: base.map(p => (p + 1) % 4),
      name: 'Shift Paleta',
    },
    // Erosión: reduce intensidad de píxeles no nulos
    {
      data: base.map(p => (p > 0 ? Math.max(1, p - 1) : 0)),
      name: 'Erosión',
    },
  ];
};
