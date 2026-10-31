---
title: Chef's Delight
description: "Chef's Delight cooks and chefs join the Townstead Cook, and the Chef Path."
---

**Author:** redstonegamesb\
**Download:** [Modrinth](https://modrinth.com/mod/chefs-delight)\
**Install on:** The server and every client

## What It Adds

Chef's Delight adds two professions. Townstead does not add them as separate careers. They join the Townstead Cook:

| Chef's Delight profession | Townstead career |
| --- | --- |
| `chefsdelight:cook` (1.20.1), `chefsdelight:delightcook` (1.21.1) | Cook |
| `chefsdelight:chef` (1.20.1), `chefsdelight:delightchef` (1.21.1) | Cook, on the **Chef** Path |

- The Chef Path, its Skills, and its title are available only with Chef's Delight.
- Chef's Delight keeps its own cooking pot and skillet job sites, and its own trades.
- The profession picker and Just Enough Professions show one Cook entry, not three jobs.

## Data That Names These Professions

Data that names the Chef's Delight cook applies to every Cook. Data that names the Chef's Delight chef applies only to a Cook on the Chef Path. Use the ID for your Minecraft version:

```json
{
  "type": "pheno:profession",
  "profession": "chefsdelight:chef"
}
```

This condition matches a Chef's Delight chef, and a Townstead Cook on the Chef Path. It does not match a Cook on no Path.

## Settings

Set [`enableTownsteadCook`](/reference/configuration/#chefs-delight-compatibility) to `false` to give cooking back to Chef's Delight. Then Chef's Delight assigns its professions, and the profession lists show them as Chef's Delight does.
