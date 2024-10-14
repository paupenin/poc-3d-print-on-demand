import OrdersCreate from "~/components/features/orders/create";
import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-start">
      {params.orderId === "new" ? (
        <OrdersCreate />
      ) : (
        <OrdersView orderId={params.orderId} />
      )}
    </div>
  );
}
