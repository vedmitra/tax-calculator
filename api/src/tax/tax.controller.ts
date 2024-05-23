import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaxService } from './tax.service';
import { CalculateInput, CalculateOutput } from './tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post('calculate')
  @UsePipes(new ValidationPipe({ transform: true }))
  async calculateTax(@Body() body: CalculateInput): Promise<CalculateOutput> {
    console.log(body);
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
      netIncome: taxObject.netIncome,
      superannuation: taxObject.superannuation,
    };
  }
}
