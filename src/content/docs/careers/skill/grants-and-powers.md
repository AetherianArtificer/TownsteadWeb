---
title: Grants And Powers
description: Passive capability grants and Pheno powers on a learned skill.
---

A skill changes the character through two fields. `grants` feeds the shared capability resolver; `power` attaches one Pheno component.

## Passive Grants

Each grant contributes to Pheno's shared capability resolver:

```json
{
  "grants": [
    {
      "capability": "example:honey_yield",
      "op": "multiply",
      "value": 1.25,
      "priority": 10,
      "stacking_group": "example:beekeeper_tools"
    },
    {
      "capability": "example:can_handle_royal_jelly",
      "flag": true
    }
  ]
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `capability` |  | Required capability ID. |
| `flag` | `false` | Makes this a boolean grant when true. |
| `op` | `add` | `add`, `multiply`, `min`, `max`, `replace`, `set`, or `deny`. |
| `value` | `0` | Numeric operand. A multiply grant defaults to `1`. |
| `priority` | `0` | Contribution priority in the capability resolver. |
| `stacking_group` |  | Optional stacking group. |
| `exclusivity_group` |  | Optional capability-level exclusivity group. |

The Career record derives effect lines from these fields. Keep the description readable, but do not hide an important numeric effect only in prose.

### Career XP Grants

The progression service recognizes two capability IDs for each career path:

```text
townstead:<career_path>_xp_flat
townstead:<career_path>_xp_per_tier
```

`_xp_flat` adds XP once per completed task. `_xp_per_tier` adds XP for each point of the task's work magnitude. The requested award is never less than 1 XP before the daily cap is applied.

## Pheno Powers

`power` accepts one registered Pheno component. The same power vocabulary used by genes is available to skills.

```json
{
  "power": {
    "type": "pheno:active_ability",
    "cooldown": 200,
    "resource_cost": {
      "resource": "townstead:stamina",
      "amount": 10
    },
    "action": {
      "type": "pheno:apply_effect",
      "effect": "minecraft:speed",
      "duration": 100,
      "amplifier": 0
    }
  }
}
```

An unknown or malformed power drops the power and reports a diagnostic. It does not drop the skill, because the learned skill ID is durable history.

Use [Pheno Actions](/pheno/actions/) and [Pheno Conditions](/pheno/conditions/) for the component vocabulary.
