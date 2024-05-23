import { Injectable } from '@nestjs/common';

type TaxInput = {
  income: number;
  year: string;
  includeSuper: boolean;
  superannuationRate?: number;
};

type TaxRate = {
  baseLimit: number;
  upperLimit: number;
  baseTax: number;
  rate: number;
};

type SuperRate = {
  year: string;
  rate: number;
};

@Injectable()
export class TaxService {
  // TODO: Error handling and logging.
  calculateTax(input: TaxInput): {
    tax: number;
    superannuation: number;
    netIncome: number;
  } {
    const { income, year, includeSuper, superannuationRate } = input;
    const superRate = superannuationRate || this.getSuperRate(year);
    if (superRate === null) {
      throw new Error('Invalid year');
    }
    const superAnnuation = this.calculateSuperanuation(
      income,
      includeSuper,
      superRate,
    );
    let taxableIncome = income;

    if (includeSuper && superRate !== null) {
      taxableIncome = income - superAnnuation;
    }

    const taxRates = this.getTaxRates();

    let tax = 0;

    for (const bracket of taxRates) {
      if (
        taxableIncome >= bracket.baseLimit &&
        taxableIncome <= bracket.upperLimit
      ) {
        tax =
          (taxableIncome - bracket.baseLimit + 1) * bracket.rate +
          bracket.baseTax;
        break;
      }
    }
    const netIncome = taxableIncome - tax;

    return { tax, superannuation: superAnnuation, netIncome };
  }

  private getTaxRates(): TaxRate[] {
    // In the future, fetch tax rates from the database
    const taxRates: TaxRate[] = [
      { baseLimit: 0, upperLimit: 18200, baseTax: 0, rate: 0 },
      { baseLimit: 18201, upperLimit: 45000, baseTax: 0, rate: 0.19 },
      { baseLimit: 45001, upperLimit: 120000, baseTax: 5092, rate: 0.325 },
      { baseLimit: 120001, upperLimit: 180000, baseTax: 29467, rate: 0.37 },
      { baseLimit: 180001, upperLimit: Infinity, baseTax: 54232, rate: 0.45 },
    ];

    return taxRates;
  }

  private getSuperRates(): SuperRate[] {
    // In the future, fetch super rates from the database
    const superRates: SuperRate[] = [
      { year: '2022-23', rate: 10.5 },
      { year: '2023-24', rate: 11 },
    ];
    return superRates;
  }

  private getSuperRate(year: string): number | null {
    const superRates = this.getSuperRates();
    const superRateObj = superRates.find((rate) => rate.year === year);
    return superRateObj ? superRateObj.rate : null;
  }

  private calculateSuperanuation(
    income: number,
    includeSuper = false,
    rate: number,
  ) {
    const superannuation = includeSuper
      ? (income * rate) / 100 / (1 + rate / 100)
      : (income * rate) / 100;
    return superannuation;
  }
}
