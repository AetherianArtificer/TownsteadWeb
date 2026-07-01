---
title: Context
description: How Pheno decides what the current actor, target, origin, block, or item is.
---

Pheno runs inside a context. Context answers questions like "who is this action acting on?", "is there a target?", "where is this block action happening?", and "which item stack is being changed?"

Most pack files do not create context directly. The surrounding system creates it, then Pheno nodes can preserve, shift, or bridge that context.

The same context can be used in different ways. Conditions filter it, selectors choose from it, values measure it, and actions change something in it. For example, a condition might ask whether the current entity is hungry, while a selector might choose nearby entities, and an action might feed whichever entity is currently in focus.

For example, suppose a player uses an ability that damages whatever they are looking at:

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

Before `on` runs, the player is the current focus. The ray selector chooses a target. While the damage action runs, the selected target becomes the current focus, the player becomes `other`, and `origin` still points back to the player who started the ability.

## Entity Context

Entity actions and entity conditions run against one current living thing. In the code this is the context `entity`; in selectors and docs it is usually called `self`, `actor`, or the current focus.

| Term | Meaning |
| --- | --- |
| `entity` | The current focus for an action or condition. Most entity actions change this. Most entity conditions test this. |
| `other` | Optional counterpart for two-entity situations, such as attacker/victim, actor/target, or collection holder/member. |
| `origin` | The original bearer that started the action flow. Entity action `on` preserves this when it moves focus to a selected entity. |
| `level` | The Minecraft level read from the current entity. |
| `pos` | The current entity's block position for conditions, or precise position for selectors. |

When there is no target, `other` is absent. Nodes that need `other`, such as `pheno:target_action`, `pheno:mount`, or most bi-entity conditions, do nothing or fail when it is absent.

## Selector Roles

Entity selectors use role names to resolve context entities.

| Role | Resolves To |
| --- | --- |
| `self`, `each`, `it` | The current focus entity. |
| `origin`, `bearer`, `actor` | The original bearer. |
| `attacker`, `target`, `other`, `victim`, `counterpart` | The contextual counterpart, when one exists. |

These are selector roles, not literal target words for commands. For example, `self` is meaningful inside a Pheno selector, while Minecraft commands use command selectors such as `@s` and `@e`.

Selector roles do not test anything by themselves. They point at an entity from the current context. Conditions can then filter that entity, and actions can run on it.

## Retargeting With `on`

An entity action object can include `on` to run that action once per selected entity. The `on` field is a selector slot: it chooses the entities that become the action's temporary focus.

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

For each selected entity:

| Context Part | Becomes |
| --- | --- |
| `entity` / `self` | The selected entity. |
| `other` | The previous current entity. |
| `origin` | The original bearer, unchanged. |

That means a ray-targeted action damages the thing hit by the ray, while still remembering who fired it.

## Actor And Target Wrappers

Wrappers are explicit context moves.

| Wrapper | Effect |
| --- | --- |
| `pheno:actor_action` | Runs the nested action on the current actor. Mostly useful for symmetry in two-entity flows. |
| `pheno:target_action` | Runs the nested action on `other`, with the current entity becoming the new `other`. No-op without `other`. |
| `pheno:invert` | Swaps the current entity and `other` for the nested action. No-op without `other`. |

`pheno:actor_action` is a pass-through. `pheno:target_action` and entity-action `pheno:invert` create a new two-entity context from the swapped pair.

Bi-entity condition wrappers use the same actor/target idea:

| Wrapper | Effect |
| --- | --- |
| `pheno:actor_condition` | Tests an entity condition on the actor. |
| `pheno:target_condition` | Tests an entity condition on the target. |
| `pheno:both` | Tests an entity condition on both actor and target. |
| `pheno:either` | Tests an entity condition on either actor or target. |
| `pheno:invert` | Swaps actor and target before testing the nested bi-entity condition. |
| `pheno:undirected` | Tests the nested bi-entity condition in either direction. |

## Entity Focus Actions

Some actions move focus by creating a new entity context for their nested action.

| Action | Nested Context |
| --- | --- |
| `pheno:area_of_effect` | Each nearby living target becomes `entity`; the original actor becomes `other`. The original actor is excluded unless `include_self` is true. |
| `pheno:passenger_action` | Each living passenger becomes `entity`; the current actor becomes `other`. |
| `pheno:riding_action` | The living vehicle becomes `entity`; the current actor becomes `other`. |
| Item-domain `pheno:holder_action` | The item stack holder becomes `entity`. No-op without a holder. |

Field-style actions can also create context. For example, `pheno:cloud` repeatedly runs its nested action on living entities inside the field. If the cloud has an owner, the affected entity becomes `entity`, and the owner is available as the counterpart and origin.

## Block Context

Block actions run with a server level, a block position, and an optional cause.

| Term | Meaning |
| --- | --- |
| `pos` | The block position the block action is operating on. |
| `cause` | Optional entity that triggered the block action. |
| `level` | The server level containing the block. |

`pheno:block_action` bridges from an entity action into a block action at the actor's block position.

`pheno:at` selects block positions from an entity context and runs a block action at each selected position.

Block actions can also include their own `on` selector to move from one block position to more block positions.

## Item Context

Item actions run against one item stack and may have a holder.

| Term | Meaning |
| --- | --- |
| `stack` | The item stack being changed. |
| `holder` | Optional living entity that owns or carries the stack. |

`pheno:equipped_item_action` creates an item context from an entity context by selecting one equipped slot, then running the nested item action on that stack.

Item actions can include `on` to select more item stacks from the holder. Inventory selection only returns stacks for player holders.

## Collections

Collection actions and iteration use context in a few important ways:

| Node | Context Behaviour |
| --- | --- |
| `pheno:change_collection` | Without a literal `key`, the entity-domain action uses `other` as the entry to add, remove, or count. |
| `pheno:for_each` | Keeps the collection holder as the actor and sets each live collection member as `other`. |
| Item-domain `pheno:change_collection` | Stores the current item stack's item id on the holder. |
| Block-domain `pheno:change_collection` | Stores the current block position on the cause entity. |

## Practical Rule

Read a Pheno block from the outside in:

1. Start with the context provided by the surrounding gene, reaction, command, or system.
2. Apply `on` selectors and wrappers in order.
3. Read the innermost action or condition against the context that reaches it.

If a node mentions a target, counterpart, holder, or cause, check which wrapper or surrounding system creates that part of context.
