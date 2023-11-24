import fs from 'fs'
import { defineConfig } from 'vite';
import { SERVER_PORT, OPENAI_CONFIG } from './constants';

const API_KEY = fs.readFileSync('./API_KEY', 'utf-8').trim();
const TARGET_URL = fs.readFileSync('./TARGET_URL', 'utf-8').trim();

export default defineConfig({
  server: {
    port: 4568,
    host: true,
    proxy: {
      [OPENAI_CONFIG.base]: {
        target: TARGET_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(OPENAI_CONFIG.base, ''),
        headers: {
          Authorization: `Bearer ${API_KEY}`
        }
      }
    }
  }
});
