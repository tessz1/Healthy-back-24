import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';

export default defineConfig({
  build: {
    minify: false, // Выключает минификацию (можно включить обратно после теста)
    sourcemap: false, // Отключает source maps
    chunkSizeWarningLimit: 2000,
  },
  server: {
    // Разрешенные хосты для разработки
    allowedHosts: ['0f31-2607-740-22-5-9845-4aae-babc-38e3.ngrok-free.app'],
  },
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