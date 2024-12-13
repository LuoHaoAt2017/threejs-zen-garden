import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { viteMockServe } from 'vite-plugin-mock';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    base: env.BASE_PATH,
    plugins: [react(), viteMockServe({
      mockPath: './src/mock',
      enable: mode === 'development'
    })],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, 'src')
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      hmr: true,
      proxy: {
        "/api": {
          target: "http://localhost:8088",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  }
});
