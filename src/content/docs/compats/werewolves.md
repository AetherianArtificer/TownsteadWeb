---
title: Werewolves
description: "Werewolf villagers who turn at night, and Werewolves for players."
---

**Author:** Cheaterpaul\
**Download:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/werewolves-become-a-beast) · [Modrinth](https://modrinth.com/mod/werewolves)\
**Install on:** The server and every client

Werewolves needs [Vampirism](/compats/vampirism/).

## What It Adds

### Werewolf Villagers

An MCA villager can be a werewolf, and stays the same person.

- Each hit that a werewolf villager takes adds rage. Rage drains slowly.
- At night, with enough rage, the villager turns into the beast for a short time. At a full moon, they stay turned all night.
- A turned werewolf goes on four legs while it prowls, and stands upright when an enemy is near.
- A turned werewolf does not talk or sleep. It hunts the enemies of the town.
- Silver and wolfsbane work on werewolf villagers as on the mod's own werewolves.

### Players

- Townstead reads the beast form, coat, and eyes of a werewolf player.
- On the **Aspects** page of Destiny, a player can start as a werewolf once, before they join a faction.
- The ability wheel holds the werewolf actions.
- Werewolves warns players that it does not work with MCA. Townstead fixes that conflict, so the warning does not show.

### Spawns

The mod's human werewolves spawn as wild werewolf villagers of the Roots of the region. They still turn into the beast at night.

## Settings

`replaceWerewolfSpawns` in `[vampirism]` in the server configuration turns the werewolf spawns on or off. The default is `true`.

## Commands

`/townstead compat werewolves` makes and cures werewolves, turns a villager into the beast or holds them in it, sets rage and looks, jumps to the next full moon, and shows the state of a werewolf. Its subcommands are `make`, `cure`, `form`, `release`, `rage`, `looks`, `moon`, and `status`.
