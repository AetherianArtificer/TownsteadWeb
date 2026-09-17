---
title: Targets And Scope
description: Narrow a work task with target sets, allow and deny rules, search scope, and requirements.
---

Every field on a work task narrows what its engine may use. None of them can make an engine operate a target its own code rejects.

## Target Sets

Target fields accept resource IDs and `#tag` references:

```json
{
  "workstations": ["minecraft:furnace", "#example:ovens"],
  "entities": ["minecraft:cow", "#example:livestock"],
  "recipes": ["example:honey_cake", "#example:baked_goods"]
}
```

For `recipes`, a plain resource ID can match either the recipe ID or the output item ID. A tag matches the output item's tags.

Recipe and input filters also accept classification tokens:

| Token | Matches |
| --- | --- |
| `edible` | Any food output. |
| `weapon` | Swords, axes, tridents, maces, and compatible modded subclasses. |
| `armor` | Armour and shields. |
| `tool` | Digging tools, shears, flint and steel, and brushes. |
| `block` | Placeable block items. |
| `ranged` | Projectile weapons and arrows. |
| `navigation` | Maps, compasses, and spyglasses. |
| `book` | Books, writable books, written books, and enchanted books. |

Classification is useful when the item class is more reliable than a tag. Tags remain the extension point for unusual items.

## Allow And Deny Rules

An empty allow set accepts the engine's complete default set. A non-empty allow set narrows it.

Deny rules are checked first:

```json
{
  "recipes": ["edible"],
  "deny_recipes": ["minecraft:rotten_flesh"]
}
```

The example admits food except rotten flesh.

Input filters solve a different problem. They classify the raw material rather than the result:

```json
{
  "type": "townstead_work:smoke",
  "workstations": ["#townstead:smoker_stations"],
  "recipe_inputs": ["#townstead:butcher_smoker_input"]
}
```

This prevents a shared smoker from making every smeltable output part of the Butcher's work.

## Search Scope

| Scope | Search area |
| --- | --- |
| `worksite` | Only the assigned workplace. This is the default and the least expensive search. |
| `nearby` | The workplace and its immediate surroundings. |
| `village` | Recognized buildings across the village. |

Use the narrowest scope that reaches the intended stations. A village-wide search costs more and can make a worker claim a machine that belongs to another room.

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

The exact condition must be registered. A malformed condition refuses the task instead of making it unconditional.
