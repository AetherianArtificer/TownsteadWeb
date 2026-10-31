---
title: Emotecraft
description: "Villagers play emotes, emotes start reactions, and players' emotes play on MCA models."
---

**Author:** KosmX\
**Download:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/emotecraft-forge) · [Modrinth](https://modrinth.com/mod/emotecraft)\
**Install on:** The client of each player who wants it

Townstead needs Emotecraft 2.2.7 or later on 1.20.1, and 2.4.12 or later on 1.21.1. Emotecraft also needs Player Animator and Bendy lib.

## What It Adds

- **Villager emotes.** Villagers play emotes in [reactions](/reactions/emotecraft/), and when their own behaviour asks for one.
- **The Pose button.** The **Pose** button on the MCA interaction screen opens a wheel of your Emotecraft emotes. Choose one, and the villager plays it.
- **Gestures.** An emote that plays near a villager, in front of them, can start a reaction. The emote can come from a player or from another villager. See [Reactions](/guides/reactions/).
- **Your emotes.** The emotes that you play from the Emotecraft menu play through Townstead on a player drawn with an MCA model or a rig.
- **Pack emotes.** A resource pack can add emotes in `assets/<namespace>/townstead_emotes/`, as `.json`, `.emotecraft`, or `.emote` files.
- **Rigs.** A non-humanoid rig can map humanoid emotes onto its body, or refuse some of them. See [Poses](/roots/rigs/poses/).

Players without Emotecraft do not see emotes.

## Commands

| Command | Effect |
| --- | --- |
| `/townstead emote play <id> [target]` | Plays an emote on yourself, or on a player or MCA villager. |
| `/townstead emote stop [target]` | Stops the emote. |

See [Commands](/reference/commands/).
