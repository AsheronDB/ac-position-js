import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'AC Position',
      fileName: (format) => `ACPosition.${format}.js`
    },
    minify: 'terser',
    terserOptions: {
        keep_classnames: true
    }
  }
})