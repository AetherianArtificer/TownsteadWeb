---
title: Storage
description: Tell villagers which blocks are storage, what each shelf is for, and which buildings a trade prefers.
---

Villagers take ingredients from storage and put finished goods back into it. Townstead reads from data which blocks are storage, so you can support a new mod with a data pack. You do not need to change code.

Mistakes are easy to see in the game. If Townstead treats a machine as storage, villagers put spare items into it, and take ingredients back out of it. If Townstead treats storage as a machine, villagers never use it.

Storage has two parts, and this page describes both:

- A **storage role** says what one block is for.
- A **building storage role** says what a whole building holds. A Career can then use the correct building when its own shelves are full.

## File Location

```text
data/<namespace>/storage_role/<name>.json
```

You choose the file name. It must be unique in your namespace. One file works on both 1.20.1 and 1.21.1.

## Minimal Example

```json
{
  "schema": "townstead:storage_role/v1",
  "role": "not_storage",
  "blocks": ["examplemod:dough_mixer"]
}
```

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Recommended | `townstead:storage_role/v1`. If the schema is wrong, Townstead rejects the whole file. |
| `role` | Yes | One of the roles below. Townstead rejects any other value. |
| `blocks` | One selector required | Block IDs, or block tags with a `#` in front. |
| `namespaces` | One selector required | Full mod namespaces. The rule matches every block in them. |
| `except` | No | Block IDs or `#` block tags that the rule does not apply to. Use it mainly to keep real containers out of a `not_storage` rule for a whole namespace. |
| `mods` | No | Townstead uses the file only when the named mods are installed. |

You need at least one entry in `blocks` or `namespaces`. An empty list does not mean "all blocks". Townstead rejects a file that selects no blocks.

## Roles

| `role` | Meaning | What villagers use it for |
| --- | --- | --- |
| `storage` | A general shelf. | Taking ingredients and putting away anything, at normal priority. |
| `inputs` | Ingredients and supplies that villagers use up. | Taking ingredients, before they look in a general shelf. |
| `outputs` | Finished products. You can also write `finished_goods`. | Putting away results. Villagers never take ingredients from it. |
| `tools` | Tools that villagers use again and again. | Taking and returning tools. |
| `reserves` | Emergency stock. | Ingredients and tools, only after the usual stores are empty. |
| `personal` | Private items. You can also write `personal_storage`. | Personal errands only. Nothing for work. |
| `not_storage` | A machine, or a place that villagers must not use. | Nothing. |

Townstead also accepts the singular forms `input`, `output`, `tool`, and `reserve`.

Townstead includes one file for each role that reads a block tag. So a pack can give a block a role by adding it to the tag, without a new file:

```text
#townstead:storage_roles/inputs
#townstead:storage_roles/finished_goods
#townstead:storage_roles/tools
#townstead:storage_roles/reserves
#townstead:storage_roles/personal
```

## Mod Gating

`mods` uses the same expression grammar as all other Townstead files:

```json
{
  "schema": "townstead:storage_role/v1",
  "mods": "farm_and_charm",
  "role": "not_storage",
  "blocks": ["farm_and_charm:feeding_trough"]
}
```

```json
"mods": ["farmersdelight", "rusticdelight"]
"mods": { "any": ["chefsdelight", "vca"] }
"mods": { "not": "someconflict" }
```

When the gate is not met, Townstead ignores the file. This is different from a block that is not installed, which makes the file malformed.

## How A Block Is Decided

Townstead checks the rules in order, and uses the first rule that matches:

| Order | Rule | Result |
| --- | --- | --- |
| 1 | The player's protected-storage config | Not storage |
| 2 | A `not_storage` declaration | Not storage |
| 3 | Any other storage-role declaration | That role |
| 4 | The block is a declared workstation | Not storage |
| 5 | Townstead's fallback guesses | Usually not storage |

This order has three results:

**A workstation declaration is enough.** If you include a workstation file for your block, Townstead already treats it as a machine. Do not also write a `not_storage` file for it. Then you would have two files to update, and they could disagree.

