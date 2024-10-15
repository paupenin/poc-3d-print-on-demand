import { put } from "@vercel/blob";
import { promises } from "fs";
import path from "path";
import { env } from "~/env";

// Store a file in the server or blob storage
export async function storeFile(
  fileName: string,
  fileBase64: string,
  folder = "",
): Promise<string> {
  // File path to store
  const filePath = path.join(folder, fileName);

  if (env.BLOB_READ_WRITE_TOKEN && env.BLOB_READ_WRITE_TOKEN !== "") {
    // Use blob storage if available
    const { downloadUrl } = await put(
      filePath,
      Buffer.from(fileBase64.replace(/^data:.*;base64,/, ""), "base64"),
      {
        access: "public",
      },
    );

    return downloadUrl;
  } else {
    // Save file to disk (development only)
    await promises.writeFile(
      path.join(process.cwd(), "public", filePath),
      fileBase64.replace(/^data:.*;base64,/, ""),
      "base64",
    );

    return "/" + filePath;
  }
}
