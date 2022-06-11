import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CashCutService } from './cash-cut.service';
import { CashCutParams } from './types';

@Controller('cash-cut')
export class CashCutController {
  constructor(private readonly cashCutService: CashCutService) {}

  @Post()
  async create(@Body() cashCut: CashCutParams) {
    try {
      //create
      if (cashCut.opcion == "create") {
        const data = await this.cashCutService.create();
        return { error: false, data};
      } 
      //close
      else if(cashCut.opcion == "close") {
        const data = await this.cashCutService.update(cashCut)
        return { error: false, data };
      }
    } catch (error) {
      return { error, data: '' };
    }
  }
/*
  @Get()
  findAll() {
    return this.cashCutService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cashCutService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCashCutDto: UpdateCashCutDto) {
    return this.cashCutService.update(+id, updateCashCutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cashCutService.remove(+id);
  }*/
}
