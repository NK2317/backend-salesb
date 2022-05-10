import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductOnOrder } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('sales')
export class SalesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post() // Create the ProductOnOrder detail for products and order and finalize the orderS
  async create(@Body() saleItems: ProductOnOrder[]) {
    try {
      const total = saleItems.reduce((acc, current) => acc + current.Qty, 0);

      const createdRows = await this.prismaService.productOnOrder.createMany({
        data: saleItems,
      });

      // Finalize the order
      const finalizedOrder = await this.prismaService.order.update({
        where: { id: saleItems[0].OrderID },
        data: { status: true, amount: total },
      });

      return { data: { createdRows, finalizedOrder }, error: false };
    } catch (error) {
      return { error, data: [] };
    }
  }

  @Get(':OrderID')
  async fetchSale(@Param('OrderID') OrderID: number) {
    try {
      const productsOnOrder = await this.prismaService.productOnOrder.findMany({
        where: { OrderID },
        include: {
          Product: true,
          Order: true,
        },
      });
      return { error: false, data: productsOnOrder };
    } catch (error) {
      return { error, data: [] };
    }
  }
}
