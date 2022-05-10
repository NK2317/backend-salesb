import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Client } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('client')
export class ClientController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async fetchAll() {
    try {
      const clients = await this.prismaService.client.findMany();
      return { error: false, data: clients };
    } catch (error) {
      console.log(error);
      return { error, data: [] };
    }
  }

  @Get(':id')
  async fetchById(@Param('id') id: number) {
    try {
      const client = await this.prismaService.client.findUnique({
        where: { id },
      });
      return { error: false, data: client };
    } catch (error) {
      return { error, data: {} };
    }
  }

  @Post()
  async create(@Body() data: Client) {
    try {
      const newClient = await this.prismaService.client.create({
        data,
      });

      return { error: false, data: newClient };
    } catch (error) {
      return { error, data: {} };
    }
  }
}
