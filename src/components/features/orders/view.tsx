"use client";

import { CircleCheck, ClockIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import OrderDetails from "~/components/order-viewer/order-details";
import OrderItems from "~/components/order-viewer/order-items";
import { Button } from "~/components/ui/button";
import { orderPaymentPending } from "~/lib/const";
import { api } from "~/trpc/react";

export default function OrdersView({
  orderId,
  paymentProcessing = false,
  paymentSucceeded = false,
}: {
  orderId: string;
  paymentProcessing?: boolean;
  paymentSucceeded?: boolean;
}) {
  const [order] = api.order.getOrder.useSuspenseQuery({
    orderId: Number(orderId),
  });

  // If the order is not found, show a 404 page
  if (!order) {
    notFound();
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 py-6">
      <h2 className="text-lg font-semibold">Order #{order.id}</h2>

      {paymentProcessing && (
        <div className="my-6 flex w-full flex-col items-center justify-center gap-2">
          <ClockIcon className="h-8 w-8" />
          <p>Your payment is being processed.</p>
          <p>This may take 1 to 2 business days.</p>
        </div>
      )}

      {paymentSucceeded && (
        <div className="my-6 flex w-full flex-col items-center justify-center gap-2">
          <CircleCheck className="h-8 w-8" />
          <p>Your payment was successful.</p>
          <p>We will notify you once it ships.</p>
        </div>
      )}

      {orderPaymentPending(order.status) && (
        <div className="flex w-full flex-col items-center justify-center gap-2">
          <p>Your order is pending payment.</p>
          <Button asChild>
            <Link href={`/dashboard/orders/${orderId}/checkout`}>Checkout</Link>
          </Button>
        </div>
      )}

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Details</h3>
        <OrderDetails order={order} />
      </div>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Items</h3>
        <OrderItems items={order.items} />
      </div>
    </div>
  );
}
