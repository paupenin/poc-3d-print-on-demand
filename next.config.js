/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    // Add WebAssembly support for OpenCascade.js
    // https://github.com/donalffons/opencascade.js/blob/dbe35f836d79958b5805b9933f02cc1b74e6053a/starter-templates/ocjs-create-next-app-12/next.config.js#L10
    config.module.rules.push({
      test: /\.wasm$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[name].[hash][ext]",
      },
    });

    // Disable fallback for Node.js modules in WebAssembly
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
};

export default config;
