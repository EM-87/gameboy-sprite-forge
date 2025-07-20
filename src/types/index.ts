export type PaletteName = 'classic' | 'pocket' | 'light' | 'color' | 'virtualBoy';

export interface SpriteAnalysis {
  entropy: number;
  colors: number;
  density: number;
  patterns: {
    horizontalLines: number;
    verticalLines: number;
    centerFocus: boolean;
    borderPattern: boolean;
  };
  structure: {
    complexity: number;
    coherence: number;
  };
  tileability: number;
  symmetry: {
    horizontal: number;
    vertical: number;
  };
  detectedType: string;
  confidence: number;
}

export interface Sprite {
  id: string;
  data: number[];
  position: { x: number; y: number };
  analysis: SpriteAnalysis;
  category: string;
  tags: string[];
}

export interface Archetype {
  name: string;
  data: number[];
  analysis: { detectedType: string; confidence: number };
}

export interface ProcessingStatus {
  stage: string;
  progress: number;
  total?: number;
  error?: string;
}
