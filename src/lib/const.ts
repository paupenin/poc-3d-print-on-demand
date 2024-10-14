/**
 * This file contains constants and helpers for orders.
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

export function orderStatusLabel(status: OrderStatus) {
  switch (status) {
    case OrderStatus.Created:
      return "Created";
    case OrderStatus.PaymentPending:
      return "Payment Pending";
    case OrderStatus.PaymentFailed:
      return "Payment Failed";
    case OrderStatus.PaymentSucceeded:
      return "Payment Succeeded";
    case OrderStatus.OrderProcessing:
      return "Order Processing";
    case OrderStatus.OrderShipped:
      return "Order Shipped";
    case OrderStatus.OrderDelivered:
      return "Order Delivered";
    case OrderStatus.Cancelled:
      return "Cancelled";
    case OrderStatus.Refunded:
      return "Refunded";
    default:
      return "Unknown";
  }
}

export function orderPaymentPending(orderStatus: OrderStatus) {
  return (
    orderStatus === OrderStatus.Created ||
    orderStatus === OrderStatus.PaymentPending ||
    orderStatus === OrderStatus.PaymentFailed
  );
}
