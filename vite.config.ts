import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "/src/index.ts"),
      name: "useStore",
      // the proper extensions will be added
      fileName: "useStore",
      formats: ["es", "cjs", "iife", "umd"],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "react",
        },
      },
    },
  },
  plugins: [dts({ include: "./src/lib" })],
});
