---
title: Profession Files
description: Define Career identity, progression, requirements, villager work, paths, and titles.
---

A profession file extends one Minecraft profession into a Townstead career. Its resource ID is the career ID.

This is equally true for vanilla professions. `data/minecraft/profession/butcher/` is the complete Townstead extension of `minecraft:butcher`; Minecraft supplies the registry object, while the directory supplies Townstead's metadata and adjacent work, progression, feedback, trade, Path, and Skill documents.

The profession's documents are described across these pages:

- [Profession Clothing](/careers/profession/clothing/)
- [Progression](/careers/profession/progression/)
- [Work And Job Sites](/careers/profession/work/)
- [Gated Careers And Registration](/careers/profession/gated-careers/)
- [Aliases And Compatibility](/careers/profession/aliases/)
- [Trades](/careers/profession/trades/)
- [Paths And Titles](/careers/profession/paths-and-titles/)

## File Location

Use the directory form for new packs. Each document has one concern:

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

Choose the namespace as the stable identity of the pack or its author, not as player-facing copy.
A name such as `yourstudio_careers` or `yourstudio_beekeeping` keeps resource IDs recognisable,
while language entries provide the polished names that players see.

## Minimal Practised Career

The profession ID must already exist in the Minecraft registry when a data pack extends it.

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
| `display_name` | No | Minecraft text component. Defaults to the resource path. |
| `description` | No | Minecraft text component shown on the Career record. |
| `icon` | No | Resource ID used by the Career record. An item ID is the usual choice. |
| `work_sound` | No | Sound-event ID used when the pack registers a new villager profession. Existing vanilla professions already own their registry sound, but may still declare it as complete Profession metadata. |
| `mods` | No | Loads the definition only when the mod expression passes. |
| `daily_cap` | No | Maximum career XP applied per Minecraft day. Use a positive value for a career that must progress. |
| `skills` | No | Profession-wide Skill references from the root `skill/` directory. Path Skills are derived from their Path and are not listed here. |
| `requirements` | No | Pheno condition that gates acquisition. |
| `acquisition_routes` | No | Non-empty list that makes this a gated career. |
| `aliases` | No | Unconditional root aliases. Use a gated compatibility contribution for an optional mod or a Path-specific meaning. |
| `clothing` | No | One clothing identity or an ordered list of fallback identities. An object entry can also control how that outfit covers hair. See [Profession Clothing](/careers/profession/clothing/#profession-clothing). |
| `titles` | No | Names awarded for complete skill builds. |
| `retraining` | No | `free`, `costly`, or `locked`. Defaults to `free`. |
| `unlock_model` | No | `points`, `experiential`, or `hybrid`. The Career record applies the same rules for all three; the field is reserved for a later distinction. |
| `hidden` | No | Reserved discovery presentation field. The current Career record still shows unmet careers and their requirement hints. |
| `storage` | No | External storage preference. Usually declared in `work.json`; see [Storage](/careers/storage/#profession-storage-preferences). |

The Career record derives completed-work evidence from the Profession's tasks. Data-defined Jobs contribute their resource IDs, while code-driven task engines contribute their task IDs or the more precise operation IDs they perform. A Profession does not declare or rename those counters.

An optional `data/<namespace>/chronicle_work_history/<name>.json` file can estimate how many of those operations an existing villager completed before Chronicle began recording events. This is Chronicle background data, not another Profession sidecar; see [Generated Work History](/careers/work/history/#generated-work-history).

## Paths And Titles

A path owns a directory below the profession, and a title is awarded for a complete skill build. See [Paths And Titles](/careers/profession/paths-and-titles/) for `path.json` and `titles`, and [Skills And Paths](/careers/skills-and-paths/) for the skill files themselves.

## Mod Gating

`mods` uses Townstead's shared expression grammar:

```json
"mods": "example"
"mods": ["example", "farmersdelight"]
"mods": { "any": ["example_a", "example_b"] }
"mods": { "not": "example_conflict" }
```

An unmet gate removes the Profession and its progression, Path, work, trade, and Skill documents for that session. A malformed gate also refuses the definition and reports a diagnostic.

## Diagnostics

Run `/pheno validate` after a data-pack reload. Profession diagnostics report unknown job-site providers, unknown work tasks, malformed conditions, missing profession or skill references, unreachable skill tiers, contradictory prerequisites, and prerequisite cycles.

A definition reload is atomic. The registries are replaced from the prepared result rather than being edited one entry at a time.
