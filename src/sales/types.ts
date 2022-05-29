import { Product } from '@prisma/client';

export type OrderPayloadType = {
  clientForLoanId: number;
  userID: number;
  selectedProducts: OrderProductPayload[];
};
export type OrderProductPayload = {
  product: Product;
  qty: number;
};
