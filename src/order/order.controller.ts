import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { SkipTakeQuery } from 'src/types';

@Controller('order')
export class OrderController {
  constructor(private readonly prismaService: PrismaService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll(@Query() { skip = 0, take = 10 }: SkipTakeQuery) {
    try {
      const orders = await this.prismaService.order.findMany({
        include: {
          UserCreator: {
            select: {
              password: false,
              name: true,
              userName: true,
              id: true,
            },
          },
          Client: true,
        },
        orderBy: {
          creationDate: 'desc',
        },
        skip,
        take,
      });
      return { error: false, data: orders };
    } catch (error) {
      return { error, data: [] };
    }
  }

  @Post()
  async create(@Body() params: Order) {
    try {
      const newOrder = await this.prismaService.order.create({
        data: params,
      });
      return { error: false, data: newOrder };
    } catch (error) {
      return { error, data: {} };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    try {
      await this.prismaService.order.delete({
        where: { id },
      });
      return { error: false, data: true };
    } catch (error) {
      return { error, data: false };
    }
  }

  @Get(':id')
  async getById(@Param('id') id: number) {
    try {
      const order = await this.prismaService.order.findUnique({
        where: { id },
      });
      return { error: false, data: order };
    } catch (error) {
      return { error, data: {} };
    }
  }
}
