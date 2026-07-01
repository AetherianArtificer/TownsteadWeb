---
title: Actions
description: How Pheno changes entities, items, blocks, world state, resources, and collections.
---

Actions change the world, an entity, an item, a block, or the current Pheno context. They run against the actor, target, block, or item provided by the surrounding system and any wrappers around the action. For how Pheno decides the current actor, target, block, or item, see [Context](/pheno/context/).

## Action Families

| Family | Registered Types |
| --- | --- |
| Context wrappers | `pheno:actor_action`, `pheno:target_action`, `pheno:invert`, `pheno:block_action`, `pheno:equipped_item_action`, `pheno:at` |
| Control flow | `pheno:and`, `pheno:chance`, `pheno:choice`, `pheno:delay`, `pheno:if_else`, `pheno:if_else_list`, `pheno:if_bientity`, `pheno:nothing`, `pheno:side` |
| Entity effects | `pheno:apply_effect`, `pheno:clear_effect`, `pheno:heal`, `pheno:damage`, `pheno:ignite`, `pheno:extinguish`, `pheno:freeze`, `pheno:exhaust`, `pheno:feed`, `pheno:add_xp`, `pheno:gain_air`, `pheno:set_fall_distance`, `pheno:set_no_gravity` |
| Movement and area | `pheno:add_velocity`, `pheno:jump`, `pheno:random_teleport`, `pheno:area_of_effect`, `pheno:mount`, `pheno:dismount`, `pheno:passenger_action`, `pheno:riding_action` |
| Inventory and items | `pheno:give`, `pheno:drop_inventory`, `pheno:consume`, `pheno:cooldown`, `pheno:item_cooldown`, `pheno:holder_action`, `pheno:remove_enchantment`, `pheno:spawn_item` |
| World effects | `pheno:play_sound`, `pheno:spawn_particles`, `pheno:spawn_entity`, `pheno:explode`, `pheno:emit_game_event`, `pheno:beam`, `pheno:cloud`, `pheno:execute_command` |
| Resources and collections | `pheno:change_resource`, `pheno:resource_transfer`, `pheno:change_collection`, `pheno:for_each` |
| Relationship and mobs | `pheno:tame`, `pheno:set_in_love`, `pheno:zombify_villager` |
| Block action aliases | `pheno:set_block`, `pheno:add_block`, `pheno:destroy`, `pheno:bonemeal`, `pheno:modify_block_state`, `pheno:schedule_tick`, `pheno:offset`, `pheno:area_of_effect` |
| Projectiles and animation | `pheno:fire_projectile`, `pheno:swing_hand` |

## Using Context

An action object can include `on` to run that action once per selected entity. A bare JSON array of actions runs each action in order.

Entity, item, and block actions each have their own `on` support. For the exact actor/target/origin, holder, and cause behaviour, use the [Context](/pheno/context/) reference.

## Context Wrappers

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:actor_action` | `action` | Runs the nested action on the current actor. Mainly useful for symmetry with bi-entity flows. |
| `pheno:target_action` | `action` | Runs the nested action on `other`, with actor and target swapped. No-op without `other`. |
| `pheno:invert` | `action` | Runs the nested bi-entity action with actor and target swapped. No-op without `other`. |
| `pheno:block_action` | `block_action` | Runs a block action at the actor's block position, with the actor as cause. Server-side only. |
| `pheno:at` | `blocks`, `do` | Selects block positions from the entity context and runs a block action at each. `blocks` is a block selector; `do` is a block action. Server-side only. |
| `pheno:equipped_item_action` | `slot`, `item_action` | Runs an item action on the actor's equipped item. `slot` defaults to `mainhand`; valid slots include `mainhand`, `offhand`, `head`, `chest`, `legs`, and `feet`. |

## Control Flow

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:and` | `actions` | Runs every nested action in order. A bare JSON array does the same thing. |
| `pheno:chance` | `chance`, `action` | Runs the nested action with the given probability. `chance` defaults to `1`. |
| `pheno:choice` | `actions` | Picks exactly one weighted entry. Each entry is `{ "action": {...}, "weight": N }`; weight defaults to `1` and is clamped to at least `1`. |
| `pheno:delay` | `ticks`, `action` | Schedules the nested action after `ticks` server ticks. `ticks` defaults to `0` and is clamped to at least `0`; the action is skipped if the actor is gone. |
| `pheno:if_else` | `condition`, `if_action`, `else_action` | Tests an entity condition on the actor, then runs `if_action` or optional `else_action`. |
| `pheno:if_else_list` | `actions`, `fallback_action` | Runs the first branch whose entity condition passes. Each branch is `{ "condition": {...}, "action": {...} }`; `fallback_action` is optional. |
| `pheno:if_bientity` | `condition`, `if_action`, `else_action` | Tests a bi-entity condition against actor and `other`. Without `other`, the condition fails and optional `else_action` may run. |
| `pheno:nothing` | none | Explicit no-op. |
| `pheno:side` | `side`, `action` | Runs the nested action only for `server`; `client` is a no-op because Townstead powers run server-side. `side` defaults to `server`. |

