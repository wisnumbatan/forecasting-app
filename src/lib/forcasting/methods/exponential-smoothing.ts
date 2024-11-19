export class ExponentialSmoothing {
  static calculate(data: number[], alpha: number): number[] {
    if (alpha <= 0 || alpha > 1) {
      throw new Error('Alpha must be between 0 and 1');
    }

    const result: number[] = [data[0]];
    for (let i = 1; i < data.length; i++) {
      const forecast = alpha * data[i] + (1 - alpha) * result[i - 1];
      result.push(forecast);
    }
    return result;
  }

  static forecast(data: number[], alpha: number, periods: number): number[] {
    const smoothed = this.calculate(data, alpha);
    const lastValue = smoothed[smoothed.length - 1];
    return Array(periods).fill(lastValue);
  }
}