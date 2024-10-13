import OrdersCreate from "~/components/features/orders/create";
import OrdersView from "~/components/features/orders/view";

export default async function DashboardOrderPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="container flex grow flex-col items-center justify-start">
      {params.slug === "new" ? (
        <div className="flex w-full flex-col items-center gap-4 py-6">
          <h2 className="text-2xl font-semibold">
            Upload files to create a quote
          </h2>
          <OrdersCreate />
        </div>
      ) : (
        <>
          <p>Order: {params.slug}</p>
          <OrdersView />
        </>
      )}
    </div>
  );
}
