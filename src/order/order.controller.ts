import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Order } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('order')
export class OrderController {
  constructor(private readonly prismaService: PrismaService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fetchAll() {
    try {
      const orders = await this.prismaService.order.findMany();
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
