// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const githubRepositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const githubPagesBase =
	process.env.GITHUB_PAGES === 'true' &&
	githubRepositoryName &&
	!githubRepositoryName.endsWith('.github.io')
		? `/${githubRepositoryName}`
		: undefined;

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE ?? 'https://aetherianartificer.github.io',
	base: process.env.BASE_PATH ?? githubPagesBase,
	integrations: [
		starlight({
			title: 'Townstead',
			favicon: './src/assets/townstead-title-square-sd.png',
			logo: {
        src: './src/assets/townstead-title-hd.png',
        alt: 'Townstead',
        replacesTitle: true,
    },
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/AetherianArtificer/Townstead' }],
			sidebar: [
				{
					label: 'Townstead Guide',
					items: [
						{ label: 'Getting Started', slug: 'guides/getting-started' },
						{ label: 'Hunger', slug: 'guides/hunger' },
						{ label: 'Thirst', slug: 'guides/thirst' },
						{ label: 'Energy', slug: 'guides/energy' },
						{ label: 'Catalog', slug: 'guides/catalog' },
						{ label: 'Shift Schedule', slug: 'guides/shift-schedule' },
						{ label: 'Professions', slug: 'guides/professions' },
						{ label: 'Farming', slug: 'guides/farming' },
						{ label: 'Butchering', slug: 'guides/butchering' },
						{ label: 'Shepherding', slug: 'guides/shepherding' },
						{ label: 'Fishing', slug: 'guides/fishing' },
						{ label: 'Cooking', slug: 'guides/cooking' },
						{ label: 'Barista', slug: 'guides/barista' },
						{ label: 'Reactions', slug: 'guides/reactions' },
						{ label: 'Community Spirit', slug: 'guides/community-spirit' },
						{ label: 'Origins', slug: 'guides/origins' },
						{ label: 'Life Stages', slug: 'guides/life-stages' },
						{ label: 'Calendars & Stamps', slug: 'guides/calendars-and-stamps' },
					],
				},
				{
					label: 'Compats',
					items: [{ autogenerate: { directory: 'compats' } }],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{
					label: 'Data & Resource Packs',
					items: [{ autogenerate: { directory: 'packs' } }],
				},
			],
		}),
	],
});
