---
title: File Basics
description: Shared Roots fields, text, gene lists, and file paths
---

Most Roots files are JSON files under `data/<namespace>/...`. Every file starts with a `schema` field.

## Common Fields

| Field | Type | Used By | Notes |
| --- | --- | --- | --- |
| `schema` | string | all | Use the schema for that file type. |
| `display_name` | component | species, ancestry, lineage, root, heritage | Shown in UI and catalogues. |
| `genes` | array | species, ancestry, lineage | Entries are gene ids or objects with `gene` and `occurrence`. |
| `demonym` | object | ancestry, lineage, root, heritage | `singular`, optional `plural`, optional `adjective`. |
| `backstory` | component | ancestry, lineage, root, heritage | Display text for catalogues and editors. |
| `spawn_bias` | object | ancestry, lineage, root | Weighting used when villagers are naturally assigned roots. |
| `personalities` | object | species, ancestry, lineage | Personality allow/deny policy. |

Text fields use Minecraft text components. Plain strings are accepted for simple literal text, and translation objects can point at data-pack language entries.

## File Map

| File Type | Path | Schema |
| --- | --- | --- |
| Root | `data/<namespace>/root/<path>.json` | `townstead:root/v1` |
| Species | `data/<namespace>/species/<path>.json` | `townstead:species/v2` |
| Ancestry | `data/<namespace>/ancestry/<path>.json` | `townstead:ancestry/v1` |
| Lineage | `data/<namespace>/lineage/<path>.json` | `townstead:lineage/v1` |
| Heritage | `data/<namespace>/heritage/<path>.json` | `townstead:heritage/v1` |
| Gene | `data/<namespace>/gene/<path>.json` | `townstead:gene/v2` |
| Chronotype | `data/<namespace>/chronotype/<path>.json` | `townstead:chronotype/v1` |
| Trait | `data/<namespace>/trait/<path>.json` | `townstead:trait/v1` |
| Rig | `data/<namespace>/rig/<path>.json` | `townstead:rig/v1` |

## Gene Lists

Bare gene ids are enough when a root always carries that gene:

```json
{
  "genes": [
    "my_pack:golden_eyes",
    "my_pack:tall_frame"
  ]
}
```

Use `occurrence` when a founder should only sometimes receive a real copy:

```json
{
  "genes": [
    { "gene": "my_pack:golden_eyes", "occurrence": 0.65 },
    { "gene": "my_pack:tall_frame", "occurrence": 1.0 }
  ]
}
```

`occurrence` is clamped from `0` to `1`.

## Demonym

```json
{
  "demonym": {
    "singular": "Moon Elf",
    "plural": "Moon Elves",
    "adjective": "Moon Elven"
  }
}
```

`plural` defaults to `singular` when omitted. `adjective` is optional.
