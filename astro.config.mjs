// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE,
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
						{ label: 'Roots', slug: 'guides/roots' },
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
					label: 'Pheno',
					items: [
						{ label: 'Overview', slug: 'pheno' },
						{ label: 'Examples', slug: 'pheno/examples' },
						{
							label: 'Core Reference',
							items: [
								{ label: 'Structure', slug: 'pheno/structure' },
								{ label: 'Context', slug: 'pheno/context' },
								{ label: 'Conditions', slug: 'pheno/conditions' },
								{ label: 'Actions', slug: 'pheno/actions' },
								{ label: 'Selectors & Values', slug: 'pheno/selectors-values' },
								{ label: 'Gene Nodes', slug: 'pheno/gene-nodes' },
							],
						},
						{
							label: 'Tools',
							items: [
								{ label: 'Commands', slug: 'pheno/commands' },
								{ label: 'Diagnostics', slug: 'pheno/diagnostics' },
							],
						},
					],
				},
				{
					label: 'Roots',
					items: [
						{ label: 'How Roots Work', slug: 'roots' },
						{
							label: 'Data Files',
							items: [
								{ label: 'File Basics', slug: 'roots/file-basics' },
								{ label: 'Root Profiles', slug: 'roots/root-profiles' },
								{ label: 'Species', slug: 'roots/species' },
								{ label: 'Ancestry & Lineage', slug: 'roots/ancestry-lineage' },
								{ label: 'Heritage', slug: 'roots/heritage' },
								{ label: 'Spawn Bias', slug: 'roots/spawn-bias' },
								{ label: 'Personality Policy', slug: 'roots/personality-policy' },
							],
						},
						{
							label: 'Genes',
							items: [
								{ label: 'Gene Files', slug: 'roots/gene-files' },
								{ label: 'Gene Type Reference', slug: 'roots/gene-types' },
								{ label: 'Inheritance', slug: 'roots/inheritance' },
							],
						},
						{
							label: 'Life & Traits',
							items: [
								{ label: 'Life Cycles', slug: 'roots/life-cycles' },
								{ label: 'Traits', slug: 'roots/traits' },
							],
						},
						{
							label: 'Rigs & Appearance',
							items: [
								{ label: 'Rigs', slug: 'roots/rigs' },
								{ label: 'Appearance Assets', slug: 'roots/appearance-assets' },
								{ label: 'Attachments', slug: 'roots/attachments' },
							],
						},
					],
				},
				{
					label: 'Data & Resource Packs',
					items: [{ autogenerate: { directory: 'packs' } }],
				},
			],
		}),
	],
});
