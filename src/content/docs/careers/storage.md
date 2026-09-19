---
title: Storage
description: Tell villagers which blocks are storage, what each shelf is for, and which buildings a trade prefers.
---

Villagers fetch ingredients from storage and put finished goods back into it. Townstead decides what counts as storage from data, so supporting a new mod is a data pack rather than a code change.

Getting this wrong is visible in game. A block wrongly treated as storage becomes somewhere villagers dump spare items and pull staged ingredients back out of. A block wrongly treated as a machine is simply never used.

Storage has two layers. A **storage role** says what one block is for. A **building storage role** says what a whole building holds, so a Career can prefer the right building when its own shelves are full. Both are described on this page.

## File Location

```text
data/<namespace>/storage_role/<name>.json
```

The file name is yours and only has to be unique within your namespace. One file works on both 1.20.1 and 1.21.1.

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
| `schema` | Recommended | Identifies the file as a Townstead storage-role document. Declaring the wrong one refuses the file rather than half-reading it. |
| `role` | Yes | One of the roles below. Any other value refuses the file. |
| `blocks` | One selector required | Block IDs, or block tags prefixed with `#`. |
| `namespaces` | One selector required | Complete mod namespaces. The rule matches every block registered in one of them. |
| `except` | No | Block IDs or `#` block tags excluded from this rule. This is chiefly useful for rescuing real containers from a namespace-wide `not_storage` rule. |
| `mods` | No | Only apply this file when the named mods are installed. |

At least one entry in `blocks` or `namespaces` is required. Empty selector lists do not mean “everything”; a document with no effective selector is refused.

## Roles

| `role` | Meaning | Villagers use it for |
| --- | --- | --- |
| `storage` | A general shelf. | Reading ingredients and depositing anything, at ordinary priority. |
| `inputs` | Ingredients and consumable supplies. | Reading ingredients first, before a general shelf. |
| `outputs` | Completed products. Also accepted as `finished_goods`. | Depositing results. Its contents are never read as ingredients. |
| `tools` | Reusable implements. | Fetching and returning tools. |
| `reserves` | Emergency stock. | Ingredients and tools, consulted only after ordinary stores are exhausted. |
| `personal` | Private belongings. Also accepted as `personal_storage`. | Nothing profession-related. Personal errands only. |
| `not_storage` | A machine, or simply somewhere villagers keep out of. | Nothing. |

`input`, `output`, `tool`, and `reserve` are accepted as singular spellings.

Townstead ships one document per role that reads a block tag, so a pack can label a block by adding it to the tag instead of writing a document:

```text
#townstead:storage_roles/inputs
#townstead:storage_roles/finished_goods
#townstead:storage_roles/tools
#townstead:storage_roles/reserves
#townstead:storage_roles/personal
```

## Mod Gating

`mods` uses the same expression grammar as every other Townstead document:

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

A file whose gate is unmet simply does not exist. This is different from naming a block that is not installed, which is a malformed document.

## How A Block Is Decided

Rules are checked in order. The first that matches wins.

| Order | Rule | Result |
| --- | --- | --- |
| 1 | The player's protected-storage config | Not storage |
| 2 | A `not_storage` declaration | Not storage |
| 3 | Any other storage-role declaration | That role |
| 4 | The block is a declared workstation | Not storage |
| 5 | Townstead's fallback guesses | Usually not storage |

Three consequences are worth knowing.

**Declaring a workstation is enough.** If you ship a workstation file for your block, it is already understood to be a machine. Do not write a `not_storage` document for it as well. That would be a second place to remember to update, and the two can then disagree.

**A role beats a workstation.** A block that is both a declared workstation and a labelled `tools` shelf is used as a tool shelf, but only for tools. A machine that doubles as a rack accepts what its role allows, not what its inventory would accept.

**Deny wins over allow.** If one pack says storage and another says not storage, villagers leave the block alone. That is the safer direction, because the cost of treating a machine as storage is items disappearing into it.

## The Fallback Guesses

When nothing has been stated, Townstead guesses, and prefers to skip a block rather than risk filling a machine with soup:

- anything with a furnace block entity
- anything in `#minecraft:campfires`
- a block ID containing `machine`, `vending`, `terminal`, `interface`, `generator`, `engine`, `press`, `crusher`, `grinder`, `centrifuge`, `assembler`, or `processor`

That last rule is crude on purpose. It exists to keep villagers out of an unfamiliar mod's equipment, and it matches those words anywhere in the ID, so a block called `oak_storage_press` gets skipped even though it is a chest.

**Any block a guess catches wrongly is rescued by a `storage` document.** Data always beats a guess.

A namespace rule can cover a mod whose blocks are machines by default and leave explicit exceptions for its containers:

```json
{
  "schema": "townstead:storage_role/v1",
  "mods": "examplemod",
  "role": "not_storage",
  "namespaces": ["examplemod"],
  "except": ["examplemod:freezer", "#examplemod:storage"]
}
```

The exceptions apply only to that declaration. Another `not_storage` rule may still exclude the same block, because deny rules win over allow rules.

## Building Storage Roles

A building can declare what it holds in its [extended-building sidecar](/packs/buildings/):

```json
{
  "schema": "townstead:extended_building/v1",
  "storage_roles": ["townstead:general"]
}
```

Each entry is a resource ID naming a semantic role. Townstead ships `townstead:general` for a village store and uses `townstead:materials`, `townstead:documents`, `townstead:equipment`, `townstead:medical`, `townstead:brewed_drinks`, `townstead:wine`, `townstead:heating_fuel`, and `townstead:cooling_fuel` in its own buildings. A pack may introduce any ID; it only needs to match between the building and the Career that prefers it.

## Profession Storage Preferences

A worker's own workplace shelves are always searched first. When they are empty or full, the worker looks at other buildings. A Career states which buildings it prefers with `storage` in `work.json`:

```json
{
  "schema": "townstead:profession_work/v1",
  "storage": {
    "preferred_roles": ["townstead:heating_fuel", "townstead:cooling_fuel"]
  }
}
```

The order is the preference: a building with `townstead:heating_fuel` ranks before one with `townstead:cooling_fuel`, and any building with `townstead:general` ranks after both. A building with none of these roles is not part of the worker's external route.

A Path can carry its own `storage` object in `path.json`. A villager on that Path uses the Path preference; otherwise the Career preference applies. A [Career provider](/careers/career-providers/) can supply either.

`storage` accepts only `preferred_roles`. Container block IDs and building names are refused, because a preference is about what a building is for, not which chest it contains.

## Worked Example

A mod adds a pantry cabinet and a dough mixer. The mixer has an inventory, so without help villagers would treat it as a shelf.

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

If the mixer already ships a workstation file, the second document is unnecessary. Declaring it as a station covers it.

## Troubleshooting

Rejected files are logged with the reason. Look for `storage role ... rejected` or `Invalid storage role ...` in the log.

A file that loads but seems to do nothing is usually a `mods` gate that is not met, or a block ID typo. Unlike a block tag, a typo here does not fail data pack loading, so check the ID against the mod's registry.
