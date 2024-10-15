import OrdersList from "~/components/features/orders/list";

export default async function DashboardOrders() {
  return (
    <div className="container mx-auto flex grow flex-col items-center justify-start p-4">
      <OrdersList />
    </div>
  );
}
