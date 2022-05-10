import { Body, Controller, Get, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserParams } from './types';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class UserController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async createUser(@Body() body: RegisterUserParams) {
    try {
      const saltOrRounds = 10;
      const password = await bcrypt.hash(body.password, saltOrRounds);
      const { name, userName } = await this.prismaService.user.create({
        data: {
          name: body.name,
          userName: body.userName,
          password,
        },
      });

      return { error: false, data: { name, userName } };
    } catch (error) {
      console.error(error);
      return { error, data: {} };
    }
  }

  @Get()
  async fetchAll() {
    try {
      const data = await this.prismaService.user.findMany();

      return { error: false, data };
    } catch (error) {
      console.error(error);
      return { error, data: {} };
    }
  }
}
