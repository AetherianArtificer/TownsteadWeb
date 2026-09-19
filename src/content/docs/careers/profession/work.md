---
title: Work And Job Sites
description: Register the villager profession and declare where its work happens in work.json.
---

Villager registration, job sites, and task composition live in `work.json`, beside `profession.json`. The job-site providers on this page are the `poi` entries that document accepts.

## Work Sidecar

Put villager registration, job sites, and task composition in the adjacent work sidecar:

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

The sidecar owns `register_profession`, `poi`, and `tasks`. `storage` states which buildings the career prefers when its own shelves cannot serve; see [Storage](/careers/storage/#profession-storage-preferences). Preferred stations for a Path belong in that Path's own `path.json`. The sidecar cannot create a Path, define merchant offers, or change Career identity, progression, requirements, Skills, titles, or Path membership.

Keeping work separate makes the loading boundary explicit: an ordinary world data pack can extend an existing profession, while a pack that creates a profession must be installed at the profile level before startup.

## Job-Site Providers

The `poi` array in `work.json` declares how work becomes available. Entries are ordered. An earlier provider claims a place before a later provider can count it.

### Job Block

```json
{
  "type": "townstead:job_block",
  "blocks": ["example:apiary", "example:large_apiary"],
  "sites_per_worker": 4
}
```

Use `block` for one block or `blocks` for several. This provider represents a vanilla-style job-site POI. By default, each matching site adds one worker slot.

`sites_per_worker` groups several sites into one workload. With a value of `4`, one through four matching sites support one worker, five through eight support two, and nine through twelve support three. Each Job Block entry is grouped independently, so one Career can give different workstation families different ratios. Omit the field, or use `1`, when every site should provide a slot.

A subordinate physical surface can borrow another profession's POI claim:

```json
{
  "type": "townstead:job_block",
  "block": "example:compatibility_forge",
  "via": "othermod:smith"
}
```

`via` names the profession that physically claims the block. Townstead canonicalises the resulting history through aliases and still applies the career's village capacity. Do not use `via` merely because another profession has the same Career meaning. Root aliases and Path aliases belong in a compatibility contribution and do not transfer ownership of the other mod's POI.

### Building

```json
{
  "type": "townstead:building",
  "type_prefix": "example:apiary_l",
  "slots_per_tier": [1, 2, 3]
}
```

Use `type_prefixes` for several building prefixes. The suffix after a matching prefix is read as the tier. An untiered or out-of-range building provides one slot. Omit `slots_per_tier` when every matching building provides one slot.

A building family can favour a Path without making either exclusive:

```json
{
  "type": "townstead:building",
  "type_prefix": "compat/pizzadelight/pizzeria_l",
  "slots_per_tier": [1, 2, 3],
  "path_affinity": ["pizzaiolo"]
}
```

`path_affinity` lists local Path IDs. A villager working in such a building is steered toward those Paths when Insight is spent automatically, and a villager already on one of them prefers this family's seats. Station-level preferences in `path.json` still apply.

A building can also reserve its first seats for the profession that owns it:

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

`proprietor.professions` are raw villager-profession IDs, which may be aliases of this career. They are deliberately not canonicalised, so the foreign profession keeps its trades, clothing, and identity while Townstead treats the villager as a member of this career. `slots` is the number of seats reserved in each matching building; ordinary staff fill the remaining seats.

### Station Post

```json
{
  "type": "townstead:station_post",
  "blocks": ["example:apiary", "#example:apiaries"],
  "slots": 1
}
```

A station post is a standalone workplace outside every recognized building. A station inside a building does not add another seat. The building already accounts for that room. Self-declared station-post discovery is parsed but is not yet backed by a general indexed block search; use a startup POI or building provider for production content.

### Always

```json
{ "type": "townstead:always" }
```

Use this for a profession that needs no physical job site.
