---
title: Conditions
description: How Pheno tests entities, relationships, items, blocks, world state, and Townstead systems.
---

Conditions test the current context and return true or false. Entity conditions look at one entity context. Bi-entity conditions compare an actor and a target.

## Entity Conditions

| Family | Registered Types |
| --- | --- |
| State flags | `pheno:alive`, `pheno:daytime`, `pheno:exists`, `pheno:glowing`, `pheno:hostile`, `pheno:invisible`, `pheno:on_fire`, `pheno:passenger`, `pheno:riding`, `pheno:tamed`, `pheno:using_item` |
| Numeric checks | `pheno:air_supply`, `pheno:fall_distance`, `pheno:hunger`, `pheno:thirst`, `pheno:energy`, `pheno:max_health`, `pheno:saturation_level`, `pheno:xp_levels`, `pheno:xp_points`, `pheno:health`, `pheno:brightness`, `pheno:velocity`, `pheno:dimensions`, `pheno:fluid_height`, `pheno:scale`, `pheno:count` |
| Movement and pose | `pheno:movement` |
| Social interaction | `pheno:interaction` |
| World, weather, and fluids | `pheno:biome`, `pheno:block`, `pheno:block_in_radius`, `pheno:building`, `pheno:dimension`, `pheno:distance_from_coordinates`, `pheno:environment`, `pheno:in_fluid`, `pheno:structure`, `pheno:submerged_in`, `pheno:time_of_day`, `pheno:village` |
| Entity identity | `pheno:entity_type`, `pheno:in_tag`, `pheno:entity_group`, `pheno:root` |
| Player and inventory | `pheno:gamemode`, `pheno:inventory`, `pheno:equipped_item` |
| Effects and cooldowns | `pheno:on_cooldown`, `pheno:since_spawn`, `pheno:status_effect`, `pheno:status_effect_tag` |
| Pheno systems | `pheno:ability`, `pheno:compare_resource`, `pheno:resource`, `pheno:toggled`, `pheno:collection_size`, `pheno:collection_contains`, `pheno:collection_count` |
| Logic and selection | `pheno:and`, `pheno:or`, `pheno:not`, `pheno:any`, `pheno:none`, `pheno:constant`, `pheno:chance`, `pheno:entity_in_radius` |

## State Flags

State flag conditions take no fields beyond `type`. They read live entity state and return true or false.

| Type | True When |
| --- | --- |
| `pheno:alive` | The entity is alive. |
| `pheno:daytime` | The level is currently day. |
| `pheno:exists` | Always true for the current context entity. |
| `pheno:glowing` | The entity is currently glowing. |
| `pheno:hostile` | The entity implements Minecraft's hostile enemy marker. |
| `pheno:invisible` | The entity is invisible. |
| `pheno:on_fire` | The entity is on fire. |
| `pheno:passenger` | The entity has at least one passenger. |
| `pheno:riding` | The entity is riding another entity. |
| `pheno:tamed` | The entity is a tameable animal and is tamed. |
| `pheno:using_item` | The entity is using an item. |

## Movement And Pose

`pheno:movement` checks the entity's current movement, pose, flight, or collision state.

| Movement | True When |
| --- | --- |
| `grounded` | The entity is treated as on the ground. |
| `moving` | The entity has horizontal movement. |
| `sneaking` | The entity is sneaking. |
| `sprinting` | The entity is sprinting. |
| `crawling` | The entity is visually crawling. |
| `swimming` | The entity is swimming. |
| `climbing` | The entity is on a climbable block. |
| `sleeping` | The entity is sleeping. |
| `fall_flying` | The entity is fall flying. |
| `creative_flying` | The entity is a player currently flying in creative-style flight. |
| `colliding_horizontally` | The entity has side collision. |
| `colliding_vertically` | The entity has vertical collision. |
| `emoting` | The entity is currently running a Townstead-triggered emote. |
| `reacting` | The entity is currently playing a locking Townstead reaction. |

## Social Interaction

`pheno:interaction` checks social or UI-driven interaction state.

