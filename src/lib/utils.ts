import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { materialPrices, type OrderMaterial } from "./const";

// Helper function to merge Tailwind CSS classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to calculate the price of an order,
// based on the quantity of items and material
export function calculateOrderPrice(
  items: {
    material: OrderMaterial;
    quantity: number;
  }[],
) {
  return items.reduce(
    (acc, item) => materialPrices[item.material] * item.quantity + acc,
    0,
  );
}

// Helper function to format a number as currency
export function formatCurrency(amount: number) {
  // We convert the amount from cents to CHF and format it as currency
  return (amount / 100).toLocaleString("de-CH", {
    style: "currency",
    currency: "CHF",
    minimumFractionDigits: 2,
  });
}

// Helper to convert a file to a base64 string
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
