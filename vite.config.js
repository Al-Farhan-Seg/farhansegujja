import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

const root = import.meta.dirname

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        c23: resolve(root, 'work/c23/index.html'),
        nextMedia: resolve(root, 'work/next-media/index.html'),
        embiro: resolve(root, 'experience/embiro/index.html'),
        notFound: resolve(root, '404.html'),
      },
    },
  },
})
