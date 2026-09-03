import { resolve } from 'path';
import autoprefixer from 'autoprefixer';

export default {
    base: '/WindelsDecor/',
	root: resolve(__dirname, 'src'),
	publicDir: resolve('./public'),
	build: {
		outDir: '../dist',
	},
	server: {
		port: 8080,
	},
	css: {
		postcss: {
			plugins: [autoprefixer],
		},
	},
};
