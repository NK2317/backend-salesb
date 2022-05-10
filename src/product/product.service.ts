import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  private readonly entries = [
    { field: 'name', type: 'string' },
    { field: 'description', type: 'string' },
    { field: 'unit', type: 'string' },
    { field: 'price', type: 'number' },
  ];

  //todo refactor for scale fields
  getWhereByTerm(term: any) {
    const orStatement = [];
    this.entries.forEach(({ field, type }) => {
      if (typeof term == type) {
        orStatement.push({ [field]: { contains: term } });
      }
    });
    return orStatement;
  }
}
