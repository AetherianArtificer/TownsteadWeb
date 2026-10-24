---
title: Gift Reactions
description: Change how villagers take particular gifts, with Pheno conditions and actions.
---

A gift reaction changes how a villager takes a gift. Use a gift reaction when a villager must love, like, or hate an item for a reason that MCA gift files cannot test, or when a gift must do something more than change hearts.

Put each gift reaction in `data/<namespace>/gift_reaction/<name>.json`.

## How Townstead Chooses

When a player gives a villager an item, Townstead does these steps:

1. If the villager is a Persona, Townstead checks the Persona's [`gifts`](/stories/persona-files/#gifts) rules.
2. Townstead checks the gift reactions, from the highest `priority` to the lowest.
3. Townstead uses the first rule where the item matches `items` and the `condition` passes.
4. If no rule matches, the villager takes the gift as an ordinary MCA gift.

## Example

This gift reaction makes a werebear hate silver. The werebear hands the item back, loses trust in the player, and takes a slowness effect.

```json
{
  "schema": "townstead:gift_reaction/v1",
  "priority": 50,
  "items": ["#examplepack:silver"],
  "condition": { "type": "pheno:state", "state": "examplepack:werebear", "min": 1 },
  "response": "dislikes",
  "satisfaction": -60,
  "item": "return",
  "relationship": { "townstead:trust": -10, "townstead:resentment": 15 },
  "action": { "type": "pheno:apply_effect", "effect": "minecraft:slowness", "duration": 200 }
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:gift_reaction/v1`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `priority` | `0` | Townstead checks higher numbers first. |
| `items` | | Required. Item IDs or `#tags`. An ID can name a potion, such as `minecraft:potion[potion=minecraft:water]` for a water bottle. |
| `condition` | | Optional [Pheno condition](/pheno/conditions/). The villager is the entity, and the player is `other`. |
| `response` | `likes` | `loves`, `likes`, `dislikes`, or `neutral`. See [Responses](#responses). |
| `satisfaction` | from `response` | Hearts and mood, as for an MCA gift. The default is 30 for `loves`, 15 for `likes`, -15 for `dislikes`, and 0 for `neutral`. |
| `item` | from `response` | `keep`, `use`, or `return`. See [The Item](#the-item). |
| `relationship` | | Changes to [relationship qualities](/guides/relationships/), such as `{"townstead:affection": 5}`. |
| `action` | | Optional [Pheno action](/pheno/actions/). The villager is the entity, the player is `other`, and the gift is the item in focus. |
| `knot` | | Optional Ink knot that answers the gift. It can read the variable `gift_item`, the gift's name in the player's language. Townstead uses it only when the villager has a story with that knot. |
| `line` | from `response` | Optional translation key for the villager's answer. |
| `first` | | What happens the first time a player gives this villager this kind of gift: `knot`, `line`, and `relationship`. With `"per_item": true`, Townstead counts each kind of item separately. |

## Responses

| `response` | Item default | Hearts default | Particles | Default answer |
| --- | --- | --- | --- | --- |
| `loves` | `keep` | 30 | hearts | MCA's best gift line |
| `likes` | `keep` | 15 | hearts | MCA's good gift line |
| `dislikes` | `return` | -15 | angry | MCA's failed gift line |
| `neutral` | `return` | 0 | none | none |

Use `neutral` when the gift is not a gift in the usual sense, such as a cure or a delivery.

## The Item

| `item` | Result |
| --- | --- |
| `keep` | The villager puts one item in their inventory. If the inventory is full, Townstead does not use this rule. |
| `use` | Townstead removes one item from the player. In Creative mode, the player keeps the item. |
| `return` | The player keeps the item. An action can still take it, for example `pheno:deliver`. |

A kept gift counts toward MCA's gift saturation. When a player gives the same item often, the villager is less pleased each time. This does not apply the first time.

## Deliveries

Some items are deliveries, such as letters, parcels, and quest items. Use the action `pheno:deliver` for them. The mod or system that adds the item reads it and handles the delivery.

```json
{
  "schema": "townstead:gift_reaction/v1",
  "priority": 1000,
  "items": ["examplepack:sealed_letter"],
  "response": "neutral",
  "item": "return",
  "action": { "type": "pheno:deliver" }
}
```

## Timed Changes

A gift can start a change that ends later. Set an [entity state](/pheno/entity-states/) with a `duration`. Then use the state's `on_exit` to make the change when the time ends. Townstead saves the state, so the time continues after a restart.

This gift reaction starts a cure that ends after three minutes:

```json
"action": { "type": "pheno:set_state", "state": "examplepack:curing", "amount": 1, "duration": 3600 }
```

A state effect for `examplepack:curing` then clears the curse in its `on_exit`:

```json
{
  "schema": "pheno:state_effect/v1",
  "state": "examplepack:curing",
  "on_exit": { "type": "pheno:clear_state", "state": "examplepack:werebear" }
}
```

To keep a player from starting the change twice, add a condition that the state is not active.

## Conditions In MCA Gift Files

MCA gift files in `data/<namespace>/gifts/` can also use Pheno. Add a `pheno` key to an entry in `conditions`. MCA adds the `satisfaction_boost` when the Pheno condition passes. The villager is the entity, and the player is `other`.

```json
{
  "items": { "minecraft:honeycomb": 10 },
  "conditions": [
    {
      "pheno": { "type": "pheno:state", "state": "examplepack:werebear", "min": 1 },
      "satisfaction_boost": 25
    }
  ]
}
```

Use an MCA gift file to change only how much a villager likes a gift. Use a gift reaction to also return the item, change relationships, or run an action.
