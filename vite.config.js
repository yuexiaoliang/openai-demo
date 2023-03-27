import { defineConfig } from 'vite';
import { SERVER_PORT, OPENAI_CONFIG } from './constants';

export default defineConfig({
  server: {
    port: 4568,
    proxy: {
      [OPENAI_CONFIG.base]: {
        target: `http://127.0.0.1:${SERVER_PORT}`,
        changeOrigin: true
      }
    }
  }
});
