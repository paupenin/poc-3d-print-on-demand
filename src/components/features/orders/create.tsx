"use client";

import { useState } from "react";
import DropFiles from "~/components/custom/drop-files";
import OrderItemBox from "~/components/order-creator/order-item-box";
import PartConfiguration from "~/components/order-creator/part-configuration";
import { Button } from "~/components/ui/button";
import FileViewer from "~/components/viewer/file-viewer";
import { OrderMaterial } from "~/lib/const";
import { calculateOrderPrice, fileToBase64, formatCurrency } from "~/lib/utils";

// Config for the DropFiles component
const uploadConfig = {
  maxFiles: 2,
  maxSize: 1024 * 1024 * 4, // 4MB
  accept: {
    "application/iges": [".iges"],
    "application/step": [".step"],
  },
};

type OrderItem = {
  file: File;
  fileName: string;
  fileBase64: string;
  fileType: "step" | "iges";
  material: OrderMaterial;
  quantity: number;
  validated: boolean;
};

export default function OrdersCreate() {
  // Uploaded files
  const [files, setFiles] = useState<File[] | null>(null);
  // Order items
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  // Active item
  const [activeItem, setActiveItem] = useState<number | null>(null);

  // If an active item is set, show the configuration form
  if (activeItem !== null && orderItems[activeItem] !== undefined) {
    const canCheckout = orderItems.every((item) => item.validated);

    return (
      <div className="flex h-full w-full grow flex-col md:flex-row-reverse">
        <div className="flex w-full flex-col gap-6 bg-muted p-6 md:w-[36rem] md:grow">
          <h2 className="text-xl font-semibold">Order configuration</h2>
          {/* Order items */}
          <div className="flex flex-col items-center gap-4">
            {orderItems.map((item, index) => (
              <OrderItemBox
                key={index}
                name={item.fileName}
                open={index === activeItem}
                validated={item.validated}
                onActiveItemChange={() => setActiveItem(index)}
              >
                <PartConfiguration
                  item={item}
                  onItemChange={(newItem) => {
                    item.material = newItem.material;
                    item.quantity = newItem.quantity;
                    item.validated = newItem.validated;
                    setOrderItems([...orderItems]);
                  }}
                />
              </OrderItemBox>
            ))}
          </div>

          {/* Total price and checkout button */}
          <div className="flex items-center justify-between">
            <p>
              Total:{" "}
              <span className="font-semibold">
                {formatCurrency(calculateOrderPrice(orderItems))}
              </span>
            </p>
            <Button disabled={!canCheckout}>Checkout</Button>
          </div>
        </div>
        <div className="aspect-square w-full bg-muted md:aspect-auto md:grow">
          <FileViewer
            file={orderItems[activeItem].file}
            fileType={orderItems[activeItem].fileType}
          />
        </div>
      </div>
    );
  }

  // If no active item, show the file uploader to create order items
  const handleNextButton = async () => {
    if (!files || files.length !== 2) return;

    // Set order items with default values and file data
    setOrderItems(
      await Promise.all(
        files.map(async (file) => {
          return {
            // File data
            file,
            fileName: file.name,
            fileBase64: await fileToBase64(file),
            fileType: file.name.endsWith(".step") ? "step" : "iges",
        // Default material is PLA
        material: OrderMaterial.PLA,
        // Default quantity is 1
        quantity: 1,
        // Validated by user
        validated: false,
          };
        }),
      ),
    );

    // Set active item to the first item to start file viewer
    setActiveItem(0);
  };

  // Only allow to proceed if 2 files are uploaded
  const canProceed = files?.length === 2;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 py-12">
      <h2 className="text-2xl font-semibold">Upload files to create a quote</h2>

      <DropFiles
        files={files}
        setFiles={setFiles}
        config={uploadConfig}
        placeholder="We accept IGES or STEP files. Max 4MB each."
      />

      <div className="flex items-center justify-center">
        <Button onClick={() => handleNextButton()} disabled={!canProceed}>
          Continue
        </Button>
      </div>
    </div>
  );
}
