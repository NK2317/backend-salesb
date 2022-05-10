import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LoginController } from './login.controller';

@Module({
  controllers: [LoginController],
  imports: [PrismaModule, AuthModule],
})
export class LoginModule {}
