---
title: Commands
description: Reference for Townstead commands.
sidebar:
  order: 2
---

Most Townstead commands begin with `/townstead`. Pheno diagnostics use `/pheno`. Commands marked **Operator** require permission level 2. Other commands are available to players, subject to normal server command permissions.

## Targets

Arguments named `<target>` use Minecraft's normal single-entity selector syntax. They can be a player name, `@s`, `@p`, or an entity selector such as `@e[type=...,limit=1,sort=nearest]`. Selectors must resolve to exactly one entity.

Use `@s` for commands that take `<target>`, the no-target emote forms for yourself, or `/townstead query me <path>` when querying your own snapshot.

## Calendar

| Command | Access | Description |
| --- | --- | --- |
| `/townstead calendar get` | Player | Shows the active calendar profile, current date, season, world-day counter, and epoch offset. |
| `/townstead calendar set-year <year>` | Operator | Changes the displayed calendar year without changing the underlying day counters. |
| `/townstead calendar set-profile <id>` | Operator | Overrides the calendar profile for the world. Use `auto` to clear the override and return to automatic profile selection. |
| `/townstead calendar set-day <worldDay>` | Operator | Sets the world-day counter and updates the displayed date. |
| `/townstead calendar set-date <year> <month> <day>` | Operator | Sets the displayed date using the active calendar profile while preserving villager ages. |
| `/townstead calendar match-today` | Operator | Synchronises the calendar date with the current real-world date. |
| `/townstead calendar time-mode` | Player | Shows the effective calendar time mode and whether it comes from the config or a world override. |
| `/townstead calendar time-mode normal` | Operator | Uses normal Minecraft time progression for this world. |
| `/townstead calendar time-mode real_clock` | Operator | Uses real-clock calendar progression for this world. |
| `/townstead calendar time-mode default` | Operator | Clears the world override and returns to the configured default. |

## Climate

| Command | Access | Description |
| --- | --- | --- |
| `/townstead climate here` | Player | Shows how the air temperature where you stand is made up: mean, season, day and night, weather, snow, heat sources in sight, ground, dimension and season clock. Also shows what you feel and your comfortable range. |
| `/townstead climate biome [biome]` | Player | Shows a biome's climate zone and how Townstead chose it. Without a biome, uses the biome where you stand. |
| `/townstead climate year [biome]` | Player | Shows noon and midnight temperatures across the year for a biome at your height. |

See [Testing & Commands](/climate/testing/).

## Emotes

An emote target must be a player or an MCA villager. When no target is supplied, the command applies to the player running it.

| Command | Description |
| --- | --- |
| `/townstead emote play <id>` | Plays an emote on yourself. |
| `/townstead emote play <id> <target>` | Plays an emote on the selected player or MCA villager. |
| `/townstead emote stop` | Stops your active emote. |
| `/townstead emote stop <target>` | Stops the selected player or MCA villager's active emote. |

Emote IDs are resource locations, such as `townstead:wave`.

## Reactions

These commands are primarily intended for testing reaction data.

| Command | Description |
| --- | --- |
| `/townstead reaction list` | Lists all loaded reactions, including their binding and trigger counts. |
| `/townstead reaction play <id>` | Attempts to play a reaction on the MCA villager you are looking at, or the nearest MCA villager within 16 blocks. |
| `/townstead reaction play <id> <target>` | Attempts to play a reaction on a selected MCA villager. |

A reaction may still decline to play because of its cooldown, chance, or available candidates.

## Social and Conversations

All social commands are **Operator** commands for testing conversations, expressions, dialogue, and performances.

### Conversations

| Command | Description |
| --- | --- |
| `/townstead social conversations` | Lists the loaded conversation topics. Load errors in topic files show as red lines. |
| `/townstead social conversation <first> <second>` | Starts a preview conversation between two MCA villagers. It uses the normal checks for distance, sight, schedules and topics. A preview gives no memories, opinion or mood changes. |
| `/townstead social conversation <first> <second> <topic>` | Starts a preview conversation with the given topic. |
| `/townstead social inspect <first> <second>` | Shows what the first villager knows about the second: context facts, relationship tags, relationship qualities, social inclinations, memories, bonds, and the gate weight of each topic for the pair. |
| `/townstead social simulate` | Runs 20 whole conversations at once between random pairs of MCA villagers within 32 blocks. |
| `/townstead social simulate <count>` | Runs `<count>` conversations, from 1 to 500. |
| `/townstead social simulate <count> <radius>` | Runs `<count>` conversations between villagers within `<radius>` blocks, from 4 to 256. |
| `/townstead social simulate pair <first> <second>` | Runs 10 conversations between two villagers. The villager who starts changes each time. |
| `/townstead social simulate pair <first> <second> <count>` | Runs `<count>` conversations between two villagers, from 1 to 200. |

