---
title: Gene Nodes
description: Pheno-backed gene nodes used inside Roots gene files.
---

Pheno-backed gene nodes are Roots gene types whose runtime behaviour is implemented through Pheno systems. They still live in `data/<namespace>/gene/<path>.json` and use the shared Roots gene fields from [Gene Files](/roots/gene-files/).

:::caution[Under construction]
This part of Pheno is still being shaped. These nodes currently describe gene-file behaviour, but some names and structures may change as Townstead expands professions, reactions, and other systems that may reuse the same effects outside inheritance.
:::

Use this page for the Pheno-backed fields. Use [Gene Type Reference](/roots/gene-types/) for the Roots-native `townstead_roots:*` gene types.

Some names also exist in other Pheno domains. For example, `pheno:resource` can declare a gene-backed meter in a gene file, while `pheno:resource` as a condition reads that meter, and `pheno:change_resource` changes it from an action. `pheno:collection` is similar: the gene declares the store, while selector, condition, and action nodes read or mutate that store from other systems. A collection can also be declared without a gene, in `data/<namespace>/collection/`, using the same config fields. Storage and behavior are identical; only the declaration site differs. Use the gene form when membership is part of a Root's inherited makeup, and the data form when it is not, such as a social tie or a faction roll.

## Action Genes

| Type | Fields | Behaviour |
| --- | --- | --- |
| `pheno:active_ability` | `action`, `condition`, `cooldown`, `slot`, `ai_trigger`, `resource_cost` | Adds an activated ability. The holder triggers `action` from a Root Ability key slot; villagers can use it when `ai_trigger` allows it: `never` (default), `always`, `when_hurt`, `when_threatened`, `when_flying` (mid-glide, only while extra lift would help reach the travel target), or `when_hurt_nearby` (a hurt villager, player, or animal within a few blocks). |
| `pheno:trigger` | `trigger`, `target`, `action`, `condition`, `damage_condition`, `key` | Runs `action` when a supported event fires. |
| `pheno:action_over_time` | `action`, `interval`, `condition`, `resource_cost` | Runs `action` repeatedly while the gene is expressed and the condition passes. `resource_cost` checks and spends a resource before each run. An amount of `0` declares that the periodic action uses the meter without spending it, which also makes a `when_referenced` resource visible on the HUD. |
| `pheno:aura` | `radius`, `interval`, `action`, `condition`, `include_self`, `target`, `resource_cost` | Runs `action` on every living entity in range each interval. `target` filters recipients: `all` (default), `hostile` (monsters only), or `non_hostile` (villagers, players, animals), so a healing aura never mends a raider. `resource_cost` makes each pulse that reaches someone spend a resource meter; an unaffordable pulse is skipped. |

Action fields use [Pheno Actions](/pheno/actions/). Conditions use [Pheno Conditions](/pheno/conditions/).

## Resource And State Genes

| Type | Fields | Behaviour |
| --- | --- | --- |
| `pheno:resource` | `min`, `max`, `start`, `regen`, `regen_interval`, `color`, `display`, `on_reach` | Defines a meter such as mana, charge, or stamina. See [Resource HUD](/roots/resource-hud/) for presentation. |
| `pheno:collection` | collection config | Defines persistent collection state used by collection conditions and actions. |
| `pheno:inventory` | inventory config | Adds inventory behaviour or storage hooks. |
| `pheno:toggle` | `slot`, `ai_trigger` | Adds a toggleable state used by other genes or conditions, flipped from a Root Ability key. With an `ai_trigger` (same values as `active_ability`), villagers manage it themselves: held ON while the trigger is true, released when it stops. |
| `pheno:modifier` | target, operation, value, condition fields | Modifies a Pheno capability or runtime value. |

Resource genes can be standalone gene files or companion resources inside another gene's `resources` block. See [Gene Files](/roots/gene-files/#companion-resources).

## Body And Visual Genes

| Type | Fields | Behaviour |
| --- | --- | --- |
| `pheno:body_metric` | `target`, `min`, `max` | Rolls a normalized MCA body metric for founders. |
| `pheno:proportions` | body metric ranges and part scale fields | Rolls several body metrics and free-form render proportions from one gene. A part scale is a number for all axes, a `[x, y, z]` array to stylize per axis (thick arms that are not longer, a barrel torso that is deep but not tall), or `{"lean": ..., "stout": ...}` to spread the race between two builds: each individual's rolled width gene picks their spot, mapped through the gene's own width range, so bulk varies per villager and inherits through MCA's width blending. |
| `pheno:scaled_part` | part id, scale fields | Scales a named render part. |
| `pheno:cosmetic_feature` | `feature`, `model` | Declares a present-or-absent cosmetic feature. The optional model ID is retained as metadata; custom model rendering is not yet implemented. |
| `pheno:hide_feature` | feature id | Hides a named render feature. |
| `pheno:overlay` | texture/material fields | Adds a render overlay. |
| `pheno:glow` | `condition` | Makes the holder glow, optionally only while a condition passes. |
| `pheno:particle` | `particle`, `count`, `spread`, `speed`, `y_offset`, `condition` | Emits ambient simple particles around the holder. |
| `pheno:opacity` | `alpha`, `condition` | Sets the body render opacity while the condition holds. `1` is solid, `0` is unseen. |

