import OrdersCreate from "~/components/features/orders/create";
import OrdersView from "~/components/features/orders/view";
import { OrderStatus } from "~/lib/const";

export default async function DashboardOrderPage({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: {
    [OrderStatus.PaymentProcessing]?: string;
    [OrderStatus.PaymentSucceeded]?: string;
  };
}) {
  if (params.orderId === "new") {
    return (
      <div className="flex w-full grow flex-col items-center justify-start">
        <OrdersCreate />
      </div>
    );
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-start p-4">
      <OrdersView
        orderId={params.orderId}
        paymentProcessing={!!searchParams[OrderStatus.PaymentProcessing]}
        paymentSucceeded={!!searchParams[OrderStatus.PaymentSucceeded]}
      />
    </div>
  );
}
