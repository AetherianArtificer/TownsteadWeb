---
title: Gene Type Reference
description: Reference for registered Roots gene types
---

Gene types define what a gene does once it is carried or expressed. Most Roots-native gene types describe inherited needs, appearance, reproduction, life stages, traits, or other biology.

This page lists the gene types currently registered by Townstead and shows common authoring patterns for each family. Use [Gene Files](/roots/gene-files/) for shared fields such as `schema`, `display_name`, `locus`, `variants`, `weight`, and `dominance`.

Gene files are still Roots files even when their `type` starts with `pheno:`. In those cases, the gene is using Pheno-backed behaviour from the Pheno system. This page lists those types so you know they exist, but most of their field details belong in the [Pheno reference](/pheno/).

Older packs may still contain `townstead_origins:*` type ids. Townstead can remap those legacy ids, but new packs should use `townstead_roots:*`.

## Roots Identity And Needs

| Type | Main Fields | Effect |
| --- | --- | --- |
| `townstead_roots:chronotype` | `sleep_hours`, or variants that reference chronotype catalogue ids | Controls preferred sleep hours. |
| `townstead_roots:diet` | `diet` | Defines diet profile. `"none"` disables hunger. Other values are currently descriptive hooks. |
| `townstead_roots:hydration` | `liquid` | Defines thirst/liquid profile. `"none"` disables thirst. Other values are descriptive hooks. |

Example:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:diet",
  "display_name": "No Hunger",
  "diet": "none"
}
```

Chronotype genes are usually variant genes. Each variant is rolled at birth and controls the villager's preferred sleep window for fatigue and shift alignment.

This example re-weights shared chronotype catalogue variants:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:chronotype",
  "display_name": "Diurnal Rhythm",
  "category": "Activity",
  "locus": "townstead_roots:chronotypes",
  "variants": {
    "early_bird": { "weight": 20 },
    "standard": { "weight": 55 },
    "night_owl": { "weight": 20 },
    "nocturnal": { "weight": 5 }
  }
}
```

This example defines local chronotype variants inline:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:chronotype",
  "display_name": "Twilight Rhythm",
  "category": "Activity",
  "locus": "townstead_roots:chronotypes",
  "variants": {
    "dawn_sleeper": {
      "display_name": "Dawn Sleeper",
      "sleep_hours": [4, 5, 6, 7, 8, 9],
      "weight": 2
    },
    "dusk_sleeper": {
      "display_name": "Dusk Sleeper",
      "sleep_hours": [16, 17, 18, 19, 20, 21],
      "weight": 1
    }
  }
}
```

`sleep_hours` are authored as clock hours where `0` is midnight. Townstead converts them internally for the fatigue clock and shift grid.

## Roots Appearance

| Type | Main Fields | Effect |
| --- | --- | --- |
| `townstead_roots:attachment` | `attachment` | Adds a named render attachment. |
| `townstead_roots:eye_color` | `tint` | Tints custom-rig eyes. Accepts `#RRGGBB`, `RRGGBB`, or `#RGB`. |
| `townstead_roots:eyes` | `texture`, `glow` | Selects a custom face eye sprite strip, optionally emissive. |
| `townstead_roots:mouth` | `texture` | Selects a custom face mouth sprite strip. |
| `townstead_roots:skin_tone` | `tint`, `blend`, `strength` | Tints skin rendering. `blend` supports `multiply`, `screen`, `overlay`, and `color`. |

Appearance examples:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:skin_tone",
  "display_name": "Moonlit Skin",
  "locus": "my_pack:skin_tone",
  "tint": "#8A8FA0",
  "blend": "color",
  "strength": 0.85
}
```

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:eyes",
  "display_name": "Eyes",
  "locus": "my_pack:eyes",
  "variants": {
    "silver": {
      "display_name": "Silver Eyes",
      "texture": "my_pack:textures/face/eyes/silver.png",
      "weight": 4
    },
    "glowing": {
      "display_name": "Glowing Eyes",
      "texture": "my_pack:textures/face/eyes/glowing.png",
      "glow": true,
      "weight": 1
    }
  }
}
```

