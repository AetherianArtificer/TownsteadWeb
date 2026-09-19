---
title: Getting Started
description: What Townstead adds to MCA Reborn, what it needs, and where to start reading.
---

Townstead is an expansion for MCA Reborn. Villagers get needs to keep up with, careers to grow into, workplaces to staff, and a written village history. Most of it works with MCA alone. More features turn on when you also install the cooking, drink, and survival mods it supports.

:::note
This guide is under construction. The pages linked below are complete and checked against the current build. Pages that still say "Coming soon" are on the way.
:::

## What You Need

| | 1.21.1 | 1.20.1 |
| --- | --- | --- |
| Loader | NeoForge 21.1 or later | Forge 47.3 or later |
| MCA Reborn | 7.7.36 or later | 7.7.1 or later |

Everything else is optional. Townstead detects the mods it supports on its own. You do not need to configure them.

## Install

1. Drop the Townstead jar into your `mods` folder alongside MCA Reborn.
2. Start the game once. Townstead writes its server and client configuration files under `config/townstead/`.
3. Play. Existing villagers pick up their needs and careers on the first tick; nothing has to be reset.

For a dedicated server, install the same jar on the server and every client.

## Your First Hour

**Look at a villager.** Open their dialogue screen. The icons beside their portrait show hunger, energy, temperature, and thirst if you have a thirst mod. Hover for the exact value. See [Villager Needs](/guides/needs/).

**Feed them.** A stocked chest near where villagers live is enough to start. Set up a farm to keep the chest full, and a kitchen if you want the crops cooked into meals. See [Hunger](/guides/needs/hunger/) and [Cooking & Baking](/guides/cooking/).

**Give them somewhere warm.** A lit campfire with a few blocks of masonry around it becomes a hearth. Cold villagers go there to warm up. See [Temperature](/guides/needs/temperature/).

**Put them to work.** Build a recognised workplace, such as a kitchen, and an idle villager takes the seat. Pin up an Order Sheet to tell them what to make. See [Careers](/guides/professions/) and [Orders](/guides/orders/).

**Let them live.** Villagers visit hangouts, talk, form relationships, and grow up and old. See [Hangouts](/guides/hangouts/), [Conversations & Dialogue](/guides/conversations/), [Relationships](/guides/relationships/), and [Life Stages](/guides/life-stages/).

**Read the record.** Open the Chronicle to read what has happened in the village, and the Archives to read each character's career. See [Chronicles](/guides/chronicles/) and [Careers](/guides/professions/).

## Going Further

- [Roots](/guides/roots/) for villagers who are not human.
- [Community Spirit](/guides/community-spirit/) for what your buildings say about the village.
- [Reactions](/guides/reactions/) for how villagers respond to what you do.
- [Calendars & Stamps](/guides/calendars-and-stamps/) for dates, seasons, and the marks on the record.
- The [configuration reference](/reference/configuration/) for every switch.

## Making Content

Townstead is data-driven. Careers, roots, genes, workstations, and dialogue are JSON in data packs, and the reference sections on the left cover each format. Start with [Careers](/careers/) for professions and work, [Roots](/roots/) for species and genes, and [Pheno](/pheno/) for the condition and action language they share.
