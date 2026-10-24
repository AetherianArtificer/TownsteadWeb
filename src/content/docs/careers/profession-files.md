---
title: Profession Files
description: Define Career identity, progression, requirements, villager work, paths, and titles.
---

A profession file extends one Minecraft profession into a Townstead career. The resource ID of the file is the career ID.

This also applies to vanilla professions. `data/minecraft/profession/butcher/` is the complete Townstead extension of `minecraft:butcher`. Minecraft supplies the registry entry. The directory supplies Townstead's data, and the work, progression, feedback, trade, Path, and Skill files next to it.

These pages describe the files of a profession:

- [Profession Clothing](/careers/profession/clothing/)
- [Progression](/careers/profession/progression/)
- [Work And Job Sites](/careers/profession/work/)
- [Gated Careers And Registration](/careers/profession/gated-careers/)
- [Aliases And Compatibility](/careers/profession/aliases/)
- [Trades](/careers/profession/trades/)
- [Paths And Titles](/careers/profession/paths-and-titles/)

## File Location

Use the directory form for new packs. Each file has one purpose:

```text
data/<namespace>/profession/<career>/
├─ profession.json
├─ progression.json
├─ work.json
├─ compatibility/
│  └─ <contribution>.json
├─ trade/
│  └─ <contribution>.json
├─ path/
│  └─ <path>/
│     ├─ path.json
│     ├─ skill/
│     │  └─ <skill>.json
│     └─ trade/
│        └─ <contribution>.json
└─ skill/
   └─ <profession-wide-skill>.json
```

For example, this file defines `example:beekeeper`:

```text
data/example/profession/beekeeper/profession.json
```

Use a namespace that identifies the pack or its author, and that does not change. Players do not see it. A name such as `yourstudio_careers` or `yourstudio_beekeeping` keeps resource IDs easy to recognise. Put the names that players see in language entries.

## Minimal Practised Career

The profession ID must already be in the Minecraft registry when a data pack extends it.

```json
{
  "schema": "townstead:profession/v2",
  "display_name": { "text": "Beekeeper" },
  "description": { "text": "Tend hives and gather their produce." },
  "icon": "minecraft:honeycomb"
}
```

## Core Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Use `townstead:profession/v2` for the current layout. |
| `display_name` | No | Minecraft text component. The default is the resource path. |
| `description` | No | Minecraft text component. The Career record shows it. |
| `icon` | No | Resource ID for the Career record. Usually an item ID. |
| `work_sound` | No | Sound-event ID for a new villager profession that the pack registers. A vanilla profession already has its registry sound, but you can still declare it here. |
| `mods` | No | Townstead loads the definition only when the mod expression passes. |
| `daily_cap` | No | The Career XP that a character can earn at the full rate in one Minecraft day. After the cap, XP continues at a lower rate. See [Progression](/careers/profession/progression/). Use a positive value for a career that must progress. |
| `skills` | No | Profession-wide Skill references from the root `skill/` directory. Do not list Path Skills here. Townstead gets them from their Path. |
| `requirements` | No | Pheno condition that a character must meet to acquire the career. |
| `acquisition_routes` | No | A list with at least one route. It makes the career gated. |
| `aliases` | No | Root aliases with no condition. For an optional mod, or for a meaning that applies to one Path, use a gated compatibility contribution. |
| `clothing` | No | One clothing identity, or an ordered list of fallback identities. An object entry can also set how the outfit covers hair. See [Profession Clothing](/careers/profession/clothing/#profession-clothing). |
| `titles` | No | Names that a character gets for complete skill builds. |
| `retraining` | No | `free`, `costly`, or `locked`. The default is `free`. |
| `unlock_model` | No | `points`, `experiential`, or `hybrid`. Currently, the Career record uses the same rules for all three. Townstead reserves the field for later use. |
| `hidden` | No | Reserved for later use. Currently, the Career record still shows careers that a character cannot take yet, with their requirement hints. |
| `storage` | No | Storage preference. You usually declare it in `work.json`. See [Storage](/careers/storage/#profession-storage-preferences). |

The Career record counts completed work from the tasks of the Profession. A data-defined Job counts under its resource ID. A task engine in code counts under its task ID, or under the ID of the exact operation that it does. A Profession cannot declare or rename these counters.

An optional file, `data/<namespace>/chronicle_work_history/<name>.json`, can estimate how many of those operations an existing villager did before Chronicle started to record events. This file is Chronicle data, not a Profession file. See [Generated Work History](/careers/work/history/#generated-work-history).

## Paths And Titles

Each path has a directory under the profession. A character gets a title for a complete skill build. For `path.json` and `titles`, see [Paths And Titles](/careers/profession/paths-and-titles/). For the skill files, see [Skills And Paths](/careers/skills-and-paths/).

## Mod Gating

`mods` uses Townstead's shared expression grammar:

```json
"mods": "example"
"mods": ["example", "farmersdelight"]
"mods": { "any": ["example_a", "example_b"] }
"mods": { "not": "example_conflict" }
```

When the gate is not met, Townstead removes the Profession for that session, with its progression, Path, work, trade, and Skill files. When the gate is malformed, Townstead also rejects the definition and reports a diagnostic.

## Diagnostics

Run `/pheno validate` after a data-pack reload. It reports unknown job-site providers, unknown work tasks, malformed conditions, missing profession or skill references, skill tiers that nobody can reach, prerequisites that conflict, and prerequisite cycles.

Townstead reloads all definitions at once. It prepares the new registries first, and then replaces the old ones. It does not change entries one at a time.
