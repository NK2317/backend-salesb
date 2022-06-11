import { Test, TestingModule } from '@nestjs/testing';
import { CashCutService } from './cash-cut.service';

describe('CashCutService', () => {
  let service: CashCutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashCutService],
    }).compile();

    service = module.get<CashCutService>(CashCutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
