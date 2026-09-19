---
title: Aliases And Compatibility
description: Merge equivalent profession IDs and map optional mods onto a career.
---

Three mechanisms connect other mods' profession IDs to a Townstead career. Inline aliases are unconditional, compatibility contributions are mod-gated, and Career providers also bring workplaces and work.

## Root Aliases

Aliases merge equivalent profession IDs into one root Career identity:

```json
{
  "aliases": [
    "othermod:beekeeper",
    "anothermod:apiarist"
  ]
}
```

XP reads, XP writes, definition lookups, work, and trades resolve the alias to the canonical profession ID. An alias cannot override a primary definition. If two definitions claim the same alias, the first claim wins and the loader reports a diagnostic.

Use inline `aliases` for identities that are always meaningful, such as a legacy ID supplied by
the same pack. An alias does not register the named profession and does not borrow its POI.

## Optional Compatibility Identities

Put optional-mod mappings in an independently addressable contribution:

```text
data/<namespace>/profession/<career>/compatibility/<contribution>.json
```

```json
{
  "schema": "townstead:profession_compatibility/v1",
  "mods": "chefsdelight",
  "aliases": [
    "chefsdelight:cook"
  ],
  "path_aliases": {
    "chefsdelight:chef": "chef"
  }
}
```

Compatibility is separate from `profession.json` by design. A Profession describes the Career
itself; a compatibility contribution describes how another mod's identities join that Career.
Keeping the mapping in its own resource also lets several packs extend the same Career without
replacing its root definition or replacing one another. For example, separate cooking integrations
can contribute `chefs_delight.json`, `farmers_delight.json`, and another independently named file
under the same `compatibility/` directory.

Use a distinct resource path for each integration. As with trades and other contributions, a
higher-priority data pack can deliberately replace one compatibility contribution by supplying the
same path. It does not need to take ownership of the complete Profession to do so.

`aliases` maps each foreign profession to the owning Career root. `path_aliases` maps a foreign
profession to the owning Career and one loaded Path. The Path ID is local to the Career, so the
example means `townstead:cook` on its `chef` Path.

The `schema` field is required. `mods` uses the standard mod-gate expression and should normally
name the mod that registers the foreign professions. An unmet gate removes the complete
contribution: it does not create placeholder professions, picker entries, POIs, trades, or JEP
entries. A Path alias must name a Path that loaded in the same session.

Compatibility changes semantic matching, not physical ownership. A foreign profession retains
its registry identity, native job-site predicate, offers, and other mod behaviour. Townstead
canonicalises Career history and work while remembering whether that identity implies a Path.

The compatibility schema is the integration boundary for Profession identity. Future versions may
add other genuinely cross-mod mappings here. Intrinsic Career content still belongs in its normal
document: define Paths in `path/`, merchant offers in `trade/`, work in `work.json`, and Skills beside
their Path. Do not move ordinary Career content into compatibility merely because an optional mod
uses it.

## Career Providers

A compatibility contribution maps identities. When an optional mod also brings workplaces, machines, stations, or clothing, put that in a Career provider:

```text
data/<namespace>/career_provider/<name>.json
```

A provider contributes `poi`, `tasks`, `clothing`, and `storage` to a career, or `skills`, `worksites`, `work`, and presentation to a Path, when its `mods` gate passes. It never creates a career or registers a profession. Beverage Artisan is composed entirely this way: its own `work.json` is empty, and every bar and brewery mod supplies a provider. See [Career Providers](/careers/career-providers/).
