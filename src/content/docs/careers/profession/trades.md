---
title: Trades
description: Contribute merchant offers to a career or one of its paths.
---

Put merchant offers in files in a `trade/` directory. Do not put them in `profession.json`.

## Trades

Put the general offers of a Profession in separate contribution files:

```text
data/<namespace>/profession/<career>/trade/<contribution>.json
```

Put the offers of one Path next to that Path:

```text
data/<namespace>/profession/<career>/path/<path>/trade/<contribution>.json
```

The directory sets the Profession. The schema is required. The number keys are Minecraft merchant levels:

```json
{
  "schema": "townstead:profession_trade/v1",
  "2": [
    {
      "cost": "minecraft:emerald",
      "cost_count": 4,
      "result": "minecraft:beehive"
    }
  ]
}
```

The directory also sets who gets the offers. A file in the root `trade/` directory adds offers to the Profession. A file in the `trade/` directory of a Path adds offers only after the merchant learns a Skill on that Path. Do not add a `path` field. A root or Path contribution can use any merchant level from 1 to 5.

Townstead merges the offers of different files by merchant level, in the order of their resource IDs. Add `"replace": true` to remove the earlier offers for the same Profession root or Path before Townstead adds the offers of this file. The replacement applies only to that target. For example, a replacement for the `hive_keeper` Path does not remove root offers or the offers of other Paths. As with other data-pack resources, a pack with a higher priority can replace one contribution with a file at the same resource path.

`cost` and `result` are required item IDs. `cost_count` and `result_count` default to `1`. For a second input, use `secondary_cost` and `secondary_cost_count` in the same way. If an item ID does not exist, Townstead removes that offer, and trade generation continues.

Townstead sets the usual merchant values from the level:

- `max_uses` is `16` at level 1 and `12` at later levels.
- `villager_xp` is `2`, `5`, `10`, `15`, and `20` for levels 1 to 5.
- `price_multiplier` is `0.05`.

Set these fields only when an offer needs different values.

`requires` adds a condition, in addition to Profession and Path membership. It can be a string that names a Skill, or any Pheno entity condition:

```json
"requires": {
  "type": "pheno:skill",
  "skill": "gentle_hands"
}
```

In a root contribution, a short Skill name refers to the root `skill/` directory of the Profession. In a Path contribution, it refers to the `skill/` directory of that Path. Use `<path>/<skill>` from the Profession root. To refer to a Skill of a different Profession, use its full resource ID.

Townstead accepts up to eight data-defined offers at each merchant level. Minecraft merchant levels go from 1 to 5.
