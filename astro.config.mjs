// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

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
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
		}),
	],
});
