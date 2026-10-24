---
title: Work And Job Sites
description: Register the villager profession and declare where its work happens in work.json.
---

Put villager registration, job sites, and tasks in `work.json`, next to `profession.json`. The job-site providers on this page are the `poi` entries of that file.

## Work Sidecar

Put villager registration, job sites, and tasks in the work file:

```text
data/<namespace>/profession/<career>/work.json
```

```json
{
  "schema": "townstead:profession_work/v1",
  "register_profession": true,
  "poi": [
    {
      "type": "townstead:job_block",
      "block": "example:apiary",
      "sites_per_worker": 4
    }
  ],
  "tasks": [
    {
      "type": "townstead_work:interact",
      "workstations": ["example:apiary"],
      "weight": 10
    }
  ],
  "storage": {
    "preferred_roles": ["townstead:materials"]
  }
}
```

The work file holds `register_profession`, `poi`, and `tasks`. `storage` names the buildings that the career uses when its own shelves cannot hold the items. See [Storage](/careers/storage/#profession-storage-preferences). Put the preferred stations of a Path in the `path.json` of that Path.

The work file cannot add a Path or define merchant offers. It cannot change the identity, progression, requirements, Skills, titles, or Path membership of the Career.

Work is in a separate file because it loads at a different time. An ordinary world data pack can extend an existing profession. A pack that adds a new profession must be installed in the profile before startup.

## Job-Site Providers

The `poi` array in `work.json` says where work is available. The order of the entries is important. When two providers match the same place, the earlier provider counts it, and the later provider does not.

### Job Block

```json
{
  "type": "townstead:job_block",
  "blocks": ["example:apiary", "example:large_apiary"],
  "sites_per_worker": 4
}
```

Use `block` for one block or `blocks` for several. This provider is a job-site POI, as in vanilla. By default, each matching site adds one worker slot.

`sites_per_worker` groups several sites into one workload. With a value of `4`, one to four matching sites give one worker, five to eight give two, and nine to twelve give three. Townstead groups each Job Block entry separately, so one Career can use a different ratio for each kind of workstation. To give a slot for each site, leave out the field or use `1`.

A block can use the POI claim of a different profession:

```json
{
  "type": "townstead:job_block",
  "block": "example:compatibility_forge",
  "via": "othermod:smith"
}
```

`via` names the profession that claims the block in the world. Townstead converts the resulting history through aliases, and still applies the village capacity of the career. Do not use `via` only because another profession has the same Career meaning. Put root aliases and Path aliases in a compatibility contribution. An alias does not take the POI from the other mod.

### Building

```json
{
  "type": "townstead:building",
  "type_prefix": "example:apiary_l",
  "slots_per_tier": [1, 2, 3]
}
```

Use `type_prefixes` for several building prefixes. Townstead reads the text after a matching prefix as the tier. A building with no tier, or with a tier outside the list, gives one slot. To give one slot for each matching building, leave out `slots_per_tier`.

A kind of building can prefer a Path. Other Paths can still work there, and the Path can still work elsewhere:

```json
{
  "type": "townstead:building",
  "type_prefix": "compat/pizzadelight/pizzeria_l",
  "slots_per_tier": [1, 2, 3],
  "path_affinity": ["pizzaiolo"]
}
```

`path_affinity` lists local Path IDs. When Townstead spends Insight automatically for a villager who works in such a building, it prefers those Paths. A villager who is already on one of those Paths prefers seats in this kind of building. The station preferences in `path.json` still apply.

A building can also keep its first seats for the profession that owns it:

```json
{
  "type": "townstead:building",
  "type_prefix": "compat/chefsdelight/restaurant_l",
  "slots_per_tier": [1, 2],
  "proprietor": {
    "professions": ["chefsdelight:chef"],
    "slots": 1
  }
}
```

`proprietor.professions` are villager-profession IDs exactly as written. They can be aliases of this career. Townstead does not convert them, so the other mod's profession keeps its trades, clothing, and identity. Townstead still counts the villager as a member of this career. `slots` is the number of seats that Townstead keeps for them in each matching building. Other staff use the remaining seats.

### Station Post

```json
{
  "type": "townstead:station_post",
  "blocks": ["example:apiary", "#example:apiaries"],
  "slots": 1
}
```

A station post is a workplace that is not in a recognised building. A station in a building does not add a seat, because the building already counts that room. Townstead reads this provider, but it cannot yet search the world for these blocks. For finished content, use a POI provider or a building provider.

### Always

```json
{ "type": "townstead:always" }
```

Use this for a profession that needs no job site in the world.
