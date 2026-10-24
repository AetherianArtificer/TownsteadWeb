---
title: Story Tools
description: Pheno conditions, values and actions made for stories, and story items.
---

These Pheno types are made for stories and Personas. Use them in named [conditions and actions](/stories/conditions-actions/), in [goals](/stories/quests/#goals), and in [rewards](/stories/quests/#rewards). They work anywhere else that Pheno does, too.

In a story, the action or condition runs on the teller, and the player is `other`. Types that need a player use the player wherever they are.

## Conditions

### `pheno:persona_roll`

True when the world rolled this value for a Persona. False while the Persona has not rolled it yet.

```json
{ "type": "pheno:persona_roll", "persona": "examplepack:old_sailor", "roll": "home_port", "value": "north" }
```

| Field | Description |
| --- | --- |
| `persona` | The Persona ID. |
| `roll` | The roll's name. |
| `value` | A value, or a list of values (any of). |
| `contains` | Instead of `value`: matches one entry of a comma-separated value, such as `"farmer"` in `"farmer,cook"`. |

### `pheno:near_marker`

True when the entity is within `radius` blocks of a place marked with [`pheno:mark_structure`](#phenomark_structure). For a player, their own mark. For a villager, the mark of the `other` player, such as a Persona who travels with you.

```json
{ "type": "pheno:near_marker", "key": "old_wreck", "radius": 48 }
```

The default `radius` is 48.

### `pheno:in_work_area`

True when a position is inside a work area.

```json
{ "type": "pheno:in_work_area", "area": "townstead:field_post", "at": "job_site" }
```

| Field | Description |
| --- | --- |
| `area` | `townstead:field_post`: the ground that a Field Post plans. `townstead:field_post_soil`: the cells that a Field Post plan marks as soil. Without `area`, any work area. |
| `at` | `self` (default): where the entity stands. `job_site`: the entity's workstation, or where it stands when it has none. |

### `pheno:mod_loaded`

True when a mod is installed. With a list, when any of them is.

```json
{ "type": "pheno:mod_loaded", "mod": ["examplefishingmod", "otherfishingmod"] }
```

In Ink, use [`mod()`](/stories/ink/#reading-the-world).

### `pheno:can_build`

True when this modpack can build a building: a building type matches, and every block it needs exists. A plain name matches every tier from every mod, so `kitchen` matches any kitchen. A name with `/` is an exact building type. With a list, when any of them can be built.

```json
{ "type": "pheno:can_build", "building": ["tavern", "cafe"] }
```

Use this rather than `pheno:mod_loaded` when content needs a building, not one mod. Several mods can add a kitchen.

### `pheno:rest_day`

True when the villager has at least one day in their weekly schedule with no work hours. With `"village": true`, when every working resident of the villager's village has one.

```json
{ "type": "pheno:rest_day", "village": true }
```

### `pheno:village` for Stories

[`pheno:village`](/pheno/conditions/) has three more fields that stories use often:

| Field | True when |
| --- | --- |
| `has_building` | The village has a building of this type. A name or a list (any of). A plain name matches every tier from every mod. |
| `player_founded` | `true`: a player started the village. `false`: the village was already there. |
| `min_free_beds` | The village has at least this many beds that nobody lives in. |

### `pheno:chronicle_count`

True when a Chronicle counter is in a range. Stories use counters to leave marks that other stories read.

```json
{ "type": "pheno:chronicle_count", "key": "examplepack:heard_the_legend", "at_least": 1 }
```

| Field | Description |
| --- | --- |
| `key` | The counter. |
| `at_least` | The default is 1. |
| `at_most` | Optional. |

Counters are on the server only. Do not use this condition for anything the client must show.

### `pheno:persona`

True when the villager is a Persona. With `persona`, true only for that Persona.

```json
{ "type": "pheno:persona", "inverted": true }
```

| Field | Description |
| --- | --- |
| `persona` | Optional. A Persona ID, such as `examplepack:old_sailor`. |

Use it with `"inverted": true` when an action picks villagers at random, so that it does not pick a Persona.

## Values

### `pheno:standing`

How much the entity counts in the town it stands in. 0 outside any town's range.

```json
{ "type": "pheno:standing", "source": "deeds" }
```

| `source` | Counts |
| --- | --- |
| `total` (default) | All of the parts below. |
| `hearts` | The residents' hearts toward the entity. |
| `deeds` | What the entity has built in the town. |
| `reputation` | The entity's reputation in the town, from a reputation mod when one is installed. |

It makes a good [arrival goal](/stories/persona-files/#arrival): `"value": {"type": "pheno:standing"}, "target": 20`.

## Actions

### `pheno:add_count`

Adds to a Chronicle counter. With `"on": "other"`, on the player.

```json
{ "type": "pheno:add_count", "key": "examplepack:heard_the_legend", "on": "other", "amount": 1 }
```

The default `amount` is 1. Read the counter with [`pheno:chronicle_count`](#phenochronicle_count).

### `pheno:introduce_persona`

Another Persona arrives in this village some days later, as if the teller wrote to a friend.

```json
{ "type": "pheno:introduce_persona", "persona": "examplepack:net_maker", "delay_days": [1, 2] }
```

| Field | Description |
| --- | --- |
| `persona` | The Persona ID. |
| `delay_days` | A number of days, or a `[min, max]` range. |

Nothing happens when the Persona already lives there, is already on the way, or the player has met them before.

### `pheno:share_family_name`

The teller tells the player their family name. For a Persona with `"family_name": "told"`, the player sees the family name from now on. See [Names](/stories/persona-files/#names).

```json
{ "type": "pheno:share_family_name" }
```

### `pheno:mark_structure`

Sends the player somewhere. Townstead finds the nearest structure from a tag, between `min` and `max` blocks away, remembers it for the player under `key`, and gives them a map with the place marked.

```json
{
  "type": "pheno:mark_structure",
  "key": "old_wreck",
  "structures": "#minecraft:shipwreck",
  "min": 300,
  "max": 900,
  "map_name": "A map drawn from memory"
}
```

| Field | Description |
| --- | --- |
| `key` | Required. The name of the mark, for `pheno:near_marker` and goal `marker`. |
| `structures` | A structure tag. The default is `#townstead:story_ruins`: trail ruins and pillager outposts. |
| `min`, `max` | The distance band, in blocks. The defaults are 500 and 1500. |
| `fallback` | A structure template to place in the band when no structure from the tag is found. The default is a small ruined house. |
| `map` | `false` to give no map. The default is `true`. |
| `map_name` | The map's name, as a translation key. Plain text also works, in one language only. |

It runs once for each key and player. Later runs do nothing.

A goal with `"marker": "old_wreck"` shows the place in the Quest Ledger, with `{x}` and `{z}` in its text.

### `pheno:give_story_item`

Gives the player a [story item](#story-items). With `"drop": true`, the item drops at the feet of the teller instead.

```json
{ "type": "pheno:give_story_item", "item": "examplepack:old_letter", "count": 1 }
```

### `pheno:take_items`

Takes items from the player, such as for a delivery. It takes nothing and fails when the player carries fewer than `count`.

```json
{ "type": "pheno:take_items", "item": "minecraft:cod", "count": 10 }
```

Name the items with one of `item`, `tag` or `story_item`.

### `pheno:start_ritual`

Starts a ritual at the altar of the order in the teller's village. With `"on": "other"`, the player is the candidate. Without it, the teller is the candidate.

```json
{ "type": "pheno:start_ritual", "ritual": "examplepack:guild_oath", "on": "other" }
```

| Field | Description |
| --- | --- |
| `ritual` | The ritual ID. |
| `on` | `self`, the default, or `other`. |

The action fails when the ritual cannot start, for example when the candidate is too far from the altar. A player candidate sees the reason. Use the result of [`act()`](/stories/ink/#actions) to choose the next line.

## Story Items

A story item is an ordinary item with its own name and text, such as a letter, a keepsake or a key. Stories can recognize it later.

```text
data/<namespace>/story_item/<name>.json
```

```json
{
  "schema": "townstead:story_item/v1",
  "base": "minecraft:paper",
  "name": { "translate": "story_item.examplepack.old_letter" },
  "lore": [ "Sealed with blue wax." ],
  "glint": true
}
```

| Field | Description |
| --- | --- |
| `schema` | Required. Must be `townstead:story_item/v1`. |
| `base` | Required. The item it is made from. |
| `name` | Required. The item's name. |
| `lore` | Lines of description. |
| `custom_model_data` | A number for a resource pack's own model. |
| `glint` | `true` for the enchantment shine. |
| `book` | For a `minecraft:written_book` base: `title`, `author` and `pages`. |

Text is a plain string, `{"text": "..."}`, or `{"translate": "<key>", "with": [...]}`. Townstead makes the text in the player's language when it gives the item.
