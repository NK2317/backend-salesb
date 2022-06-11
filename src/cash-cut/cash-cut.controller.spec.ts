import { Test, TestingModule } from '@nestjs/testing';
import { CashCutController } from './cash-cut.controller';
import { CashCutService } from './cash-cut.service';

describe('CashCutController', () => {
  let controller: CashCutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashCutController],
      providers: [CashCutService],
    }).compile();

    controller = module.get<CashCutController>(CashCutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
