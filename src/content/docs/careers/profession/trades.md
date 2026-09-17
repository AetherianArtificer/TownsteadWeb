---
title: Trades
description: Contribute merchant offers to a career or one of its paths.
---

Merchant offers are contributions in `trade/` directories, never inline in `profession.json`.

## Trades

Put general Profession offers in independently addressable contribution files:

```text
data/<namespace>/profession/<career>/trade/<contribution>.json
```

Put Path-specific offers beside the Path they belong to:

```text
data/<namespace>/profession/<career>/path/<path>/trade/<contribution>.json
```

The directory supplies the root Profession. The schema is required, and numbered keys are Minecraft merchant levels:

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

The enclosing directory supplies the contribution target. A file in the root `trade/` directory contributes to the Profession; a file in a Path's `trade/` directory appears only after the merchant has learned a Skill on that Path. Do not add a `path` field. Each root or Path contribution may use any merchant level from 1 through 5.

Different files merge their offers by merchant level. Files are applied in resource-ID order. Add `"replace": true` to clear earlier contributions for that file's root-Profession or Path target before adding its offers. Replacement is scoped: replacing `hive_keeper` does not remove root offers or another Path's offers. As with other data-pack resources, a higher pack can replace one individual contribution by providing the same resource path.

`cost` and `result` are required item IDs. Their sibling `cost_count` and `result_count` fields default to `1`. An optional second input uses `secondary_cost` and `secondary_cost_count` in the same way. Missing item IDs cause that offer to disappear instead of crashing trade generation.

Townstead derives the routine merchant settings from the containing level. `max_uses` defaults to `16` at level 1 and `12` thereafter. `villager_xp` defaults to `2`, `5`, `10`, `15`, and `20` across levels 1 to 5. `price_multiplier` defaults to `0.05`. Specify any of these fields only when the offer needs to depart from those values.

`requires` adds a condition beyond Profession and Path membership. It may be a string naming a Skill or any Pheno entity condition:

```json
"requires": {
  "type": "pheno:skill",
  "skill": "gentle_hands"
}
```

A short Skill reference in a root contribution resolves in the Profession's root `skill/` directory. In a Path contribution, it resolves in that Path's sibling `skill/` directory. Use `<path>/<skill>` from the Profession root, or a full resource ID when referring to another Profession's Skill.

Townstead supports up to eight data-defined offers at each merchant level. Minecraft merchant levels run from 1 to 5.
