export class HoltWinters {
  static tripleExponentialSmoothing(
    data: number[],
    seasonalPeriod: number,
    alpha: number = 0.2,
    beta: number = 0.1,
    gamma: number = 0.3
  ) {
    const seasons = Math.floor(data.length / seasonalPeriod);
    if (seasons < 2) throw new Error('Not enough seasonal data');

    // Initialize seasonal components
    const seasonalIndices = Array(seasonalPeriod).fill(0);
    for (let i = 0; i < seasonalPeriod; i++) {
      const seasonSlice = [];
      for (let j = 0; j < seasons; j++) {
        const idx = i + j * seasonalPeriod;
        if (idx < data.length) seasonSlice.push(data[idx]);
      }
      seasonalIndices[i] = seasonSlice.reduce((a, b) => a + b, 0) / seasons;
    }

    let level = data[0];
    let trend = (data[seasonalPeriod] - data[0]) / seasonalPeriod;
    
    return {
      forecast: (periods: number) => {
        const result = [];
        for (let i = 0; i < periods; i++) {
          const season = i % seasonalPeriod;
          result.push(level + trend * (i + 1) + seasonalIndices[season]);
        }
        return result;
      }
    };
  }
}