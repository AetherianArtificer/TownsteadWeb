---
title: Scenes & Cast
description: Scenes with more than one villager, scenes the player overhears, and villagers who call the player over.
---

## The Cast

A line tagged `# who:` is said by another villager instead of the teller. That villager is part of the scene's **cast**.

```text
=== nets_argument ===
{not here("fisherman"): -> DONE}
These knots will never hold.
They held last winter. # who: fisherman
-> DONE
```

The value of `# who:` is a **role**. Townstead finds a villager for the role near the player:

| Role | Finds |
| --- | --- |
| `me`, or no `# who:` | The teller. |
| A named condition, such as `is_child` | The nearest villager that the [condition](/stories/conditions-actions/#conditions) holds for. |
| A Persona ID, such as `old_sailor` | That Persona. A bare name means the story's own namespace. |
| `visitor:<role>` | A visitor to the village with that role. |
| Anything else | A villager with that profession. A bare name such as `fisherman` means `minecraft:fisherman`. |

- Townstead looks for the cast villager within 12 blocks of the player, the first time a line needs them. The same villager then stays for the rest of the conversation.
- Cast villagers stay near the player and face whoever is talking. A cast villager more than 24 blocks away leaves the scene, and Townstead looks for the role again.
- The teller and the other cast villagers are always different villagers.
- When a scene asks for a `visitor:<role>` who is more than 12 blocks from the player but within 128, the visitor walks back to the player. Ask with `here()`, and talk again when they arrive.
- When no villager fits a role, Townstead skips that line, and the log shows a warning.

Check with `here()` before a scene that needs someone, and divert away when they are not there. `here("fisherman")` is `true` when a villager for the role is near.

## Overheard Scenes

An overheard scene plays in chat when the player walks past. It needs no dialogue screen.

```text
=== overheard_weather ===
# overheard: once
{not here("old_sailor"): -> DONE}
Red sky this morning.
Then we stay in. # who: old_sailor
-> DONE
```

- Tag the knot `# overheard: once`.
- It plays when the player comes within 10 blocks of the teller. Players within 20 blocks of the speaker see the lines. When the player walks more than 24 blocks away, the scene stops.
- Each player hears each overheard scene once.
- A scene that says nothing, because its checks failed, is not used up. Townstead tries it again later.
- After a scene, Townstead waits about three minutes before the next one.

Overheard scenes are a good way to show the villagers' own lives: a friendship, an old argument, a habit.

## Calling the Player

A story can call the player over. Write a `calling()` function that returns a line, or `""` for nothing:

```text
=== function calling() ===
{quest_open and check("storm"):
    ~ return "Hey! You'll want to hear this."
}
~ return ""
```

- Once a second, Townstead checks the story villagers within 32 blocks of the player.
- When `calling()` returns a line, a mark shows over the villager's head.
- When the player comes within 8 blocks, the villager waves and says the line once.
- They say each line once for each scene. The scene is the line together with the [`menu()`](/stories/ink/#functions-your-story-can-have) entry, so a new menu entry or a new line calls again.

A villager with a quest ready to hand back also shows a mark, with no `calling()` needed.
