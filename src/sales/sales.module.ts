import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SalesController } from './sales.controller';

@Module({
  controllers: [SalesController],
  imports: [PrismaModule],
})
export class SalesModule {}
