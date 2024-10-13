import OrdersCreate from "~/components/features/orders/create";
import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="flex h-full w-full grow flex-col items-center justify-start">
      {params.slug === "new" ? (
        <OrdersCreate />
      ) : (
        <>
          <p>Order: {params.slug}</p>
          <OrdersView />
        </>
      )}
    </div>
  );
}
