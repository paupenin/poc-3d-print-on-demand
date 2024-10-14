import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderCheckoutPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-start">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <OrdersView orderId={params.orderId} />
    </div>
  );
}