| Interaction | True When |
| --- | --- |
| `in_dialogue` | The entity is currently in the Townstead RPG dialogue screen with a player. |
| `dialogue_just_ended` | The entity's Townstead RPG dialogue closed recently. |
| `heart_increased` | The entity's MCA relationship hearts with the interacting player went up recently. |
| `heart_decreased` | The entity's MCA relationship hearts with the interacting player went down recently. |

## Numeric Ranges

These conditions accept `min` and `max`. Missing `min` means no lower bound; missing `max` means no upper bound. Player-only values return no match for non-player entities.

| Type | Value Tested |
| --- | --- |
| `pheno:air_supply` | Current air supply. |
| `pheno:fall_distance` | Current fall distance. |
| `pheno:hunger` | Player food level or Townstead villager hunger. |
| `pheno:thirst` | Townstead villager thirst, or player thirst when the active thirst compatibility bridge can read it. |
| `pheno:energy` | Townstead villager energy, derived from fatigue. |
| `pheno:max_health` | Entity max health. |
| `pheno:saturation_level` | Player saturation. |
| `pheno:xp_levels` | Player experience level. |
| `pheno:xp_points` | Player total experience points. |

`pheno:health` also accepts `min` and `max`. Add `"relative": true` to compare health as a fraction of max health from `0` to `1`; otherwise it compares raw health points. Defaults are `min: 0`, no practical max, and `relative: false`.

`pheno:brightness` tests local raw brightness at the entity position. Defaults are `min: 0` and `max: 15`.

`pheno:attribute` tests a vanilla attribute value. Fields:

| Field | Description |
| --- | --- |
| `attribute` | Required attribute id, such as `minecraft:generic.movement_speed`. |
| `min` | Optional lower bound. |
| `max` | Optional upper bound. |

## Logic And Random Gates

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:and` | `conditions` | True when every child condition passes. An empty list is true. |
| `pheno:or` | `conditions` | True when any child condition passes. An empty list is true. |
| `pheno:not` | `condition` | Negates one child condition. |
| `pheno:constant` | `value` | Always returns `value`; defaults to `true`. |
| `pheno:chance` | `chance` | Passes randomly per evaluation. `chance` defaults to `0.5` and is clamped from `0` to `1`. |

Comparisons use `comparison` strings: `==`, `!=`, `<`, `<=`, `>`, `>=`, plus word aliases such as `equal`, `less`, and `greater`. Unknown or missing comparisons default to `>=`.

## Selection Tests

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:any` | `on` | True when the selector returns at least one target. |
| `pheno:none` | `on` | True when the selector returns no targets. |
| `pheno:count` | `on`, `comparison`, `compare_to` | Compares selector result count. `comparison` defaults to `>=`; `compare_to` defaults to `1`. |

`pheno:entity_in_radius` counts nearby living entities. It accepts `radius` (default `8`), `comparison` (default `>=`), `compare_to` (default `1`), and an optional nested entity `condition`. The bearer itself is not counted.

