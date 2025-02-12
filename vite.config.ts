import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

export default defineConfig({
  plugins: [
    react(),
    babel({
      babelConfig: {
        plugins: [
          ["@babel/plugin-proposal-decorators", { "legacy": true }],
          ["@babel/plugin-proposal-class-properties", { "loose": true }]
        ]
      }
    })
  ]
});