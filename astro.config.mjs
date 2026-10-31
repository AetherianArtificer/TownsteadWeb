// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE,
	redirects: {
		'/packs/cultures-beliefs': '/cultures/',
		'/packs/personas': '/stories/',
		'/packs/reactions': '/reactions/',
		'/packs/hydration-source': '/packs/amenities/',
		'/packs/energy-source': '/packs/consumables/',
		'/packs/hangouts': '/hangouts/',
		'/packs/professions': '/careers/',
		'/packs/calendars': '/calendars/',
		'/packs/stamps': '/calendars/stamps/',
		'/compats/legandary-survival-overhaul': '/compats/legendary-survival-overhaul/',
	},
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
						{
							label: 'Villager Needs',
							items: [
								{ label: 'Overview', slug: 'guides/needs' },
								{ label: 'Hunger', slug: 'guides/needs/hunger' },
								{ label: 'Thirst', slug: 'guides/needs/thirst' },
								{ label: 'Energy', slug: 'guides/needs/energy' },
								{ label: 'Temperature', slug: 'guides/needs/temperature' },
							],
						},
						{ label: 'Catalog', slug: 'guides/catalog' },
						{ label: 'Shift Schedule', slug: 'guides/shift-schedule' },
						{ label: 'Orders', slug: 'guides/orders' },
						{ label: 'Professions', slug: 'guides/professions' },
						{ label: 'Farming', slug: 'guides/farming' },
						{ label: 'Butchering', slug: 'guides/butchering' },
						{ label: 'Shepherding', slug: 'guides/shepherding' },
						{ label: 'Fishing', slug: 'guides/fishing' },
						{ label: 'Cooking & Baking', slug: 'guides/cooking' },
						{ label: 'Beverage Artisan', slug: 'guides/beverage-artisan' },
						{ label: 'Tailor', slug: 'guides/tailor' },
						{ label: 'Reactions', slug: 'guides/reactions' },
						{ label: 'Community Spirit', slug: 'guides/community-spirit' },
						{ label: 'Hangouts', slug: 'guides/hangouts' },
						{ label: 'Conversations & Dialogue', slug: 'guides/conversations' },
						{ label: 'Relationships', slug: 'guides/relationships' },
						{ label: 'Chronicles', slug: 'guides/chronicles' },
						{ label: 'Roots', slug: 'guides/roots' },
						{ label: 'Cultures', slug: 'guides/cultures' },
						{ label: 'Stories & Personas', slug: 'guides/personas' },
						{ label: 'Life Stages', slug: 'guides/life-stages' },
						{ label: 'Calendars & Stamps', slug: 'guides/calendars-and-stamps' },
						{ label: 'Climate', slug: 'guides/climate' },
					],
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
								{ label: 'Triggers', slug: 'pheno/triggers' },
								{ label: 'Hazard Avoidance', slug: 'pheno/hazard-avoidance' },
								{ label: 'Entity States', slug: 'pheno/entity-states' },
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
								{ label: 'Hair Policy', slug: 'roots/hair-policy' },
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
							label: 'Resource HUD',
							items: [
								{ label: 'Meters & Presentation', slug: 'roots/resource-hud' },
								{ label: 'Effects & Reactions', slug: 'roots/resource-hud-effects' },
								{ label: 'Frame Art', slug: 'roots/resource-hud-frame-art' },
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
								{ label: 'Model & Bones', slug: 'roots/rigs/model' },
								{ label: 'Models From Other Mods', slug: 'roots/rigs/other-mods' },
								{ label: 'Gear & Clothing', slug: 'roots/rigs/gear' },
								{ label: 'Body & Camera', slug: 'roots/rigs/body' },
								{ label: 'Poses & Emotes', slug: 'roots/rigs/poses' },
								{ label: 'Appearance Assets', slug: 'roots/appearance-assets' },
							],
						},
						{
							label: 'Attachments',
							items: [
								{ label: 'Overview', slug: 'roots/attachments' },
								{ label: 'Attachment Files', slug: 'roots/attachments/definition' },
								{ label: 'Attachment Points', slug: 'roots/attachments/points' },
								{ label: 'Genetics & Morphs', slug: 'roots/attachments/genetics' },
								{ label: 'Poses & Equipment', slug: 'roots/attachments/poses' },
								{ label: 'Bone Physics', slug: 'roots/attachments/physics' },
								{ label: 'Keyframe Animations', slug: 'roots/attachments/animations' },
								{ label: 'Surfaces & Colour', slug: 'roots/attachments/surfaces' },
								{ label: 'Tooling & Commands', slug: 'roots/attachments/tooling' },
							],
						},
					],
				},
				{
					label: 'Careers',
					items: [
						{ label: 'How Careers Work', slug: 'careers' },
						{
							label: 'Profession Files',
							items: [
								{ label: 'Overview', slug: 'careers/profession-files' },
								{ label: 'Profession Clothing', slug: 'careers/profession/clothing' },
								{ label: 'Progression', slug: 'careers/profession/progression' },
								{ label: 'Work And Job Sites', slug: 'careers/profession/work' },
								{ label: 'Gated Careers And Registration', slug: 'careers/profession/gated-careers' },
								{ label: 'Aliases And Compatibility', slug: 'careers/profession/aliases' },
								{ label: 'Trades', slug: 'careers/profession/trades' },
								{ label: 'Paths And Titles', slug: 'careers/profession/paths-and-titles' },
							],
						},
						{
							label: 'Skills & Paths',
							items: [
								{ label: 'Overview', slug: 'careers/skills-and-paths' },
								{ label: 'Learning Rules', slug: 'careers/skill/learning' },
								{ label: 'Grants And Powers', slug: 'careers/skill/grants-and-powers' },
								{ label: 'Paths', slug: 'careers/skill/paths' },
							],
						},
						{
							label: 'Work Tasks',
							items: [
								{ label: 'Overview', slug: 'careers/work-tasks' },
								{ label: 'Work Jobs', slug: 'careers/work/jobs' },
								{ label: 'Targets And Scope', slug: 'careers/work/targets' },
								{ label: 'Work History', slug: 'careers/work/history' },
							],
						},
						{ label: 'Work Feedback', slug: 'careers/work-feedback' },
						{ label: 'Combo Skills', slug: 'careers/combo-skills' },
						{ label: 'Career Providers', slug: 'careers/career-providers' },
						{
							label: 'Workplaces',
							items: [
								{ label: 'Workstations', slug: 'careers/workstations' },
								{ label: 'Storage', slug: 'careers/storage' },
							],
						},
					],
				},
				{
					label: 'Conversations',
					items: [
						{ label: 'How Conversations Work', slug: 'conversations' },
						{
							label: 'Data Files',
							items: [
								{ label: 'Topics', slug: 'conversations/topics' },
								{ label: 'Moves & Pairs', slug: 'conversations/moves-and-pairs' },
								{ label: 'Subjects', slug: 'conversations/subjects' },
								{ label: 'Encounters', slug: 'conversations/encounters' },
								{ label: 'Frames', slug: 'conversations/frames' },
								{ label: 'Pools & Line Files', slug: 'conversations/lines' },
								{ label: 'Line Fields', slug: 'conversations/line-fields' },
								{ label: 'Voices & Cultures', slug: 'conversations/voices' },
							],
						},
						{
							label: 'Writing Lines',
							items: [
								{ label: 'Text & Placeholders', slug: 'conversations/text' },
								{ label: 'State & Requirements', slug: 'conversations/state-and-requirements' },
								{ label: 'How Lines Are Chosen', slug: 'conversations/selection' },
								{ label: 'Translations', slug: 'conversations/translations' },
							],
						},
						{ label: 'Built-in Vocabulary', slug: 'conversations/vocabulary' },
						{ label: 'Testing', slug: 'conversations/testing' },
					],
				},
				{
					label: 'Reactions',
					items: [
						{ label: 'How Reactions Work', slug: 'reactions' },
						{ label: 'Reaction Files', slug: 'reactions/reaction-files' },
						{ label: 'Triggers', slug: 'reactions/triggers' },
						{ label: 'Context Tags', slug: 'reactions/context-tags' },
						{ label: 'Performances & Expressions', slug: 'reactions/performances' },
						{ label: 'Emotecraft Animations', slug: 'reactions/emotecraft' },
						{ label: 'Testing & Commands', slug: 'reactions/testing' },
					],
				},
				{
					label: 'Hangouts',
					items: [
						{ label: 'How Hangouts Work', slug: 'hangouts' },
						{ label: 'Venues', slug: 'hangouts/venues' },
						{ label: 'Spots', slug: 'hangouts/spots' },
						{ label: 'Activities', slug: 'hangouts/activities' },
						{ label: 'Hangout Policy', slug: 'hangouts/policy' },
					],
				},
				{
					label: 'Cultures',
					items: [
						{ label: 'How Cultures Work', slug: 'cultures' },
						{
							label: 'Culture Data',
							items: [
								{ label: 'Culture Files', slug: 'cultures/culture-files' },
								{ label: 'Subcultures', slug: 'cultures/subcultures' },
								{ label: 'Personal Names', slug: 'cultures/naming' },
								{ label: 'Settlement & Faction Names', slug: 'cultures/settlement-names' },
								{ label: 'Clothing', slug: 'cultures/clothing' },
								{ label: 'Founder Bias', slug: 'cultures/founder-bias' },
							],
						},
						{ label: 'Mixed Cultures & Drift', slug: 'cultures/mixed-cultures' },
						{ label: 'Building a Culture Pack', slug: 'cultures/culture-packs' },
						{ label: 'Testing & Commands', slug: 'cultures/testing' },
					],
				},
				{
					label: 'Calendars',
					items: [
						{ label: 'How Calendars Work', slug: 'calendars' },
						{ label: 'Profile Files', slug: 'calendars/profiles' },
						{ label: 'Dates & Eras', slug: 'calendars/dates-and-eras' },
						{ label: 'Leap Years', slug: 'calendars/leap-years' },
						{ label: 'Stamps', slug: 'calendars/stamps' },
						{ label: 'Testing & Commands', slug: 'calendars/testing' },
					],
				},
				{
					label: 'Climate',
					items: [
						{ label: 'How Climate Works', slug: 'climate' },
						{ label: 'Seasons & Calendars', slug: 'climate/seasons' },
						{
							label: 'Climate Data',
							items: [
								{ label: 'Biome Profiles', slug: 'climate/biome-profiles' },
								{ label: 'Climate Zones', slug: 'climate/zones' },
								{ label: 'Dimensions', slug: 'climate/dimensions' },
								{ label: 'Climate Settings', slug: 'climate/settings' },
							],
						},
						{ label: 'Underground', slug: 'climate/underground' },
						{ label: 'Crops', slug: 'climate/crops' },
						{ label: 'Temperature Mods', slug: 'climate/temperature-mods' },
						{ label: 'Testing & Commands', slug: 'climate/testing' },
					],
				},
				{
					label: 'Stories & Personas',
					items: [
						{ label: 'How Stories & Personas Work', slug: 'stories' },
						{ label: 'Your First Story', slug: 'stories/first-story' },
						{ label: 'Writing in Ink', slug: 'stories/ink' },
						{
							label: 'Data Files',
							items: [
								{ label: 'Villager Stories', slug: 'stories/story-files' },
								{ label: 'Personas', slug: 'stories/persona-files' },
								{ label: 'Quests, Goals & Rewards', slug: 'stories/quests' },
								{ label: 'Conditions, Actions & Checkpoints', slug: 'stories/conditions-actions' },
							],
						},
						{ label: 'Relationships & Demeanor', slug: 'stories/relationships' },
						{ label: 'Scenes & Cast', slug: 'stories/scenes' },
						{ label: 'Story Tools', slug: 'stories/story-tools' },
						{ label: 'Downed', slug: 'stories/downed' },
						{ label: 'Testing & Commands', slug: 'stories/testing' },
					],
				},
				{
					label: 'Data & Resource Packs',
					items: [{ autogenerate: { directory: 'packs' } }],
				},
				{
					label: 'Compats',
					items: [
						{ label: 'Overview', slug: 'compats' },
						{
							label: 'MCA Reborn & Addons',
							collapsed: true,
							items: [
								{ label: 'MCA Reborn', slug: 'compats/mca-reborn' },
								{ label: 'MCA Descendants', slug: 'compats/mca-descendants' },
								{ label: 'MCA Capitals', slug: 'compats/mca-capitals' },
								{ label: 'MCA: Reputation', slug: 'compats/mca-reputation' },
								{ label: 'MCA: Crime', slug: 'compats/mca-crime' },
							],
						},
						{
							label: 'Food & Cooking',
							collapsed: true,
							items: [
								{ label: "Farmer's Delight", slug: 'compats/farmers-delight' },
								{ label: "Chef's Delight", slug: 'compats/chefs-delight' },
								{ label: 'Rustic Delight', slug: 'compats/rustic-delight' },
								{ label: 'Pizza Delight', slug: 'compats/pizza-delight' },
								{ label: 'Butchery', slug: 'compats/butchery' },
								{ label: 'Caupona', slug: 'compats/caupona' },
								{ label: 'Kaleidoscope Cookery', slug: 'compats/kaleidoscope-cookery' },
								{ label: "Let's Do: Bakery", slug: 'compats/lets-do-bakery' },
								{ label: "Let's Do: Candlelight", slug: 'compats/lets-do-candlelight' },
								{ label: "Let's Do: Farm & Charm", slug: 'compats/lets-do-farm-and-charm' },
								{ label: 'Starcatcher', slug: 'compats/starcatcher' },
							],
						},
						{
							label: 'Drinks',
							collapsed: true,
							items: [
								{ label: "Brewin' And Chewin'", slug: 'compats/brewin-and-chewin' },
								{ label: "Cocktails Delight", slug: 'compats/cocktails-delight' },
								{ label: "Let's Do: Brewery", slug: 'compats/lets-do-brewery' },
								{ label: "Let's Do: Vinery", slug: 'compats/lets-do-vinery' },
								{ label: "Let's Do: HerbalBrews", slug: 'compats/lets-do-herbalbrews' },
								{ label: "Let's Do: Beachparty", slug: 'compats/lets-do-beachparty' },
								{ label: "Kaleidoscope Tavern", slug: 'compats/kaleidoscope-tavern' },
							],
						},
						{
							label: 'Survival',
							collapsed: true,
							items: [
								{ label: "Tough As Nails", slug: 'compats/tough-as-nails' },
								{ label: "Legendary Survival Overhaul", slug: 'compats/legendary-survival-overhaul' },
								{ label: "Cold Sweat", slug: 'compats/cold-sweat' },
								{ label: "Thirst Was Taken", slug: 'compats/thirst-was-taken' },
								{ label: "Thirst Was Reclaimed", slug: 'compats/thirst-was-reclaimed' },
							],
						},
						{
							label: 'Seasons',
							collapsed: true,
							items: [
								{ label: "Serene Seasons", slug: 'compats/serene-seasons' },
								{ label: "Ecliptic Seasons", slug: 'compats/ecliptic-seasons' },
								{ label: "TerraFirmaCraft", slug: 'compats/terrafirmacraft' },
							],
						},
						{
							label: 'Clothing & Wearables',
							collapsed: true,
							items: [
								{ label: "Curios API", slug: 'compats/curios-api' },
								{ label: "Accents", slug: 'compats/accents' },
								{ label: "Weaver's Paradise", slug: 'compats/weavers-paradise' },
								{ label: "Whole Cloth", slug: 'compats/whole-cloth' },
								{ label: "Hats Renewed", slug: 'compats/hats-renewed' },
							],
						},
						{
							label: 'Vampires & Werewolves',
							collapsed: true,
							items: [
								{ label: 'Vampirism', slug: 'compats/vampirism' },
								{ label: 'Werewolves', slug: 'compats/werewolves' },
								{ label: 'Vampiric Ageing', slug: 'compats/vampiric-ageing' },
							],
						},
						{
							label: 'Interface',
							collapsed: true,
							items: [
								{ label: "Traveler's Titles", slug: 'compats/travelers-titles' },
								{ label: 'Jade', slug: 'compats/jade' },
								{ label: 'Just Enough Professions', slug: 'compats/just-enough-professions' },
							],
						},
						{
							label: 'Animation & Models',
							collapsed: true,
							items: [
								{ label: 'Emotecraft', slug: 'compats/emotecraft' },
								{ label: 'Entity Model Features', slug: 'compats/entity-model-features' },
							],
						},
					],
				},
			],
		}),
	],
});