`pheno:particle` uses simple particle ids such as `minecraft:flame` or `minecraft:end_rod`. It is an ambient gene effect, not the same as the one-shot [Pheno action](/pheno/actions/) `pheno:spawn_particles`.

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:particle",
  "display_name": "Ember Trail",
  "particle": "minecraft:flame",
  "count": 2,
  "spread": 0.4,
  "speed": 0,
  "y_offset": 0.6
}
```

`pheno:opacity` overrides the default body render opacity, which is `0` while the holder's invisible flag is set and `1` otherwise. Gate it on `pheno:invisible` for imperfect invisibility that leaves a faint shimmer an observant player can spot, or leave it unconditioned for a permanently translucent body. It is pure rendering: mob sight and nameplate hiding are unchanged. Opacity changes ease over a few ticks instead of cutting hard, and the condition is evaluated on each viewing client, so stick to entity-state conditions such as `pheno:invisible` or `pheno:brightness`.

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:opacity",
  "display_name": "Veil Shimmer",
  "alpha": 0.15,
  "condition": { "type": "pheno:invisible" }
}
```

## Ability And Rule Genes

| Type | Behaviour |
| --- | --- |
| `pheno:ability` | Grants a movement ability by id, such as `elytra_flight`, `creative_flight`, `slow_fall`, or `hover`. `mode` is `passive` (always on) or `toggle`; a toggle takes a Root Ability key `slot` the holder flips it with. |
| `pheno:flight_speed` | Scales creative-style flight speed. `multiplier` is a factor over the vanilla base (`0.5` is half speed, `2.0` double), optionally gated by a `condition`. |
| `pheno:attribute` | Adds or multiplies a Minecraft attribute, optionally gated by a condition. |
| `pheno:step_height` | Changes step height under configured gates. |
| `pheno:buoyancy` | Changes how the holder floats or sinks. |
| `pheno:wade` | Alters movement through configured fluids or blocks. |
| `pheno:entity_group` | Makes the holder count as groups such as undead, arthropod, illager, or aquatic. |
| `pheno:effect_immunity` | Prevents configured status effects. |
| `pheno:stuck_immunity` | Prevents configured stuck or slowdown effects. |
| `pheno:disable_regen` | Disables natural regeneration while active. |
| `pheno:custom_sound` | Adds or overrides sound behaviour. |
| `pheno:damage_modifier` | Changes incoming or outgoing damage. |
| `pheno:attack_modifier` | Multiplies damage dealt to the current victim. `modifier` is required; optional `condition` tests the bearer and `bientity_condition` tests `(attacker, victim)`. Use this when the modifier needs victim-relative context. |
| `pheno:edible` | Makes configured items edible or changes eating behaviour. |
| `pheno:keep_inventory` | Keeps inventory on death while active. |
| `pheno:mobs_ignore` | Causes configured mobs to ignore the holder. |
| `pheno:modify_harvest` | Changes harvesting results. |
| `pheno:innate_tool` | Treats an empty main hand as the declared `item` for harvest checks and digging speed, optionally gated by `condition`. It can improve the empty hand but does not replace a held item or change attack damage. |
| `pheno:block_break_speed` | Multiplies digging speed for one `block` or block `tag`. `value` defaults to `1`; optional `condition` tests the bearer. |
| `pheno:prevent` | Prevents configured behaviours. |
| `pheno:prevent_game_event` | Prevents the holder from emitting configured vanilla game events. |
| `pheno:prevent_sound` | Prevents configured sounds. |
| `pheno:recipe` | Grants or gates recipe behaviour. |
| `pheno:restrict_equipment` | Restricts equipment use. |
| `pheno:scare_mob` | Causes configured mobs (`mobs` ids or `#` tags, within `radius`) to avoid the holder, optionally gated by a `condition`. |
| `pheno:stacking_effect` | Applies stacking status-style behaviour. |
| `pheno:starting_equipment` | Gives starting equipment. |

`pheno:flight_speed` applies to any holder who is flying, whatever granted the flight, so it also slows a creative-mode or operator player. Multiple expressed copies multiply together. A `multiplier` of `0` holds the flyer in place. Elytra flight is a separate mechanism and is not affected.

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:flight_speed",
  "display_name": "Heavy Wings",
  "multiplier": 0.5
}
```

`pheno:prevent_game_event` accepts either `event` for one game event id or `events` for a list. It only suppresses game events emitted by the gene holder itself, such as `minecraft:step`; it does not cancel unrelated world events from other entities or blocks. Use the action `pheno:emit_game_event` when you want to emit a game event from an action.

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:prevent_game_event",
  "display_name": "Silent Steps",
  "event": "minecraft:step"
}
```
