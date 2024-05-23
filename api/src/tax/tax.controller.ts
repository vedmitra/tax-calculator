import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { CalculateInput, CalculateOutput } from './tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Get('calculate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculateTax(@Query() query: CalculateInput): Promise<CalculateOutput> {
    const incomeNumber = parseFloat(query.income);

    const superannuationRateNumber = query.superannuationRate
      ? parseFloat(query.superannuationRate)
      : null;

    const taxObject = await this.taxService.calculateTax({
      income: incomeNumber,
      superannuationRate: superannuationRateNumber,
      year: query.year,
      includeSuper: query.includeSuper,
    });

    return {
      tax: taxObject.tax,
      netIncome: taxObject.netIncome,
      superannuation: taxObject.superannuation,
    };
  }
}