## World And Position

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:biome` | `biome`, `biome_tag`, `condition` | Tests the biome at the entity position. `condition` takes priority, then `biome_tag`, then `biome`. |
| `pheno:block` | `x`, `y`, `z`, `block_condition` | Tests a block relative to the entity's block position. Offsets default to `0`; `block_condition` is required. |
| `pheno:block_in_radius` | `radius`, `block_condition`, `comparison`, `compare_to` | Counts matching blocks in a cube around the entity. `radius` defaults to `4` and is clamped from `0` to `8`; `comparison` defaults to `>=`; `compare_to` defaults to `1`. |
| `pheno:building` | `building`, `building_type`, `id`, `village`, `village_id`, `min_size`, `max_size` | Tests the Townstead/MCA building at the entity position. With no fields, true when the entity is in any known building. `building` accepts a full type id or slug, such as `mca:tavern` or `tavern`; `building_type` is an alias. |
| `pheno:dimension` | `dimension` | Tests the level dimension id, such as `minecraft:overworld`. |
| `pheno:distance_from_coordinates` | `x`, `y`, `z`, `min`, `max`, `ignore_y` | Tests distance from the entity to fixed coordinates. Coordinates default to `0`; `min` defaults to `0`; `ignore_y` defaults to `false`. |
| `pheno:environment` | `weather`, `exposure`, `time`, `biome`, `dimension`, `effects` | Convenience condition that combines several world and effect checks. Present categories are ANDed; list values inside a category are ORed. |
| `pheno:structure` | `structure` | Server-side check for whether the entity is standing inside a generated structure piece with the given id. |
| `pheno:in_fluid` | `fluid`, `fluid_tag` | Tests whether the entity is standing in a fluid tag. `fluid_tag` takes priority; `fluid` supports `minecraft:water`, `minecraft:lava`, or another fluid tag id and defaults to water. |
| `pheno:submerged_in` | `fluid`, `fluid_tag` | Tests the fluid at the entity's eyes. `fluid_tag` takes priority; `fluid` supports `minecraft:water`, `minecraft:lava`, or another fluid tag id and defaults to water. |
| `pheno:time_of_day` | `min`, `max` | Tests day time modulo `24000`. Defaults are `min: 0`, `max: 24000`. |
| `pheno:village` | `id`, `village`, `village_id`, `name`, `village_name`, `within_border`, `min_buildings`, `max_buildings`, `min_population`, `max_population` | Tests the MCA/Townstead village resolved at the entity position. With no fields, true when a village is found near the entity. Use `within_border: true` when the entity must be inside the village border. |

`pheno:environment` uses `weather` for level-wide weather state and `exposure` for what reaches the entity at its position.

| Field | Accepted Values |
| --- | --- |
| `weather` | `rain`, `thunder`, `thunderstorm`, `clear` |
| `exposure` | `sky`, `sun`, `rain`, `thunder`, `thunderstorm`, `snow` |
| `time` | `day`, `night` |
| `biome` | Biome id values. |
| `dimension` | Dimension id values. |
| `effects.any` | Status effect id, or `#tag` for a mob-effect tag. `effects.count.min` sets the tag minimum count. |

| Environment Field | True When |
| --- | --- |
| `weather: "rain"` | The level is raining. |
| `weather: "thunder"` or `weather: "thunderstorm"` | The level is thundering. |
| `weather: "clear"` | The level is not raining. |
| `exposure: "sky"` | The entity's block position can see the sky. |
| `exposure: "sun"` | It is day, the level is not raining, and the entity can see the sky. |
| `exposure: "rain"` | It is raining at the entity's block position. |
| `exposure: "thunder"` or `exposure: "thunderstorm"` | The level is thundering and it is raining at the entity's block position. |
| `exposure: "snow"` | It is precipitating at the entity's block position, and the local biome precipitation is snow. |

### Block Conditions

`block_condition` objects support `"inverted": true` on any condition. Names may be written with or without the `pheno:` namespace.

| Type | Fields | Description |
| --- | --- | --- |
| `block` | `block` | Tests an exact block id. |
| `in_tag` | `tag` | Tests a block tag. |
| `block_state` | `property`, `value` | Tests a block-state property value. |
| `fluid` | `fluid_condition`, `fluid`, `tag` | Tests the block's fluid state. A nested `fluid_condition` takes priority; otherwise `fluid` supports `empty`/`none`, `water`, `lava`, or any non-empty fluid, and `tag` tests a fluid tag. |
| `exposed_to_sky` | none | True when the block position can see the sky. |
| `air` | none | True when the block is air. |
| `in_rain` | none | True when it is raining at that block position. |
| `raining` | none | True when the level is raining. |
| `thundering` | none | True when the level is thundering. |
| `light_level` | `min`, `max` | Tests local raw brightness. Defaults are `0` and `15`. |
| `height` | `min`, `max` | Tests the block Y coordinate. |
| `hardness` | `min`, `max` | Tests destroy speed. |
| `blast_resistance` | `min`, `max` | Tests explosion resistance. |
| `slipperiness` | `min`, `max` | Tests friction/slipperiness. |
| `replaceable` | none | True when the block can be replaced. |
| `movement_blocking` | none | True when the block blocks movement. |
| `light_blocking` | none | True when the block blocks light. |
| `water_loggable` | none | True when the block can hold water. |
| `block_entity` | none | True when a block entity exists at the position. |
| `distance_from_coordinates` | `x`, `y`, `z`, `min`, `max` | Tests distance from the block position to fixed coordinates. |
| `offset` | `x`, `y`, `z`, `condition` | Tests another block position offset from the current one. |
| `adjacent` | `condition` | True when any adjacent block passes the nested condition. |
| `and` | `conditions` | True when every child block condition passes. |
| `or` | `conditions` | True when any child block condition passes. |
| `constant` | `value` | Always returns `value`; defaults to `true`. |

