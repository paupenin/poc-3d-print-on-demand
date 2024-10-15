import OrdersCreate from "~/components/features/orders/create";
import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderPage({
  params,
}: {
  params: { orderId: string };
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
      <OrdersView orderId={params.orderId} />
    </div>
  );
}
