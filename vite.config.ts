import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
const resolve = path.resolve;
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
    port: 5000,
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }]
  },
  plugins: [vue()],
})
