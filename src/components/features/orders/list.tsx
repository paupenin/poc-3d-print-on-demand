"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { orderStatusLabel } from "~/lib/const";
import { formatCurrency } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function OrdersList() {
  // Get orders from the server using trpc
  const [orders] = api.order.getOrders.useSuspenseQuery();

  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      <Button className="mt-4" asChild>
        <Link href="/dashboard/orders/new">Create Order</Link>
      </Button>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="flex w-full flex-col">
          <h2 className="text-lg font-semibold">Your Orders</h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-semibold">#{order.id}</TableCell>
                  <TableCell>{orderStatusLabel(order.status)}</TableCell>
                  <TableCell>{order.createdBy.name}</TableCell>
                  <TableCell>
                    {order.createdAt.toLocaleString("de-CH")}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(order.price)}
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="ghost">
                      <Link href={`/dashboard/orders/${order.id}`}>View</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
