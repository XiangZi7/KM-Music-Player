import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// AutoImport
import AutoImport from "unplugin-auto-import/vite";
// 代码压缩
import viteCompression from "vite-plugin-compression";
// Inspect
import Inspect from "vite-plugin-inspect";
// eslint
import eslintPlugin from "vite-plugin-eslint";
// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    Inspect(),
    react(),
    AutoImport({
      // 解决eslint未定义变量
      eslintrc: {
        enabled: true,
      },
      imports: ["react"], // 自动导入vue和vue-router相关函数
      dirs: [
        // 'src/utils/**',
        // 'src/stores/**',
        // 'src/hooks/**'
      ],
      dts: "src/auto-import/imports.d.ts",
    }),
    // eslint
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.jsx", "src/*.js", "src/*.jsx"],
    }),
    // 对大于 1k 的文件进行压缩
    viteCompression({
      threshold: 1000,
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, // 打印 IP 地址
  },
  build: {
    // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    minify: "esbuild",
    rollupOptions: {
      // 静态资源分类打包
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        // 静态资源分拆打包
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.toString().indexOf(".yarn/") !== -1) {
              return id.toString().split(".yarn/")[1].split("/")[0].toString();
            } else if (id.toString().indexOf("node_modules/") !== -1) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }
        },
      },
    },
    sourcemap: false,
    target: "es2015",
    reportCompressedSize: false,
  },
});
