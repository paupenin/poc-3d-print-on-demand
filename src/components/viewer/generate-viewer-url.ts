import { type OpenCascadeInstance } from "opencascade.js";

export type Acceptedtypes = "step" | "iges";

export function generateViewerUrl(
  oc: OpenCascadeInstance,
  file: File,
  fileType: Acceptedtypes,
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // Read the binary content of the uploaded file
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileBuffer = e.target?.result as ArrayBuffer;
        const binaryArray = new Uint8Array(fileBuffer);

        // Temporary file name based on file type
        const tempFileName = `/tempFile.${fileType}`;

        // Writes the uploaded file to Emscripten's Virtual Filesystem
        oc.FS.createDataFile("/", tempFileName, binaryArray, true, true, true);

        // Select the appropriate reader based on file type
        let ocReader;
        if (fileType === "step") {
          ocReader = new oc.STEPControl_Reader_1();
        } else if (fileType === "iges") {
          ocReader = new oc.IGESControl_Reader_1();
        } else {
          reject(new Error("Unsupported file type"));
          return;
        }

        // Read the file
        const readResult = ocReader.ReadFile(tempFileName);
        if (readResult !== oc.IFSelect_ReturnStatus.IFSelect_RetDone) {
          reject(new Error("Error reading the CAD file"));
          return;
        }

        // Transfer the shapes from the file to OpenCascade's internal format
        ocReader.TransferRoots(new oc.Message_ProgressRange_1());
        const shape = ocReader.OneShape();

        // Create a document and add the shape to it
        const doc = new oc.TDocStd_Document(
          new oc.TCollection_ExtendedString_1(),
        );
        const shapeTool = oc.XCAFDoc_DocumentTool.ShapeTool(doc.Main()).get();
        shapeTool.SetShape(shapeTool.NewShape(), shape);

        // Perform meshing
        new oc.BRepMesh_IncrementalMesh_2(shape, 0.1, false, 0.1, false);

        // Export the document to GLB and return the URL
        const cafWriter = new oc.RWGltf_CafWriter(
          new oc.TCollection_AsciiString_2("/output.glb"),
          true,
        );
        cafWriter.Perform_2(
          new oc.Handle_TDocStd_Document_2(doc),
          new oc.TColStd_IndexedDataMapOfStringString_1(),
          new oc.Message_ProgressRange_1(),
        );

        // Read the GLB file from the virtual filesystem
        const glbFile = oc.FS.readFile("/output.glb", { encoding: "binary" });
        const modelUrl = URL.createObjectURL(
          new Blob([glbFile.buffer], { type: "model/gltf-binary" }),
        );

        // Remove the temporary file
        oc.FS.unlink(tempFileName);

        resolve(modelUrl); // Resolve the promise with the generated URL
      };

      // Read the file as ArrayBuffer
      reader.readAsArrayBuffer(file);
    } catch (error) {
      reject(
        new Error(
          `Failed to visualize the file: ${error instanceof Error ? error.message : String(error)}`,
        ),
      );
    }
  });
}
