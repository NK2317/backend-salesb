import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  imports: [PrismaModule],
})
export class UserModule {}
