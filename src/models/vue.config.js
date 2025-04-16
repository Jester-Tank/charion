import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
    plugins: [vue()],
    base: process.env.NODE_ENV === 'production' ? '/charion/' : '/',
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@mdi/font': path.resolve(__dirname, './node_modules/@mdi/font'),
        }
    }
})