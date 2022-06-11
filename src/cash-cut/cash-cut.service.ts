import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CashCutParams } from './types';

@Injectable()
export class CashCutService {
  constructor(private readonly prismaService: PrismaService) {}

  async create() {
      const cashCut = await this.prismaService.cashCut
      .create({
        data: {},
      })
      .catch((error) => {
        return error;
      })
    return cashCut;
  }
  
  async update(cashCut: CashCutParams) {
    const orders = await this.prismaService.order.aggregate({
      where: {
        idCashCut: cashCut.id
      },
      _sum: {
        amount: true
      },
    })
    .catch((error) => {
      return error;
    })
    const updateCashCut = await this.prismaService.cashCut.update(
      {
        where: {
          id: cashCut.id
      },
      data:{
        status: cashCut.status,
        amount: (orders._sum.amount === null ) ? 0 : orders._sum.amount,
        endDate: new Date(),
      }
    })
    .catch((error) => {
      return error;
    })
    return {cashCut: updateCashCut};
  }
/*
  findAll() {
    return `This action returns all cashCut`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cashCut`;
  }


  remove(id: number) {
    return `This action removes a #${id} cashCut`;
  }*/
}