## Entity Effects

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:apply_effect` | `effect`, `duration`, `amplifier` | Applies a status effect. Defaults: `duration: 200`, `amplifier: 0`. |
| `pheno:clear_effect` | `effect` | Removes one status effect, or all active effects if `effect` is omitted. |
| `pheno:heal` | `amount` | Heals by a Pheno value amount. Required; only positive evaluated values do anything. |
| `pheno:damage` | `amount` | Deals generic damage by a Pheno value amount. Required; only positive evaluated values do anything. |
| `pheno:ignite` | `seconds` | Sets the actor on fire. `seconds` defaults to `3` and is clamped to at least `1`. |
| `pheno:extinguish` | none | Clears the actor's fire. |
| `pheno:freeze` | `amount` | Adds frozen ticks, capped just beyond the freeze threshold. `amount` defaults to `5` and is clamped to at least `1`. |
| `pheno:exhaust` | `amount` | Player-only. Adds hunger exhaustion. `amount` defaults to `0.5` and is clamped to at least `0`. |
| `pheno:feed` | `food`, `saturation` | Player-only. Restores hunger and saturation. Defaults: `food: 1`, `saturation: 1.0`. |
| `pheno:add_xp` | `points`, `levels` | Player-only. Adds raw experience points, whole levels, or both. At least one value must be non-zero. |
| `pheno:gain_air` | `air` | Changes air supply by ticks, clamped to max air. Negative values drain air; `0` is rejected. |
| `pheno:set_fall_distance` | `fall_distance` | Sets pending fall distance. Defaults to `0`. |
| `pheno:set_no_gravity` | `gravity` | Sets no-gravity to the inverse of `gravity`. Default `gravity: false` disables gravity. |

## Movement And Relationships

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:add_velocity` | `x`, `y`, `z`, `relative` | Adds velocity. Coordinates default to `0`; with `relative: true`, the vector is rotated to the actor's facing and `z` is forward. |
| `pheno:jump` | `strength` | Sets upward velocity using vanilla jump power plus Jump Boost. `strength` defaults to `1.0`; works in mid-air and resets fall distance. |
| `pheno:random_teleport` | `distance` | Attempts a random safe teleport within `distance` blocks. Default `8`, clamped to at least `1`. |
| `pheno:area_of_effect` | `radius`, `include_self`, `action` | Runs an entity action on every living entity within `radius` of the actor. `radius` defaults to `4` and is clamped to at least `0`; `include_self` defaults to `false`. Each target becomes the inner action's actor, with the original actor as `other`. |
| `pheno:mount` | none | Actor starts riding `other`. Server-side; no-op without `other`. |
| `pheno:dismount` | none | Actor stops riding. |
| `pheno:passenger_action` | `action` | Runs an entity action on each living passenger riding the actor. |
| `pheno:riding_action` | `action` | Runs an entity action on the living vehicle the actor is riding. |
| `pheno:tame` | none | If the actor is a player and `other` is an untamed tamable animal, tames `other`. Server-side only. |
| `pheno:set_in_love` | none | If `other` is an animal, puts it in love mode. A player actor is credited as the cause. |
| `pheno:zombify_villager` | none | Converts a mob actor into a vanilla zombie villager. Server-side only. |

