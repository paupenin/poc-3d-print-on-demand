export default function OrdersView({ orderId }: { orderId: string }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 py-6">
      This is the order view page for order #{orderId}.
    </div>
  );
}
