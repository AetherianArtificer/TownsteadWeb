---
title: Work Feedback
description: Author a Profession's blocked-work dialogue, including personality and Root voices.
---

Profession feedback lets a villager explain why work has stopped. The work engine discovers the problem. JSON decides whether the villager should mention it, which problem takes precedence, how often it may be mentioned, and which dialogue key it uses.

This follows the same layout as the rest of a Profession. Shared policy is a sidecar. Each named thing is an individual file whose path supplies its identity.

## Layout

```text
data/<namespace>/profession/<profession>/
├─ profession.json
├─ work.json
├─ feedback.json
└─ feedback/
   ├─ no_worksite.json
   ├─ no_input.json
   └─ unreachable.json
```

The directory supplies the Profession ID. For example, files below `data/example/profession/beekeeper/` belong to `example:beekeeper`. The filename supplies the feedback-rule ID, so `feedback/no_input.json` defines `no_input`.

Do not repeat either ID inside the JSON.

## Profession settings

The optional `feedback.json` sidecar contains values shared by the Profession:

```json
{
  "schema": "townstead:profession_feedback/v1",
  "interval": 1200,
  "range": 24
}
```

`interval` is the shared cooldown in ticks. `range` is the maximum distance to the nearest player. The defaults are 1200 ticks and 24 blocks, so omit this sidecar when those values are suitable.

## One rule

Each file in `feedback/` defines one rule:

```json
{
  "schema": "townstead:profession_feedback_rule/v1",
  "trigger": "periodic",
  "priority": 30,
  "when": {
    "type": "townstead:work_signal",
    "signal": "townstead_work:block_interaction/has_worksite",
    "inverted": true
  },
  "dialogue": {
    "translate": "dialogue.chat.beekeeper_request.no_worksite"
  },
  "variants": 3
}
```

`trigger` accepts four values:

- `event` is the default. The work engine reports the rule by its file-derived ID, and the normal cooldown applies.
- `immediate` is an event that bypasses the cooldown. Use it for a one-time result, not a persistent obstruction.
- `periodic` is considered during the villager's work shift whenever the shared cooldown is ready.
- `rising` speaks once when `when` changes from false to true. The first observation is silent. Use it for milestones such as a newly completed workplace; it does not use the repeated-request cooldown.

Periodic rules are tested from highest `priority` to lowest. The first matching rule speaks. `when` is an ordinary Pheno condition and may use compositions such as `pheno:and`, `pheno:or`, and `pheno:not`. Omit it for an event whose work engine has already identified the complete reason.

`dialogue` is a standard translatable component. `variants` declares the size of its generic numbered pool and defaults to one.

## Language lines

Write the dialogue lines in a language file inside the pack's `data` folder. Townstead reads this file on the server, so a data pack does not need an `assets` folder for its dialogue:

```text
data/example/lang/en_us.json
```

```json
{
  "dialogue.chat.beekeeper_request.no_worksite/1": "I have no hive assigned to me.",
  "dialogue.chat.beekeeper_request.no_worksite/2": "Give me a beehive to tend and I can begin.",
  "dialogue.chat.beekeeper_request.no_worksite/3": "There is work to do, but no worksite to do it in."
}
```

The `/1`, `/2`, and `/3` suffixes form the generic pool declared by `variants`. Townstead selects one at delivery time. `%1$s` is the listening player's name. Arguments supplied by the work engine begin at `%2$s`.

## Work state

Describe ordinary world state directly. `townstead:worksite` can count matching workplaces, blocks, or living entities; Townstead does not need to know what a hive, carcass, orchard, or machine is:

```json
{
  "type": "townstead:worksite",
  "scope": "profession",
  "buildings": ["example:apiary*"],
  "block_condition": {
    "type": "pheno:block_state",
    "property": "honey_level",
    "value": "5"
  }
}
```

