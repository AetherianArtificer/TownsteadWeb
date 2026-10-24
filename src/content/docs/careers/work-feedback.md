---
title: Work Feedback
description: Author a Profession's blocked-work dialogue, including personality and Root voices.
---

With work feedback, a villager can tell the player why their work has stopped. The work engine finds the problem. The JSON sets:

- whether the villager talks about the problem;
- which problem comes first;
- how often the villager can talk about it;
- which dialogue key the villager uses.

Feedback uses the same layout as the rest of a Profession. Shared settings are in one file. Each rule is in a separate file, and the path of the file gives its ID.

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

The directory gives the Profession ID. For example, files under `data/example/profession/beekeeper/` belong to `example:beekeeper`. The file name gives the ID of the feedback rule, so `feedback/no_input.json` defines `no_input`.

Do not write either ID in the JSON.

## Profession settings

The optional `feedback.json` file holds the settings for the whole Profession:

```json
{
  "schema": "townstead:profession_feedback/v1",
  "interval": 1200,
  "range": 24
}
```

- `interval` is the shared cooldown, in ticks. The default is 1200.
- `range` is the largest distance to the nearest player, in blocks. The default is 24.

If the defaults are correct for you, you do not need this file.

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

- `event` is the default. The work engine reports the rule by its ID, and the usual cooldown applies.
- `immediate` is an event with no cooldown. Use it for a result that happens once, not for a problem that stays.
- `periodic`: Townstead checks the rule during the work shift of the villager, each time the shared cooldown is ready.
- `rising`: the villager speaks once when `when` changes from false to true. The villager does not speak at the first check. Use it for milestones, such as a workplace that is now complete. It does not use the cooldown.

Townstead checks periodic rules from the highest `priority` to the lowest. The villager says the line of the first rule that matches. `when` is a usual Pheno condition, and can use `pheno:and`, `pheno:or`, and `pheno:not`. Leave it out for an event when the work engine already knows the full reason.

`dialogue` is a standard translatable component. `variants` is the number of lines in its numbered pool. The default is 1.

## Language lines

Write the dialogue lines in a language file in the `data` folder of the pack. Townstead reads this file on the server, so a data pack does not need an `assets` folder for its dialogue:

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

The endings `/1`, `/2`, and `/3` make the pool that `variants` declares. Townstead chooses one line when the villager speaks. `%1$s` is the name of the player who listens. Values from the work engine start at `%2$s`.

## Work state

Describe the state of the world directly. `townstead:worksite` can count matching workplaces, blocks, or living entities. Townstead does not need to know what a hive, carcass, orchard, or machine is:

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

| Field | Description |
| --- | --- |
| `scope` | `assigned` (default): the villager's own workplace. `profession`: every workplace from the POI declarations of the Profession. `village`: every complete building. |
| `buildings` | Exact building types, or prefixes that end with `*`. |
| `block_condition`, `entity_condition` | Without either condition, Townstead counts the matching places. With a condition, Townstead counts the matching blocks or living entities. |
| `comparison` | The default is `>=`. |
| `compare_to` | The default is `1`. |

The nested conditions are the usual Pheno block and entity conditions. Use `townstead:worksite` with `pheno:inventory` to describe facts such as "a carcass is ready, but the worker has no skinning knife". In this way, the words of the trade stay in JSON.

A work engine can also give a `townstead:work_signal` for a state that the world does not show, such as a machine that refused an item for a hidden reason. A signal is a read-only fact with a namespace. It has no dialogue settings. Do not use a signal for a fact that `townstead:worksite`, `pheno:inventory`, or another usual condition can already describe.

`townstead:work_requirement` reads the exact state of a named [managed Job requirement](/careers/work/jobs/#managed-requirements):

```json
{
  "type": "townstead:work_requirement",
  "job": "example:beehive_harvest",
  "requirement": "smoke",
  "state": "missing_source"
}
```

`state` accepts `satisfied`, `unsatisfied`, `provisionable`, `missing_source`, and `missing_input`. `unsatisfied` matches every state except `satisfied`. It does not match when the Job or requirement does not apply. Use the exact states for dialogue. For example, a missing campfire is a different problem from a campfire with no tool to light it. The worker can fix a `provisionable` requirement, so it usually needs no complaint.

## Personality voices

Do not add a condition to the rule to change the words for a personality. Use the voice system. Keep the same dialogue key, and put the personality ID in front of it, with dots in place of the colon:

```json
{
  "townstead_voice.mca.crabby.dialogue.chat.beekeeper_request.no_input/1": "The hive is ready. Are the shears meant to appear by magic?",
  "townstead_voice.mca.crabby.dialogue.chat.beekeeper_request.no_input/2": "Shears or a bottle. I cannot harvest honey with my bare hands."
}
```

A voice can have a different number of lines from the generic pool. Townstead chooses from the lines that the voice defines.

For a custom personality, use its full ID in the same way. `example:courtly` becomes `townstead_voice.example.courtly...`. If a line is missing, Townstead tries the MCA base personality of the custom personality next. So a personality based on crabby uses the crabby lines, with no extra conditions.

You can still use `pheno:personality` in gameplay conditions. You do not need it when only the words change.

## Root voices

Roots use the same system:

```json
{
  "townstead_voice.example.marshfolk.dialogue.chat.beekeeper_request.no_input/1": "Full hive but no shears! We needs the honeys!"
}
```

Townstead looks for a voice in this order, from the most specific:

```text
custom personality → MCA base personality → Root → lineage → ancestry → species
```

So a Root pack adds voices to a Profession with language entries only. It does not repeat the Profession ID, the feedback condition, the trigger, or the priority. When a line is missing, Townstead tries the next voice, and at the end the generic pool.

## Data-pack composition

Separate rule files combine automatically. To add a rule, add a file with a new name. To replace a rule, put a file at the same resource path in a data pack with a higher priority. To remove a rule from Townstead, use the usual resource filters of Minecraft.

Optional integrations can use the same `mods` gate as Profession trade files:

```json
{
  "schema": "townstead:profession_feedback_rule/v1",
  "mods": "butchery",
  "dialogue": {
    "translate": "dialogue.chat.butcher_request.no_skinning_knife"
  }
}
```

When the gate is not met, Townstead ignores the rule. When the gate is invalid, Townstead rejects the rule.

## Authoring guidance

- Name the file after the general problem, not after the workstation or the sentence. Any Profession can use `no_worksite.json`. Names such as `no_smoker.json` and `ask_for_smoker_angrily.json` tie the rule to one trade or one tone.
- Keep conditions factual, so that other Professions can use them.
- Use priorities only to choose between problems that happen at the same time.
- Use event rules for exact failures that a task reports, and periodic rules for problems that stay.
- Use voice entries for differences in character.

The villager must sound like a person who understands their work. The rules must still be useful for the next Profession.
