import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async fetchAll() {
    try {
      const data = await this.prismaService.product.findMany({
        include: { Category: true },
      });

      return { data, error: false };
    } catch (error) {
      return { error, data: [] };
    }
  }

  @Get('/filter-by-term')
  async fetchByTerm(@Query() query: any) {
    try {
      const orStatement = this.productService.getWhereByTerm(query?.term);
      const data = await this.prismaService.product.findMany({
        where: {
          OR: orStatement,
        },
        include: {
          Category: true,
        },
      });

      return { error: false, data };
    } catch (error) {
      console.error(error);
      return { error, data: [] };
    }
  }

  @Post()
  async create(@Body() product: Product) {
    try {
      const newProduct = await this.prismaService.product.create({
        data: product,
      });

      return { error: false, data: newProduct };
    } catch (error) {
      console.error(error);
      return { error, data: {} };
    }
  }

  @Patch()
  async update(@Body() { id, ...productData }: Product) {
    try {
      const updatedProduct = await this.prismaService.product.update({
        data: productData,
        where: { id },
      });

      return { error: false, data: updatedProduct };
    } catch (error) {
      console.error(error);
      return { error, data: {} };
    }
  }

  @Delete()
  async delete(@Param() id: number, @Param() adminPassword: string) {
    try {
      if (process.env.PASSWORD === adminPassword) {
        await this.prismaService.product.delete({
          where: {
            id,
          },
        });

        return { error: false, data: true };
      } else throw new Error('Password incorrecto');
    } catch (error) {
      return { error, data: false };
    }
  }
}
