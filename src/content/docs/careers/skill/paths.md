---
title: Paths
description: Group skills into specialisation paths, add path work, and steer villagers toward them.
---

A path groups a career's skills into a specialisation. This page covers `path.json` from the skill side: levels, path work, and how villagers choose a path. Titles a path or skill build earns are described in [Paths And Titles](/careers/profession/paths-and-titles/).

## Paths

Each Path owns a directory. The directory name supplies its ID:

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

Each entry in `skills` is one Path level. Bare names resolve in the sibling `skill/` directory. Array position supplies each referenced Skill's tier. Use an array at a level when the player chooses between several Skills:

```json
"skills": [
  ["clean_rendering", "careful_rendering"],
  ["steady_mould", "rolled_taper"],
  ["fine_taper", "votive_batch"]
]
```

The first array contains the level 1 choices; the second contains the level 2 choices. A string remains valid when a level has only one option. Townstead adds every referenced Skill to the Profession's pool, so neither `profession.json` nor the Skill file repeats that relationship. The Path directory gives each one an ID such as `example:beekeeper/wax_worker/clean_rendering`. A Skill may belong to only one individual Path.

Players choose path skills directly. Villagers spend Insight automatically, and a Path's skills only enter that choice when the villager's workplace justifies them: the Path's `worksites` stand in the assigned workplace, or the workplace building declares `path_affinity` for the Path. A villager who already owns a Path skill gives the remaining Path skills more weight and prefers that Path's stations and buildings when choosing work.

`mods` is optional. When its expression is unmet, the complete Path is absent, including its
Skills, title, worksites, and Path trade contributions. This is the appropriate boundary for a
specialisation supplied by one optional mod. When several optional mods can each supply the
workplace, set `providers_required` to `true` instead. The Path is then absent until at least one
[Career provider](/careers/career-providers/) targets it.

`clothing` gives the Path its own clothing chain in the same format as the Profession field. A
villager on the Path uses it before the Profession chain. `storage` gives the Path its own
external-storage preference; see [Storage](/careers/storage/#profession-storage-preferences).

Townstead does not store a separate path selection. The learned skill set is the source of truth.

When a Path has `title`, Townstead awards that title after one Skill has been learned at every Path level. It does not require every alternative in a level. The directory-derived Path ID is also the title ID. Do not repeat the Path's Skills in a second title declaration. If a standalone title has the same ID, the Path-owned title replaces it.

`powers` is optional. Every character committed to the Path expresses these Pheno components, regardless of which option they selected at a particular level. Use this for Path-wide machinery such as a shared resource producer. Keep an ability that belongs to one choice in that Skill's `power` block instead.

Put a Path's preferred stations directly in `path.json`:

```json
{
  "schema": "townstead:profession_path/v1",
  "worksites": ["example:wax_press"]
}
```

Path-specific merchant contributions belong in the adjacent `trade/` directory. Their location supplies the Path link, just as the adjacent `skill/` directory supplies Skill scope. General Profession offers remain in the Profession's root `trade/` directory.

### Path Work

A Path can keep an integration beside its own skills with `work`. Entries use the same format as `tasks` in `work.json`:

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

File location records authorship, not exclusivity. Path work joins the parent Profession, so every Cook may make pizza while the Pizzaiolo Path owns the Pizza Delight data. A task that represents a genuine specialisation ability sets `"access": "path"`; only a worker currently on that Path receives it. The default is `"access": "profession"`.
