export class MovingAverageCalculator {
  static calculate(data: number[], period: number): number[] {
    if (period <= 0 || period > data.length) {
      throw new Error('Invalid period length');
    }

    const result: number[] = [];
    for (let i = period - 1; i < data.length; i++) {
      const sum = data.slice(i - period + 1, i + 1).reduce((a, b) => a + b, 0);
      result.push(sum / period);
    }
    return result;
  }

  static forecast(data: number[], period: number, forecastPeriods: number): number[] {
    const ma = this.calculate(data, period);
    const lastMA = ma[ma.length - 1];
    return Array(forecastPeriods).fill(lastMA);
  }
}