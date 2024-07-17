import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "es2018",
  },
  plugins: [react()],
  css:{
    modules:{
      localsConvention:"camelCase"
    }
  }
})
