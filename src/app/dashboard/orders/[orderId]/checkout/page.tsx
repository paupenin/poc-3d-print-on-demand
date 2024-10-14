import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderCheckoutPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-start">
      <p>Checkout for Order: {params.orderId}</p>
      <OrdersView />
    </div>
  );
}
