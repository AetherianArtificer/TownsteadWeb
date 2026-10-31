---
title: Context Tags
description: "The tags that Townstead works out for each villager, for context triggers and required tags."
---

Townstead works out these tags for each villager at each scan. Use them in context triggers and in `required_tags`.

## Needs and State

| Tags | Meaning |
| --- | --- |
| `hungry`, `peckish` | Hunger is below the emergency or adequate level. |
| `thirsty`, `parched` | Hydration is below the emergency or adequate level. |
| `exhausted`, `drowsy`, `tired` | Fatigue has passed that level. |
| `body_cold`, `body_hot` | The villager's body is cold or hot enough to need relief. Needs a temperature mod. |
| `feeling_cold`, `feeling_hot` | The villager feels cold or hot. Needs a temperature mod. |
| `unemployed` | The villager has no profession. |
| `at_workstation` | The villager is near their workstation. |
| `pregnant` | MCA reports the villager as pregnant. |
| `alone` | No other villagers are near. |
| `in_crowd` | At least three other villagers are near. |
| `near_baby_villager` | A baby or toddler villager is near. |

## Family and Villagers

| Tags | Meaning |
| --- | --- |
| `is_married`, `is_engaged`, `is_promised` | The villager has that MCA relationship. |
| `near_spouse`, `near_parent`, `near_family` | That family member is near. |
| `near_working_villager`, `near_resting_villager`, `near_meeting_villager` | Another villager within about 12 blocks is scheduled to work, rest, or meet. |

## Players

| Tags | Meaning |
| --- | --- |
| `near_player_friend` | A player near the villager has at least 30 hearts with them. |
| `near_player_stranger` | A player near the villager has between -10 and 30 hearts. |
| `near_player_disliked` | A player near the villager has -10 hearts or less. |
| `near_player_spouse` | The villager's player spouse is near. |
| `being_watched_by_player` | A player near the villager looks at them. |
| `player_holding:<item>` | A player near the villager holds that item, by its path, such as `player_holding:diamond`. |
| `player_holding_tag:<namespace>:<tag>` | A player near the villager holds an item in that item tag. |
| `in_dialogue_with_player` | The dialogue screen is open for the villager. |
| `dialogue_just_ended` | Dialogue with the villager ended in the last three seconds. |
| `heart_increased`, `heart_decreased` | The hearts of the villager with a player went up or down a short time ago. |

## Threats

| Tags | Meaning |
| --- | --- |
| `near_zombie_villager` | A zombie villager is near. |
| `near_mob_threat` | A hostile mob is near. |
| `outsider_present` | An illager is near. |
| `raid_active` | A raid is active at the villager's position. |
| `near_grave` | An MCA tombstone is within 16 blocks. |

## Nearby Reactions

| Tag | Meaning |
| --- | --- |
| `near_reacting:<namespace>:<reaction>` | A villager near this one is locked by that reaction. |
| `near_reacting_tag:<tag>` | A villager near this one is locked by a reaction with that tag. |

For example, while a reaction with the tag `dancing` locks a villager, the villagers near them get `near_reacting_tag:dancing`. A choice with `allow_movement` does not lock, so it does not make these tags.

## Time and Schedule

| Tags | Meaning |
| --- | --- |
| `dawn`, `day`, `dusk`, `night` | The time of day. |
| `early_morning`, `morning`, `noon`, `afternoon`, `evening`, `late_night` | The part of the day, from 5 to 7, 8 to 11, 12 to 13, 14 to 16, 17 to 20, and 21 to 4. |
| `hour:<0-23>` | The hour of the day. |
| `day:<number>` | The world day. |
| `on_shift:<name>` | The villager's current shift: `idle`, `work`, `meet`, or `rest`. |
| `shift_custom` | A player has changed the villager's shifts. |

## Weather and Place

| Tags | Meaning |
| --- | --- |
| `raining`, `thundering` | The weather. |
| `under_open_sky`, `under_roof` | Whether the villager can see the sky. |
| `in_dark` | Block light and sky light are both below 4. |
| `near_water`, `near_lava` | That fluid is near. |
| `near_music` | A jukebox or other music source plays within 12 blocks. |
| `freezing`, `cold`, `temperate`, `hot` | The vanilla temperature of the biome. |
| `biome:<namespace>:<biome>` | The biome. |
| `dimension:<namespace>:<dimension>` | The dimension. |
| `in_building:<type>` | The MCA building type that the villager is in, without its namespace. |

## Damage Tags

A `damage` trigger adds these tags for that reaction only:

| Tags | Meaning |
| --- | --- |
| `damage`, `damage_role:<role>` | The reaction comes from damage, and the villager's role. |
| `damage_source:<id>` | The damage source ID. |
| `damage_fire`, `damage_explosion` | The damage is fire or an explosion. |
| `attacker_player`, `attacker_villager`, `attacker_monster`, `attacker_person` | Who attacked. A person is a player or a villager. |
| `victim_player`, `victim_villager`, `victim_monster`, `victim_person` | Who was hurt. |

A `chronicle_learned` trigger adds `chronicle:<template>` and `learned_via:<channel>`.
