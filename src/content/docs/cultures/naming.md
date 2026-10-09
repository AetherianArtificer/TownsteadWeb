---
title: Personal Names
description: Naming traditions, given-name lists and family-name lists, and how a culture names its people.
---

A **naming tradition** says how a people build a name: which given names they use, and what they do about family names. The same given names make "Jon Sigurdsson" in one tradition and "Jon Ashmaw" in another.

A naming tradition and a culture are different things. Every villager has a naming tradition, but most villagers have no culture.

- When a villager's culture has a naming tradition, the villager is named by it, wherever they live.
- Otherwise, the villager is named by their region, as in MCA.

A villager keeps their name. A change of culture later does not rename them.

## Writing a Tradition

A culture can write its tradition in place, in `naming`:

```json
{
  "schema": "townstead:culture/v1",
  "name": "Fisherfolk",
  "naming": {
    "given": "examplepack:fisherfolk",
    "family": { "type": "inherited", "list": "examplepack:fisherfolk" }
  }
}
```

Or several cultures can share a tradition file, with `naming_tradition`:

```json
{
  "schema": "townstead:culture/v1",
  "name": "Fisherfolk",
  "naming_tradition": "examplepack:northern_coast"
}
```

## Naming Tradition Files

```text
data/<namespace>/naming_tradition/<name>.json
```

```json
{
  "schema": "townstead:naming_tradition/v1",
  "given": "mca:iceland",
  "family": {
    "type": "patronymic",
    "affix": {
      "male": { "suffix": "sson" },
      "female": { "suffix": "sdottir" },
      "neutral": { "suffix": "sbur" }
    }
  }
}
```

A `naming` block in a culture file has the same fields, without `schema`.

### Tradition Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes, in a file | Must be `townstead:naming_tradition/v1`. |
| `given` | Yes | Where given names come from: [list references](#list-references), or an object with names in place. See [Given Names in Place](#given-names-in-place). |
| `family` | No | The family-name rule. See [Family Names](#family-names). With no `family`, villagers have no family name. |
| `order` | No | `given_first` ("Jon Ashmaw") or `family_first` ("Ashmaw Jon"). The default is `given_first`. |

A tradition with no usable given names does not load.

### Given Names in Place

Write `given` as an object to keep the names in the same file:

```json
"given": {
  "male": ["Bram", "Corin"],
  "female": { "Marit": 3, "Neva": 1 },
  "neutral": ["Sesh"]
}
```

The format is the same as a [given-name list](#given-name-lists).

## Family Names

| Field | Description |
| --- | --- |
| `type` | `none`, `inherited`, `patronymic` or `matronymic`. |
| `list` | For `inherited`: [list references](#list-references) to family-name lists. |
| `names` | For `inherited`: family names in place, as an array or a weighted object. Replaces `list`. |
| `descent` | For `inherited`: which parent passes the name down. `father`, `mother` or `either`. The default is `either`. |
| `affix` | For `patronymic` and `matronymic`: what to put around the parent's given name. |

| Type | The family name is |
| --- | --- |
| `none` | No family name. |
| `inherited` | The family name of a parent, following `descent`. A villager with no parent to take it from gets a new name from the lists. |
| `patronymic` | The given name of the villager's father with the affix, such as "Sigurdsson". |
| `matronymic` | The given name of the villager's mother with the affix. |

- For `descent`, `father` takes the name from a parent who is not female, and `mother` from a female parent. `either` takes it from the first parent who has a family name.
- An `inherited` rule with no `list` and no `names` uses the family-name list with the same ID as the villager's given-name list. When no such list exists, the villager has no family name.
- A `patronymic` or `matronymic` villager with no such parent has no family name.
- An unknown `type` counts as `none`, and the log shows a warning.

### Affixes

`affix` maps the villager's own gender to a `prefix`, a `suffix`, or both:

```json
"affix": {
  "male": { "prefix": "ibn " },
  "female": { "prefix": "bint " }
}
```

- The keys are `male`, `female` and `neutral`.
- When `neutral` is missing, a neutral villager uses the `male` affix. When the affix that applies is missing, the parent's given name is used unchanged.
- A `patronymic` or `matronymic` rule with no affix makes the log show a warning.

## List References

`given` and `list` name lists in three forms.

**One list:**

```json
"given": "examplepack:fisherfolk"
```

**One group of lists, drawn from together.** Each entry can have a `rate`, from more than 0. The default is 1:

```json
"given": [
  { "list": "examplepack:fisherfolk", "rate": 3 },
  { "list": "mca:iceland", "rate": 1 }
]
```

**Groups tried in order.** When the array has any object with `from`, each entry is a group. Townstead uses the first group that it can use:

```json
"given": [
  { "from": [{ "list": "examplepack:fisherfolk", "rate": 3 }, { "list": "elvenmod:sea_elves" }], "require": "all" },
  "examplepack:fisherfolk"
]
```

In this example, villagers get a mix of fisherfolk and sea elf names when the elven mod is installed, and only fisherfolk names when it is not. With `"require": "all"`, a group is used only when every list in it is available. Without it, a group uses the lists that are available.

### What a Reference Names

| Reference | List |
| --- | --- |
| `mca:<bucket>`, such as `mca:japan` | A name bucket from MCA or MCA Capitals. Given names only: MCA has no family names. |
| `<namespace>:<path>` from a data pack | A `given_name` file for `given`, or a `family_name` file for a family `list`. |
| `mcacapitals:<bucket>` | MCA Capitals family names, when MCA Capitals is installed. |

A given-name list and a family-name list can have the same ID. `examplepack:fisherfolk` can be the fisherfolk's given names in `given_name/` and their family names in `family_name/`.

## Given-Name Lists

```text
data/<namespace>/given_name/<name>.json
```

```json
{
  "schema": "townstead:given_name/v1",
  "male": ["Bram", "Corin", "Oskel"],
  "female": { "Marit": 3, "Neva": 1 },
  "neutral": ["Sesh"]
}
```

| Field | Description |
| --- | --- |
| `male`, `female`, `neutral` | Names for each gender. An array gives every name the same weight. An object maps each name to a weight. |

- Weights follow MCA's curve: a weight counts as its square root. A name with weight 4 is twice as likely as a name with weight 1, not four times.
- A missing gender uses another list: `male` uses `female`, then `neutral`. `female` uses `male`, then `neutral`. `neutral` uses `male`.
- A file needs at least one of the three lists.

## Family-Name Lists

```text
data/<namespace>/family_name/<name>.json
```

```json
{
  "schema": "townstead:family_name/v1",
  "names": ["Netley", "Saltmarsh", "Tidewell"]
}
```

`names` is an array, or an object with weights. Family names have no gender.

## Traditions That Townstead Ships

Townstead ships a naming tradition for most MCA name buckets, with the ID `mca:<bucket>`, such as `mca:iceland` or `mca:germany`. Each one uses the bucket's given names and adds family names in that country's style: `mca:iceland` uses patronymics, and `mca:germany` passes down surnames from the father. A bucket with no tradition file uses its given names and has no family names.

You can name these traditions in `naming_tradition`, or replace one with a file at the same path.
