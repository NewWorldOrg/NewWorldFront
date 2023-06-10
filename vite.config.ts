import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslintPlugin from 'vite-plugin-eslint'

const HOST = '0.0.0.0'
const PORT = 8080

export default defineConfig({
  server: {
    open: false,
    host: HOST,
    port: PORT,
    strictPort: true,
    hmr: {
      clientPort: 80,
      overlay: false,
    },
    watch: {
      ignored: ['./dist', './node_modules'],
    },
  },
  plugins: [
    react({
      jsxRuntime: 'classic',
    }),
    eslintPlugin(),
  ],
  build: {
    outDir: path.resolve(__dirname, 'dist'),
  },
  envDir: './',
  json: {
    stringify: true,
  },
})