### Fluid Conditions

Nested `fluid_condition` objects support `"inverted": true`.

| Type | Fields | Description |
| --- | --- | --- |
| `empty` | none | True when the fluid state is empty. |
| `in_tag` | `tag` | Tests a fluid tag. |
| `still` | none | True when the fluid is a source block. |
| `and` | `conditions` | True when every child fluid condition passes. |
| `or` | `conditions` | True when any child fluid condition passes. |
| `constant` | `value` | Always returns `value`; defaults to `true`. |

## Size, Movement, And Fluid Height

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:dimensions` | `which`, `min`, `max` | Tests live bounding-box width, height, or both. `which` is `width`, `height`, or `both`; default `both`. |
| `pheno:scale` | `which`, `min`, `max` | Tests Townstead/MCA scale factors. Non-villager entities read as scale `1.0`; `which` defaults to `both`. |
| `pheno:velocity` | `axis`, `min`, `max` | Tests velocity. `axis` is `x`, `y`, `z`, `horizontal`, or `total`; default `total`. |
| `pheno:fluid_height` | `fluid`, `min`, `max` | Tests the entity's height in a fluid tag. `fluid` is required and is interpreted as a fluid tag id. |

## Identity, Roots, And Abilities

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:entity_type` | `entity_type`, `tag` | Tests an exact entity type or an entity type tag. `tag` takes priority. |
| `pheno:in_tag` | `tag` | Alias-style entity type tag check. |
| `pheno:entity_group` | `group` | Tests the expressed creature group, such as `default`, `undead`, `arthropod`, `illager`, or `aquatic`. |
| `pheno:root` | `root` | Tests the entity's current root id. |
| `pheno:ability` | `ability` | True when an innate ability is currently active. |
| `pheno:toggled` | `gene` | True while a toggle gene is switched on. |

Known ability keys are `climbing`, `water_breathing`, `fire_immunity`, `night_vision`, `slow_fall`, `lava_vision`, `invisibility`, `swimming`, `walk_on_fluid`, `ignore_water`, `hover`, `sprinting`, `aerial_affinity`, `grounded`, `elytra_flight`, `creative_flight`, and `phasing`.

