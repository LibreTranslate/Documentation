// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightOpenAPI, { openAPISidebarGroups } from 'starlight-openapi'


// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'LibreTranslate',
			logo: {
				src: './src/assets/logo.svg',
				replacesTitle: true
			},
			customCss: [
				'./src/styles/custom.css',
			],
			social: [
				{ icon: 'discourse', label: 'Community Forum', href: 'https://community.libretranslate.com' },
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/LibreTranslate/' },
				{ icon: 'blueSky', label: 'BlueSky', href: 'https://bsky.app/profile/libretranslate.com' }
			],
			sidebar: [
				{
					label: "Welcome",
					items: [
						{ label: "Quickstart", link: "/" },
					]
				},
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				{
					label: "Community",
					collapsed: true,
					items: [
						{ label: "Forum", link: "https://community.libretranslate.com" },
						{ label: "GitHub", link: "https://github.com/LibreTranslate/" },
						{ label: "BlueSky", link: "https://bsky.app/profile/libretranslate.com" },
						
					]
				},
				...openAPISidebarGroups,
			],

			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						base: 'api',
						// schema: 'https://libretranslate.com/spec',
						schema: 'http://localhost:5000/spec',
						label: "API Reference",
						collapsed: true,
						sidebar: {
							operations: {
								badges: true,
								labels: "operationId"
							}
						}
					},
				]),
			],
		}),
	],
});