## Inventory And Item Actions

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:give` | `item`, `count` | Player-only. Gives an item stack; overflow drops at the player's feet. `count` defaults to `1` and is clamped to at least `1`. |
| `pheno:drop_inventory` | none | Player-only. Drops the actor's entire inventory. |
| `pheno:spawn_item` | `item`, `amount` | Spawns an item stack at the actor's position. `amount` defaults to `1` and is clamped to at least `1`; server-side only. |
| `pheno:item_cooldown` | `item`, `cooldown` | Player-only. Puts a named item on cooldown. `cooldown` defaults to `20` ticks. |

Item actions run inside an item context, usually through `pheno:equipped_item_action`. A JSON array of item actions runs each action in order, and an item action object can include `on` to select stacks from the holder.

| Item Action Type | Fields | Description |
| --- | --- | --- |
| `pheno:consume` | `amount` | Shrinks the stack. `amount` defaults to `1` and is clamped to at least `1`. |
| `pheno:cooldown` | `cooldown` | Player-holder only. Puts the current stack's item on cooldown. Defaults to `20` ticks. |
| `pheno:damage` | `amount` | Adds durability damage. Negative values repair; breaking damage shrinks the stack by one. |
| `pheno:holder_action` | `action` | Runs an entity action on the stack holder. No-op without a holder. |
| `pheno:remove_enchantment` | `enchantment` | Removes one enchantment from the stack. |
| `pheno:change_collection` | `collection`, `operation`, `time_limit` | Item-domain collection action. Adds, removes, or clears the contextual stack's item in a collection on the holder. |

## World Effects

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:play_sound` | `sound`, `sounds`, `volume`, `pitch`, `category` | Plays a sound at the actor. Supports a single sound spec or weighted `sounds`; `category` defaults to `neutral`. |
| `pheno:spawn_particles` | `particle`, `count`, `spread`, `speed` | Emits simple particles at the actor. Defaults: `count: 8`, `spread: 0.4`, `speed: 0`; server-side only. |
| `pheno:spawn_entity` | `entity` | Spawns an entity at the actor's position. Server-side only. |
| `pheno:explode` | `power`, `fire`, `destroy` | Explodes at the actor, credited to the actor. Defaults: `power: 2.0`, `fire: false`, `destroy: true`. |
| `pheno:emit_game_event` | `event` | Emits a vanilla game event from the actor. Server-side only. |
| `pheno:beam` | ray fields, `particle`, `spacing` | Draws simple particles along a ray from the actor's eyes to the ray impact point. `spacing` defaults to `0.5` and is clamped to at least `0.05`. |
| `pheno:cloud` | `do`, `where`, `radius`, `duration`, `particle`, `grow_per_tick`, `shrink_on_use`, `wait_time`, `reapply_delay`, `height` | Spawns a lingering field at the actor that repeatedly runs `do` on entities inside it. `where` is an optional bi-entity condition. Defaults: `radius: 3`, `duration: 600`, `wait_time: 10`, `reapply_delay: 20`, growth/shrink/height `0`. |
| `pheno:execute_command` | `command` | Runs a command as the actor from a silent permission-level-2 source. |
| `pheno:fire_projectile` | `entity`, `speed`, `inaccuracy` | Launches a projectile along the actor's look vector. Defaults: `entity: minecraft:arrow`, `speed: 1.5`, `inaccuracy: 1.0`; server-side only. |
| `pheno:swing_hand` | `hand` | Plays a hand-swing animation. `hand` is `main` or `off`; default `main`. |

## Resources And Collections

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:change_resource` | `resource`, `amount`, `operation` | Changes a resource gene value. `amount` is a Pheno value and defaults to `0`; `operation` is `add`, `subtract`, or `set`, default `add`. Values are clamped by the resource. |
| `pheno:resource_transfer` | `from`, `to`, `amount` | Transfers up to `amount` from one resource gene to another. Only the amount actually drained is added to `to`; `amount` must be positive. |
| `pheno:change_collection` | `collection`, `operation`, `amount`, `key`, `time_limit` | Entity-domain collection action. Adds, removes, sets, or clears entries in the actor's collection. Without `key`, the contextual `other` is used. `time_limit` is an optional TTL in ticks. |
| `pheno:for_each` | `in`, `do`, `action`, `where`, `limit`, `order` | Iterates living entity members of a collection. The holder remains actor and the member becomes `other`; `where` can gate each pair. `order` is `oldest_first` or `newest_first`; `limit <= 0` means no cap. |

## Block Actions

Block actions run in a block context, usually through `pheno:block_action` or `pheno:at`. A JSON array of block actions runs each action in order, and a block action object can include `on` to select more block positions from the current block context.

| Block Action Type | Fields | Description |
| --- | --- | --- |
| `pheno:set_block` | `block` | Replaces the target block with the given block's default state. |
| `pheno:add_block` | `block` | Places the block only if the current block can be replaced. |
| `pheno:destroy` | `drop_item` | Destroys the target block. `drop_item` defaults to `true`; the cause entity is credited if present. |
| `pheno:bonemeal` | none | Applies bonemeal behaviour if the target block supports it. |
| `pheno:modify_block_state` | `property`, `value`, `operation` | Sets a block-state property, or cycles it with `operation: cycle`. No-op if the property or value is invalid. |
| `pheno:schedule_tick` | `delay` | Schedules a block tick for the target block. `delay` defaults to `1`; no-op on air. |
| `pheno:offset` | `x`, `y`, `z`, `block_action` | Runs a nested block action at an offset position. Offsets default to `0`. |
| `pheno:area_of_effect` | `radius`, `shape`, `block_condition`, `block_action` | Runs a nested block action across a cube or sphere. `radius` defaults to `1` and is capped at `16`; `shape` defaults to `cube`; `block_condition` is optional. |
| `pheno:execute_command` | `command` | Block-domain command action. Runs a command from a silent permission-level-2 source positioned at the block. |
| `pheno:explode` | `power`, `fire`, `destroy` | Block-domain explosion at the block centre. Defaults: `power: 2.0`, `fire: false`, `destroy: true`. |
| `pheno:spawn_entity` | `entity` | Block-domain entity spawn centered on the block. |
| `pheno:change_collection` | `collection`, `operation`, `time_limit` | Block-domain collection action. Adds, removes, or clears the contextual block position in a collection on the cause entity. |
