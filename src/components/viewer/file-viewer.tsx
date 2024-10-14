"use client";

import { Loader } from "lucide-react";
import dynamic from "next/dynamic";
import initOpenCascade, { type OpenCascadeInstance } from "opencascade.js";
import { useEffect, useState } from "react";
import { generateViewerUrl, type Acceptedtypes } from "./generate-viewer-url";

// Dynamic import for ModelViewer to avoid loading it on the server
const ModelViewer = dynamic(() => import("./model-viewer"), { ssr: false });

// Simple cache for rendered models
const modelCache = new Map<string, string>();

// Helper to generate cache key
function cacheKey(file: File) {
  // console.log("cacheKey", file);
  // TODO: Use a hash function to generate a unique key for this exact file content
  return file.name;
}

export default function FileViewer({
  file,
  fileType,
}: {
  file: File;
  fileType: Acceptedtypes;
}) {
  // console.log("FileViewer", fileBase64, fileType);
  const [oc, setOc] = useState<OpenCascadeInstance | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [modelUrl, setModelUrl] = useState<string | null>(null);

  // We load OpenCascade.js in a separate useEffect to avoid loading it multiple times
  useEffect(() => {
    // console.log("Loading OpenCascade.js");
    // Load OpenCascade.js
    initOpenCascade()
      .then((ocInstance) => {
        // console.log("OpenCascade.js loaded");
        setOc(ocInstance);
      })
      .catch((e) => {
        // console.error("Error loading OpenCascade.js", e);
        setError(e instanceof Error ? e.message : String(e));
      });
  }, []);

  // Load the file and visualize it
  useEffect(() => {
    if (!oc) {
      // console.log("OpenCascade.js not loaded yet");
      return;
    }

    // Clear previous error, if any
    setError(null);

    // Remove previous model (show loading)
    setModelUrl(null);

    // Check if the model is already cached
    if (modelCache.has(cacheKey(file))) {
      // console.log("Model already cached");
      setModelUrl(modelCache.get(cacheKey(file))!);
      return;
    }

    generateViewerUrl(oc, file, fileType)
      .then((url) => {
        // console.log("Model URL", url);
        setModelUrl(url);
        // Cache the model
        modelCache.set(cacheKey(file), url);
      })
      .catch((e) => {
        // console.error("Error visualizing file", e);
        setError(e instanceof Error ? e.message : String(e));
        return null;
      });
  }, [oc, file, fileType]);

  // Error display
  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Loading display
  if (!oc || !modelUrl) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Render the viewer
  return (
    <ModelViewer
      src={modelUrl}
      camera-controls
      enable-pan
      style={{ width: "100%", height: "100%" }}
    />
  );
}
