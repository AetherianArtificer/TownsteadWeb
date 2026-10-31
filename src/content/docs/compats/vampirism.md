---
title: Vampirism
description: "Vampire villagers, thralls, dhampirs, hunter lodges, village captures, and Vampirism for players."
---

**Author:** maxanier, Cheaterpaul\
**Download:** [CurseForge](https://www.curseforge.com/minecraft/mc-mods/vampirism-become-a-vampire) · [Modrinth](https://modrinth.com/mod/vampirism)\
**Install on:** The server and every client

## What It Adds

### Vampire Villagers

An MCA villager can become a vampire and stay the same person, with the same family, home, and memories.

- A villager catches Sanguinare from a vampire's bite, as Vampirism's creatures do. When Sanguinare ends, the villager becomes a vampire. Only villagers whose Root allows it can catch Sanguinare.
- A villager that Vampirism turns is replaced by an MCA villager with a name, age, home, and job, and that villager is a vampire.
- A hungry vampire villager drinks blood from an animal. The `feeding` setting lets them also drink from their spouse or from anyone. A vampire never drinks from another vampire.
- A vampire villager's bite can pass on Sanguinare.
- Vampire villagers sleep in coffins by day.
- Garlic, vampire-killer bolts, and stakes work on vampire villagers as on Vampirism's vampires.
- Vampirism's hunters hunt vampire villagers. Vampirism's vampires leave them alone.
- A vampire villager who is cured can resent the cure. A vampire of a higher level is more likely to resent it.

### Thralls

A thrall serves one vampire of their village. A thrall without a master serves the vampire with the fewest thralls. A thrall cannot become a vampire, so the master can drink from them.

### Dhampirs

A dhampir is half vampire. Once a dhampir's aspect takes hold, their adult and senior years last twice as long.

### Hunters

The Hunter career belongs to a hunter order.

- A **Hunter's Lodge** is a building with an Oath Altar and two lodge workbenches. The order keeps its oath there.
- The **Huntmaster** leads the order. Villagers volunteer at dusk, or you put one forward: bring them close to the Huntmaster and talk to the Huntmaster.
- A villager who joins trains near the Oath Altar for some nights. At the next dusk after that, the Huntmaster holds the oath, and the villager becomes a Hunter.
- Hunters patrol, sweep the village, and drill. A Hunter can go on the **Slayer**, **Nightward**, or **Trailreader** Path.
- A sworn player can take contracts from the Huntmaster, such as **Clear a nest**, **Stakes**, and **Garlic for the doors**.

### Village Captures

- When vampires attack a village, MCA villagers stay who they are and defend the village. Vampirism does not replace them.
- A village whose totem the vampires hold welcomes vampires. When hunters take the totem back, the welcome ends.
- [Chronicles](/guides/chronicles/) records a bite that nobody asked for, a full turning, a hunter's kill, and the day a village falls or is taken back.
- [MCA: Crime](/compats/mca-crime/) and [MCA: Reputation](/compats/mca-reputation/) do not count hits on villagers during a capture.

### Players

- When a vampire player bites a villager who is awake, the village reacts as to a blow, unless the villager is the player's spouse or thrall. A bite that drains a villager to death counts as a killing.
- On the **Aspects** page of Destiny, a player can start as a vampire or dhampir once, before they join a faction.
- The ability wheel holds Vampirism actions, crossbow ammunition, and minion orders.
- The Quest Ledger shows Vampirism tasks. **Open** opens Vampirism's own menu to hand them in.
- A vampire player with a non-humanoid rig, or with the MCA villager face, shows the vampire look on their own eyes.

### Spawns

Vampirism's vampires spawn as wild vampire villagers of the Roots of the region. Vampirism's hunters spawn as people of the region, in hunter gear. You can talk to them.

## Settings

These settings are in `[vampirism]` in the server configuration. You can also change them on the Switchboard screen.

| Setting | Default | Effect |
| --- | --- | --- |
| `feeding` | `WILLING` | Whom vampire villagers drink from besides animals. `OFF`: animals only. `WILLING`: also their spouse. `ANYONE`: also any villager or player who is not a vampire. |
| `infection` | `true` | A vampire villager's bite can pass on Sanguinare. |
| `replaceSpawns` | `true` | Vampirism's vampires spawn as wild vampire villagers. |
| `replaceHunterSpawns` | `true` | Vampirism's hunters spawn as people of the region. |

`allowAspectStart` in `[roots]` lets players start as a vampire, werewolf, or dhampir on the Aspects page.

## Commands

| Command | Effect |
| --- | --- |
| `/townstead compat vampirism make <targets> vampire [level]` | Makes the targets vampires, at level 1 to 14. |
| `/townstead compat vampirism make <targets> dhampir` | Makes the targets dhampirs. |
| `/townstead compat vampirism cure <targets>` | Cures the targets. |
| `/townstead compat vampirism status <targets>` | Shows the vampire states of the targets. |
