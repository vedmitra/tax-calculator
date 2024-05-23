import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { CalculateInput, CalculateOutput } from './tax.dto';
import { NumberUtils } from 'src/utils.ts/numberUtils';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('calculate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculateTax(@Body() body: CalculateInput): Promise<CalculateOutput> {
    const incomeNumber = parseFloat(body.income);

    const superannuationRateNumber = body.superannuationRate
      ? parseFloat(body.superannuationRate)
      : null;

    const taxObject = await this.taxService.calculateTax({
      income: incomeNumber,
      superannuationRate: superannuationRateNumber,
      year: body.year,
      includeSuper: body.includeSuper,
    });

    return {
      tax: taxObject.tax,
      netIncome: NumberUtils.round(taxObject.income),
      superannuation: NumberUtils.round(taxObject.superannuation),
      grossIncome: NumberUtils.round(taxObject.income),
      isIncomeIncludingSuper: taxObject.isIncomeIncludingSuper,
    };
  }
}
