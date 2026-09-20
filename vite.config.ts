import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');
	const backendUrl = env.PUBLIC_BACKEND_URL || 'http://localhost:8002';

	return {
		plugins: [
			sveltekit(),
			tailwindcss()
		],
		server: {
			proxy: {
				'/api': {
					target: backendUrl,
					changeOrigin: true,
				},
				'/sanctum': {
					target: backendUrl,
					changeOrigin: true,
				},
				'/storage': {
					target: backendUrl,
					changeOrigin: true,
				}
			},
			port: 5176
		},
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}'],
			environment: 'jsdom'
		}
	};
});
