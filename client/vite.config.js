import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [reactRefresh()],
	build: {
		minify: true
	},
	server: {
		proxy: {
			'apiUrl': {
				target: 'ws://localhost:8080',
				secure: false
			}
		}
	}
});
