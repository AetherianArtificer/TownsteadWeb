---
title: Testing & Commands
description: "Commands to list and play reactions, and how to fix common problems."
---

## Testing Commands

List the loaded reactions:

```text
/townstead reaction list
```

Play a reaction on the villager you look at, or the nearest villager within 16 blocks:

```text
/townstead reaction play "examplepack:applaud"
```

Play it on a target:

```text
/townstead reaction play "examplepack:applaud" @e[type=mca:male_villager,limit=1,sort=nearest]
```

The command skips cooldowns, conditions, and chance rolls. It reports a failure when the reaction is unknown or no choice can play.

## Troubleshooting

### The reaction is not listed

- Make sure that the file is in `data/<namespace>/townstead/reactions/`.
- Make sure that the JSON is valid, and that the `schema` is correct.
- Look in the server log for a rejected reaction.
- Run `/reload` after you change the file.

### The reaction is listed but does not play

- Make sure that each choice has `do`, `animation`, `sound`, `particles`, or `speech_pool`.
- Check the cooldowns, both `chance` fields, and the `when` conditions.
- Check the personality weights and the `required_tags`.
- Make sure that the Social Life dial on the Switchboard is on.
- For an Emotecraft emote, make sure that players have the emote.

### A context reaction never plays

- Use `context_enter` for a change into a state, `context_exit` for a change out of a state, and `context_present` to repeat while a state lasts.
- The trigger needs all of its `tags` at the same time.
- With `context_present`, the `cooldown` sets how often the reaction repeats.

### Other villagers do not copy it

- Set both `mirror_radius` and `mirror_chance` above zero.
- Mirroring works only for Emotecraft emotes.
- Give the other reaction a `gesture` trigger for the emote that played.
- Mirroring stops after one step.
