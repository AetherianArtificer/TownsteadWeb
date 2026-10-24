---
title: Combo Skills
description: Grant automatic benefits when a character reaches ranks in several careers.
---

A Combo Skill connects two or more careers. It needs a minimum rank in each of them. When a character reaches every rank, they get its effects automatically.

Use a Combo Skill for a benefit that comes from experience in different kinds of work. Do not make a child profession only to show a combination.

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
| `display_name` | No | Minecraft text component. The default is the resource path. |
| `description` | No | Minecraft text component. The Career record shows it. |
| `icon` | No | Resource ID for the Career record. |
| `professions` | Yes | Career IDs mapped to minimum ranks. It must have at least two careers. |
| `grants` | No | Passive capabilities, in the same format as for usual skills. |
| `mods` | No | Townstead loads this Combo Skill only when the mod expression passes. |

Each rank must be at least 1. A definition with one career is malformed, because a usual skill already does that.

## Unlock Behaviour

Townstead decides from career XP whether a character has a Combo Skill. It does not save a separate flag.

When a career rank changes, Townstead checks the ranks again. When a character gets a new Combo Skill:

- the Combo Skill shows in the section of each career that it needs;
- Townstead records a learned-craft Chronicle event;
- a player sees an unlock message;
- the character gets its grants.

The character does not spend Insight, and does not get an Archives stamp. A change of primary vocation has no effect, because the career profile keeps the earlier career ranks.

## Grants

Combo Skill grants use the usual skill grant format:

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

The example gives more XP in both careers, but keeps their XP separate. For all grant fields and operations, see [Grants And Powers](/careers/skill/grants-and-powers/#passive-grants).

## Choosing The Right Mechanism

| Goal | Use |
| --- | --- |
| Offer several techniques in one profession | A skill path |
| Require earlier experience before a character can acquire a profession | A gated career with Pheno requirements |
| Reward ranks in two or more separate careers | A Combo Skill |
| Change the displayed name for one complete skill build | A title |

With these mechanisms kept separate, each career has one XP history, and you do not need a profession for each combination.

## Diagnostics

Townstead skips and logs a malformed Combo Skill. The `professions` object must have two or more valid career IDs, and each value must be a rank of 1 or more.

Townstead checks `mods` before it reads the rest of the file. When the gate is not met, Townstead removes the Combo Skill for that session.
