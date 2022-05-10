import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderController } from './order.controller';

@Module({
  controllers: [OrderController],
  providers: [PrismaService],
})
export class OrderModule {}
