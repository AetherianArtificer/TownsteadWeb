---
title: How Stories & Personas Work
description: Villager stories and Personas, written in Ink with a little JSON, and how they reach the player.
---

:::caution[Preview]
Stories and Personas are new. The file formats can change between versions, and some features are not finished. Test your pack again after you update Townstead.
:::

A **story** is a conversation that a villager has with the player, written in [Ink](/stories/ink/). It can give quests, remember what the player said, react to the world, and change how the villager feels about the player.

A **Persona** is a story that belongs to one person. A Persona is a unique villager who arrives in the player's village, with their own name and job, and their own reactions to gifts. A Persona knows the player, and talks about what they know about the player.

This section is for pack authors. For the player's view, see [Stories & Personas](/guides/personas/).

## Two Kinds of Story

| | Villager story | Persona |
| --- | --- | --- |
| Folder | `data/<ns>/story/<id>/` | `data/<ns>/persona/<id>/` |
| JSON file | `story.json` | `persona.json` |
| Who tells it | Every villager that `attach` matches, such as all farmers. | Only the Persona's own villager. |
| How the villager appears | An ordinary villager. | The Persona arrives when its arrival goals are met, or with a command. |
| Page | [Villager Stories](/stories/story-files/) | [Personas](/stories/persona-files/) |

Both use the same Ink, the same [quests, goals and rewards](/stories/quests/), and the same [conditions and actions](/stories/conditions-actions/).

## How a Player Meets a Story

1. The player talks to a villager who has a story. The dialogue screen shows a menu entry for it, next to MCA's own options.
2. The player picks the entry. The story starts at its `greet` knot, or at a quest that is waiting to be handed back.
3. The story plays line by line. The player chooses replies.
4. When the story enters a quest knot, the quest starts and shows in the Quest Ledger.
5. When the goals are met, the villager has something to say. The next talk plays the hand-back lines and pays the rewards.

Stories need Townstead's dialogue screen. When `useRpgDialogue` is off in the client configuration, stories do not show.

Each player has their own progress in each story. Two players who talk to the same Persona each get their own conversation, quests and relationship.

## A Persona's Life

1. **Arrival.** A player stands in a village. When one of the Persona's [arrival goals](/stories/persona-files/#arrival) is met, the Persona walks in from the edge of the village toward the player.
2. **Identity.** The first time the world needs them, the Persona rolls a name, a gender and the values in `rolls`, such as a hometown. These stay the same for the whole world.
3. **The story.** The player talks to them. Then the quests, gifts and relationship start.
4. **Downed, not dead.** By default, a Persona who would die is [downed](/stories/downed/) instead and gets up later.
5. **Leaving.** A player can ask a Persona to leave town. A Persona can also [move on](/stories/persona-files/#moving-on) by themselves, for example when their town falls.

## World Settings

| Setting | Effect |
| --- | --- |
| Switchboard **Quests** dial | Turns villager stories on or off, together with the Quest Ledger. |
| Switchboard **Personas** dial | **Off**: no Personas arrive, and Persona stories do not show. **On**: Personas are downed instead of dying. **On, can die**: Personas die like anyone else. |
| `[personas]` in the server configuration | `permadeath` and `downedRecovery`. See [Downed](/stories/downed/#settings). |

## Data Files

| Folder | Page | What it holds |
| --- | --- | --- |
| `data/<ns>/story/<id>/` | [Villager Stories](/stories/story-files/) | A story's `.ink` files and `story.json`. |
| `data/<ns>/persona/<id>/` | [Personas](/stories/persona-files/) | A Persona's `.ink` files and `persona.json`. |
| `data/<ns>/goal/` | [Quests, Goals & Rewards](/stories/quests/#shared-goals-and-rewards) | Goals that several stories share. |
| `data/<ns>/reward/` | [Quests, Goals & Rewards](/stories/quests/#shared-goals-and-rewards) | Rewards that several stories share. |
| `data/<ns>/story_item/` | [Story Tools](/stories/story-tools/#story-items) | Named items for stories, such as a letter or a keepsake. |
| `data/<ns>/downed/` | [Downed](/stories/downed/#other-villagers) | Which other villagers are downed instead of dying. |

## Where to Start

- Follow [Your First Story](/stories/first-story/) to make a story and then a Persona in a few minutes.
- If you are new to Ink, read inkle's [Writing with Ink](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md) guide first, and install the [Inky](https://github.com/inkle/inky/releases) editor. See [Writing in Ink](/stories/ink/).
