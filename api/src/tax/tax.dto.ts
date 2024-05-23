import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CalculateInput {
  @IsNumber()
  @IsNotEmpty()
  income: string;

  @IsNotEmpty()
  year: string;

  @IsBoolean()
  includeSuper: boolean;

  @IsOptional()
  @IsNumber()
  superannuationRate?: string;
}

export class CalculateOutput {
  tax: number;
  netIncome: number;
  superannuation: number;
  grossIncome: number;
  isIncomeIncludingSuper: boolean;
}
