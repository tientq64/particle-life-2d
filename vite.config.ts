import { defineConfig } from 'vite'
import htmlConfig from 'vite-plugin-html-config'
import pkg from './package.json'

export default defineConfig({
	server: {
		port: 5500
	},
	plugins: [
		htmlConfig({
			favicon: '/icon.png',
			metas: [
				{
					name: 'description',
					content: pkg.description
				},
				{
					name: 'keywords',
					content: pkg.keywords.join(', ')
				},
				{
					name: 'author',
					content: pkg.author.name
				}
			]
		})
	]
})
