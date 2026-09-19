---
title: Career Providers
description: Let an optional mod contribute workplaces, work, worksites, and clothing to an existing Career or Path.
---

A Career provider is a document that contributes to a Career or Path that another file owns. It adds workplaces, work tasks, preferred stations, clothing, and storage preferences when its mod gate passes. It never creates a Career, registers a villager profession, or replaces the owning definition.

Use a provider when one Career is served by several optional mods. Beverage Artisan is the shipped example: its `work.json` declares no workplaces and no tasks. Every bar, brewery, and cafe mod contributes its own buildings and machines through a provider, so the Career is complete with any one of them installed and empty with none.

## File Location

```text
data/<namespace>/career_provider/<name>.json
```

The file name is the provider ID. Providers are read on every reload, so removing a pack or mod removes its contribution cleanly.

## Minimal Example

```json
{
  "schema": "townstead:career_provider/v1",
  "profession": "townstead:cook",
  "mods": ["candlelight", "farm_and_charm"],
  "priority": 30,
  "contributes": {
    "profession": {
      "poi": [
        {
          "type": "townstead:building",
          "type_prefix": "compat/candlelight/restaurant_l",
          "slots_per_tier": [1, 2, 3]
        }
      ],
      "tasks": [
        {
          "type": "townstead_work:cook",
          "workstations": ["candlelight:cooking_pot", "candlelight:cooking_pan", "#candlelight:stoves"],
          "weight": 10
        }
      ]
    }
  }
}
```

With Candlelight and Farm & Charm installed, Cooks gain the restaurant as a workplace and its stations as work. Without them, the file has no effect.

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | `townstead:career_provider/v1`. |
| `profession` | Yes | The Career this provider contributes to. It must be an active Career in the same session. |
| `path` | No | A local Path ID inside that Career. Required when `contributes.path` is present. |
| `mods` | No | Standard mod-gate expression. An unmet gate removes the complete contribution. |
| `priority` | No | Ordering among providers for the same target. Defaults to `0`. |
| `aliases` | No | Foreign profession IDs that resolve to this Career or Path. They are resolved, not registered. |
| `contributes` | Yes | An object with `profession` and/or `path` sections. |

### Profession section

`contributes.profession` accepts:

| Field | Merge rule | Description |
| --- | --- | --- |
| `poi` | Union | Job-site providers, in the same format as `poi` in `work.json`. |
| `tasks` | Union | Work tasks, in the same format as `tasks` in `work.json`. |
| `clothing` | Union | Clothing identities appended to the Career's fallback chain. |
| `storage` | Replace | A storage preference object. See [Storage](/careers/storage/#profession-storage-preferences). |
| `icon` | Replace | Career icon. |
| `work_sound` | Replace | Work sound used when the Career registers a profession. |

### Path section

`contributes.path` requires the provider's `path` field and accepts:

| Field | Merge rule | Description |
| --- | --- | --- |
| `skills` | Union | Additional Path levels, in the same format as `skills` in `path.json`. |
| `worksites` | Union | Preferred stations for the Path. |
| `clothing` | Union | Clothing identities for the Path. |
| `work` | Union | Path work contributions, including `access`. See [Skills And Paths](/careers/skill/paths/#path-work). |
| `powers` | Union | Path-wide Pheno components. |
| `name`, `title`, `color`, `backdrop` | Replace | Path presentation. |
| `storage` | Replace | A Path storage preference object. |

## Merge Order

Townstead builds one plan from every active provider before it lowers any Profession document. Array fields form a stable union: a provider cannot remove an entry that the owner or another provider declared. Scalar fields use last-writer-wins, ordered by `priority` and then by resource ID. A provider with a higher priority therefore replaces an icon or title supplied by a provider with a lower priority.

Providers apply after `work.json` establishes the base, so the owning Career's own declarations always come first in a merged array.

## Providers And Paths

A Path can declare that it exists only when a provider serves it:

```json
{
  "schema": "townstead:profession_path/v1",
  "providers_required": true,
  "name": { "text": "Bartender" },
  "skills": ["read_the_room"]
}
```

With `providers_required`, the Path, its Skills, title, and trades are absent until at least one active provider targets it. Use this for a specialisation whose entire workplace comes from optional mods. A Path without the flag loads on its own and providers only extend it.

A provider that names a `path` must target a Path that loaded in the same session. A contribution to a missing Path is skipped.

## Aliases Through Providers

A provider can map foreign profession IDs to its target:

```json
{
  "schema": "townstead:career_provider/v1",
  "profession": "townstead:beverage_artisan",
  "path": "brewer",
  "mods": "brewery",
  "aliases": ["brewery:brewer"],
  "contributes": { "path": { "worksites": ["brewery:wooden_brewingstation"] } }
}
```

The alias resolves to the Career and, when `path` is set, implies that Path. This has the same meaning as a [compatibility contribution](/careers/profession/aliases/#optional-compatibility-identities). Use the compatibility document when the mapping is the only integration. Use a provider when the same mod also brings workplaces or work.

## Diagnostics

Townstead rejects an invalid provider and reports the error against the provider's resource ID. Other providers are not affected. A provider is invalid when:

- `profession` names a Career that is not loaded in this session;
- `contributes.path` is present, but `path` is empty;
- `path` contains a namespace or a slash;
- `contributes.profession` or `contributes.path` contains a field that is not in the tables above;
- an array field does not contain an array.

An unmet `mods` gate is not an error. Townstead does not load the provider.