**A role comes before a workstation.** If a block is a declared workstation and also a `tools` shelf, villagers use it as a tool shelf, but only for tools. When a machine is also a rack, villagers put in only what its role allows, not everything that its inventory accepts.

**Deny comes before allow.** If one pack says storage and another pack says not storage, villagers do not use the block. This is the safer choice, because items can disappear into a machine that Townstead treats as storage.

## The Fallback Guesses

When no data describes a block, Townstead guesses. It skips a block when it is not sure, so that villagers do not fill a machine with soup. Townstead skips:

- anything with a furnace block entity;
- anything in `#minecraft:campfires`;
- a block whose ID contains `machine`, `vending`, `terminal`, `interface`, `generator`, `engine`, `press`, `crusher`, `grinder`, `centrifuge`, `assembler`, or `processor`.

The last rule is simple on purpose. It keeps villagers away from the machines of a mod that Townstead does not know. It matches those words anywhere in the ID, so Townstead skips a block called `oak_storage_press`, even if it is a chest.

**To correct a wrong guess, write a `storage` file for the block.** Data always comes before a guess.

A namespace rule can treat all blocks of a mod as machines, with exceptions for its containers:

```json
{
  "schema": "townstead:storage_role/v1",
  "mods": "examplemod",
  "role": "not_storage",
  "namespaces": ["examplemod"],
  "except": ["examplemod:freezer", "#examplemod:storage"]
}
```

The exceptions apply only to that rule. A different `not_storage` rule can still exclude the same block, because deny rules come before allow rules.

## Building Storage Roles

A building can declare what it holds in its [extended-building sidecar](/packs/buildings/):

```json
{
  "schema": "townstead:extended_building/v1",
  "storage_roles": ["townstead:general"]
}
```

Each entry is a resource ID that names a role. Townstead includes `townstead:general` for a village store. Its own buildings also use `townstead:materials`, `townstead:textiles`, `townstead:documents`, `townstead:equipment`, `townstead:medical`, `townstead:brewed_drinks`, `townstead:wine`, `townstead:heating_fuel`, and `townstead:cooling_fuel`. A pack can add any ID. The ID must be the same in the building and in the Career that prefers it.

## Profession Storage Preferences

A worker always looks in the shelves of their own workplace first. When those shelves are empty or full, the worker looks in other buildings. A Career names the buildings that it prefers with `storage` in `work.json`:

```json
{
  "schema": "townstead:profession_work/v1",
  "storage": {
    "preferred_roles": ["townstead:heating_fuel", "townstead:cooling_fuel"]
  }
}
```

The order is the preference. A building with `townstead:heating_fuel` comes before a building with `townstead:cooling_fuel`. A building with `townstead:general` comes after both. The worker does not use a building that has none of these roles.

A Path can have its own `storage` object in `path.json`. A villager on that Path uses the Path preference. Other villagers use the Career preference. A [Career provider](/careers/career-providers/) can supply either one.

`storage` accepts only `preferred_roles`. Townstead rejects container block IDs and building names, because a preference describes what a building is for, not which chest is in it.

## Worked Example

A mod adds a pantry cabinet and a dough mixer. The mixer has an inventory, so without data, villagers would use it as a shelf.

```json title="data/examplemod/storage_role/pantry.json"
{
  "schema": "townstead:storage_role/v1",
  "role": "inputs",
  "blocks": ["examplemod:pantry_cabinet"]
}
```

```json title="data/examplemod/storage_role/mixer.json"
{
  "schema": "townstead:storage_role/v1",
  "role": "not_storage",
  "blocks": ["examplemod:dough_mixer"]
}
```

If the mod already has a workstation file for the mixer, you do not need the second file. The station declaration is enough.

## Troubleshooting

Townstead logs each rejected file with the reason. Look for `storage role ... rejected` or `Invalid storage role ...` in the log.

When a file loads but has no effect, the cause is usually a `mods` gate that is not met, or a typing error in a block ID. A typing error here does not stop the data pack from loading, as it does in a block tag. Check the ID against the registry of the mod.
