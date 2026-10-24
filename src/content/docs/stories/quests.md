---
title: Quests, Goals & Rewards
description: How a story gives quests, every shape of goal, and how rewards are paid.
---

A quest is an Ink knot with a `# quest:` tag. It has goals that the game checks, and rewards that the player gets at the end. Quests show in the Quest Ledger, and the player can track them on screen.

## A Quest Knot

```text
=== nets ===
# quest: Mend the nets
# about: The fishers need a tailor to mend their nets.
# goal: tailor_here
# goal: catches(20)
# reward: tackle_box
# skip if: tailor_here
# label: About the nets
Half these nets are more hole than net.
->->

= waiting
Any word on a tailor's shop?
-> DONE

= done
The nets hold! We pulled in more today than all week.
-> DONE

= skipped
You already have a tailor? Then the nets are as good as mended.
-> DONE
```

### Quest Tags

| Tag | Description |
| --- | --- |
| `# quest: <title>` | Makes the knot a quest. The title shows in the Quest Ledger. |
| `# about: <text>` | A short description for the Quest Ledger. |
| `# goal: <name>` | A goal that must be met. Repeat the tag for more goals. With parameters: `# goal: catches(20)`. |
| `# reward: <name>` | A reward paid at the end. Repeat the tag for more rewards. |
| `# skip if: <name>` | A goal that, when already met as the quest starts, completes the quest at once. It cannot be an event goal. |
| `# label: <text>` | The story's entry in the dialogue screen while the quest is open. |

### Stitches

