---
title: Paths And Titles
description: Declare a path directory and the titles a skill build earns.
---

This page covers a path's `path.json` and the `titles` list on `profession.json`. Skill files, prerequisites, and path work are described in [Skills And Paths](/careers/skills-and-paths/).

## Paths

A Path owns a directory below its Profession:

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

The directory supplies the Path ID. Each entry in `skills` is a level, and an array supplies the choices at that level. A string is shorthand for a level with one choice. Bare names resolve in the sibling `skill/` directory, and all referenced Skills are added to the Profession automatically. `title` names the title earned by learning one Skill at every Path level; its ID is the Path ID and it replaces a standalone title with the same ID. `color` accepts `#RRGGBB`. `backdrop` can name a texture instead of a colour wash. Put preferred workstations in `worksites`. `powers` can contain Pheno components expressed by everyone committed to the Path; use it for Path-wide machinery rather than the effect of one particular Skill. `work`, `clothing`, `storage`, and `providers_required` are described in [Skills And Paths](/careers/skill/paths/#paths).

Each Skill can belong to only one individual Path. Paths do not create child Careers, grant extra skill picks, or lock each other by themselves. A Path level gates its Skills against the shared Profession rank; it does not have separate XP.

## Standalone Titles

A path-completion title belongs on its path. Use a standalone title in `profession.json` only for a build that is not identical to one path. It applies when every named skill has been learned:

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

When several path or standalone titles apply, the title with the most required skills wins. Equal-sized titles sort by ID. A title changes presentation only; it does not change the career ID.

For a standalone one-of-many requirement, use `skill_groups`: each nested array is one requirement, and learning any Skill in that array satisfies it. `skills` remains an all-of list. A title may use both fields.
