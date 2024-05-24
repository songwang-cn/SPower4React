import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src/',
    },
  },
  server: {
    port: 6789,
    open: true, // 运行后主动打开浏览器
    hmr: true,  // 开启热更新
  }
})
