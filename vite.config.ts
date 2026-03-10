import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import compression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: '/CopyGithubFile2MD/',

  plugins: [
    react(),

    // Brotli圧縮
    compression({
      algorithm: 'brotliCompress',
    }),

    // bundleサイズ確認
    visualizer({
      filename: 'bundle-analysis.html',
      open: false,
    }),

    VitePWA({
      registerType: 'autoUpdate',

      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],

      manifest: {
        name: 'CopyGithubFile2MD',
        short_name: 'CopyGithubFile2MD',
        description: 'CopyGithubFile2MD',
        theme_color: '#2563eb',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/CopyGithubFile2MD/',
        start_url: '/CopyGithubFile2MD/',
        icons: [
          {
            src: '/CopyGithubFile2MD/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/CopyGithubFile2MD/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/CopyGithubFile2MD/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },

      workbox: {
        maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,

        globPatterns: ['**/*.{js,css,html,ico,png,svg,wasm}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'github-api'
            }
          }
        ],
      },
    }),
  ],

  worker: {
    format: 'es',
  },

  build: {
    target: 'es2020',

    // ソースマップ削除
    sourcemap: false,

    // 高速minify
    minify: false, //'esbuild',

    chunkSizeWarningLimit: 2000,

    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
})
