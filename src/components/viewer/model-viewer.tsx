// This is a complex integration of @google/model-viewer with Next.js.
// We must use dynamic imports for components that are not used on the initial render.
// We cannot use this on the initial render because it would break server-side rendering.
// To import this component use:
// const ModelViewer = dynamic(() => import("./model-viewer"), { ssr: false });

import "@google/model-viewer";
import { type CSSProperties } from "react";

// Extend JSX's IntrinsicElements for 'model-viewer'
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": {
        src?: string;
        alt?: string;
        "camera-controls"?: boolean;
        "enable-pan"?: boolean;
        style?: CSSProperties;
      };
    }
  }
}

export default function ModelViewer({
  src,
  style,
}: {
  src: string;
  style?: CSSProperties;
}) {
  return <model-viewer src={src} camera-controls enable-pan style={style} />;
}
