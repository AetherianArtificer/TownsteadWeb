---
title: Paths And Titles
description: Declare a path directory and the titles a skill build earns.
---

This page describes the `path.json` of a path and the `titles` list in `profession.json`. For skill files, prerequisites, and path work, see [Skills And Paths](/careers/skills-and-paths/).

## Paths

Each Path has a directory under its Profession:

```text
data/<namespace>/profession/<career>/path/<path>/path.json
```

For example, `path/mead_maker/path.json` contains:

```json
{
  "schema": "townstead:profession_path/v1",
  "name": { "text": "Mead Maker" },
  "title": { "text": "Master Mead Maker" },
  "color": "#C9A227",
  "skills": [
    ["fermentation", "fruit_culture", "wild_yeast"],
    ["clean_cask", "cellar_blend", "still_mead"],
    ["patient_cellar", "feast_service", "reserve_bottle"]
  ]
}
```

The directory name is the Path ID.

| Field | Description |
| --- | --- |
| `skills` | Each entry is a level. An array lists the choices at that level. A string is a level with one choice. Townstead looks for short names in the `skill/` directory next to `path.json`, and adds every Skill in the list to the Profession. |
| `title` | The title that a character gets for one Skill at each level of the Path. Its ID is the Path ID. It replaces a standalone title with the same ID. |
| `color` | A colour as `#RRGGBB`. |
| `backdrop` | A texture to use in place of a colour. |
| `worksites` | The preferred workstations of the Path. |
| `powers` | Pheno components that everyone on the Path has. Use it for effects of the whole Path, not for the effect of one Skill. |

For `work`, `clothing`, `storage`, and `providers_required`, see [Skills And Paths](/careers/skill/paths/#paths).

A Skill can be on only one Path. A Path is not a separate Career. It does not give extra skill choices, and it does not lock other Paths. Each Path level needs a Profession rank. A Path has no XP of its own.

## Standalone Titles

Put the title for a complete path in that path. Use a standalone title in `profession.json` only for a build that is not the same as one path. A character gets the title when they learn every named skill:

```json
{
  "titles": [
    {
      "id": "cellar_scholar",
      "name": { "text": "Cellar Scholar" },
      "skills": ["patient_cellar", "archive_research"]
    }
  ]
}
```

When the character qualifies for more than one title, Townstead shows the title that needs the most skills. When two titles need the same number, Townstead sorts them by ID. A title changes only the name that players see. It does not change the career ID.

To require one skill from a group, use `skill_groups`. Each nested array is one requirement, and any Skill in the array meets it. `skills` is still a list where every skill is required. A title can use both fields.
