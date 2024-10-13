"use client";

import { useState } from "react";
import DropFiles from "~/components/custom/drop-files";
import { Button } from "~/components/ui/button";

export default function OrdersCreate() {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleNextButton = () => {
    console.log("Next button clicked", files);
  };

  const uploadConfig = {
    maxFiles: 2,
    maxSize: 1024 * 1024 * 4, // 4MB
    accept: {
      "application/iges": [".iges"],
      "application/step": [".step"],
    },
  };

  // Only allow to proceed if 2 files are uploaded
  const canProceed = files?.length === 2;

  return (
    <div className="w-full max-w-md">
      <DropFiles
        files={files}
        setFiles={setFiles}
        config={uploadConfig}
        placeholder="We accept IGES or STEP files. Max 4MB each."
      />

      <div className="mt-6 flex items-center justify-center">
        <Button onClick={() => handleNextButton()} disabled={!canProceed}>
          Continue
        </Button>
      </div>
    </div>
  );
}
