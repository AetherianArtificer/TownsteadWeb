---
title: Skills And Paths
description: Define career skills, prerequisites, capabilities, active abilities, and specialisation paths.
---

A skill is an option that a character learns in one career. A skill can give passive capabilities and a Pheno power. It can also be part of a path or a title.

These pages describe skills:

- [Learning Rules](/careers/skill/learning/)
- [Grants And Powers](/careers/skill/grants-and-powers/)
- [Paths](/careers/skill/paths/)
- [Paths And Titles](/careers/profession/paths-and-titles/), for the presentation fields of `path.json` and the titles that a build earns

## File Location

Put the Skill files of a Path in the Path directory:

```text
data/<namespace>/profession/<career>/path/<path>/skill/<skill>.json
```

For example, this file:

```text
data/example/profession/beekeeper/path/hive_keeper/skill/gentle_hands.json
```

defines the Skill `example:beekeeper/hive_keeper/gentle_hands`. Townstead gets the Profession and the Path of the Skill from its location.

A Skill for the whole Profession can go in `profession/<career>/skill/<skill>.json`. Its ID is `<namespace>:<career>/<skill>`, and it is not on a Path. Do not put Path Skills there and then list them in a Path.

## Minimal Skill

```json
{
  "schema": "townstead:skill/v1",
  "display_name": { "text": "Gentle Hands" },
  "description": { "text": "Gather from the hive without wasting the comb." },
  "icon": "minecraft:honeycomb",
  "cost": 1,
  "grants": [
    {
      "capability": "example:beekeeper_xp_flat",
      "op": "add",
      "value": 1
    }
  ]
}
```

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Use `townstead:skill/v1`. |
| `display_name` | No | Minecraft text component. The default is the skill path. |
| `description` | No | Minecraft text component. The Career record shows it. |
| `profession` | From location | The ID of the Career that owns the skill. Do not set it in a Skill file in a directory. |
| `tier` | From location | The level of the Path sets the tier. Set it only for a Skill for the whole Profession. `level` is an alias. |
| `cost` | No | Skill-point cost. The default is `1`. |
| `requires` | No | Skills that a character must learn first. All of them are required. |
| `exclusive_with` | No | Skills that a character cannot learn with this skill. |
| `evidence` | No | Recorded deeds that a character must do before they can learn the skill. See [Evidence](/careers/skill/learning/#evidence). |
| `skill_group` | No | A group of skills. Only one learned skill in the group can be active at a time. |
| `grants` | No | Passive capabilities that the skill adds. |
| `power` | No | One complete Pheno component. |
| `animation` | No | The ID of an animation intent. It is not a model transform. |
| `icon` | No | Resource ID for the Career record. |
| `mods` | No | Townstead loads this skill only when the mod expression passes. |

In `requires` and `exclusive_with`, a short name refers to a skill in the same `skill/` directory. For a skill on a different Path or at the Profession root, use `<path>/<skill>`. For a skill of a different Profession, use its full ID with the namespace.

## Validation

`/pheno validate` reports:

- an unknown owning profession;
- a Path level above the highest rank of the Profession;
- a Skill that is on more than one Path;
- a missing prerequisite;
- a prerequisite from a different career, as a warning;
- a skill that both requires and excludes the same skill;
- an unknown reference in `exclusive_with`;
- a prerequisite cycle;
- an invalid grant or power type.
