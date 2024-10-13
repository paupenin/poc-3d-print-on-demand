import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function OrdersList() {
  return (
    <div className="flex flex-col items-center">
      <p>You have no orders yet.</p>

      <Button className="mt-4" asChild>
        <Link href="/dashboard/orders/new">Create Order</Link>
      </Button>
    </div>
  );
}
