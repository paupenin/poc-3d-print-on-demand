"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

export default function CardForm({ orderId }: { orderId: number }) {
  const router = useRouter();
  const [number, setNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const trpcUtils = api.useUtils();

  const processPayment = api.order.processPayment.useMutation({
    onSuccess: async () => {
      // Invalidate order query (to refetch the order with the new status)
      await trpcUtils.order.getOrder.invalidate({ orderId });
      // Redirect to the order view page
      router.push(`/dashboard/orders/${orderId}`);
    },
  });

  const handlePayment = async () => {
    // Process the payment
    processPayment.mutate({
      orderId,
      // replace all non-digit characters with an empty string
      number: number.replace(/\D/g, ""),
      expiration: expiration,
      cvv: cvv,
    });
  };

  const canProceed =
    number.length === 19 && expiration.length === 5 && cvv.length === 3;

  return (
    <div className="m-6 rounded-lg border p-6">
      <h3 className="text-lg font-semibold">Enter Card Details</h3>
      <p className="text-sm text-gray-500">
        Please provide your credit card information to complete the transaction.
      </p>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="card-number">Card Number</Label>
          <Input
            id="card-number"
            value={number}
            type="text"
            maxLength={19}
            pattern="d{4}[s-]?d{4}[s-]?d{4}[s-]?d{4}"
            placeholder="0000 0000 0000 0000"
            onChange={(e) => {
              setNumber(
                e.target.value
                  .replace(/\D/g, "")
                  .replace(/(\d{4})(?=\d)/g, "$1-"),
              );
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiration-date">Expiration Date</Label>
            <Input
              id="expiration-date"
              value={expiration}
              type="text"
              maxLength={5}
              pattern="d{2}/d{2}"
              placeholder="MM/YY"
              onChange={(e) => {
                setExpiration(
                  e.target.value
                    .replace(/\D/g, "")
                    .replace(/(\d{2})(?=\d)/g, "$1/"),
                );
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input
              id="cvv"
              value={cvv}
              type="text"
              maxLength={3}
              pattern="d{3}"
              placeholder="123"
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-center">
        <Button disabled={!canProceed} onClick={() => handlePayment()}>
          Pay now
        </Button>
      </div>
    </div>
  );
}
