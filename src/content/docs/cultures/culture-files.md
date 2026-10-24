---
title: Culture Files
description: The culture file format, every field it accepts, and how translations work.
---

## File Location

```text
data/<namespace>/culture/<name>.json
```

The file ID is the culture ID. For example, `data/examplepack/culture/fisherfolk.json` is the culture `examplepack:fisherfolk`.

## Minimal Example

A complete culture in one file. The naming block lists its given names and family names in place:

```json
{
  "schema": "townstead:culture/v1",
  "name": "Fisherfolk",
  "naming": {
    "given": {
      "male": ["Bram", "Corin", "Oskel"],
      "female": ["Marit", "Neva", "Sölvi"]
    },
    "family": {
      "type": "inherited",
      "names": ["Netley", "Saltmarsh", "Tidewell"]
    }
  }
}
```

## Full Example

```json
{
  "schema": "townstead:culture/v1",
  "name": { "translate": "culture.examplepack.fisherfolk" },
  "demonym": {
    "singular": { "translate": "culture.examplepack.fisherfolk.demonym.singular" },
    "plural": { "translate": "culture.examplepack.fisherfolk.demonym.plural" },
    "adjective": { "translate": "culture.examplepack.fisherfolk.demonym.adjective" }
  },
  "naming": {
    "given": "examplepack:fisherfolk",
    "family": { "type": "inherited", "list": "examplepack:fisherfolk", "descent": "either" }
  },
  "settlement_names": "examplepack:fisherfolk",
  "faction_names": "examplepack:fisherfolk",
  "clothing": {
    "types": [{ "select": { "material": "wool" }, "rate": 3 }],
    "livery": "examplepack:fisherfolk/oilskin"
  }
}
```

## Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | No | When present, it must be `townstead:culture/v1`. |
| `name` | No | The name that players see. Plain text or a text component such as `{"translate": "<key>"}`. The default is the file path. |
| `demonym` | No | What the culture's people are called. See [Demonym](#demonym). |
| `naming` | No | A naming tradition written in place. See [Personal Names](/cultures/naming/). |
| `naming_tradition` | No | The ID of a [naming tradition file](/cultures/naming/#naming-tradition-files). Townstead ignores it when the file also has `naming`. |
| `settlement_names` | No | The ID of a [settlement-name list](/cultures/settlement-names/). |
| `faction_names` | No | The ID of a [faction-name list](/cultures/settlement-names/#faction-names). |
| `clothing` | No | Clothing preferences and the default livery. See [Clothing](/cultures/clothing/). |
| `parent` | No | A culture ID. The culture is then a [subculture](/cultures/subcultures/) of that culture. |
| `spirit` | No | For a subculture: Community Spirit axes that draw people to it. See [Subcultures](/cultures/subcultures/#spirit). |
| `forms` | No | For a subculture: the founding profiles that its towns use. See [Subcultures](/cultures/subcultures/#forms). |
| `legacy_ids` | No | Old IDs of this culture. Villagers and villages that recorded an old ID use this culture. |

A culture with no naming tradition does not change names. Its people are named by their region.

## Demonym

```json
"demonym": {
  "singular": "Fisherman",
  "plural": "Fisherfolk",
  "adjective": "Fisher"
}
```

| Field | Required | Description |
| --- | --- | --- |
| `singular` | Yes | One person, such as "Highlander". |
| `plural` | No | Many people. The default is `singular`. |
| `adjective` | No | The adjective. Lines that ask for the adjective use `singular` when it is missing. |

Conversation lines show demonyms with placeholders such as `{self_demonym}`. See [Text & Placeholders](/conversations/text/#placeholders).

## Translations

Text fields accept plain text or a text component. Use `{"translate": "<key>"}` to translate the name or the demonym, and put the keys in a lang file in the data pack:

```text
data/<namespace>/lang/<locale>.json
```

```json
{
  "culture.examplepack.fisherfolk": "Fisherfolk",
  "culture.examplepack.fisherfolk.demonym.singular": "Fisherman"
}
```

A demonym in plain text is the same in every language. To make a demonym agree with gender or case in other languages, see [Translations](/conversations/translations/#demonyms).

## Loading and Errors

Townstead reads culture files when data packs load, and again after `/reload`. A file with the same namespace and path as a file in a lower pack replaces that file.

A file with an error does not load, and the other files still load. The game log shows each problem and a summary:

```txt
Could not load culture examplepack:fisherfolk
Culture examplepack:merchants has parent examplepack:fisherfolk which is not loaded; it stands alone
Loaded 9 culture(s)
```

Problems that stop a file from loading:

- a `schema` that is not `townstead:culture/v1`;
- a `parent` that is the file's own ID;
- a negative weight in `spirit` or `forms`;
- a form with no `profile`;
- a `legacy_ids` entry that is the file's own ID, or that is repeated.

Problems that only report a warning:

- a `naming` block with no usable given names. The culture loads with no naming tradition.
- an unknown spirit axis in `spirit`. Townstead ignores that axis.
- a `parent` that is not loaded, or a chain of parents that loops. The culture loads as a top culture.