A simulation is a dry run with real villagers and the real conversation engine. Nothing happens in the world: no chat, gestures, relationship changes, memories, gossip, or cooldowns. Distance and line of sight are not checked. Chat shows a summary, and the full transcript goes to `logs/townstead-conversations.txt`. Use it to test [conversation data packs](/conversations/testing/).

### Expressions, Dialogue and Performances

When a command has no `<target>`, it uses the MCA villager you are looking at within 16 blocks. If you are not looking at one, it uses the nearest MCA villager within 16 blocks.

| Command | Description |
| --- | --- |
| `/townstead social list expressions` | Lists the loaded expression cues. |
| `/townstead social list dialogue` | Lists the loaded dialogue intents. |
| `/townstead social list performances` | Lists the loaded performance clips. |
| `/townstead social expression <cue> [target]` | Shows an expression cue above a living entity. A cue ID without a namespace uses `townstead_expressions`. |
| `/townstead social dialogue <intent> [target]` | Makes an MCA villager say a line for a dialogue intent, to you. An intent ID without a namespace uses `social`. |
| `/townstead social performance <clip> [target] [ticks]` | Plays a performance clip on a living entity for `[ticks]` ticks, from 1 to 1200. The default is 80. A clip ID without a namespace uses `townstead_performance`. |
| `/townstead social stop [target]` | Stops a performance started by these commands. |

## Query

Query commands are available in Townstead 0.7.5 and later. They read Townstead snapshots without changing world state. The `<path>` argument selects a value inside the snapshot and is reported back in chat.

| Command | Access | Description |
| --- | --- | --- |
| `/townstead query entity <target> <path>` | Player | Reads a path from the selected entity's Townstead snapshot. |
| `/townstead query target <path>` | Player | Reads a path from the entity you are looking at, up to 32 blocks away. |
| `/townstead query nearest <path>` | Player | Reads a path from the nearest MCA villager within 32 blocks. |
| `/townstead query nearest within <radius> <path>` | Player | Reads a path from the nearest MCA villager within the given radius, from 1 to 256 blocks. |
| `/townstead query me <path>` | Player | Reads a path from your own player snapshot. |
| `/townstead query villager <uuid> <path>` | Player | Reads a path from an entity found by UUID in loaded server levels. |
| `/townstead query calendar <path>` | Player | Reads a path from the server calendar snapshot. |
| `/townstead query building <path>` | Player | Reads a path from the MCA building you are standing in. |
| `/townstead query root <id> <path>` | Player | Reads a path from a loaded root snapshot. |
| `/townstead query gene <id> <path>` | Player | Reads a path from a loaded gene snapshot. |

Paths use dot-separated fields. Lists use numeric indexes, such as `lifeStages.0.id` or `variants.0.type`. Maps use their key as the next path segment, such as `carriedVariants.townstead:skin_tone`.

For `/townstead query root <id> <path>` and `/townstead query gene <id> <path>`, wrap namespaced IDs in quotes when typing the command, such as `"townstead_roots:overworlder"`.