Eye and mouth textures depend on the rig's `face` block. See [Rigs](/roots/rigs/) and [Appearance Assets](/roots/appearance-assets/).

## Roots Reproduction And Life

| Type | Main Fields | Effect |
| --- | --- | --- |
| `townstead_roots:fertility` | `fertility` | `0` is sterile, `1` is normal fertility. Values are clamped from `0` to `1`. |
| `townstead_roots:gestation_length` | `gestation_length` | Pregnancy length multiplier on the mother. `2.0` is twice as long; `0.5` is half as long. |
| `townstead_roots:life_cycle` | `stages`, `variance`, `ageless` | Defines the effective life-stage cycle. See [Life Cycles](/roots/life-cycles/). |
| `townstead_roots:litter_size` | `litter_size` | Number of children per birth. Clamped from `1` to `12`. |

Reproduction example:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:litter_size",
  "display_name": "Clutch Birth",
  "litter_size": 4
}
```

`fertility`, `gestation_length`, and `litter_size` each use their own default locus, so different genes of the same type compete as versions of the same inherited setting.

## Roots Traits And Immunity

| Type | Main Fields | Effect |
| --- | --- | --- |
| `townstead_roots:infection_immune` | none | Marks the bearer immune to Townstead infection logic. |
| `townstead_roots:trait_occurrence` | `trait`, `delta`, `force` | Grants or biases a trait roll at spawn. |

Trait example:

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:trait_occurrence",
  "display_name": "Immortal Bloodline",
  "trait": "my_pack:immortal",
  "force": true
}
```

Traits are still under construction. See [Traits](/roots/traits/) for the current limitations.

## Pheno-Backed Gene Types

These gene types are registered as Roots gene types, but their detailed behaviour is defined by Pheno systems or runtime hooks. Keep the shared gene wrapper fields in [Gene Files](/roots/gene-files/), then use the Pheno pages for nested conditions, actions, selectors, values, and context.

| Area | Gene Types |
| --- | --- |
| Body and appearance | `pheno:body_metric`, `pheno:proportions`, `pheno:scaled_part`, `pheno:hide_feature`, `pheno:overlay`, `pheno:particle`, `pheno:glow` |
| Abilities and attributes | `pheno:ability`, `pheno:active_ability`, `pheno:attribute`, `pheno:step_height`, `pheno:buoyancy`, `pheno:wade`, `pheno:entity_group`, `pheno:effect_immunity`, `pheno:stuck_immunity`, `pheno:disable_regen` |
| Actions and rules | `pheno:action_over_time`, `pheno:aura`, `pheno:custom_sound`, `pheno:damage_modifier`, `pheno:edible`, `pheno:keep_inventory`, `pheno:mobs_ignore`, `pheno:modify_harvest`, `pheno:prevent`, `pheno:prevent_game_event`, `pheno:prevent_sound`, `pheno:recipe`, `pheno:restrict_equipment`, `pheno:scare_mob`, `pheno:stacking_effect`, `pheno:starting_equipment`, `pheno:trigger` |
| State and storage | `pheno:collection`, `pheno:inventory`, `pheno:modifier`, `pheno:resource`, `pheno:toggle` |

For example, `pheno:active_ability`, `pheno:trigger`, `pheno:aura`, and `pheno:action_over_time` all use Pheno actions. `pheno:particle`, `pheno:attribute`, and many other Pheno-backed genes can use Pheno conditions.

Resource genes can also be declared inside another gene's `resources` block as companion resources. See [Gene Files](/roots/gene-files/) for the companion resource pattern.

## Pheno References

| Gene Fields | Reference |
| --- | --- |
| `condition`, `damage_condition`, gates | [Pheno Conditions](/pheno/conditions/) |
| `action`, `do`, action hooks | [Pheno Actions](/pheno/actions/) |
| `target`, selectors, affected entities or blocks | [Pheno Selectors & Values](/pheno/selectors-values/) |
| Nested Pheno nodes and context rules | [Pheno Structure](/pheno/structure/) and [Pheno Context](/pheno/context/) |
