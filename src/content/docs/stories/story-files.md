---
title: Villager Stories
description: Stories that ordinary villagers tell, chosen by profession, root, culture or a condition.
---

A villager story belongs to a kind of villager, not to one person. Every villager that the story's `attach` matches can tell it: every farmer, every villager of a culture, or every villager that passes a condition.

## Folder

```text
data/<namespace>/story/<id>/
  story.json
  story.ink
  more.ink
```

The folder name is the story ID. `data/examplepack/story/granary/` is the story `examplepack:granary`. Put any number of `.ink` files in the folder, and in subfolders. See [How Townstead Reads Your Files](/stories/ink/#how-townstead-reads-your-files).

## story.json

```json
{
  "schema": "townstead:story/v1",
  "attach": {
    "profession": ["farmer", "examplepack:orchardist"],
    "culture": "examplepack:fisherfolk"
  },
  "bind": "villager",
  "priority": 10,
  "goals": { },
  "rewards": { },
  "conditions": { },
  "actions": { }
}
```

| Field | Description |
| --- | --- |
| `schema` | Optional. When present, it must be `townstead:story/v1`. |
| `attach` | Which villagers tell the story. See [Attach](#attach). Without it, no villager tells the story. |
| `bind` | `villager` or `player`. See [Bind](#bind). The default is `villager`. |
| `priority` | When several stories attach to one villager, Townstead uses the story with the highest priority. The default is 0. |
| `requires_mods` | Mod IDs. The story loads only when all of them are installed. |
| `goals`, `rewards` | Named goals and rewards for quests. See [Quests, Goals & Rewards](/stories/quests/). |
| `conditions`, `actions` | Named Pheno conditions and actions for the Ink. See [Conditions, Actions & Checkpoints](/stories/conditions-actions/). |
| `checkpoints` | Test starting points for `/townstead scene`. See [Checkpoints](/stories/conditions-actions/#checkpoints). |
| `demeanor` | Demeanor bands that replace the default ones. See [Demeanor](/stories/relationships/#demeanor). |

## Attach

Each field that `attach` lists must match. A field that is left out matches every villager.

| Field | Matches |
| --- | --- |
| `profession` | A profession ID or a list. A bare name such as `farmer` means `minecraft:farmer`. |
| `root` | A [Root](/roots/) ID or a list. |
| `culture` | A [culture](/cultures/) ID or a list. |
| `villager` | Villager UUIDs, for one specific villager. |
| `when` | A [Pheno condition](/pheno/conditions/), tested on the villager with the player as `other`. |

One villager tells one story at a time. When several stories match, Townstead uses the one with the highest `priority`. On a tie, it uses the first by ID. A Persona's own story has priority 1000, so a Persona tells their own story.

## Bind

`bind` says whose copy of the story the player plays:

| `bind` | The player's progress |
| --- | --- |
| `villager` | Each villager tells their own copy. Talking to a second farmer starts the story again with that farmer. |
| `player` | One copy for each player. The first matching villager the player talks to tells it, and the story stays with that villager. |

Use `player` for a story that should happen once, such as a lesson about a game system. Use `villager` for a story about each villager's own life.

## Example: One Story for a Culture

```json
{
  "attach": { "culture": "examplepack:fisherfolk", "profession": "fisherman" },
  "requires_mods": ["examplefishingmod"],
  "conditions": {
    "storm": { "type": "pheno:environment", "weather": "thunder" }
  }
}
```

```text
=== greet ===
{check("storm"):
    No boats out in this. Haddra keep them all ashore.
- else:
    Fair tides! The nets came in full.
}
-> DONE
```
