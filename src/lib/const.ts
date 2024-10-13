/**
 * This file contains all the constants and enums used in the application.
 */

// Type definitions for the Order entity
export enum OrderStatus {
  // Represents an order that has been created
  Created = "created",
  // Different stages of the payment process
  PaymentPending = "payment_pending",
  PaymentFailed = "payment_failed",
  PaymentSucceeded = "payment_succeeded",
  // Different stages of the order processing
  OrderProcessing = "order_processing",
  OrderShipped = "order_shipped",
  OrderDelivered = "order_delivered",
  // Represents an order that has been cancelled
  Cancelled = "cancelled",
  // Represents an order that has been refunded
  Refunded = "refunded",
}

export enum OrderMaterial {
  PLA = "pla",
  PETG = "petg",
  ABS = "abs",
  TPU = "tpu",
}

// Material prices in cents
export const materialPrices = {
  [OrderMaterial.PLA]: 10000,
  [OrderMaterial.PETG]: 20000,
  [OrderMaterial.ABS]: 15000,
  [OrderMaterial.TPU]: 25000,
};
