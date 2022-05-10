import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ClientController } from './client.controller';

@Module({
  controllers: [ClientController],
  imports: [PrismaModule],
})
export class ClientModule {}
