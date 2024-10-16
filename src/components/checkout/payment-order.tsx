"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OrderStatus } from "~/lib/const";
import { fileToBase64 } from "~/lib/utils";
import { api } from "~/trpc/react";
import DropFiles from "../custom/drop-files";
import { Button } from "../ui/button";

// Config for the DropFiles component
const uploadConfig = {
  maxFiles: 1,
  maxSize: 1024 * 1024 * 4, // 4MB
  accept: {
    "application/pdf": [".pdf"],
  },
};

export default function PaymentOrder({ orderId }: { orderId: number }) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const trpcUtils = api.useUtils();

  const uploadProofOfPayment = api.order.uploadProofOfPayment.useMutation({
    onSuccess: async () => {
      // Redirect to the order view page
      router.push(
        `/dashboard/orders/${orderId}?${OrderStatus.PaymentProcessing}=true`,
      );
      // Invalidate order query (to refetch the order with the new status)
      await trpcUtils.order.getOrder.invalidate({ orderId });
      // Invalidate the order list query (to refetch the list with the new order status)
      await trpcUtils.order.getOrders.invalidate();
    },
  });

  const handleUpload = async () => {
    if (!file) return;

    // Upload the proof of payment
    uploadProofOfPayment.mutate({
      orderId,
      file: await fileToBase64(file),
    });
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-start p-4">
      <DropFiles
        files={file ? [file] : null}
        setFiles={(files) => setFile(files?.[0] ?? null)}
        config={uploadConfig}
        placeholder="Upload payment receipt"
      />
      <Button className="mt-4" disabled={!file} onClick={() => handleUpload()}>
        Upload proof of payment
      </Button>
    </div>
  );
}
