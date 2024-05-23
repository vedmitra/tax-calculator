import { Test, TestingModule } from '@nestjs/testing';
import { TaxController } from './tax.controller';
import { TaxService } from './tax.service';
import { CalculateInput } from './tax.dto';

describe('TaxController', () => {
  let taxController: TaxController;
  let taxService: TaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaxController],
      providers: [
        {
          provide: TaxService,
          useValue: {
            calculateTax: jest.fn().mockResolvedValue({ tax: 1000 }),
          },
        },
      ],
    }).compile();

    taxController = module.get<TaxController>(TaxController);
    taxService = module.get<TaxService>(TaxService);
  });

  it('should be defined', () => {
    expect(taxController).toBeDefined();
  });

  describe('calculateTax', () => {
    it('should return calculated tax', async () => {
      const query: CalculateInput = {
        income: '50000',
        year: '2023',
        includeSuper: true,
        superannuationRate: '9.5',
      };

      const result = await taxController.calculateTax(query);
      expect(result).toEqual({ tax: 1000 });
      expect(taxService.calculateTax).toHaveBeenCalledWith({
        income: 50000,
        superannuationRate: 9.5,
        year: '2023',
        includeSuper: true,
      });
    });

    it('should handle missing optional superannuationRate', async () => {
      const query: CalculateInput = {
        income: '50000',
        year: '2023',
        includeSuper: true,
      };

      const result = await taxController.calculateTax(query);
      expect(result).toEqual({ tax: 1000 });
      expect(taxService.calculateTax).toHaveBeenCalledWith({
        income: 50000,
        superannuationRate: null,
        year: '2023',
        includeSuper: true,
      });
    });
  });
});
