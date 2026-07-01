---
title: Structure
description: How Pheno nodes, domains, selectors, values, context, and validation fit together.
---

Pheno data is made of typed nodes. Most nodes are JSON objects with a `type` field, such as `pheno:health`, `pheno:heal`, or `pheno:environment`.

Each node belongs to a domain. A field that expects an action cannot accept a condition, and a field that expects a block action cannot accept an entity action.

| Domain | Used For |
| --- | --- |
| Action | Does something, including wrappers and control flow. |
| Condition | Filters or gates the current entity context by returning true or false. |
| Bi-entity condition | Filters or gates a relationship between an actor and a target. |
| Block action | Actions at a block position. |
| Item action | Actions against an item stack. |
| Value | Runtime numeric values. |
| Capability | Effective flags and numeric modifiers resolved from registered sources. |

A condition is a filter: it does not choose a new target by itself, it decides whether the current context passes. A selector chooses one or more targets, blocks, item stacks, or places from the current context. An action can then run on the current context or on the selected results.

## Context

Pheno actions, conditions, selectors, and values all read context. The common context has an actor entity, sometimes another target entity, and sometimes a block or item focus. See [Context](/pheno/context/) for the full reference.

For example, an action can use `on` to select a new focus:

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

The ray selector chooses a target. The damage action then runs on that selected target, while the original actor remains available as context.

Context wrappers change where an inner action runs:

| Wrapper | Effect |
| --- | --- |
| `pheno:actor_action` | Runs the inner action on the actor. |
| `pheno:target_action` | Runs the inner action on the other entity. |
| `pheno:invert` | Swaps actor and target for the inner action. |
| `pheno:block_action` | Bridges from an entity action to a block action. |
| `pheno:equipped_item_action` | Runs an item action on equipped gear. |

Authoring shortcuts can lower into these wrappers. For example, a `with` block can target `self`, `target`, `held_item`, `offhand`, `block_here`, or `block_below`, then normalize to the matching canonical node.

## Conditions And Actions

Conditions usually appear under `when` or `condition`. Actions usually appear under `do` or `action`.

```json
{
  "when": {
    "type": "pheno:health",
    "max": 10
  },
  "do": {
    "type": "pheno:heal",
    "amount": 4
  }
}
```

Here `when` filters the current context. If the condition passes, `do` runs the action.

## Selectors And Values

Selectors choose things from the current context. Entity selectors choose living things, block selectors choose block positions, and item selectors choose item stacks. Selector fields often appear as `on`, `blocks`, or `where`, depending on the domain.

Values calculate numbers from the current context. A value can be a fixed number, or it can read the world at runtime, such as counting selected entities.

Readable units are accepted where a field schema supports them:

```json
{
  "cooldown": "3s",
  "chance": "50%"
}
```

Durations normalize to ticks. Percentages normalize to fractions.

## Validation

Pheno validation checks typed child slots against the live registries. Unknown action, condition, block-action, item-action, and bi-entity condition types are reported with a JSON path and a suggestion.

Field validation is driven by Townstead's generated field metadata and is intentionally partial. Types without generated field metadata may still parse and run; they just do not yet have full generated field documentation.
