---
title: Combo Skills
description: Grant automatic benefits when a character reaches ranks in several careers.
---

A Combo Skill is a lateral connection between flat careers. It requires a minimum rank in two or more careers and grants its effects automatically when every threshold is met.

Use a Combo Skill when the benefit comes from the meeting of distinct work histories. Do not create a child profession only to represent a combination.

## File Location

```text
data/<namespace>/combo_skill/<name>.json
```

The file path is the Combo Skill ID. For example:

```text
data/example/combo_skill/apiary_chandler.json
```

defines `example:apiary_chandler`.

## Minimal Example

```json
{
  "display_name": { "text": "Apiary Chandler" },
  "description": {
    "text": "Years of hives and years of candles. Nothing about wax surprises you any more."
  },
  "icon": "minecraft:candle",
  "professions": {
    "example:beekeeper": 2,
    "example:chandler": 3
  },
  "grants": [
    {
      "capability": "example:wax_yield",
      "op": "add",
      "value": 1
    }
  ]
}
```

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `display_name` | No | Minecraft text component. Defaults to the resource path. |
| `description` | No | Minecraft text component shown on the Career record. |
| `icon` | No | Resource ID used by the Career record. |
| `professions` | Yes | Map of career IDs to minimum ranks. It must contain at least two careers. |
| `grants` | No | Passive capability contributions, using the same format as ordinary skills. |
| `mods` | No | Loads this Combo Skill only when the mod expression passes. |

Every rank must be at least 1. A one-career definition is malformed because an ordinary skill already represents that case.

## Unlock Behaviour

Combo Skill ownership is derived from career XP. It is not stored as a separate flag.

When a career rank changes, Townstead checks the thresholds again. A newly completed Combo Skill:

- appears on every involved career section;
- records a learned-craft Chronicle event;
- shows an unlock message to a player;
- contributes its grants to the shared capability resolver.

The character does not spend Insight and does not press an Archives stamp. Changing the primary vocation does not affect the result because earlier career ranks remain in the career profile.

## Grants

Combo Skill grants use the ordinary skill grant format:

```json
{
  "grants": [
    {
      "capability": "townstead:cook_xp_flat",
      "op": "add",
      "value": 1
    },
    {
      "capability": "townstead:butcher_xp_flat",
      "op": "add",
      "value": 1
    }
  ]
}
```

The example improves both careers without merging their XP tracks. See [Skills And Paths](/careers/skill/grants-and-powers/#passive-grants) for all grant fields and operations.

## Choosing The Right Mechanism

| Goal | Use |
| --- | --- |
| Offer several techniques inside one profession | A skill path |
| Require earlier experience before a profession can be acquired | A gated career with Pheno requirements |
| Reward ranks in two or more independent careers | A Combo Skill |
| Change the display name for one complete skill build | A title |

Keeping these mechanisms separate preserves one XP history per career and avoids hardcoded cross-product professions.

## Diagnostics

A malformed Combo Skill is skipped and logged. The `professions` object must contain two or more valid career IDs, and each value must be a rank of 1 or greater.

The loader applies `mods` before parsing. An unmet gate removes the Combo Skill for that session.
