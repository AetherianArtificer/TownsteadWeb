---
title: Reactions
description: How villagers react to you, to each other, and to the world.
---

Reactions are the small, immediate things villagers do when something happens: waving back, dancing to a jukebox, sighing with relief when they get out of the rain, raising the alarm when an illager walks in. Each reaction has a trigger, a chance, a cooldown, and a personality weighting, so a friendly villager waves back more often than an introverted one.

## Reactions To You

- **Wave** at a villager with an Emotecraft wave while facing them from close by. They wave back with a *Hello!* and greet you. Neighbours may join in. Earns a heart, once a day.
- **Clap** and they applaud back. Also a heart.
- **Open a dialogue** and some villagers give you a warm greeting. Close one with a friend and they say a fond farewell.

## Reactions To The World

- **Music.** A jukebox within a dozen blocks gets villagers dancing.
- **Shelter.** A villager who reaches cover while it is raining shows relief.
- **Needs.** The first time hunger, thirst, or drowsiness crosses a line, the villager shows *Food…*, *A drink…*, or *Zzz*.
- **Family.** A spouse coming near earns a nod and a heart. Standing at a family grave with family brings tears.
- **Work.** Arriving at a workstation sparks a bright idea.

## Alarms

- An illager nearby raises an outsider alarm.
- A raid starting and ending both get a reaction.
- A zombie villager is met with recognisable horror.
- A hostile mob leaving lets villagers relax.

## Witnessing Harm

A villager who sees someone take damage reacts, and both remember it. Later, the witness may check on the injured person in conversation, and the injured person may have feelings about being seen vulnerable. See [Conversations](/guides/conversations/).

## Testing And Authoring

`/townstead reaction list` shows every loaded reaction and `/townstead reaction play <id>` plays one on the villager you are looking at. A reaction can still decline because of its cooldown, chance, or missing candidates.

Reactions are data packs. Townstead ships two dozen and any pack can add more. See [Reactions data](/packs/reactions/).
