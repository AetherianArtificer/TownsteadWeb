---
title: Professions
description: Add career progression, skills, work, trades, and gated professions with data packs.
---

Townstead extends a Minecraft profession into a career. The career uses the same registry ID as the profession and adds ranks, career XP, skills, work tasks, workplaces, Chronicle evidence, trades, titles, and acquisition requirements.

The Careers reference covers this system as a connected set of files:

1. [How Careers Work](/careers/) explains the data model and the distinction between careers, paths, and gated professions.
2. [Profession Files](/careers/profession-files/) defines identity, progression, workplaces, requirements, trades, paths, and titles.
3. [Skills And Paths](/careers/skills-and-paths/) defines learned effects, active abilities, prerequisites, and specialisation paths.
4. [Work Tasks](/careers/work-tasks/) assigns Townstead's work engines to a profession and can estimate generated work history for existing villagers.
5. [Combo Skills](/careers/combo-skills/) joins mastery from two or more flat careers.
6. [Career Providers](/careers/career-providers/) lets an optional mod add workplaces and work to a career it does not own.
7. [Workstations](/careers/workstations/) and [Storage](/careers/storage/) describe the blocks used by the work engine.

Start by extending a profession that already exists in the Minecraft registry. Test its progression and work task before you add skills or a gated career.

If the pack introduces a brand-new villager profession ID, read [Complete Runtime Support](/careers/profession/gated-careers/#complete-runtime-support) before installing it. Install it as a profile Data Pack through CurseForge or place it in the profile's `datapacks/` directory. Townstead scans recognised Career packs there before registry creation. Players and villagers share one progression path. A cooking station, a furnace, a brewing stand, a crafting table, a block-interaction Job, an entity-delivery Job, farm work, shearing, or a fishing catch credits a player who completes the same operation by hand. Output taken from another mod's own station block does not yet.
