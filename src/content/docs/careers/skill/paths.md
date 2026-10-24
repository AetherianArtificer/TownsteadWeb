---
title: Paths
description: Group skills into specialisation paths, add path work, and steer villagers toward them.
---

A path groups some skills of a career into a specialisation. This page describes `path.json` from the side of skills: levels, path work, and how villagers choose a path. For the titles that a path or skill build earns, see [Paths And Titles](/careers/profession/paths-and-titles/).

## Paths

Each Path has a directory. The directory name is its ID:

```text
data/<namespace>/profession/<career>/path/<path>/
├─ path.json
├─ skill/
│  └─ <skill>.json
└─ trade/
   └─ <contribution>.json
```

```json
{
  "schema": "townstead:profession_path/v1",
  "mods": "example_optional_mod",
  "name": { "text": "Wax Worker" },
  "title": { "text": "Chandler" },
  "color": "#E8A33C",
  "worksites": ["example:wax_press"],
  "powers": [
    {
      "type": "pheno:action_over_time",
      "interval": 20,
      "action": {
        "type": "pheno:change_resource",
        "resource": "example:work_rhythm",
        "amount": 2
      }
    }
  ],
  "skills": [
    ["clean_rendering", "careful_rendering", "quick_rendering"],
    ["steady_mould", "rolled_taper", "wax_relief"],
    ["fine_taper", "votive_batch", "ornamental_candle"]
  ]
}
```

Each entry in `skills` is one Path level. Townstead looks for short names in the `skill/` directory next to `path.json`. The position in the list sets the tier of each Skill. Use an array at a level when the player chooses from several Skills:

```json
"skills": [
  ["clean_rendering", "careful_rendering"],
  ["steady_mould", "rolled_taper"],
  ["fine_taper", "votive_batch"]
]
```

The first array has the choices for level 1. The second array has the choices for level 2. You can use a string when a level has only one choice. Townstead adds every Skill in the list to the Profession, so `profession.json` and the Skill file do not list it again. The Path directory gives each Skill an ID such as `example:beekeeper/wax_worker/clean_rendering`. A Skill can be on only one Path.

Players choose path skills themselves. Villagers spend Insight automatically. A villager considers the skills of a Path only when their workplace suits the Path:

- the `worksites` of the Path are in the villager's workplace, or
- the workplace building declares `path_affinity` for the Path.

A villager who already has a Path skill gives more weight to the other skills of that Path. When the villager chooses work, they prefer the stations and buildings of that Path.

`mods` is optional. When the expression is not met, Townstead removes the whole Path, with its Skills, title, worksites, and Path trade contributions. Use it for a specialisation that comes from one optional mod. When several optional mods can each supply the workplace, set `providers_required` to `true` instead. Then the Path is available only when at least one [Career provider](/careers/career-providers/) targets it.

`clothing` gives the Path its own clothing list, in the same format as the Profession field. A villager on the Path uses it before the Profession list. `storage` gives the Path its own storage preference. See [Storage](/careers/storage/#profession-storage-preferences).

Townstead does not save a separate path choice. It uses the learned skills only.

When a Path has a `title`, a character gets that title after they learn one Skill at each Path level. They do not need every choice in a level. The ID of the title is the Path ID. Do not list the Path Skills again in a second title. If a standalone title has the same ID, the Path title replaces it.

`powers` is optional. Each character on the Path has these Pheno components, whatever choices they made at each level. Use it for effects of the whole Path, such as a shared resource. Put an ability that comes with one choice in the `power` block of that Skill.

Put the preferred stations of a Path in `path.json`:

```json
{
  "schema": "townstead:profession_path/v1",
  "worksites": ["example:wax_press"]
}
```

Put the merchant offers of a Path in the `trade/` directory next to `path.json`. The location sets the Path, in the same way that the `skill/` directory sets the Path of a Skill. Keep the general offers of the Profession in the root `trade/` directory of the Profession.

### Path Work

A Path can keep the work of an integration next to its skills with `work`. Entries use the same format as `tasks` in `work.json`:

```json
{
  "schema": "townstead:profession_path/v1",
  "mods": ["pizzadelight", "farmersdelight"],
  "work": [
    {
      "type": "townstead_work:chop",
      "workstations": ["farmersdelight:cutting_board"],
      "recipes": ["pizzadelight:raw_pizza"],
      "weight": 10
    }
  ]
}
```

The location of the file shows who wrote the work. It does not limit who can do it. Path work goes to the whole Profession, so every Cook can make pizza, and the Pizzaiolo Path holds the Pizza Delight data. For a task that only specialists can do, set `"access": "path"`. Then only a worker who is on that Path gets the task. The default is `"access": "profession"`.
