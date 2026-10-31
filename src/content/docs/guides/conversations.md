---
title: Conversations & Dialogue
description: How villagers talk to each other and to you, and the expressions they show.
---

Villagers in Townstead talk. They chat with each other in the street, at the tavern, and over dinner. What they say depends on the weather, the time, their job, their mood, their needs, their personality, and what they remember about the person they are talking to.

## Talking To You

Townstead replaces MCA's dialogue box with its own. Press **Talk to Villager**, which is R by default and can be rebound in the Townstead section of Controls, while looking at a villager. MCA's Talk button on the interact screen opens the same dialogue. The camera turns to the villager, their words type out at the bottom of the screen, and your choices sit on the right.

Keys in the dialogue screen: Space or Enter advances, W and S or the arrow keys move between choices, Page Up and Page Down scroll the history, and Escape leaves.

To turn off this visual overlay, set `useRpgDialogue` to `false` under `[dialogue]` in the client configuration. Talking to a villager then uses MCA's default talk screen, and so does the **Talk to Villager** key. The setting is local to the player. See the [configuration reference](/reference/configuration/#dialogue).

MCA's interact screen also shows the villager's needs icons, their schedule, and their profession with its career rank. Hover their name for their birth date. Click the genes icon to open their [Heritage](/roots/heritage/). With an emote mod installed, a **Pose** button opens a wheel to pose the villager.

## Villagers Talking To Each Other

Two idle villagers within seven blocks of each other, who can see each other, may start a conversation. One opens, the other answers, and they go back and forth for several turns while looking at each other and gesturing. Nearby players see the lines in chat.

Conversations happen in the street and inside [hangouts](/guides/hangouts/). A villager who falls asleep, panics, is attacked, walks out of range, or is drawn into a dialogue with you drops out, and the conversation ends.

Villagers build their lines from many small pieces, so the same two villagers rarely have the same conversation twice. They greet each other, talk about one or more subjects, and say goodbye. A quick hello in the street can be one line. A long evening at the tavern can go on until one of them leaves.

What they talk about comes from the world around them:

- the weather and the land they live in;
- news they heard, such as a wedding, a new master of a craft, or an argument in the square;
- a hostile mob that someone saw near the village;
- how hungry, thirsty, tired, cold or hot they are;
- the venue they are at, at a hangout;
- plans with a friend, such as supper or a walk;
- a zombie bite, a fever, or a neighbour who was cured or turned;
- jokes and short stories.

Villagers raise what matters to them first, such as fresh news or a warning. A villager rarely retells news that the listener already knows. Their personality, life stage, mood and relationship change what they say and how long they talk. A villager with a fever gets short replies from nervous neighbours, while a close friend stays to help. Villagers of a culture with its own voice use their own words, such as a greeting or a farewell that only their culture uses.

Each player sees the lines in their own game language.

Some conversations are set pieces with fixed text: the little pleasures of the day, craft and patience, a shared trade, rain, reassurance, repairing a falling-out, a remembered kindness, food, jokes, attitudes to change, and checking on someone after they were hurt. Replies branch: a friendly villager answers one way and a grumpy one another, and disagreement does not always turn into hostility.

Each completed conversation changes something. The two villagers come away liking, trusting, or resenting each other a little more or less, their mood shifts, and each keeps a memory of it. Those memories come back up later. A villager who was reassured remembers who helped, and someone who was seen hurt may later decide whether to mention it. See [Relationships](/guides/relationships/).

Villagers do not repeat the same topic with the same partner over and over. A topic they have already covered together is much less likely to come up again.

The settings `enabled` and `idleStartChance` under `[conversations]` control this chatter. See the [configuration reference](/reference/configuration/#conversations).

## Expressions

Villagers show what they are feeling above their heads. Some are pictures: a heart for affection, a note for music, a lightbulb for an idea, sparkles for delight. Others are short words: *Hello!*, *Phew!*, *Zzz*, *Food…*, *A drink…*, *Hmph.*, *Yes!*, *Hooray!*, or a plain *?* or *!*.

They come from [reactions](/guides/reactions/), from hangout beats, and from conversations. Each villager waits a while before showing another one, so a crowd does not turn into noise.

## Gestures Without Animation Mods

Townstead ships its own animations. Villagers wave, nod, shake their heads, shrug, laugh, clap, cheer, yawn, shiver, sweat, point, beckon, whisper, toast, sip, eat, tell animated stories, listen attentively, lean back, and sit properly on stools without any animation mod installed. If Emotecraft is present, Townstead uses it for higher-fidelity emotes, and Entity Model Features rigs keep working alongside.

Villagers do not play instruments. A jukebox within earshot gets them tapping their feet, and the village [Chronicle](/guides/chronicles/) records that music was played.

## Emotes

`/townstead emote play <id>` plays an Emotecraft emote on yourself, and `/townstead emote play <id> <target>` plays it on a villager or another player. `/townstead emote stop` ends it. Waving or clapping near a villager while facing them is a gesture the villager can react to. See [Reactions](/guides/reactions/).

## For Pack Authors

Conversations between villagers are data: topics, subjects, lines, voices and translations. See [How Conversations Work](/conversations/). Dialogue palettes, expression cues and native animation clips are data too. Start with [Reactions data](/reactions/).