| Snapshot | Paths |
| --- | --- |
| Entity | `uuid`, `name`, `entityType`, `rootId`, `lifeStage`, `biologicalAgeDays`, `apparentAgeYears`, `immortal`, `ageless`, `senior`, `personalityId`, `professionId`, `professionLevel`, `professionXp`, `fertility` |
| Entity age | `age.lifeStage`, `age.biologicalAgeDays`, `age.apparentAgeYears`, `age.immortal`, `age.ageless`, `age.senior` |
| Entity schedule | `schedule.mode`, `schedule.templateId`, `schedule.customShifts`, `schedule.nonDefaultCustomShifts`, `schedule.currentTickHour`, `schedule.currentDisplayHour`, `schedule.currentShiftOrdinal`, `schedule.currentActivity`, `schedule.plannedActivity`, `schedule.currentTemplateId`, `schedule.shifts`, `schedule.weekDayTemplates` |
| Entity needs | `needs.hunger`, `needs.saturation`, `needs.hungerExhaustion`, `needs.thirst`, `needs.quenched`, `needs.thirstExhaustion`, `needs.fatigue`, `needs.collapsed`, `needs.gated` |
| Entity genetics | `carriedVariants`, `expressedAlleles`, `heritage` |
| Calendar | `profileId`, `worldDay`, `epochYearOffset`, `timeMode`, `year`, `month`, `day`, `dayOfYear`, `dayOfWeek`, `season` |
| Building | `id`, `villageId`, `type`, `size`, `centerX`, `centerY`, `centerZ`, `minX`, `minY`, `minZ`, `maxX`, `maxY`, `maxZ` |
| Root | `id`, `displayName`, `species`, `ancestry`, `lineage`, `effectiveSpecies`, `defaultGenes`, `lifeStages` |
| Root life stage | `lifeStages.<index>.id`, `lifeStages.<index>.label`, `lifeStages.<index>.days`, `lifeStages.<index>.scale`, `lifeStages.<index>.presentsAs`, `lifeStages.<index>.narrativeStart`, `lifeStages.<index>.narrativeEnd` |
| Gene | `id`, `displayName`, `description`, `category`, `dominance`, `locus`, `weight`, `displayMode`, `variants` |
| Gene variant | `variants.<index>.id`, `variants.<index>.displayName`, `variants.<index>.weight`, `variants.<index>.type` |

Examples:

```txt
/townstead query nearest needs.hunger
/townstead query target schedule.currentActivity
/townstead query calendar season
/townstead query building type
/townstead query root "townstead_roots:overworlder" lifeStages.0.label
/townstead query gene "townstead:skin_tone" variants.0.type
```

## Porting

Porting commands are **Operator** commands for creating editable starter data from other formats.

| Command | Description |
| --- | --- |
| `/townstead port origins <name>` | Reads an Origins/Apoli jar, zip, or folder from `townstead/port-in/` and writes a Townstead Roots scaffold to `townstead/port-out/`. The command literal is `origins` because the source format is Origins/Apoli data. |

## Pheno

All Pheno commands are **Operator** commands intended for pack authoring and diagnostics.

