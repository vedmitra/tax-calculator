export class NumberUtils {
  static round(value: number, decimals = 2): number {
    // Validate inputs
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Value must be a valid number');
    }
    if (
      typeof decimals !== 'number' ||
      decimals < 0 ||
      !Number.isInteger(decimals)
    ) {
      throw new Error('Decimals must be a non-negative integer');
    }

    // Perform rounding
    const factor = Math.pow(10, decimals);
    const roundedValue = Math.round((value + Number.EPSILON) * factor) / factor;

    return roundedValue;
  }
}
