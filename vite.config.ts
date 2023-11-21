import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports: ["react"],
      dirs: [
        // 'src/utils/**',
        // 'src/stores/**',
        // 'src/hooks/**'
      ],
      dts: 'src/types/imports.d.ts',
      eslintrc: {
        enabled: true
      }
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src'),
    }
  },
  server: {
    host: true
  },
  build: {
    // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    minify: "esbuild",
    rollupOptions: {
      // rollup 进行静态资源分包
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        // 静态资源分拆打包
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.toString().indexOf('.yarn/') !== -1) {
              return id.toString().split('.yarn/')[1].split('/')[0].toString()
            } else if (id.toString().indexOf('node_modules/') !== -1) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          }
        }
      }
    },
    sourcemap: false,
    target: 'es2015',
    reportCompressedSize: false
  }
})
