---
title: Testing & Commands
description: How to find errors in stories, jump to scenes, and make Personas arrive for testing.
---

## 1. Check for Errors

After you change a story, run `/reload`, then:

```txt
/townstead story errors
```

It lists each problem with its story, file and line. When there are none, it says `No problems.` Add a story ID to see one story only.

The game log also shows each problem, and a summary:

```txt
Story examplepack:granary: error: no '=== greet ===' knot; it is where every conversation starts
Loaded 2 Personas
Loaded 5 stories
```

An **error** stops the story or Persona from loading. A **warning** does not.

### Common Problems

| Message | Fix |
| --- | --- |
| `no .ink files` | Add at least one `.ink` file to the folder. |
| `no '=== greet ===' knot` | Add a `greet` knot. |
| An Ink error with a file and a line | Fix the Ink there. Inky shows the same errors as you type. |
| `no goal named '<name>' in story.json or data/*/goal/` | Define the goal, or fix its name in `# goal:`. |
| `a goal needs "text", the line shown in the Quest Ledger` | Add `text` to the goal. |
| `a goal needs one of "condition", "value" or "event"` | Give the goal a shape. See [Goals](/stories/quests/#goals). |
| `a value goal needs "target"` | Add `target`. |
| `no event '<id>'` | Fix the event ID. See [Events](/stories/quests/#events). |
| `gifts: no knot '<knot>' in the Ink` | Add the knot that the gift rule names. |
| `arrives: arrival goals must be a condition or a value, not an event count` | Use a condition goal or a value goal to make the Persona arrive. |
| `attaches to no villager; add "attach" to story.json` (warning) | Add [`attach`](/stories/story-files/#attach). |
| `no "arrives"; this Persona only comes through /townstead persona spawn` (warning) | Add [`arrives`](/stories/persona-files/#arrival), unless that is what you want. |
| `not loaded, because mod '<id>' is not installed` (warning) | Expected when `requires_mods` names a missing mod. |
| `two quests are titled '<title>'` (warning) | Give each quest its own title. |

Some mistakes show only in play. When a `# who:` role finds nobody nearby, the log shows `nobody near to say a line`, and the line is skipped.

## 2. Play the Story Again

```txt
/townstead story reset examplepack:granary
```

This clears your own progress in the story, so it starts again from `greet`. Without an ID, it clears your progress in every story. A Persona's story ID is `<namespace>:persona/<id>`.

## 3. Jump to a Scene

```txt
/townstead scene after_nets
/townstead scene knot wreck_offer met=2 done_nets=true
```

| Command | Effect |
| --- | --- |
| `/townstead scene <checkpoint> [target]` | Applies a [checkpoint](/stories/conditions-actions/#checkpoints) from the story's JSON, then opens its scene. |
| `/townstead scene knot <knot> [target] [name=value ...]` | Opens any knot, with Ink variables set. |

Without a target, the command uses the villager you look at, or the nearest one.

## 4. Bring a Persona In

| Command | Effect |
| --- | --- |
| `/townstead persona list` | Lists the loaded Personas, and where each one lives. |
| `/townstead persona spawn <id>` | Brings the Persona to the village you stand in, next to you. Arrival goals are ignored. |
| `/townstead persona reset <id>` | Forgets the Persona for you in this village. The villager stays as an ordinary resident. Your bond and your story with them are cleared. When no village still has the Persona, what the world rolled for them is cleared too. |
| `/townstead persona remove <id>` | Removes the Persona's villagers everywhere. A villager in an unloaded place stays as an ordinary resident. Your bond, your story and the world's rolls for them are cleared. |
| `/townstead persona travel <id>` | Sends the Persona who lives in this village on the road, ready to arrive in another village at once. |

To test arrival goals, use `reset` or `remove`, then meet the goals in a village. Townstead checks them every five seconds.

All story, scene and Persona commands need operator permission.

## Checklist for a New Persona

- `/townstead story errors` shows no problems.
- The Persona arrives when an arrival goal is met, and walks to you.
- Their name, job and outfit fit what `persona.json` says, and stay the same after a restart.
- Every quest starts, shows in the Quest Ledger, and completes. Rewards arrive once.
- Every gift rule plays its knot.
- Scenes with `# who:` lines check `here()` first.
- The story still reads well after `/townstead story reset`, from the first meeting.
