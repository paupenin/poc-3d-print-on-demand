"use client";

import { Download } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { orderPaymentPending, orderStatusLabel } from "~/lib/const";
import { formatCurrency } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function OrdersView({ orderId }: { orderId: string }) {
  const [order] = api.order.getOrder.useSuspenseQuery({
    orderId: Number(orderId),
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-center gap-6 py-6">
      <h2 className="text-lg font-semibold">Order #{order.id}</h2>

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
        <div className="flex w-full items-center justify-between">
          <p>Status:</p>
          <p>{orderStatusLabel(order.status)}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p>Price:</p>
          <p>{formatCurrency(order.price)}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p>Created by:</p>
          <p>{order.createdBy.name}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p>Created at:</p>
          <p>{order.createdAt.toLocaleString("de-CH")}</p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-2">
        <h3 className="font-semibold">Items</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Item</TableHead>
              <TableHead>File</TableHead>
              <TableHead>Material</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-semibold">#{item.id}</TableCell>
                <TableCell>
                  <Link href={item.fileUrl} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    {item.fileName}
                  </Link>
                </TableCell>
                <TableCell>{item.material.toUpperCase()}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