| Command | Description |
| --- | --- |
| `/pheno validate` | Reports Pheno diagnostics from the most recent datapack compile. |
| `/pheno explain <target>` | Shows effective capabilities for a living entity, including applied and ignored contributions. |
| `/pheno expand <gene>` | Prints the normalized form of a loaded gene. Long output is truncated in chat. |
| `/pheno dump` | Writes generated Pheno reference files to the server's `pheno/` directory. |
| `/pheno patches` | Lists every data patch, its targets, and whether each target loaded and was patched. See [Pack Compatibility](/reference/compatibility/#patches). |
| `/pheno parity <target>` | Compares legacy gene outputs with capability-layer outputs for a living entity. |
| `/pheno skills <target>` | Under development. Lists learned profession skills on a living entity. |
| `/pheno learn <target> <skill>` | Under development. Teaches a profession skill using the normal skill rules. |
| `/pheno learn <target> <skill> force` | Under development. Teaches a profession skill while bypassing normal skill rules. |
| `/pheno forget <target> <skill>` | Under development. Removes a learned profession skill using the normal skill rules. |
| `/pheno forget <target> <skill> force` | Under development. Removes a learned profession skill while bypassing normal skill rules. |

## Attachments

Attachment authoring commands are **Operator** commands. The full authoring workflow is described in [Tooling & Commands](/roots/attachments/tooling/).

| Command | Description |
| --- | --- |
| `/townstead attachment doctor` | Runs every attachment health check and prints located problems: missing geometry bones, unknown states, unparseable conditions, texture and UV mismatches, unresolvable targets, and more. A shorter self-check also runs at every reload. |
| `/townstead attachment adjust <id> offset <x> <y> <z>` | Live-edits the loaded definition's offset on every rendered bearer. Lasts until the next reload. |
| `/townstead attachment adjust <id> rotation <x> <y> <z>` | Live-edits the base rotation. |
| `/townstead attachment adjust <id> scale <s>` | Live-edits the render scale. |
| `/townstead attachment adjust <id> bone <name>` | Live-edits the anchor bone. |
| `/townstead attachment adjust <id> physics <chain\|all> <param> <value>` | Live-edits any physics spring parameter on one chain by index, or all chains. |
| `/townstead attachment dump <id>` | Prints the definition as file-ready JSON with live adjustments folded in. Click the message to copy it. |
| `/townstead attachment dump-geo <id>` | Writes the definition's live geometry blob to `townstead-dump/<id>.geo.json` on the server: the exact bytes clients render, including converted `.bbmodel` output. |

## Roots

Root commands are **Operator** commands. They also run from command blocks and datapack functions.

| Command | Description |
| --- | --- |
| `/townstead root set <targets> "<ns>:<root>"` | Assigns a root to one or more MCA villagers or players. The new root reseeds genes, heritage, and personality, and body metrics and hair roll again inside the root's ranges, as on a natural spawn. Targets that already have the root do not change. |
| `/townstead root get <target>` | Shows the root of an MCA villager or player. |

`<targets>` accepts selectors that resolve to more than one entity, such as `@e[type=mca:female_villager,distance=..10]`. Entities that are not MCA villagers or players are skipped. A player's body metrics change only when that player already has MCA villager-model data.

Roots on the server blocklist cannot be assigned. Wrap the root ID in quotes when typing the command.

```txt
/townstead root set @e[type=mca:male_villager,limit=1,sort=nearest] "townstead_roots:overworlder"
/townstead root get @s
```

## Genes

Gene commands are **Operator** commands for fast iteration without root wiring.

| Command | Description |
| --- | --- |
| `/townstead gene grant <villager> "<ns>:<gene>"` | Puts any registered gene on a live villager: homozygous, freshly rolled, expressed and rendering the same frame, inheriting like a natural roll. |
| `/townstead gene revoke <villager> "<ns>:<gene>"` | Removes the gene again. |

## Birth

The birth command is an **Operator** command that forces an immediate birth, for testing root, heritage, and genotype inheritance without waiting out a gestation. Children are built through MCA's normal pregnancy path, so litter-size genes roll the clutch and inheritance behaves exactly as on a natural birth.

`@target` is a literal of the birth command, not a real entity selector. It resolves to the MCA villager under your crosshair, or the nearest one within 16 blocks, and only works when a player runs the command.

| Command | Description |
| --- | --- |
| `/townstead birth` | Births from the MCA villager you are looking at, or the nearest one within 16 blocks. The co-parent is the mother's partner (villager or player), or the mother herself if unpartnered. |
| `/townstead birth @target <father>` | Births from the looked-at villager as mother with an explicit co-parent. The father may be an MCA villager or a player. Use `@s` to be the co-parent yourself. |
| `/townstead birth <mother>` | Births from an explicit mother. The co-parent is the mother's partner (villager or player), or the mother herself if unpartnered. |
| `/townstead birth <mother> @target` | Births from an explicit mother with the looked-at villager as father. The pick never selects the mother herself. |
| `/townstead birth <mother> <father>` | Births from two explicit parents. |

## Debug

Debug commands live under `/townstead debug` and are **Operator** commands for inspecting live gene behaviour.

| Command | Description |
| --- | --- |
| `/townstead debug powers` | Dumps your own power-resolution chain: the applied root, every expressed genotype gene, the player-model expression gate, and each active power with its toggle state. Separates a "gene does nothing" report into its causes. |
| `/townstead debug glide` | Gate-by-gate flight report for villagers within 16 blocks: flight gene and lift ability, threat state, the current travel target's launch verdict (glide ready, line blocked, too close, beyond range, too far up), or for idle villagers a survey of how many joy-flight landing spots the terrain offers. |

## Cultures and Naming

Wrap a culture ID in quotes when you type it, such as `"examplepack:fisherfolk"`. Without a target, villager commands use the villager you look at, or the nearest one. See [Cultures](/cultures/testing/).

| Command | Access | Description |
| --- | --- | --- |
| `/townstead naming [target]` | Player | Shows how a villager is named: full name, naming tradition, family type, culture, name list, region and family name. |
| `/townstead naming village` | Player | Shows the culture of the village you are in. |
| `/townstead naming cultures` | Player | Lists the loaded cultures. |
| `/townstead naming set "<culture>" [target]` | Operator | Sets a villager's culture, and builds their family name again from its tradition. |
| `/townstead naming set-village "<culture>"` | Operator | Sets the culture of the village you are in. Residents keep their culture. |
| `/townstead naming clear [target]` | Operator | Clears a villager's culture, naming tradition and family name, so they get them again. |
| `/townstead culture villager` | Operator | Shows a villager's culture, the top culture that players see, their mix of cultures, and the last day it drifted. |
| `/townstead culture village` | Operator | Shows the village's founding culture, its Community Spirit, and the mix of cultures that living there pulls toward. |

## Founding

A founding profile gives a village its culture and government. Profiles come from data packs, such as culture packs. Wrap a profile ID in quotes when you type it, such as `"examplepack:harbour_guild"`. Minecraft does not accept a `:` in an unquoted word.

| Command | Access | Description |
| --- | --- | --- |
| `/townstead founding profiles` | Player | Lists the loaded founding profiles, with the culture and government of each. |
| `/townstead founding inspect` | Player | Shows the founding record of the MCA village you are in: profile, culture, government, founding biome, and natural weight. |
| `/townstead founding apply "<profile>"` | Operator | Applies a founding profile to the MCA village you are in. It sets the culture and government. Residents who already live there keep their culture, and drift toward the village's culture over time. |

## Debug Villages

Debug village commands are **Operator** commands for testing. They place, refill and remove whole villages.

| Command | Description |
| --- | --- |
| `/townstead debug village "<profile>"` | Places a vanilla village structure at your position, founds it with the profile, and spawns 8 residents. The structure type comes from the biome. |
| `/townstead debug village "<profile>" <residents>` | As above, with 1 to 32 residents. |
| `/townstead debug village "<profile>" structure <structure>` | Places the given structure: `auto`, `plains`, `desert`, `savanna`, `snowy`, `taiga`, or any structure ID. |
| `/townstead debug village "<profile>" structure <structure> <residents>` | As above, with 1 to 32 residents. |
| `/townstead debug village repopulate "<profile>"` | In the MCA village you are in, removes the residents, applies the profile again, and spawns 8 new residents. The buildings stay. |
| `/townstead debug village repopulate "<profile>" <residents>` | As above, with 1 to 32 residents. |
| `/townstead debug village remove` | Removes the MCA village you are in and its residents. If you are not in a village, it removes the nearest village within 160 blocks. The buildings stay. |
| `/townstead debug village remove clear` | Removes the village as above, then clears its area. It also removes any other MCA village in that area. |

Things to know:

- **Spawning needs space.** Townstead does not place a village within 160 blocks of another MCA village. The message names the village that is in the way and gives its position. Stand near it and use `remove clear`, or move farther away.
- **Existing villagers change culture slowly.** Villagers who already have a culture keep it when you apply a profile or install a culture pack, and drift toward their village's culture over years. Use `repopulate` to replace them now. See [Mixed Cultures & Drift](/cultures/mixed-cultures/).
- **What `clear` removes.** The area is the box around the village buildings, plus 8 blocks on each side. It goes from the lowest building floor to 12 blocks above the highest building. Townstead sets every block in it to air, with no drops. It also removes dropped items, item frames, paintings, armor stands, iron golems, and villagers in the area. Players are not affected.
- **What `clear` leaves.** Foundations below the lowest floor stay. On a slope, Townstead cuts the hill above that floor. Paths or fields more than 8 blocks from a building stay. Townstead does not clear an area wider than 320 blocks, or a village that has no buildings.
- **Tombstones make villages.** MCA counts a tombstone as a building. A lone headstone can make a small village that blocks a new spawn. `remove clear` removes such villages when they are in the cleared area.

```txt
/townstead debug village remove clear
/townstead debug village "examplepack:harbour_guild" 8
/townstead debug village repopulate "examplepack:harbour_guild" 10
```

## Memory Diagnostics

All memory commands are **Operator** commands intended for server administration and troubleshooting.

| Command | Description |
| --- | --- |
| `/townstead memory report` | Reports village, building, saved-data, cache, and AI-budget statistics. |
| `/townstead memory profile start` | Clears existing profiler data and starts collecting samples. |
| `/townstead memory profile stop` | Stops collecting profiler samples. |
| `/townstead memory profile reset` | Clears all collected profiler counters. |
| `/townstead memory profile report` | Shows profiler status and up to 12 timing rows. |
| `/townstead memory migrate-now` | Immediately scans villages and migrates or compacts legacy synthetic building data. |
| `/townstead memory purge-caches` | Clears Townstead's runtime caches. They will be rebuilt as needed. |