## Inventory, Effects, And Resources

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:gamemode` | `gamemode` | Player-only. Tests `survival`, `creative`, `adventure`, or `spectator`. |
| `pheno:equipped_item` | `slot`, `item_condition` | Tests an equipment slot. `slot` defaults to `mainhand`; valid slots include `mainhand`, `offhand`, `head`, `chest`, `legs`, and `feet`. If `item_condition` is omitted, the condition only checks that the slot is occupied. |
| `pheno:inventory` | `item_condition`, `min`, `max` | Player-only. Counts matching items across the inventory. `min` defaults to `1`; `max` has no practical default limit. |
| `pheno:on_cooldown` | `item` | Player-only. Tests whether an item is currently on cooldown. |
| `pheno:status_effect` | `effect`, `min_amplifier` | Tests an active status effect. `min_amplifier` defaults to `0`. |
| `pheno:status_effect_tag` | `tag`, `min_count` | Counts active effects in a mob-effect tag. `min_count` defaults to `1`. |
| `pheno:since_spawn` | `comparison`, `value` | Compares ticks since the entity's first server-side evaluation. The shared first-seen stamp is saved in entity data; defaults are `comparison: >=`, `value: 0`. |
| `pheno:resource` | `resource`, `min`, `max` | Tests the value of a resource gene. |
| `pheno:compare_resource` | `resource`, `comparison`, `compare_to`, `compared_to_resource` | Compares one resource gene to a fixed value or to another resource gene. `comparison` defaults to `>=`; `compare_to` defaults to `0`. |

### Item Conditions

Nested `item_condition` objects support `"inverted": true`.

| Type | Fields | Description |
| --- | --- | --- |
| `amount` | `min`, `max` | Tests stack count. Defaults are `min: 1`, no practical max. |
| `empty` | none | True when the stack is empty. |
| `is_damageable` | none | True when the item can take durability damage. |
| `enchantable` | none | True when the item can be enchanted. |
| `durability` | `min`, `max` | Tests remaining durability points. |
| `relative_durability` | `min`, `max` | Tests remaining durability fraction from `0` to `1`; non-damageable items read as `1`. |
| `ingredient` | `item`, `tag` | Tests an item id or item tag. `tag` takes priority. |
| `food` | none | True when the item is food. |
| `fireproof` | none | True when the item is fire resistant. |
| `enchantment` | `enchantment`, `min` | Tests an enchantment level; without `enchantment`, tests whether the stack is enchanted at all. `min` defaults to `1`. |
| `base_enchantment` | `enchantment`, `min` | Alias-style enchantment check. |
| `and` | `conditions` | True when every child item condition passes. |
| `or` | `conditions` | True when any child item condition passes. |
| `constant` | `value` | Always returns `value`; defaults to `true`. |

## Bi-Entity Conditions

`pheno:actor_condition`, `pheno:target_condition`, `pheno:both`, `pheno:either`, `pheno:invert`, `pheno:undirected`, `pheno:distance`, `pheno:relative_rotation`, `pheno:collection_contains`, `pheno:collection_count`, `pheno:compare_dimensions`, `pheno:compare_scales`

Bi-entity conditions test an actor and a target.

### Simple Relationships

These take no fields beyond `type`.

| Type | True When |
| --- | --- |
| `pheno:attack_target` | The actor is a mob whose current attack target is the target. |
| `pheno:attacker` | The actor's last hurt-by mob is the target. |
| `pheno:can_see` | The actor has line of sight to the target. |
| `pheno:equal` | Actor and target are the same entity. |
| `pheno:owner` | The actor is ownable and its owner is the target. |
| `pheno:prime_adversary` | The target's kill credit entity is the actor. |
| `pheno:riding` | The actor is directly riding the target. |
| `pheno:riding_root` | The actor's root vehicle is the target. |
| `pheno:riding_recursive` | The target appears anywhere in the actor's vehicle chain. |

### Relationship Measurements

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:distance` | `min`, `max` | True when actor-target distance is within the range. Defaults: `min: 0`, no practical max. |
| `pheno:relative_rotation` | `max_angle` | True when the target is within `max_angle` degrees of the actor's look direction. Defaults to `90`. |

### Actor And Target Wrappers

These run an entity condition against one or both entities.

| Type | Field | Description |
| --- | --- | --- |
| `pheno:actor_condition` | `condition` | Applies the condition to the actor. |
| `pheno:target_condition` | `condition` | Applies the condition to the target. |
| `pheno:both` | `condition` | True when the condition passes for both actor and target. |
| `pheno:either` | `condition` | True when the condition passes for either actor or target. |

Directional wrappers take a nested bi-entity `condition`:

| Type | Description |
| --- | --- |
| `pheno:invert` | Swaps actor and target before testing the inner condition. |
| `pheno:undirected` | Tests the inner condition both ways and passes if either direction passes. |

### Size, Scale, And Collections

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:compare_dimensions` | `which`, `comparison` | Compares actor bounding-box size against target size. `which` is `width`, `height`, or `both`; default `both`. |
| `pheno:compare_scales` | `which`, `comparison` | Compares actor scale against target scale. `which` is `width`, `height`, or `both`; default `both`. |
| `pheno:collection_contains` | `collection` | True when the target is present in the actor's collection store. |
| `pheno:collection_count` | `collection`, `comparison`, `compare_to` | Compares the target's tally in the actor's collection. Defaults: `comparison: >=`, `compare_to: 1`. |