| Stitch | Plays |
| --- | --- |
| `= waiting` | When the player talks to the teller while the quest is open, and no scene is ready. See [`scene_ready()`](/stories/ink/#where-a-conversation-starts). |
| `= done` | The next time the player talks to the teller after every goal is met. |
| `= skipped` | Instead of `done`, when `# skip if:` was already met as the quest started. |

All three are optional. A quest without `= waiting` does not change where a talk starts. Leave it out of a side quest, so that the other scenes still play while the side quest is open.

## How a Quest Runs

1. **Start.** The quest starts the first time the story enters the knot. A tunnel (`-> nets ->`) is a good way to enter it and come back.
2. **Open.** The Quest Ledger shows the quest, its goals and their progress. A message shows the new quest to the player.
3. **Ready.** When every goal is met, the teller has something to say. A mark shows over their head.
4. **Hand back.** The next conversation starts at `= done` (or `= skipped`). When it has played, the quest is complete.
5. **Rewards.** Townstead pays the rewards once, when the quest is complete.

A quest with no `= done` stitch completes as soon as its goals are met, and pays its rewards then.

Each quest runs once for each player and each copy of the story. See [Bind](/stories/story-files/#bind).

## Goals

A goal is a JSON object. Write goals in `story.json` or `persona.json` under `goals`, or share them in a [goal file](#shared-goals-and-rewards).

```json
"goals": {
  "tailor_here": {
    "text": "Build a tailor's shop in {teller}'s village",
    "condition": { "type": "pheno:village", "has_building": "tailors_shop" }
  }
}
```

Every goal needs `text`, the line in the Quest Ledger, and one of these shapes:

| Shape | Fields | Met when |
| --- | --- | --- |
| Condition | `condition` | The [Pheno condition](/pheno/conditions/) is true. |
| Value | `value`, `target` | The [Pheno value](/pheno/selectors-values/) reaches `target`. The ledger shows progress. |
| Event | `event`, `count`, `where`, `entity`, `condition`, `distinct` | The event happened `count` times. See [Event Goals](#event-goals). |
| Seasons | `seasons`, `condition`, and more | The condition held for that many good seasons. See [Season Goals](#season-goals). |

### Common Fields

| Field | Description |
| --- | --- |
| `text` | Required. The ledger line. `{teller}` is the teller's name, `{player}` the player's, and `{count}` the target number. |
| `subject` | Who the goal is tested on: `teller` (default) or `player`. A condition goal tests the condition on that entity. |
| `params` | Parameter names, for a goal with values. See [Parameters](#parameters). |
| `marker` | A place [marked for the player](/stories/story-tools/#phenomark_structure). `{x}` and `{z}` in the text show its position. |

Townstead checks condition and value goals on a timer, and again after events that can change them. A goal can be met while the player is far away.

### Event Goals

An event goal counts Townstead events, such as work done or a building raised.

```json
"catches": {
  "params": ["count"],
  "text": "{teller} brings in {count} catches",
  "event": "townstead:work_completed",
  "count": "$count",
  "where": { "worker": "teller", "verb": "townstead:fished" }
}
```

| Field | Description |
| --- | --- |
| `event` | The event ID. See [Events](#events). |
| `count` | How many times. The default is 1. |
| `where` | Fields of the event that must match. See below. |
| `entity`, `condition` | A Pheno condition tested on the entity in the event field `entity`. |
| `distinct` | An event field. Each value of it counts once, such as `"objectId"` for different crops. |

In `where`, each key is a field of the event, and its value must match:

- text or a number;
- `"teller"` or `"player"`: that person, or their village for a village field;
- a list: any of the values;
- `{"min": 2, "max": 5}`: a number in the range.

When a field name is wrong, `/townstead story errors` lists the fields that the event has.

An event goal named in the story's own JSON counts from the moment the player meets the teller, quest or not. Ink can read it with [`count("name")`](/stories/ink/#reading-the-world).

### Events

The event ID is the event's name in snake case, with the `townstead:` namespace.

| Group | Events |
| --- | --- |
| Work and careers | `work_completed`, `villager_tier_changed`, `villager_skill_learned`, `villager_skill_forgotten`, `villager_profession_changed`, `worksite_registered`, `worksite_removed` |
| Buildings and villages | `building_established`, `building_upgraded`, `building_removed`, `settlement_founded`, `village_needs_band_changed`, `village_spirit_changed` |
| Villagers | `villager_born`, `villager_died`, `villager_married`, `villager_life_stage_changed`, `villager_village_changed`, `villager_root_changed`, `villager_collapsed`, `villager_recovered`, `villager_refueled`, `villager_crisis` |
| Social | `conversation_held`, `hangout_started`, `hangout_ended`, `dialogue_opened`, `dialogue_closed`, `bond_changed`, `chronicle_event_recorded` |
| Politics | `faction_founded`, `faction_identity_changed`, `faction_kind_changed`, `faction_status_changed`, `settlement_faction_changed`, `legitimacy_changed`, `seat_designated`, `seat_moved`, `seat_damaged`, `seat_repaired`, `seat_lost` |
| World | `calendar_rollover`, `world_settings_changed` |

Fields of some common events:

| Event | Fields |
| --- | --- |
| `work_completed` | `worker`, `uuid`, `professionId`, `verb`, `objectId`, `magnitude`, `appliedXp`, `tierBefore`, `tierAfter` |
| `villager_tier_changed` | `worker`, `uuid`, `professionId`, `tierBefore`, `tierAfter`, `appliedXp` |
| `building_established` | `village`, `buildingId`, `type`, `family`, `tier` |
| `building_upgraded` | `village`, `buildingId`, `typeBefore`, `typeAfter`, `tierBefore`, `tierAfter` |
| `villager_collapsed` | `villager`, `uuid`, `energy` |
| `villager_born` | `baby`, `uuid` |

### Season Goals

A season goal counts good seasons. A season is good when its condition held on enough of its days.

```json
"steady": {
  "text": "Keep five people in {teller}'s village for a whole season",
  "seasons": 1,
  "condition": { "type": "pheno:village", "min_population": 5 },
  "share": 0.75
}
```

| Field | Description |
| --- | --- |
| `seasons` | How many good seasons. |
| `condition` | Required. What makes a day good. Townstead checks it once a day. |
| `share` | The share of checked days that must be good, from 0 to 1. The default is 0.75. |
| `event`, `where`, `per_season` | Optional. The event must also happen `per_season` times in the season. |
| `season_days` | The length of a season in days, when no seasons mod is installed. The default is 24. |

With a seasons mod, Townstead uses that mod's seasons.

### Parameters

A goal with `params` takes values where it is used. In the goal, write `$name` for each value. In text, write `{name}`.

```json
"have_profession": {
  "params": ["profession", "count"],
  "text": "Have {count} {profession}s",
  "value": { "type": "pheno:count", "on": { "type": "pheno:village",
             "where": { "type": "pheno:profession", "profession": "$profession" } } },
  "target": "$count"
}
```

```text
# goal: have_profession(farmer, 3)
```

## Rewards

A reward is a JSON object, written under `rewards` or in a [reward file](#shared-goals-and-rewards). A quest names it with `# reward:`.

| Shape | Example | Notes |
| --- | --- | --- |
| Items | `{ "items": [{ "item": "minecraft:cod", "count": 8 }] }` | The ledger shows the items. No `text` needed. |
| Loot table | `{ "text": "A sack of whatever {teller} found", "loot_table": "minecraft:chests/village/village_fisher" }` | Rolled when paid. Needs `text`. |
| Action | `{ "text": "A tackle box", "action": { "type": "pheno:give_story_item", "item": "examplepack:tackle_box" } }` | A [Pheno action](/pheno/actions/) on the player. Needs `text`. |

Rewards take `params` in the same way as goals: `# reward: bread(6)`.

Townstead pays each reward once, when its quest is complete. When an update adds a reward to a quest that a player already completed, Townstead pays the new reward then.

## Shared Goals and Rewards

Goals and rewards that several stories use can have their own files:

```text
data/<namespace>/goal/<name>.json
data/<namespace>/reward/<name>.json
```

The file holds one goal or one reward. A story finds a name in this order:

1. its own `goals` or `rewards`;
2. a file with that name in the story's namespace;
3. a file with that name in the `townstead` namespace.

A name with a namespace, such as `examplepack:good_standing`, names a file directly.
