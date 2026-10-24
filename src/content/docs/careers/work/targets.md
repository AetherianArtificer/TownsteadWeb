---
title: Targets And Scope
description: Narrow a work task with target sets, allow and deny rules, search scope, and requirements.
---

Each field of a work task limits what its engine can use. No field can make an engine use a target that its code rejects.

## Target Sets

Target fields accept resource IDs and `#tag` references:

```json
{
  "workstations": ["minecraft:furnace", "#example:ovens"],
  "entities": ["minecraft:cow", "#example:livestock"],
  "recipes": ["example:honey_cake", "#example:baked_goods"]
}
```

In `recipes`, a resource ID matches the recipe ID or the output item ID. A tag matches the tags of the output item.

Recipe and input filters also accept classification tokens:

| Token | Matches |
| --- | --- |
| `edible` | Any food output. |
| `weapon` | Swords, axes, tridents, maces, and modded items of the same kinds. |
| `armor` | Armour and shields. |
| `tool` | Digging tools, shears, flint and steel, and brushes. |
| `block` | Block items that a player can place. |
| `ranged` | Projectile weapons and arrows. |
| `navigation` | Maps, compasses, and spyglasses. |
| `book` | Books, writable books, written books, and enchanted books. |

Use a token when the kind of item is easier to match than a tag. Use tags for unusual items.

## Allow And Deny Rules

An empty allow list accepts all of the default targets of the engine. A list with entries limits them.

Townstead checks deny rules first:

```json
{
  "recipes": ["edible"],
  "deny_recipes": ["minecraft:rotten_flesh"]
}
```

The example accepts all food except rotten flesh.

Input filters check the ingredients, not the result:

```json
{
  "type": "townstead_work:smoke",
  "workstations": ["#townstead:smoker_stations"],
  "recipe_inputs": ["#townstead:butcher_smoker_input"]
}
```

With this filter, the Butcher does not make every output of a shared smoker.

## Search Scope

| Scope | Search area |
| --- | --- |
| `worksite` | Only the assigned workplace. This is the default, and the fastest search. |
| `nearby` | The workplace and the area just around it. |
| `village` | All recognised buildings in the village. |

Use the smallest scope that reaches the stations. A search of the whole village is slower, and a worker can then claim a machine in a different room.

## Requirements

A task can use any Pheno condition:

```json
{
  "type": "townstead_work:craft",
  "requirements": {
    "type": "pheno:profession",
    "profession": "example:beekeeper"
  }
}
```

The condition type must be registered. If the condition is malformed, Townstead rejects the task. The task does not become available without a condition.
