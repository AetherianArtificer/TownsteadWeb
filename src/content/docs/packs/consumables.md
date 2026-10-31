---
title: Consumables
description: Give food and drink items need effects, and set how villagers and players consume them.
---

A consumable file gives an item [Pheno](/pheno/actions/) effects when a villager eats or drinks it, such as hydration, energy, or warmth. It can also set who may consume the item, how many servings it has, and what is left over.

Put each consumable in `data/<namespace>/consumable/<name>.json`.

## Example

This consumable makes chocolate give villagers energy:

```json
{
  "schema": "townstead:consumable/v2",
  "items": ["#examplepack:chocolate"],
  "effects": { "type": "pheno:energize", "amount": 2 }
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | `townstead:consumable/v2`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `items` | | Required. Item IDs or `#tags`. |
| `effects` | | Optional. A Pheno action that runs on the villager who consumes the item. A file without `effects` or a `transaction` does nothing. |
| `requires` | | Optional [Pheno condition](/pheno/conditions/) on the consumer. A villager who fails it does not consume the item. |
| `fallback` | `false` | With `true`, Townstead uses this file only when the thirst mod has no value for the item. See [Fallback Hydration](#fallback-hydration). |
| `transaction` | | Optional. Who may consume the item, and how. See [Transactions](#transactions). |

Townstead still loads older files with `townstead:consumable/v1`, or with no `schema`. A v1 file needs `effects` and cannot have a `transaction`. To update a v1 file, change its `schema` to `townstead:consumable/v2`. Nothing else changes.

When an item matches more than one file, Townstead uses a file that names the exact item before a file that matches by tag. When two files name the same item or the same tag for the same consumers, Townstead rejects the later file and logs a warning.

## Need Effects

Villagers read the `effects` to know what an item does for them before they choose it. They can read these actions, with plain numbers, when the actions are not inside a condition:

| Action | Effect |
| --- | --- |
| `pheno:hydrate` | Restores thirst, with `immediate` and `lasting` amounts. |
| `pheno:energize` | Restores energy by `amount`. |
| `pheno:warm`, `pheno:cool` | Changes body temperature by `amount` °C, now or over `duration` ticks. |

Put several effects in a list or in `pheno:and`. Townstead runs the whole action when the item is consumed, including parts inside conditions. But a villager does not choose an item because of an effect inside a condition, or an amount that is a Pheno value.

## Fallback Hydration

A thirst mod often has its own hydration value for drinks. A file with `"fallback": true` gives hydration only for items that the thirst mod does not know. Use it to give hydration to drinks from other mods without overriding the thirst mod.

A fallback file can contain only hydration. Townstead rejects a fallback file with other effects, such as energy.

## Transactions

A `transaction` sets who may consume the item and how. Use it for drinks with a special effect or a container, such as a mug of beer.

```json
{
  "schema": "townstead:consumable/v2",
  "mods": ["examplemod"],
  "items": ["#examplemod:beers"],
  "requires": { "type": "pheno:life_stage", "stage": "adult" },
  "effects": { "type": "pheno:add_state", "state": "examplepack:tipsy", "amount": 20, "duration": 6000 },
  "transaction": {
    "mode": "replace_with_pheno",
    "accounting": "consume_one",
    "consumers": ["villager"],
    "remainder": { "mode": "item", "item": "examplemod:beer_mug", "destination": "source" },
    "effect_admission": { "default": "deny" }
  }
}
```

| Field | Default | Description |
| --- | --- | --- |
| `mode` | `observe_native` | `replace_with_pheno`: Townstead runs the `effects` in place of the item's own behaviour. `observe_native`: the item keeps its own behaviour. |
| `accounting` | `consume_one` | `consume_one`: one item is used. `native_result`: the item's own behaviour decides what is used. |
| `consumers` | all | `villager`, `player`, `other_living`, or a list. The file applies only to these consumers. |
| `servings` | `1` | The number of portions on a [serving plate](/guides/cooking/). |
| `remainder` | | What is left after the item is consumed. See below. |
| `effect_admission` | | Which of the item's own effects still apply to a villager. See below. |

### Villagers

A villager consumes an item with a `transaction` only when `consumers` includes `villager` and `mode` is `replace_with_pheno`. Otherwise, Townstead does not let villagers consume the item.

### Remainder

| Field | Default | Description |
| --- | --- | --- |
| `mode` | `native` | `native`: the item's own leftover, such as a glass bottle. `item`: the item in `item`. `none`: nothing. |
| `item` | | The leftover item, with mode `item` only. |
| `destination` | `source` | Where the leftover goes: `source` (back where the item came from), `storage`, `holder` (the consumer's inventory), or `drop`. |

### Effect Admission

With `replace_with_pheno`, Townstead also applies some of the item's own effects to a villager. `effect_admission` sets which ones:

| Field | Description |
| --- | --- |
| `default` | `allow` or `deny`. The decision for each effect class that is not in `allow` or `deny`. The default is `allow`. |
| `allow`, `deny` | Lists of effect classes. |

Townstead uses three effect classes for villagers: `status` (the item's status effects), `attribute` (changes to attributes, such as the energy of coffee), and `teleport` (such as chorus fruit). With `"default": "deny"`, the item gives only the `effects` in the file.

### Players

Players eat and drink items in the usual way, and the item keeps its own behaviour. A transaction for `player` applies only when a player takes a portion from a serving plate. For players, Townstead supports only the `observe_native` mode, `consume_one` accounting, and the remainder destinations `source`, `holder`, and `drop`.
