---
title: Aliases And Compatibility
description: Merge equivalent profession IDs and map optional mods onto a career.
---

There are three ways to connect the profession IDs of other mods to a Townstead career:

- Inline aliases always apply.
- Compatibility contributions apply only when a mod is installed.
- Career providers also add workplaces and work.

## Root Aliases

An alias makes a different profession ID count as this Career:

```json
{
  "aliases": [
    "othermod:beekeeper",
    "anothermod:apiarist"
  ]
}
```

For XP, definition lookups, work, and trades, Townstead converts the alias to the main profession ID. An alias cannot replace a main definition. If two definitions declare the same alias, Townstead uses the first one and reports a diagnostic.

Use inline `aliases` for IDs that always have the same meaning, such as an old ID from the same pack. An alias does not register the named profession, and it does not use that profession's POI.

## Optional Compatibility Identities

Put the mappings for an optional mod in a separate contribution file:

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

Compatibility is in a separate file from `profession.json`. The Profession describes the Career. A compatibility contribution describes how the professions of another mod connect to that Career. With separate files, several packs can extend the same Career without replacing its root definition or each other. For example, cooking integrations can add `chefs_delight.json`, `farmers_delight.json`, and other files to the same `compatibility/` directory.

Use a different resource path for each integration. As with trades and other contributions, a data pack with a higher priority can replace one compatibility contribution with a file at the same path. It does not need to replace the whole Profession.

- `aliases` maps each profession from the other mod to the root of this Career.
- `path_aliases` maps a profession from the other mod to this Career and one loaded Path. The Path ID is local to the Career, so the example means the `chef` Path of `townstead:cook`.

The `schema` field is required. `mods` uses the standard mod-gate expression. It usually names the mod that registers the other professions. When the gate is not met, Townstead ignores the whole contribution. It does not add placeholder professions, picker entries, POIs, trades, or JEP entries. A Path alias must name a Path that loaded in the same session.

Compatibility changes only how Townstead matches professions. The profession from the other mod keeps its registry ID, its own job-site rule, its offers, and its other behaviour. Townstead records Career history and work under this Career, and also records whether the profession means a Path.

Use the compatibility file only for mappings between mods. Put the usual Career content in its usual file: Paths in `path/`, merchant offers in `trade/`, work in `work.json`, and Skills next to their Path. Do not move usual Career content into compatibility only because an optional mod uses it.

## Career Providers

A compatibility contribution maps IDs. When an optional mod also adds workplaces, machines, stations, or clothing, put them in a Career provider:

```text
data/<namespace>/career_provider/<name>.json
```

When its `mods` gate passes, a provider adds `poi`, `tasks`, `clothing`, and `storage` to a career. It can also add `skills`, `worksites`, `work`, and presentation to a Path. A provider never adds a career or registers a profession. The Beverage Artisan career is made only from providers: its own `work.json` is empty, and each bar and brewery mod adds a provider. See [Career Providers](/careers/career-providers/).
