import { Module } from '@nestjs/common';
import { CashCutService } from './cash-cut.service';
import { CashCutController } from './cash-cut.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CashCutController],
  providers: [CashCutService]
})
export class CashCutModule {}
