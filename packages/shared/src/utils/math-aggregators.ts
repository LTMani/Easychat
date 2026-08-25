export function sum(values: number[]): number {
  return values.reduce((acc, val) => acc + (isNaN(val) ? 0 : val), 0);
}

export function average(values: number[]): number {
  if (values.length === 0) return 0;
  return parseFloat((sum(values) / values.length).toFixed(2));
}

export function median(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function percentile(values: number[], p: number): number {
  if (values.length === 0) return 0;
  if (p <= 0) return Math.min(...values);
  if (p >= 100) return Math.max(...values);

  const sorted = [...values].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;

  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

export function variance(values: number[]): number {
  if (values.length === 0) return 0;
  const avg = average(values);
  const squareDiffs = values.map((val) => Math.pow(val - avg, 2));
  return average(squareDiffs);
}

export function standardDeviation(values: number[]): number {
  return Math.sqrt(variance(values));
}
