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
| `/pheno parity <target>` | Compares legacy gene outputs with capability-layer outputs for a living entity. |
| `/pheno skills <target>` | Lists learned skills on a living entity. |
| `/pheno learn <target> <skill>` | Teaches a skill using the normal skill rules. |
| `/pheno learn <target> <skill> force` | Teaches a skill while bypassing normal skill rules. |
| `/pheno forget <target> <skill>` | Removes a learned skill using the normal skill rules. |
| `/pheno forget <target> <skill> force` | Removes a learned skill while bypassing normal skill rules. |

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
