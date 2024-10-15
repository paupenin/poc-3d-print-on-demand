"use client";

import { notFound, useRouter } from "next/navigation";
import CardForm from "~/components/checkout/card-form";
import PaymentOrder from "~/components/checkout/payment-order";
import OrderDetails from "~/components/order-viewer/order-details";
import OrderItems from "~/components/order-viewer/order-items";
import { orderPaymentPending } from "~/lib/const";
import { api } from "~/trpc/react";

export default function OrdersCheckout({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [order] = api.order.getOrder.useSuspenseQuery({
    orderId: Number(orderId),
  });

  // If the order is not found, show a 404 page
  if (!order) {
    notFound();
  }

  // If the order is not pending payment, redirect to the order view page
  if (!orderPaymentPending(order.status)) {
    router.push(`/dashboard/orders/${orderId}`);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 py-6">
      <h2 className="text-lg font-semibold">Checkout for order #{order.id}</h2>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Details</h3>
        <OrderDetails order={order} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Items</h3>
        <OrderItems items={order.items} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Payment</h3>

        <CardForm orderId={order.id} />

        <p className="text-center text-sm text-gray-500">
          - or upload a proof of payment -
        </p>
        <PaymentOrder orderId={order.id} />
      </div>
    </div>
  );
}
