---
title: Examples
description: Practical Pheno patterns for combining conditions, actions, selectors, values, resources, collections, blocks, and items.
---

These examples use real Pheno definitions and effects. In a real data file, the surrounding gene, reaction, profession, or other system decides where the Pheno block goes. Placeholder ids such as `my_pack:focus`, `my_pack:phantom_mode`, and `my_pack:marked_targets` need matching pack data before those examples have state to read or change.

Nested Pheno objects do not include their own schema.

## Branch On A Condition

Use `pheno:if_else` when one entity condition decides which action runs.

```json
{
  "type": "pheno:if_else",
  "condition": {
    "type": "pheno:submerged_in"
  },
  "if_action": {
    "type": "pheno:gain_air",
    "air": 40
  },
  "else_action": {
    "type": "pheno:apply_effect",
    "effect": "minecraft:slowness",
    "duration": 60,
    "amplifier": 0
  }
}
```

## Act On Whatever The Entity Is Aiming At

Use `on` with `pheno:ray` to retarget an action to the first living entity hit by the ray. The selected entity becomes the inner action's actor.

```json
{
  "type": "pheno:damage",
  "amount": 4,
  "on": {
    "type": "pheno:ray",
    "distance": 12
  }
}
```

For a piercing ray, set `pierce` to `true`.

```json
{
  "type": "pheno:apply_effect",
  "effect": "minecraft:glowing",
  "duration": 100,
  "on": {
    "type": "pheno:ray",
    "distance": 16,
    "pierce": true
  }
}
```

## Gate A Targeted Action With A Bi-Entity Condition

Use `pheno:if_bientity` when the relationship between actor and target matters. In this example, the action only runs if the actor can see the target.

```json
{
  "type": "pheno:if_bientity",
  "condition": {
    "type": "pheno:can_see"
  },
  "if_action": {
    "type": "pheno:target_action",
    "action": {
      "type": "pheno:damage",
      "amount": 3
    }
  }
}
```

## Count Nearby Entities Into A Value

Some action fields accept Pheno values. `pheno:count` counts selected entities and returns a number.

```json
{
  "type": "pheno:heal",
  "amount": {
    "type": "pheno:count",
    "on": {
      "radius": 6,
      "where": {
        "type": "pheno:entity_type",
        "entity_type": "minecraft:villager"
      }
    }
  }
}
```

## Spend A Resource Before Acting

Use a resource condition to check the current value, then change the resource and run the effect in sequence.

```json
{
  "type": "pheno:if_else",
  "condition": {
    "type": "pheno:resource",
    "resource": "my_pack:focus",
    "min": 5
  },
  "if_action": {
    "type": "pheno:and",
    "actions": [
      {
        "type": "pheno:change_resource",
        "resource": "my_pack:focus",
        "operation": "subtract",
        "amount": 5
      },
      {
        "type": "pheno:jump",
        "strength": 1.4
      }
    ]
  }
}
```

## Check A Toggle Gene

`pheno:toggled` reads another toggle gene's state. This is useful for powers that only operate while a mode is on.

```json
{
  "type": "pheno:if_else",
  "condition": {
    "type": "pheno:toggled",
    "gene": "my_pack:phantom_mode"
  },
  "if_action": {
    "type": "pheno:set_no_gravity",
    "gravity": false
  },
  "else_action": {
    "type": "pheno:set_no_gravity",
    "gravity": true
  }
}
```

## Remember A Target In A Collection

`pheno:change_collection` stores the contextual target in the actor's collection. This example damages a ray target and remembers it for one minute.

```json
{
  "type": "pheno:and",
  "actions": [
    {
      "type": "pheno:target_action",
      "action": {
        "type": "pheno:damage",
        "amount": 2
      }
    },
    {
      "type": "pheno:change_collection",
      "collection": "my_pack:marked_targets",
      "operation": "add",
      "time_limit": 1200
    }
  ],
  "on": {
    "type": "pheno:ray",
    "distance": 10
  }
}
```

## Act On Every Remembered Target

Use `pheno:for_each` to run an action against live entity members stored in a collection. The collection holder stays the actor and the member becomes `other`.

```json
{
  "type": "pheno:for_each",
  "in": "my_pack:marked_targets",
  "where": {
    "type": "pheno:distance",
    "max": 24
  },
  "do": {
    "type": "pheno:target_action",
    "action": {
      "type": "pheno:apply_effect",
      "effect": "minecraft:glowing",
      "duration": 80
    }
  },
  "limit": 5,
  "order": "newest_first"
}
```

## Run A Block Action Where The Entity Is Looking

Use `pheno:at` to bridge from an entity action into a block action.

```json
{
  "type": "pheno:at",
  "blocks": {
    "type": "pheno:ray",
    "distance": 8
  },
  "do": {
    "type": "pheno:set_block",
    "block": "minecraft:fire"
  }
}
```

## Affect A Small Block Region

Block actions can select more block positions through their own `on` field, or use `pheno:area_of_effect`.

```json
{
  "type": "pheno:block_action",
  "block_action": {
    "type": "pheno:area_of_effect",
    "radius": 2,
    "shape": "sphere",
    "block_condition": {
      "type": "pheno:in_tag",
      "tag": "minecraft:crops"
    },
    "block_action": {
      "type": "pheno:bonemeal"
    }
  }
}
```

## Damage An Equipped Item

`pheno:equipped_item_action` bridges from an entity action into an item action. Here the main-hand item takes durability damage.

```json
{
  "type": "pheno:equipped_item_action",
  "slot": "mainhand",
  "item_action": {
    "type": "pheno:damage",
    "amount": 1
  }
}
```

## Consume Matching Inventory Items

Item action `on` can select inventory stacks, with an optional item condition.

```json
{
  "type": "pheno:equipped_item_action",
  "slot": "mainhand",
  "item_action": {
    "type": "pheno:consume",
    "amount": 1,
    "on": {
      "where": {
        "type": "pheno:ingredient",
        "item": "minecraft:bread"
      }
    }
  }
}
```

This pattern selects from the holder's player inventory. It returns no stacks for non-player holders.

## Combine Environment Checks

`pheno:environment` is a compact way to combine common world checks. Present categories are ANDed; list values inside one category are ORed.

```json
{
  "type": "pheno:environment",
  "exposure": ["sky", "snow"],
  "time": "day",
  "dimension": "minecraft:overworld"
}
```

## Check The Entity's Root

Use `pheno:root` to check the entity's current root id.

```json
{
  "type": "pheno:root",
  "root": "townstead_roots:overworlder"
}
```
