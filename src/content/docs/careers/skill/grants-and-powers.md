---
title: Grants And Powers
description: Passive capability grants and Pheno powers on a learned skill.
---

A skill changes a character through two fields. `grants` adds passive capabilities. `power` adds one Pheno component.

## Passive Grants

Each grant adds a value to one of Pheno's shared capabilities:

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
| `capability` |  | Required. The capability ID. |
| `flag` | `false` | When `true`, the grant is a boolean. |
| `op` | `add` | `add`, `multiply`, `min`, `max`, `replace`, `set`, or `deny`. |
| `value` | `0` | The number. For `multiply`, the default is `1`. |
| `priority` | `0` | The priority of this value when Pheno combines the values of a capability. |
| `stacking_group` |  | Optional stacking group. |
| `exclusivity_group` |  | Optional exclusivity group for the capability. |

The Career record makes its effect lines from these fields. Write a clear description, but do not put an important number only in the description.

### Career XP Grants

Townstead reads two capability IDs for each career:

```text
townstead:<career_path>_xp_flat
townstead:<career_path>_xp_per_tier
```

`_xp_flat` adds XP once for each completed task. `_xp_per_tier` adds XP for each point of the work magnitude of the task. Before Townstead applies the daily cap, the XP for a task is always at least 1.

## Pheno Powers

`power` accepts one registered Pheno component. Skills can use the same powers as genes.

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

If the power is unknown or malformed, Townstead ignores the power and reports a diagnostic. Townstead keeps the skill, because characters keep the skills that they learned.

For the component types, see [Pheno Actions](/pheno/actions/) and [Pheno Conditions](/pheno/conditions/).
