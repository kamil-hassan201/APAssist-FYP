import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import WasmPack from 'vite-plugin-wasm';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), WasmPack()],
});
