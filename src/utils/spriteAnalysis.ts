import { SpriteAnalysis } from '@/types';

/** Calcula la entropía normalizada de un array de 64 píxeles */
export const calculateEntropy = (data: number[]): number => {
  const counts = new Array(4).fill(0);
  data.forEach(v => counts[v]++);
  const entropy = counts.reduce((sum, count) => {
    if (count === 0) return sum;
    const p = count / 64;
    return sum - p * Math.log2(p);
  }, 0);
  return entropy / 2; // Normalizar (máx ≈2)
};

/** Detección de patrones básicos */
export const detectPatterns = (grid: number[][]) => {
  let horizontalLines = 0,
    verticalLines = 0,
    centerSum = 0,
    totalSum = 0,
    edgeSum = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const v = grid[y][x];
      totalSum += v;
      if (x > 0 && v > 0 && v === grid[y][x - 1]) horizontalLines++;
      if (y > 0 && v > 0 && v === grid[y - 1][x]) verticalLines++;
      if (x >= 3 && x <= 4 && y >= 3 && y <= 4) centerSum += v;
      if (x === 0 || x === 7 || y === 0 || y === 7) edgeSum += v;
    }
  }
  return {
    horizontalLines,
    verticalLines,
    centerFocus: centerSum > 0 && totalSum > 0 && centerSum / totalSum > 0.3,
    borderPattern: edgeSum > 0 && totalSum > 0 && edgeSum / totalSum > 0.5,
  };
};

/** Análisis de coherencia local */
export const calculateCoherence = (grid: number[][]): number => {
  let coherence = 0;
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      const set = new Set([
        grid[y][x],
        grid[y][x + 1],
        grid[y + 1][x],
        grid[y + 1][x + 1],
      ]);
      if (set.size <= 2) coherence++;
    }
  }
  return coherence / 49;
};

/** Estructura del sprite */
export const analyzeStructure = (grid: number[][]) => {
  let changes = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (x > 0 && grid[y][x] !== grid[y][x - 1]) changes++;
      if (y > 0 && grid[y][x] !== grid[y - 1][x]) changes++;
    }
  }
  return {
    complexity: changes / 112,
    coherence: calculateCoherence(grid),
  };
};

/** Compatibilidad de bordes para tileabilidad */
export const calculateTileability = (grid: number[][]): number => {
  let hScore = 0,
    vScore = 0;
  for (let i = 0; i < 8; i++) {
    if (grid[i][0] === grid[i][7]) hScore++;
    if (grid[0][i] === grid[7][i]) vScore++;
  }
  return (hScore + vScore) / 16;
};

/** Simetría horizontal y vertical */
export const analyzeSymmetry = (grid: number[][]) => {
  let h = 0,
    v = 0;
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 4; x++) {
      if (grid[y][x] === grid[y][7 - x]) h++;
    }
  }
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 4; y++) {
      if (grid[y][x] === grid[7 - y][x]) v++;
    }
  }
  return { horizontal: h / 32, vertical: v / 32 };
};

/** Clasificación a tipo de sprite */
export const classifySprite = (
  patterns: ReturnType<typeof detectPatterns>,
  structure: ReturnType<typeof analyzeStructure>,
  tileability: number
): { type: string; confidence: number } => {
  if (patterns.borderPattern && tileability < 0.5)
    return { type: 'ui_frame', confidence: 0.8 + tileability };
  if (patterns.horizontalLines > 20 && tileability > 0.6)
    return { type: 'water', confidence: 0.7 + tileability * 0.3 };
  if (patterns.verticalLines > 15 && tileability > 0.5)
    return { type: 'architecture', confidence: 0.6 + tileability * 0.3 };
  if (tileability > 0.8) return { type: 'terrain', confidence: 0.8 + (tileability - 0.8) };
  if (patterns.centerFocus && structure.coherence > 0.6)
    return { type: 'object', confidence: 0.7 + (structure.coherence - 0.6) };
  if (structure.coherence < 0.4 && structure.complexity > 0.5)
    return { type: 'organic', confidence: 0.6 + (1 - structure.coherence) * 0.2 };
  if (tileability > 0.5) return { type: 'terrain', confidence: 0.5 + tileability * 0.2 };
  return { type: 'misc', confidence: 0.4 + structure.coherence * 0.2 };
};

/** Análisis completo del sprite */
export const analyzeSprite = (data: number[]): SpriteAnalysis => {
  const grid = Array.from({ length: 8 }, (_, y) => data.slice(y * 8, y * 8 + 8));
  const entropy = calculateEntropy(data);
  const colors = new Set(data.filter(p => p > 0)).size;
  const density = data.filter(p => p > 0).length / 64;
  const patterns = detectPatterns(grid);
  const structure = analyzeStructure(grid);
  const tileability = calculateTileability(grid);
  const symmetry = analyzeSymmetry(grid);
  const { type, confidence } = classifySprite(patterns, structure, tileability);

  return {
    entropy,
    colors,
    density,
    patterns,
    structure,
    tileability,
    symmetry,
    detectedType: type,
    confidence,
  };
};

/** Genera etiquetas a partir del análisis */
export const generateTags = (analysis: SpriteAnalysis): string[] => {
  const tags: string[] = [];
  if (analysis.tileability > 0.8) tags.push('tileable');
  if (analysis.symmetry.horizontal > 0.9) tags.push('h-sym');
  if (analysis.symmetry.vertical > 0.9) tags.push('v-sym');
  if (analysis.patterns.centerFocus) tags.push('centered');
  if (analysis.patterns.borderPattern) tags.push('framed');
  if (analysis.entropy < 0.5) tags.push('simple');
  if (analysis.entropy > 0.8) tags.push('complex');
  return tags;
};
