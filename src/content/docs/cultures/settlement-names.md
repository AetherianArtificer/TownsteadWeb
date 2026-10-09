---
title: Settlement & Faction Names
description: Name lists for a culture's towns and governments, built from whole names or from parts and patterns.
---

A culture can name its towns and its factions. Both use the same list format.

## Settlement Names

```text
data/<namespace>/settlement_name/<name>.json
```

A culture names its list with `settlement_names`:

```json
"settlement_names": "examplepack:fisherfolk"
```

### When Townstead Uses It

When a village is founded with a [founding profile](/cultures/culture-packs/#founding-profiles), Townstead gives it a name from the list of the founding culture:

- A village whose name is already in the list keeps it.
- A player who founds a village with a Charter chooses the name, and the list is not used.
- A village of a culture with no list keeps its MCA name.

## The List Format

A list has whole names, patterns built from parts, or both.

```json
{
  "schema": "townstead:settlement_name/v1",
  "names": ["Gullhaven", "Netley"],
  "parts": {
    "first": ["Gull", "Salt", "Tide", "Kelp"],
    "second": { "haven": 3, "mouth": 2, "wick": 1 }
  },
  "patterns": {
    "{first}{second}": 4,
    "Port {first}": 1
  }
}
```

| Field | Description |
| --- | --- |
| `schema` | Must be `townstead:settlement_name/v1`. |
| `names` | Whole names. Each one is as likely as a pattern with weight 1. |
| `parts` | Named lists of parts. Each list is an array, or an object that maps a part to a weight. |
| `patterns` | Templates that put parts in braces, such as `{first}{second}`. An array gives every pattern weight 1. An object maps each pattern to a whole-number weight. |

- Pattern weights and part weights count as their square root, as in MCA name files.
- A pattern that names a part that `parts` does not define is ignored.
- A list with no usable name or pattern does not load.

With the example, Townstead picks "Gullhaven" or "Netley", or builds a name such as "Saltmouth" or "Port Tide". Patterns let a short file make many names. A list with a few dozen patterns, such as `{first} de {second}` and `San {saint}`, can make thousands of names.

## Faction Names

```text
data/<namespace>/faction_name/<name>.json
```

A culture names its list with `faction_names`:

```json
"faction_names": "examplepack:fisherfolk"
```

The file has the same fields as a settlement-name list, with the schema `townstead:faction_name/v1`.

A faction-name list gives the **base name** of a faction, such as "Saltmouth". The faction's kind, its form of government, puts the base name into one of its own patterns. For example, a merchant republic can have patterns such as "Free Port of {name}" and "Republic of {name}". A faction kind can also bring its own faction-name list, which replaces the culture's.

Townstead names a faction once, when it is founded. A faction keeps its name when the government or the village's culture changes. A player who founds a faction with a Charter chooses the name, and the list gives suggestions.
