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
					translations: {
						it: "Benvenuti",
						es: "Bienvenidos"
					},
					items: [
						{ label: "Quickstart", 
						  link: "/", 
						  translations: {
							it: "Guida rapida",
							es: "Guía rápida"
						  }
						},
					]
				},
				{
					label: 'Guides',
					translations: {
						it: 'Guide',
						es: 'Guías'
					},
					items: [
						{ slug: 'guides/installation' },
						{ slug: 'guides/api_usage' },
						{ slug: 'guides/manage_api_keys' },
						{ slug: 'guides/build_from_sources' },
						{ slug: 'guides/integrations' },
						{ slug: 'guides/supported_languages' },
						{ slug: 'guides/contributing' },
						{ slug: 'guides/faq' },						
					]
				},
				{
					label: "Community",
					translations: {
						it: "Comunità",
						es: "Comunidad"
					},
					collapsed: true,
					items: [
						{ slug: 'community/resources' },
						{ slug: 'community/mirrors' },
						{ slug: 'community/projects' },
					]
				},
				...openAPISidebarGroups,
			],

			defaultLocale: 'root',

			locales: {
			  // English docs in `src/content/docs/en/`
			  root: {
				label: 'English',
				lang: 'en'
			  },
			  it: {
				label: 'Italiano',
			  },
			  es: {
				label: 'Español',
			  },
			},

			editLink: {
				baseUrl: 'https://github.com/LibreTranslate/Documentation/edit/main/',
			},

			plugins: [
				// Generate the OpenAPI documentation pages.
				starlightOpenAPI([
					{
						base: 'api',
						schema: 'https://libretranslate.com/spec',
						// schema: 'http://localhost:5000/spec',
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
