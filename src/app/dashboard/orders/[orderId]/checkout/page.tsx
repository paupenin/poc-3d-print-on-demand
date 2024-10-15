import OrdersCheckout from "~/components/features/orders/checkout";

export default async function DashboardOrderCheckoutPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="container mx-auto flex flex-col items-center justify-start p-4">
      <OrdersCheckout orderId={params.orderId} />
    </div>
  );
}