`scope` is `assigned` by default. `profession` considers every workplace supplied by the Profession's POI declarations, while `village` considers every complete building. `buildings` accepts exact building types and trailing-`*` prefixes. Omit both `block_condition` and `entity_condition` to count the matching places themselves. With either condition present, Townstead counts matching blocks or living entities instead. `comparison` defaults to `>=`, and `compare_to` defaults to `1`.

The nested conditions are the same Pheno block and entity conditions used elsewhere. Combine `townstead:worksite` with `pheno:inventory` to express such facts as “a ready carcass exists, but the worker carries no skinning knife.” This keeps the vocabulary of the trade in JSON.

A work engine may still expose a `townstead:work_signal` for state that cannot be reconstructed from the world, such as a machine that refused an item for reasons the world does not show. A signal remains a namespaced, read-only fact. It does not contain dialogue policy, and it should not duplicate a fact that `townstead:worksite`, `pheno:inventory`, or another ordinary condition can already describe.

A named [managed Job requirement](/careers/work/jobs/#managed-requirements) exposes its exact state through `townstead:work_requirement`:

```json
{
  "type": "townstead:work_requirement",
  "job": "example:beehive_harvest",
  "requirement": "smoke",
  "state": "missing_source"
}
```

`state` accepts `satisfied`, `unsatisfied`, `provisionable`, `missing_source`, and `missing_input`. `unsatisfied` includes every applicable state except `satisfied`; it does not match when the Job or requirement is inapplicable. Use the precise states for dialogue: a missing campfire is not the same problem as an existing campfire without an ignition tool. A provisionable requirement normally needs no complaint because the worker can resolve it.

## Personality voices

Personality wording belongs to the voice hierarchy, not to another conditional choice inside the rule. Keep the same semantic dialogue key and prefix it with the flattened personality ID:

```json
{
  "townstead_voice.mca.crabby.dialogue.chat.beekeeper_request.no_input/1": "The hive is ready. Are the shears meant to appear by magic?",
  "townstead_voice.mca.crabby.dialogue.chat.beekeeper_request.no_input/2": "Shears or a bottle. I cannot harvest honey with my bare hands."
}
```

A voice tier may provide a different number of variants from the generic pool. Townstead chooses among the variants that tier actually defines.

For a custom personality, use its complete flattened ID. `example:courtly` becomes `townstead_voice.example.courtly...`. A custom personality's MCA base personality is the next fallback, so a personality based on crabby inherits crabby lines without restating conditions.

`pheno:personality` remains available for gameplay conditions. It is unnecessary when only the wording changes.

## Root voices

Roots use the same mechanism:

```json
{
  "townstead_voice.example.marshfolk.dialogue.chat.beekeeper_request.no_input/1": "Full hive but no shears! We needs the honeys!"
}
```

Voice lookup is most specific first:

```text
custom personality → MCA base personality → Root → lineage → ancestry → species
```

A Root pack therefore expands a Profession's voice by adding language entries. It does not repeat the Profession ID, feedback condition, trigger, or priority. Missing lines fall through to the next voice tier and finally to the generic pool.

## Data-pack composition

Separate rule files merge naturally. To add a rule, add a new filename. To replace a rule, provide the same resource path from a higher-priority data pack. To remove a bundled rule, use Minecraft's ordinary resource-filter facilities.

Optional integrations may use the same `mods` gate as Profession trade documents:

```json
{
  "schema": "townstead:profession_feedback_rule/v1",
  "mods": "butchery",
  "dialogue": {
    "translate": "dialogue.chat.butcher_request.no_skinning_knife"
  }
}
```

An unmet gate omits the rule. An invalid gate rejects it.

## Authoring guidance

Name the file after the general problem, not the workstation or the sentence. `no_worksite.json` can serve any Profession; `no_smoker.json` and `ask_for_smoker_angrily.json` bind the rule to one trade or one tone. Keep conditions factual and reusable. Use priorities only to choose among simultaneous obstructions. Use event rules for exact failures reported by a task, periodic rules for persistent conditions, and voice entries for differences in character.

The result should sound as though the villager understands their work. The machinery underneath should remain useful to the next Profession.
