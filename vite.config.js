import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite'
// eslint
import eslintPlugin from 'vite-plugin-eslint'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    AutoImport({
      imports: ["react"], // 自动导入vue和vue-router相关函数
      dirs: [
        // 'src/utils/**',
        // 'src/stores/**',
        // 'src/hooks/**'
      ],
      dts: 'src/auto-import/imports.d.ts',
      // 解决eslint未定义变量
      eslintrc: {
        enabled: false
      },
    }),
     // eslint
     eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.jsx', 'src/*.js', 'src/*.jsx']
    }),
  ],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    host: true // 打印 IP 地址
  },
  build: {
    // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
    minify: "esbuild",
    base: './',
    rollupOptions: {
      // 静态资源分类打包
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
      },
    },
    sourcemap: false,
    target: 'es2015',
    reportCompressedSize: false
  },
})
