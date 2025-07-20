import React from 'react';
import { ProcessingStatus, PaletteName } from '@/types';
import { Upload, Eye, EyeOff } from 'lucide-react';

interface ControlPanelProps {
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  processingStatus: ProcessingStatus | null;
  selectedPalette: PaletteName;
  onPaletteChange: (p: PaletteName) => void;
  showGrid: boolean;
  onShowGridChange: (show: boolean) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  onFileUpload,
  processingStatus,
  selectedPalette,
  onPaletteChange,
  showGrid,
  onShowGridChange,
}) => {
  const palettes: PaletteName[] = ['classic', 'pocket', 'light', 'color', 'virtualBoy'];

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50">
      {/* Carga de Tileset */}
      <div>
        <h3 className="text-lg font-semibold text-green-300 mb-3">1. Cargar Tileset</h3>
        <label htmlFor="file-upload" className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-md cursor-pointer font-bold">
          <Upload size={20} /> Cargar Imagen
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/png, image/jpeg"
          onChange={onFileUpload}
          className="hidden"
        />
        {processingStatus && (
          <div className="mt-3 text-sm" aria-live="polite">
            <p className="flex justify-between">
              <span>{processingStatus.stage}</span>
              <span>{processingStatus.total ? `${processingStatus.total} sprites` : ''}</span>
            </p>
            <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: `${processingStatus.progress}%` }}
              />
            </div>
            {processingStatus.error && (
              <p className="text-red-400 mt-1">{processingStatus.error}</p>
            )}
          </div>
        )}
      </div>

      {/* Controles Globales */}
      <div>
        <h3 className="text-lg font-semibold text-green-300 mb-3">Controles</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="palette-select" className="text-gray-300">Paleta</label>
            <select
              id="palette-select"
              value={selectedPalette}
              onChange={e => onPaletteChange(e.target.value as PaletteName)}
              className="bg-gray-700 border border-gray-600 rounded-md p-1 text-sm"
            >
              {palettes.map(p => (
                <option key={p} value={p}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Cuadrícula</span>
            <button
              aria-label="Mostrar u ocultar cuadrícula"
              onClick={() => onShowGridChange(!showGrid)}
              className={`p-2 rounded-md transition-colors ${
                showGrid ? 'bg-green-500/80 text-white' : 'bg-gray-700/50 hover:bg-gray-600/70'
              }`}
            >
              {showGrid ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
);
