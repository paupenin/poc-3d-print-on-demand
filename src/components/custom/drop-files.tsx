"use client";

import { CloudUpload, Paperclip } from "lucide-react";
import { useState } from "react";
import {
  type FileError,
  FileErrorCode,
  FileInput,
  type FileRejection,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  type FileUploaderOptions,
} from "~/components/ui/file-upload";

function getErrorMessage(error: FileError) {
  switch (error.code as FileErrorCode) {
    case FileErrorCode.FileInvalidType:
      return "File type is not allowed";
    case FileErrorCode.FileTooLarge:
      return "File is too large";
    case FileErrorCode.FileTooSmall:
      return "File is too small";
    case FileErrorCode.TooManyFiles:
      return "Too many files";
    default:
      return "An unknown error occurred";
  }
}

export default function DropFiles({
  files,
  setFiles,
  config = {},
  placeholder,
}: {
  files: File[] | null;
  setFiles: (files: File[] | null) => void;
  config?: FileUploaderOptions;
  placeholder?: string;
}) {
  const [errors, setErrors] = useState<FileRejection[] | null>(null);

  // Default dropzone configuration
  const uploaderConfig = {
    maxSize: 1024 * 1024 * 4, // 4MB
    // Override default configuration with the provided configuration
    ...config,
  };

  const canUploadFiles =
    !files ||
    !uploaderConfig.maxFiles ||
    files?.length < uploaderConfig.maxFiles;

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      onUploadError={setErrors}
      dropzoneOptions={uploaderConfig}
      className="relative rounded-lg bg-background p-2"
    >
      {canUploadFiles && (
        <FileInput className="text-gray-500 outline-dashed outline-1 outline-gray-500">
          <div className="flex min-h-64 w-full flex-col items-center justify-center py-6">
            <CloudUpload className="h-12 w-12" />
            <p className="mb-1 text-sm">
              <span className="font-semibold">Click to upload</span>
              &nbsp; or drag and drop
            </p>
            {placeholder && <p className="text-xs">{placeholder}</p>}
          </div>
        </FileInput>
      )}
      <FileUploaderContent>
        {errors && errors.length > 0 && (
          <div className="flex flex-col gap-2 py-2 text-red-500">
            {errors.map((error, i) => (
              <div className="flex flex-col" key={i}>
                <p className="font-bold">{error.file.name}</p>
                <ul className="list-inside list-disc">
                  {error.errors.map((e, i) => (
                    <li key={i}>{getErrorMessage(e)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i} className="py-2">
              <Paperclip className="h-4 w-4 stroke-current" />
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
}
