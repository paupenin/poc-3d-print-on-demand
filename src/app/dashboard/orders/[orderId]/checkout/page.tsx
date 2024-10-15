import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderCheckoutPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-start p-4">
      <h1 className="text-2xl font-semibold">Checkout</h1>
      <OrdersView orderId={params.orderId} />
    </div>
  );
}
