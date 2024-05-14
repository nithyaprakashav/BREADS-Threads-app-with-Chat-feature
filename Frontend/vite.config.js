import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from "dotenv"
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:4000,
    proxy:{
      "/api":{
        target:process.env.BASE_URL,
        changeOrigin: true ,
        secure: false
      }
    }
  }
})
