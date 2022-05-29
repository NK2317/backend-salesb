import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderPayloadType } from './types';

@Controller('sales')
export class SalesController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post() // Create the ProductOnOrder detail for products and order and finalize the orderS
  async create(
    @Body() { selectedProducts, userID, clientForLoanId }: OrderPayloadType,
  ) {
    try {
      const total = selectedProducts.reduce(
        (acc, current) => acc + current.qty * current.product.price,
        0,
      );

      const newOrder = await this.prismaService.order.create({
        data: {
          userID,
          clientID: clientForLoanId,
          amount: total,
          status: true,
        },
      });

      const productOnOrder = selectedProducts.map(({ product, qty }) => {
        return {
          orderID: newOrder.id,
          productID: product.id,
          qty,
        };
      });

      const productsOnOrder =
        await this.prismaService.productOnOrder.createMany({
          data: productOnOrder,
        });

      return { data: { newOrder, productsOnOrder }, error: false };
    } catch (error) {
      console.error(error);
      return { error, data: [] };
    }
  }

  @Get(':orderID')
  async fetchSale(@Param('orderID') orderID: string) {
    try {
      const productsOnOrder = await this.prismaService.productOnOrder.findMany({
        where: { orderID: parseInt(orderID) },
        include: {
          Product: {
            include: {
              Category: true,
            },
          },
        },
      });
      return { error: false, data: productsOnOrder };
    } catch (error) {
      console.error(error);
      return { error, data: [] };
    }
  }
}
