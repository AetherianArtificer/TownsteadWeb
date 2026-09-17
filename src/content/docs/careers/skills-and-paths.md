---
title: Skills And Paths
description: Define career skills, prerequisites, capabilities, active abilities, and specialisation paths.
---

A skill is a learned option owned by one career. It can contribute passive capabilities, provide a Pheno power, and participate in a path or title.

Skills are described across these pages:

- [Learning Rules](/careers/skill/learning/)
- [Grants And Powers](/careers/skill/grants-and-powers/)
- [Paths](/careers/skill/paths/)
- [Paths And Titles](/careers/profession/paths-and-titles/) for `path.json` presentation fields and the titles a build earns

## File Location

Place a Path's Skill files inside the Path directory:

```text
data/<namespace>/profession/<career>/path/<path>/skill/<skill>.json
```

This file:

```text
data/example/profession/beekeeper/path/hive_keeper/skill/gentle_hands.json
```

defines the Skill `example:beekeeper/hive_keeper/gentle_hands`. Townstead derives both its Profession and its Path scope from the location.

A genuinely Profession-wide Skill can live at `profession/<career>/skill/<skill>.json`, where its ID is `<namespace>:<career>/<skill>`. Such a Skill belongs to no Path. Do not put Path-owned Skills there and repeat their membership elsewhere.

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
| `display_name` | No | Minecraft text component. Defaults to the skill path. |
| `description` | No | Minecraft text component shown on the Career record. |
| `profession` | Derived | Owning Career ID. Do not repeat it in a directory-form Skill. |
| `tier` | Derived | The containing Path level supplies the tier. Set it directly only for a Profession-wide Skill. `level` is an alias. |
| `cost` | No | Skill-point cost. Defaults to `1`. |
| `requires` | No | Skills that must all be learned first. |
| `exclusive_with` | No | Skills that cannot be learned with this skill. |
| `evidence` | No | Recorded deeds required before the skill can be learned. See [Evidence](/careers/skill/learning/#evidence). |
| `skill_group` | No | Active-expression group. At most one learned skill in the group is equipped. |
| `grants` | No | Passive capability contributions. |
| `power` | No | One complete Pheno component. |
| `animation` | No | Semantic animation intent ID. It is not a model transform. |
| `icon` | No | Resource ID used by the Career record. |
| `mods` | No | Loads this skill only when the mod expression passes. |

Bare references in `requires` and `exclusive_with` resolve as siblings in the same `skill/` directory. From another Path or the Profession root, use `<path>/<skill>`. Use a full namespaced ID for another Profession.

## Validation

`/pheno validate` reports:

- an unknown owning profession;
- a Path level above the Profession's maximum rank;
- a Skill claimed by more than one Path;
- a missing prerequisite;
- a cross-career prerequisite warning;
- a skill that both requires and excludes the same skill;
- an unknown exclusivity reference;
- a prerequisite cycle;
- an invalid grant or power type.
