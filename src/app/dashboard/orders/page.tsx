import OrdersList from "~/components/features/orders/list";

export default async function DashboardOrders() {
  return (
    <div className="container flex grow flex-col items-center justify-center">
      <OrdersList />
    </div>
  );
}
