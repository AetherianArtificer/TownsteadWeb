---
title: How Reactions Work
description: "How villagers react to gestures, places, damage, news, and the time of day, and how Townstead plays a reaction."
---

:::caution[Preview]
Reactions are still changing. Test your pack again after you update Townstead.
:::

A reaction makes a villager respond to something: a player's wave, a raid, a cold night, or news about a friend. The villager can perform a gesture, show an expression over their head, make a sound, say a line, and run [Pheno actions](/pheno/actions/).

A reaction answers four questions:

1. **What starts it?** The entries in `triggers`.
2. **When is it allowed?** The `when` condition, the cooldown, and the chance.
3. **What does the villager do?** The entries in `choices`.
4. **How often?** The `cooldown` of the reaction and of each choice.

Townstead loads reactions on the server. The **Social Life** dial on the Switchboard turns reactions on or off, together with conversations and hangouts.

## File Location

Put each reaction in:

```text
data/<namespace>/townstead/reactions/<path>.json
```

The path is the reaction ID. For example, `data/examplepack/townstead/reactions/wave.json` is the reaction `examplepack:wave`.

## Minimal Reaction

```json
{
  "schema": "townstead:reaction/v3",
  "display_name": "reaction.examplepack.wave",
  "cooldown": "10s",
  "triggers": [
    { "type": "gesture", "emote": "emotecraft:waving" }
  ],
  "choices": [
    {
      "do": {
        "type": "pheno:performance",
        "performance": "townstead:reaction_wave",
        "channel": "reaction",
        "duration_ticks": 40
      }
    }
  ]
}
```

When a player near the villager waves with Emotecraft, the villager waves back with Townstead's own wave animation. Then the reaction waits 10 seconds before it can play again for that villager.

## How Townstead Plays a Reaction

When a trigger matches, Townstead does these steps:

1. It stops if the villager sleeps, or if another reaction locks the villager.
2. It stops if the reaction is on cooldown for this villager.
3. It rolls the `chance` of the reaction.
4. It checks the `when` condition of the reaction.
5. It removes each choice whose `when` fails, whose cooldown is active, whose personality weight is `0`, or whose `chance` roll fails.
6. It picks one of the remaining choices at random, by weight.
7. It plays the animation of the choice, if it has one.
8. It runs the `do` of the choice, and then the `do` of the reaction.
9. It starts the cooldowns, plays the sound and particles, says the speech line, locks the villager, changes hearts, and mirrors the gesture.

If nothing plays, Townstead does not start the cooldowns. The `/townstead reaction play` command skips the sleep and lock checks and the cooldowns, conditions, and chance rolls.

## Reaction Pages

| Page | What it covers |
| --- | --- |
| [Reaction Files](/reactions/reaction-files/) | The fields of a reaction, its choices, sounds, locking, mirroring, hearts, and pack merging. |
| [Triggers](/reactions/triggers/) | The events that can start a reaction. |
| [Context Tags](/reactions/context-tags/) | The tags for context triggers and `required_tags`. |
| [Performances & Expressions](/reactions/performances/) | Gestures with `pheno:performance`, performance mappings, and expression cues. |
| [Emotecraft Animations](/reactions/emotecraft/) | Emotecraft emotes in a choice. |
| [Testing & Commands](/reactions/testing/) | Commands and troubleshooting. |
