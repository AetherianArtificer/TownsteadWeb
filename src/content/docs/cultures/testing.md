---
title: Testing & Commands
description: How to check culture data for errors, see a culture in game, and inspect villagers and villages.
---

## 1. Check the Log

After you add or change files, run `/reload` and read the game log (`logs/latest.log`). Look for these lines:

```txt
Loaded 9 culture(s)
Loaded 55 naming tradition(s)
Loaded 4 given-name list(s)
Loaded 4 family-name list(s)
Loaded 2 settlement-name list(s)
```

The numbers change with the packs you install. The settlement-name line shows twice: once for settlement names and once for faction names.

A file with an error logs a line such as `Could not load culture <id>` or `Naming tradition <id> names no given-name lists, skipping`. See [Loading and Errors](/cultures/culture-files/#loading-and-errors).

`/townstead naming cultures` lists the cultures that loaded.

## 2. See the Culture in Game

Villagers who already have a culture move to a new one slowly. To see a culture now, make a new village with it:

1. Check that the founding profile loaded: `/townstead founding profiles`.
2. Make a village with the profile:

   ```txt
   /townstead debug village "examplepack:harbour_guild" 10
   ```

   Or refill the village you are in: `/townstead debug village repopulate "examplepack:harbour_guild" 10`.
3. Look at the villagers' names, clothes and the village name.
4. Look at a villager and run `/townstead naming` to see how their name was built.

To test a culture with no founding profile, set the culture of a village and clear a villager so they settle again:

```txt
/townstead naming set-village "examplepack:fisherfolk"
/townstead naming clear
```

See [Debug Villages](/reference/commands/#debug-villages) for all village commands.

## Commands

Wrap a culture ID in quotes when you type it, such as `"examplepack:fisherfolk"`. Minecraft does not accept a `:` in an unquoted word.

### Naming

| Command | Permission | Effect |
| --- | --- | --- |
| `/townstead naming [target]` | Player | Shows how a villager is named: full name, naming tradition, family type, culture, name list, region and family name. Without a target, it uses the villager you look at, or the nearest one. |
| `/townstead naming village` | Player | Shows the culture of the village you are in. |
| `/townstead naming cultures` | Player | Lists the loaded cultures. |
| `/townstead naming set "<culture>" [target]` | Operator | Sets a villager's culture, and builds their family name again from its tradition. The given name stays, and so does a family name that a player typed. |
| `/townstead naming set-village "<culture>"` | Operator | Sets the culture of the village you are in. Residents keep their culture. |
| `/townstead naming clear [target]` | Operator | Clears a villager's culture, naming tradition and family name. The villager then gets them again, as if new. The given name stays. |

### Culture

| Command | Permission | Effect |
| --- | --- | --- |
| `/townstead culture villager` | Operator | Shows the culture of the villager you look at, or the nearest one: the recorded culture, the top culture that players see, their [mix](/cultures/mixed-cultures/), and the last day it drifted. |
| `/townstead culture village` | Operator | Shows the village you are in: its founding profile and culture, its Community Spirit compared with an ordinary village, and the mix that living there pulls toward. |

`/townstead culture village` is the quickest way to check [subcultures](/cultures/subcultures/). The **known for** line lists the spirit axes that the village is above ordinary in. The pull list shows which subcultures the village draws its people to.

## Checklist for a New Culture

- The log shows the culture, and no `Could not load` line.
- New villagers in a debug village have names from the culture's tradition.
- The debug village has a name from the culture's settlement names.
- `/townstead culture villager` shows the culture, and players see the top culture.
- `/townstead culture village` pulls toward the subcultures you expect, in a village with matching buildings.
- With a voice, `/townstead social simulate 100` shows the culture's lines. See [Testing conversations](/conversations/testing/#4-test-a-culture).
