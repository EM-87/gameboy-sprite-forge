import React from 'react';

/**
 * Renderiza un sprite 8×8 como un SVG.
 * @param data Array de 64 valores (0-3) que representan los niveles de gris.
 * @param size Tamaño en píxeles del SVG (por ejemplo, 64, 128).
 * @param palette Array de 4 colores en formato hex (de fondo a primer plano).
 * @param showGrid Activa/desactiva la cuadrícula de píxeles.
 */
export function renderSpriteSVG(
  data: number[],
  size: number,
  palette: string[],
  showGrid: boolean
): JSX.Element {
  const pixel = size / 8;
  return (
    <svg
      width={size}
      height={size}
      style={{ imageRendering: 'pixelated', backgroundColor: palette[0] }}
    >
      {showGrid && size > 32 && (
        <g opacity={0.2}>
          {[...Array(8)].map((_, i) => (
            <React.Fragment key={i}>
              <line
                x1={i * pixel}
                y1={0}
                x2={i * pixel}
                y2={size}
                stroke={palette[3]}
                strokeWidth={0.5}
              />
              <line
                x1={0}
                y1={i * pixel}
                x2={size}
                y2={i * pixel}
                stroke={palette[3]}
                strokeWidth={0.5}
              />
            </React.Fragment>
          ))}
        </g>
      )}
      {data.map((lvl, idx) =>
        lvl === 0 ? null : (
          <rect
            key={idx}
            x={(idx % 8) * pixel}
            y={Math.floor(idx / 8) * pixel}
            width={pixel}
            height={pixel}
            fill={palette[lvl]}
          />
        )
      )}
    </svg>
  );
}
