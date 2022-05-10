import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { Category } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('category')
@UseGuards(JwtAuthGuard)
export class CategoryController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async fetchAll() {
    try {
      const categories = await this.prismaService.category.findMany({
        include: {
          Products: true,
        },
      });
      return { data: categories, error: false };
    } catch (error) {
      return { error, data: [] };
    }
  }

  @Post()
  async create(@Body() data: Category) {
    try {
      const newCategory = await this.prismaService.category.create({
        data,
      });
      return { data: newCategory, error: false };
    } catch (error) {
      return { error, data: {} };
    }
  }

  @Patch()
  async update(@Body() { id, name, description }: Category) {
    try {
      const newCategory = await this.prismaService.category.update({
        data: { name, description },
        where: { id },
      });
      return { data: newCategory, error: false };
    } catch (error) {
      console.log(error);
      return { error, data: {} };
    }
  }
}
