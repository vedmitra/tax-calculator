import { Test, TestingModule } from '@nestjs/testing';
import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaxService],
    }).compile();

    service = module.get<TaxService>(TaxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should calculate tax for income <= $18,200', () => {
    const { tax, superannuation: superAnnuation } = service.calculateTax({
      income: 18200,
      includeSuper: false,
      year: '2022-23',
    });
    expect(tax).toBeCloseTo(0, 2);
    expect(superAnnuation).toBeCloseTo(1911, 2);

    // Income including super
    const { tax: tax2, superannuation: superAnnuation2 } = service.calculateTax(
      {
        income: 18200,
        includeSuper: true,
        year: '2022-23',
      },
    );
    expect(tax2).toBeCloseTo(0);
    expect(superAnnuation2).toBeCloseTo(1729.41, 2);
  });

  it('should calculate tax for income between $18,201 and $45,000', () => {
    const { tax, superannuation: superAnnuation } = service.calculateTax({
      income: 30000,
      includeSuper: false,
      year: '2022-23',
    });
    expect(tax).toBeCloseTo(2242, 2);
    expect(superAnnuation).toBeCloseTo(3150, 2);

    // Income including super
    const { tax: tax2, superannuation: superAnnuation2 } = service.calculateTax(
      {
        income: 30000,
        includeSuper: true,
        year: '2022-23',
      },
    );
    expect(tax2).toBeCloseTo(1700.37, 2);
    expect(superAnnuation2).toBeCloseTo(2850.68, 2);
  });

  it('should calculate tax for income between $45,001 and $120,000', () => {
    const { tax, superannuation: superAnnuation } = service.calculateTax({
      income: 60000,
      includeSuper: false,
      year: '2022-23',
    });
    expect(tax).toBeCloseTo(9967, 2);
    expect(superAnnuation).toBeCloseTo(6300, 2);

    // Income including super
    const { tax: tax2, superannuation: superAnnuation2 } = service.calculateTax(
      {
        income: 60000,
        includeSuper: true,
        year: '2022-23',
      },
    );
    expect(tax2).toBeCloseTo(8114.06, 2);
    expect(superAnnuation2).toBeCloseTo(5701.36, 2);
  });

  it('should calculate tax for income between $120,001 and $180,000', () => {
    const { tax, superannuation: superAnnuation } = service.calculateTax({
      income: 150000,
      includeSuper: false,
      year: '2022-23',
    });
    expect(tax).toBeCloseTo(40567, 2);
    expect(superAnnuation).toBeCloseTo(15750, 2);

    // Income including super
    const { tax: tax2, superannuation: superAnnuation2 } = service.calculateTax(
      {
        income: 150000,
        includeSuper: true,
        year: '2022-23',
      },
    );
    expect(tax2).toBeCloseTo(35293.24, 2);
    expect(superAnnuation2).toBeCloseTo(14253.39, 2);
  });

  it('should calculate tax for income over $180,001', () => {
    const { tax, superannuation: superAnnuation } = service.calculateTax({
      income: 200000,
      includeSuper: false,
      year: '2022-23',
    });
    expect(tax).toBeCloseTo(63232, 2);
    expect(superAnnuation).toBeCloseTo(21000, 2);

    // Income including super
    const { tax: tax2, superannuation: superAnnuation2 } = service.calculateTax(
      {
        income: 200000,
        includeSuper: true,
        year: '2022-23',
      },
    );
    expect(tax2).toBeCloseTo(54679.96, 2);
    expect(superAnnuation2).toBeCloseTo(19004.52, 2);
  });
  // TODO: Test for other years' tax rates when known
});
