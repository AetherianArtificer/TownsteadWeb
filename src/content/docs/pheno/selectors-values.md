---
title: Selectors & Values
description: How Pheno chooses entities, blocks, item stacks, places, collections, and runtime numbers.
---

Selectors choose entities or blocks for later work. Values provide runtime numbers for conditions and actions that accept object-form numeric sources.

Selectors are used by action `on`, condition selection tests, `pheno:at` block selection, block action `on`, item action `on`, and value sources such as `pheno:count`.

## Shared Selector Forms

Entity and block selectors both understand spatial shorthand before they look for a typed selector.

| Form | Description |
| --- | --- |
| `"here"` | The current focus block. For entity selection, this means living entities in that block-sized region, excluding the current focus entity. |
| `"above"` / `"below"` | The block above or below the focus block. |
| `"in_front"` / `"front"` | The neighboring block in the current entity's facing direction. Requires an entity focus. |
| `"behind"` / `"back"` | The neighboring block behind the current entity. Requires an entity focus. |
| `"left"` / `"right"` | The neighboring block to the side of the current entity. Requires an entity focus. |
| `"looking_at"` / `"aim"` | The block the current entity is looking at, up to 6 blocks away. Requires an entity focus and a block hit. |
| `{ "offset": [x, y, z] }` | A block offset from the current focus block. |
| `{ "at": [x, y, z] }` | An absolute block position. |
| `{ "radius": r }` | A spherical region around `here`, with radius `r`. |
| `{ "radius": [x, y, z] }` | A box region around `here`, with independent half-extents. |
| `{ "radius": ..., "around": ... }` | A region centered around another place form. |
| `[ ... ]` | Union of multiple selectors. Duplicates are removed for entity and block selectors. |

For entity regions, optional `where`, `limit`, and `order` fields can filter and sort results:

| Field | Description |
| --- | --- |
| `where` | Optional entity condition applied to each candidate. |
| `limit` | Optional maximum result count. `0` or missing means no cap. |
| `order` | `any`, `nearest`/`closest`, `farthest`/`furthest`, or `random`. Defaults to `any`. |

For block regions, optional `where` and `limit` fields can filter positions:

| Field | Description |
| --- | --- |
| `where` | Optional block condition applied to each block position. |
| `limit` | Optional maximum result count. `0` or missing means no cap. Block enumeration has an internal cap of 8192 positions. |

## Entity Selectors

Entity selector strings can also name a role:

| Role Names | Result |
| --- | --- |
| `self`, `each`, `it` | Current focus entity. |
| `origin`, `bearer`, `actor` | Original power bearer. |
| `attacker`, `target`, `other`, `victim`, `counterpart` | Contextual counterpart, when one exists. |
| `owner` | Owner of an ownable current entity. |
| `vehicle` | Living vehicle the current entity is riding. |
| `passenger` | First living passenger of the current entity. |

Typed entity selectors:

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:command` | `selector` | Uses vanilla command selector syntax such as `@e[type=minecraft:zombie,distance=..8]`. Parsed once at load; returns only living entities. Requires a server-side entity focus. |
| `pheno:ray` | ray fields | Selects the first living entity hit by a ray, or all hits when `pierce: true`. Entities behind the first block collision are not selected. |
| `pheno:collection` | `collection` | Selects live entity members from a collection on the focus entity. Gone or unloaded members are skipped. |

## Block Selectors

Block selectors use the shared spatial forms above. Typed block selectors:

| Type | Fields | Description |
| --- | --- | --- |
| `pheno:ray` | ray fields | Selects the first block hit by a ray. Returns no positions if the ray reaches its end without hitting a block. |
| `pheno:collection` | `collection` | Selects stored block positions from a collection on the focus entity. Entries that no longer decode are skipped. |

## Ray Fields

`pheno:ray` is used by both entity and block selectors, and by `pheno:beam`.

| Field | Description |
| --- | --- |
| `distance` | Maximum ray distance. Defaults to `6`, unless `toward` is used; then the default distance is the distance to the target. |
| `pierce` | Entity selector only. When `false`, returns the nearest entity hit; when `true`, returns all entity hits before the first block. Defaults to `false`. |
| `direction` | Optional `[x, y, z]` vector. If omitted, the ray uses the actor's look direction. Invalid arrays fall back to `[0, 0, 1]`. |
| `space` | `world` or `local`. With `local`, direction means `x` right, `y` up, `z` forward relative to the actor. Defaults to `world`. |
| `toward` | Optional role name. Aims the ray at that role's first resolved entity. If `distance` is omitted or `0`, the ray length becomes the distance to that target. |

Ray origins are the current entity's eye position. Entity hits are pickable, alive living entities other than the current focus.

## Item Selectors

Item selectors are used by item action `on` fields. Empty stacks are skipped.

| Form | Description |
| --- | --- |
| `"held"`, `"main_hand"`, `"mainhand"`, `"hand"` | Main-hand stack. |
| `"off_hand"`, `"offhand"` | Off-hand stack. |
| `"head"`, `"helmet"` | Head slot. |
| `"chest"`, `"chestplate"` | Chest slot. |
| `"legs"`, `"leggings"` | Legs slot. |
| `"feet"`, `"boots"` | Feet slot. |
| `"inventory"` | All non-empty player inventory stacks. Returns nothing for non-player holders. |
| `{ "slot": "..." }` | Slot object form using the same slot names. |
| `{ "where": { ... } }` | Player inventory stacks filtered by an item condition. |
| `[ ... ]` | Concatenates multiple item selectors. |

## Collections As Selectors

`pheno:collection` resolves differently by selector domain:

| Domain | Selected Members |
| --- | --- |
| Entity selector | Live entity members stored in the focus entity's collection. |
| Block selector | Block positions stored in the focus entity's collection. |

Collections can also store item ids and literal keys, but those do not select live targets. They are read through collection conditions and collection actions instead.

## Values

Numeric fields that accept values can be either a JSON number or a typed value object.

| Form | Description |
| --- | --- |
| `4` | Constant numeric value. |
| `{ "type": "pheno:count", "on": ... }` | Counts selected entities and returns the count. `on` is an entity selector. |

`pheno:count` currently counts entity selectors. For block counts, use condition/action logic that operates in a block selector context rather than the numeric value source.
