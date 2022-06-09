import { Product } from '@prisma/client';

export class OrderPayloadType {
  clientForLoanId: number;
  userID: number;
  selectedProducts: OrderProductPayload[];
};
export class OrderProductPayload {
  product: Product;
  qty: number;
};
