import { defineConfig, Options } from "tsup";

export default defineConfig((options: Options) => ({
  banner: { js: "'use client'" },
  entry: ["src/index.tsx"],
  format: ["esm"],
  external: ["react"],
  splitting: true,
  minify: true,
  clean: true,
  dts: true,
  ...options,
}));
