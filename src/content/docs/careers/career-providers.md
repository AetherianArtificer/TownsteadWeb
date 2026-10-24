---
title: Career Providers
description: Let an optional mod contribute workplaces, work, worksites, and clothing to an existing Career or Path.
---

A Career provider is a file that adds to a Career or Path from a different file. When its mod gate passes, it adds workplaces, work tasks, preferred stations, clothing, and storage preferences. A provider never adds a Career, registers a villager profession, or replaces the definition that it adds to.

Use a provider when several optional mods each add to one Career. Beverage Artisan is the example in Townstead. Its `work.json` declares no workplaces and no tasks. Each bar, brewery, and cafe mod adds its own buildings and machines through a provider. With one of these mods installed, the Career has work. With none of them, it has no work.

## File Location

```text
data/<namespace>/career_provider/<name>.json
```

The file name is the provider ID. Townstead reads providers on every reload. When you remove a pack or mod, Townstead removes its contribution.

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

With Candlelight and Farm & Charm installed, Cooks can work in the restaurant and at its stations. Without these mods, the file has no effect.

## Field Reference

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | `townstead:career_provider/v1`. |
| `profession` | Yes | The Career that this provider adds to. The Career must be active in the same session. |
| `path` | No | A local Path ID in that Career. Required when `contributes.path` is present. |
| `mods` | No | Standard mod-gate expression. When the gate is not met, Townstead ignores the whole contribution. |
| `priority` | No | The order of providers for the same target. The default is `0`. |
| `aliases` | No | Profession IDs from other mods that count as this Career or Path. Townstead converts them, but does not register them. |
| `contributes` | Yes | An object with a `profession` section, a `path` section, or both. |

### Profession section

`contributes.profession` accepts:

| Field | Merge rule | Description |
| --- | --- | --- |
| `poi` | Union | Job-site providers, in the same format as `poi` in `work.json`. |
| `tasks` | Union | Work tasks, in the same format as `tasks` in `work.json`. |
| `clothing` | Union | Clothing identities that Townstead adds to the end of the Career's clothing list. |
| `storage` | Replace | A storage preference object. See [Storage](/careers/storage/#profession-storage-preferences). |
| `icon` | Replace | Career icon. |
| `work_sound` | Replace | Work sound for a profession that the Career registers. |

### Path section

`contributes.path` needs the `path` field of the provider. It accepts:

| Field | Merge rule | Description |
| --- | --- | --- |
| `skills` | Union | More Path levels, in the same format as `skills` in `path.json`. |
| `worksites` | Union | Preferred stations for the Path. |
| `clothing` | Union | Clothing identities for the Path. |
| `work` | Union | Path work, including `access`. See [Path Work](/careers/skill/paths/#path-work). |
| `powers` | Union | Pheno components for everyone on the Path. |
| `name`, `title`, `color`, `backdrop` | Replace | How the Path looks. |
| `storage` | Replace | A storage preference object for the Path. |

## Merge Order

Townstead combines all active providers before it builds the Profession. For array fields, Townstead keeps every entry. A provider cannot remove an entry from the owner or from a different provider. For single values, Townstead uses the last value, in order of `priority` and then of resource ID. So a provider with a higher priority replaces an icon or title from a provider with a lower priority.

Townstead applies providers after `work.json`, so the Career's own entries are always first in a merged array.

## Providers And Paths

A Path can declare that it is available only when a provider adds to it:

```json
{
  "schema": "townstead:profession_path/v1",
  "providers_required": true,
  "name": { "text": "Bartender" },
  "skills": ["read_the_room"]
}
```

With `providers_required`, the Path, its Skills, title, and trades are not available until at least one active provider targets the Path. Use it for a specialisation whose workplace comes only from optional mods. A Path without this field loads alone, and providers only add to it.

When a provider names a `path`, that Path must load in the same session. Townstead skips a contribution to a missing Path.

## Aliases Through Providers

A provider can map profession IDs from other mods to its target:

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

The alias counts as the Career. When `path` is set, the alias also means that Path. This works in the same way as a [compatibility contribution](/careers/profession/aliases/#optional-compatibility-identities). Use a compatibility file when the mapping is the only integration. Use a provider when the same mod also adds workplaces or work.

## Diagnostics

Townstead rejects an invalid provider and reports the error with the resource ID of the provider. Other providers still load. A provider is invalid when:

- `profession` names a Career that is not loaded in this session;
- `contributes.path` is present, but `path` is empty;
- `path` contains a namespace or a slash;
- `contributes.profession` or `contributes.path` contains a field that is not in the tables above;
- an array field does not contain an array.

A `mods` gate that is not met is not an error. Townstead does not load the provider.
