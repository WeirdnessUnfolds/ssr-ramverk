import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dotenv from 'dotenv'

dotenv.config();


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: '/~viav23/editor/',
  optimizeDeps: {
    include: ['mailgun.js'],
  },
})
