/**
 * This file was automatically generated by joi-to-typescript
 * Do not modify this file manually
 */

export interface BuyProductData {
  productId: string;
  quantity: number;
}

export interface CreateNewPaymentData {
  paymentMethod: 'VA' | 'QRIS';
  transactionId: string;
}
