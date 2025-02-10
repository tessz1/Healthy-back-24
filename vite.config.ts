import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteBabel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    viteBabel({
      babelConfig: {
        plugins: ['@babel/plugin-proposal-decorators'],
      },
    }),
  ],
});
