---
title: Pack Compatibility
description: Gate data on mods and other packs, adapt a file when another pack is present, patch another pack's data, and how clashing names are told apart.
sidebar:
  order: 3
---

Townstead data packs can work with each other without load-order rules or copied files. Use these four tools:

| Tool | Use it to |
| --- | --- |
| [Gates](#gates) | Load a file only when a mod or another data pack is present. |
| [Overrides](#overrides) | Change parts of your own file when another pack is present. |
| [Patches](#patches) | Change another pack's file without replacing it. |
| [Name collisions](#name-collisions) | Tell apart two packs' roots, ancestries, or lineages that share a name. |

Gates, overrides, and patches apply to species, ancestry, lineage, root (and legacy origin), heritage, gene, rig, collection, trait, chronotype, and founding profile files. Gates also work in every other Townstead data file that accepts `"mods"`.

## Gates

A gate is a `"mods"` or `"requires"` field at the top of a file. Both use the same grammar. When a file has both, both must be met. When a gate is not met, Townstead skips the file. When a gate is malformed, Townstead skips the file and logs a warning. A broken gate never passes.

```json
{
  "schema": "townstead:lineage/v1",
  "requires": { "namespace": "otherpack" }
}
```

| Form | Meaning |
| --- | --- |
| `"farmersdelight"` | That mod is installed. Bare strings are always mod ids. |
| `["a", "b"]` | All of them. |
| `{ "mod": "a" }` or `{ "mod": ["a", "b"] }` | Those mods are installed. |
| `{ "namespace": "otherpack" }` | Some enabled data pack or mod ships data under that namespace. |
| `{ "any": [ ... ] }` | At least one entry is met. |
| `{ "all": [ ... ] }` | Every entry is met. |
| `{ "not": ... }` | The entry is not met. |

All clauses in one object must be met. You can put entries inside other entries:

```json
"requires": {
  "namespace": "otherpack",
  "any": ["examplemod", { "namespace": "thirdpack" }],
  "not": { "mod": "someconflict" }
}
```

A namespace gate names a pack by its data namespace, not by its file or folder name. So the gate still works when a player renames the ZIP file. A disabled pack does not count as present.

## Overrides

`overrides` is a list of partial files inside your own file. Before Townstead reads the file, it merges each entry whose gate is met into the file, in order.

```json
{
  "schema": "townstead:lineage/v1",
  "display_name": { "translate": "lineage.examplepack.high_elf" },
  "ancestry": "examplepack:elven",
  "genes": ["examplepack:high_elf_stature", "examplepack:arcane_reflex"],
  "overrides": [
    {
      "requires": { "namespace": "otherpack" },
      "ancestry": "otherpack:elf",
      "genes": ["examplepack:arcane_reflex"]
    }
  ]
}
```

When `otherpack` is present, this lineage moves under that pack's elf ancestry and drops its own stature gene in favour of the ancestry's. Without it, the file loads as written. You need no second pack and no load order.

Merge rules:

| Override value | Effect |
| --- | --- |
| Object, where the file also has an object | Merged key by key. |
| Anything else, arrays included | Replaces the value. |
| `null` | Removes the key. |

Each entry applies to the result of the entries before it.

## Patches

A patch changes another pack's file. It lives in `data/<namespace>/patch/<path>.json` and uses `townstead:patch/v1`.

```json
{
  "schema": "townstead:patch/v1",
  "requires": { "namespace": "otherpack" },
  "target": { "ancestry": "otherpack:elf" },
  "priority": 0,
  "set": { "spawn_bias": { "default": 0.4 } },
  "remove": { "genes": ["otherpack:elf_stature"] },
  "replace": { "genes": { "otherpack:elf_darkvision": "examplepack:moon_sight" } },
  "add": { "genes": ["examplepack:moonlit_eyes"] },
  "multiply": { "spawn_bias.default": 0.8 }
}
```

| Field | Notes |
| --- | --- |
| `schema` | Required: `townstead:patch/v1`. |
| `requires` / `mods` | Optional gate for the whole patch. |
| `target` | A kind of data (its folder name: `ancestry`, `lineage`, `root`, `gene`, `founding_profile`, ...) mapped to one ID or a list of IDs. It can also be a list of these objects. `origin` and `root` are the same kind. |
| `priority` | Integer, default `0`. Patches apply lowest first, then by patch id, so the patch with the highest priority sets the final value of a `set`. |
| `set` | Merged into the target like an [override](#overrides). |
| `remove` | Dotted path to a list, mapped to the elements to drop. |
| `replace` | Dotted path to a list, mapped to an object of old element to new element. A replaced gene keeps its `occurrence`. |
| `add` | Dotted path to a list, mapped to elements to append. Elements already present are skipped. A non-list value sets the path only if it is absent. |
| `multiply` | Dotted path to a number, mapped to a factor. |

Townstead runs the operations in this order: `set`, `remove`, `replace`, `add`, `multiply`. Townstead matches a string in a list by its text, and an object by its `gene`, `id`, or `type` field.

When the target of a patch does not exist, Townstead skips the patch with no warning, because most compatibility is optional. Townstead applies patches again at every reload, so when you remove a pack, its changes go away. To list every patch, its targets, and whether each one applied, run `/pheno patches`.

## Name Collisions

When roots, ancestries, lineages, heritages, or species from different namespaces share a display name, Townstead adds the qualifier of its pack to each name: the High Elf of `examplepack` becomes **Examplepack High Elf**, and the High Elf of `townstead_other` becomes **Other High Elf**. Townstead does not change names that are not the same, so a pack used alone shows its own names. Townstead also adds the qualifier to the demonyms of an entry with a qualifier. Townstead compares the English text of the names, and ignores case.

The qualifier comes from, in order:

1. A `qualifier` text field on the file itself.
2. `qualifier` in `data/<namespace>/townstead/pack.json`.
3. The namespace, with a leading `townstead_` removed and words capitalised: `townstead_other` → Other, `example_pack` → Example Pack.

```json
{
  "qualifier": { "translate": "pack.examplepack.qualifier" }
}
```

Qualifiers are text components, so you can translate them. The full name uses the `townstead.qualified_name` key (`%s %s` in English). A language can change the order of the two parts.

The same file can have a `name`, the full title of the pack. The root browser uses it in its Pack filter, and when it groups roots by pack. The browser shows the shorter qualifier on each root. Without a `name`, the browser uses the qualifier.

```json
{
  "qualifier": { "translate": "pack.examplepack.qualifier" },
  "name": { "translate": "pack.examplepack.name" }
}
```
