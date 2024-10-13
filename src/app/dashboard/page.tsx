import { redirect } from "next/navigation";

export default async function DashboardRoot() {
  // Because the Dashboard is still not implemented,
  // we will just redirect the user to the Orders page.
  redirect("/dashboard/orders");
}
