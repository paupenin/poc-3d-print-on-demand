import { Download } from "lucide-react";
import Link from "next/link";
import { orderStatusLabel } from "~/lib/const";
import { formatCurrency } from "~/lib/utils";

export default function OrderDetails({
  order,
}: {
  order: {
    status: string;
    price: number;
    createdBy: { name: string | null };
    createdAt: Date;
    paymentReceiptUrl: string | null;
  };
}) {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <p>Status:</p>
        <p>{orderStatusLabel(order.status)}</p>
      </div>
      {order.paymentReceiptUrl && (
        <div className="flex w-full items-center justify-between">
          <p>Proof of payment:</p>
          <p>
            <Link
              href={order.paymentReceiptUrl}
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              View proof of payment
            </Link>
          </p>
        </div>
      )}

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
    </>
  );
}
