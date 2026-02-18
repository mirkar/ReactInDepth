import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { 
    globals: true,
    environment: "jsdom",
  reporters: ['default', 'junit'], // 'default' for console output, 'junit' for XML
  outputFile: 'junit.xml', // Output file for JUnit results
  },
})
