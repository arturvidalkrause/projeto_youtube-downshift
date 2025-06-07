// frontend/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
	plugins: [react()],
	server: {
		host: true,
		port: 5173,

		// O cliente no navegador tentará se conectar à porta 80 (HTTP) ou 443 (HTTPS).
		// Use 443 se o seu Cloudflare força HTTPS, senão use 80.
		hmr: {
			clientPort: 443
		},

		// A SOLUÇÃO PARA O ERRO:
		// Adicione seu domínio à lista de hosts permitidos.
		allowedHosts: ['compilerhub.com.br'],

		// O proxy para a API continua aqui, mas poderia ser movido para o nginx-proxy.conf no futuro.
		proxy: {
			'/api': {
				target: 'http://backend:3001',
				changeOrigin: true,
			}
		}
	}
})