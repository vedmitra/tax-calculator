import {
  IsBoolean,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
} from 'class-validator';

export class CalculateInput {
  @IsNumberString()
  @IsNotEmpty()
  income: string;

  @IsNotEmpty()
  year: string;

  @IsBoolean()
  includeSuper: boolean;

  @IsOptional()
  @IsNumberString()
  superannuationRate?: string;
}

export class CalculateOutput {
  tax: number;
  netIncome: number;
  superannuation: number;
}
