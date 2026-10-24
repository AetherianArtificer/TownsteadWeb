---
title: How Careers Work
description: Overview of professions, careers, progression, skills, work, and cross-career mastery.
---

A career adds progression to a Minecraft profession. Each career uses the registry ID of its profession. For example, the definition at `minecraft:farmer` extends the Farmer profession, and the definition at `townstead:cook` extends the Cook profession.

A character gets career XP only from work in that career. A Cook task gives Cook XP. A Farmer task gives Farmer XP. Minecraft XP and work in other careers do not give career XP.

## The Model

| Term | Meaning |
| --- | --- |
| Profession | The Minecraft registry entry for an occupation. It sets the occupation, the appearance, and the trades. |
| Career | The saved history of a character in one profession: XP, rank, learned skills, evidence, and earlier periods of work. |
| Primary vocation | The one career that a character has now as their work. |
| Gated career | A career with `acquisition_routes`. A character must meet its Pheno requirements before they can acquire it. |
| Skill | An option that a character learns in one career. A skill can grant capabilities or a Pheno power. |
| Path | A named group of skills in one career. Use paths for specialisations. A path is not a separate career. |
| Title | A name that a character gets when they learn every skill in a declared build. |
| Combo Skill | A benefit that a character gets automatically at given ranks in two or more careers. |
| Insight | The skill points that all careers share. A character gets Insight at career checkpoints and rank-ups, and spends it on skills. |
| Career provider | A file from an optional mod. It adds workplaces, work, stations, or clothing to a career or path from a different pack. |
| Job site | A block, building, or site rule that makes work available in the world. |
| Work task | A reference to one of Townstead's built-in work engines. Data sets its targets and conditions. |

## Careers Are Flat

Each career is a separate record at the top level. A career cannot be a child of a different career. To make a Pastry Chef, choose one of these:

- If a Pastry Chef is a Cook who specialises, make Pastry Chef a [path](/careers/skill/paths/) of Cook. The villager stays a Cook, earns Cook XP, and learns the pastry skills of the path.
- If a Pastry Chef is a separate profession, give it its own career definition, with its own XP. To make it need Cook experience first, gate it with requirements such as Cook XP or Chronicle counters.

Townstead has three ways to connect careers. Use each one for its own purpose:

- Use `requirements` and `acquisition_routes` when a career needs earlier experience.
- Use `paths` when some skills form a specialisation in one career.
- Use a Combo Skill when mastery of several careers gives a shared benefit.

Townstead gives XP only to the career that owns the task. A Baker task gives Baker XP. It does not give Cook XP, unless a different mechanic gives Cook XP directly.

## Practised And Gated Careers

A profession definition with no `acquisition_routes` is practised. A character can take it up in the Archives, and then build its history by doing the work.

A definition with one or more `acquisition_routes` is gated. A character can acquire the career through one of those routes when its `requirements` condition passes. Townstead checks `self_discovery` after successful career work. Townstead or another mod must supply the interaction for each other route.

The kind of career also changes what happens at startup:

- A practised career usually extends a `VillagerProfession` that is already registered.
- A gated definition in a global Townstead Career pack can register its own `VillagerProfession` at startup.
- An ordinary world data pack loads after the registries freeze. It can add the Career data, but it cannot add a new `VillagerProfession` ID.

Install a Career pack as a Data Pack for the Minecraft profile, and then restart Minecraft. Launchers such as CurseForge put an installed Data Pack in the `datapacks/` directory of the profile. Townstead finds the packs in that directory that contain Townstead Profession files. It mounts them as server data and client resources, and reads them before the profession and POI registries freeze.

For a manual installation, put the pack in the `datapacks/` directory of the profile. You can also use `config/townstead/career-packs/` for development and server administration.

When CurseForge installs the file, it can offer to install a global Data Pack loader. Townstead does not need that loader for a Career pack. If you use one, Townstead still finds the pack.

Do not move a Career pack from the profile into a save. `/reload` updates the reloadable Career files. A change to `register_profession`, its job blocks, or its registered work sound needs a restart.

## File Map

Keep each career and its skills together in one directory:

```text
<pack>/
├─ pack.mcmeta
├─ assets/<namespace>/lang/<locale>.json
└─ data/<namespace>/profession/<career>/
   ├─ profession.json
   ├─ progression.json
   ├─ work.json
   ├─ trade/
   │  └─ <contribution>.json
   ├─ path/
   │  └─ <path>/
   │     ├─ path.json
   │     ├─ skill/
   │     │  └─ <skill>.json
   │     └─ trade/
   │        └─ <contribution>.json
   └─ skill/
      └─ <profession-wide-skill>.json
```

Townstead makes these IDs from the paths:

```text
profession: <namespace>:<career>
path skill: <namespace>:<career>/<path>/<skill>
root skill: <namespace>:<career>/<skill>
```

Files that support a career, but are not part of it, go in their own folders:

```text
data/<namespace>/combo_skill/<name>.json
data/<namespace>/career_provider/<name>.json
data/<namespace>/work_job/<job>.json
data/<namespace>/workstation/<name>.json
data/<namespace>/storage_role/<name>.json
data/<namespace>/chronicle_work_history/<name>.json
```

A Combo Skill connects several careers. A Career provider adds content from an optional mod to a career. Jobs, workstations, and storage roles describe work in the world, machines, and shelves. They do not define a career.

## Runtime Flow

1. Townstead loads these files together: Profession definitions, shared progression, Paths, work, Career provider contributions, root and Path merchant offers, and Skills.
2. Townstead resolves aliases, paths, titles, requirements, job-site providers, work tasks, trades, and cross-references.
3. Townstead reports missing skills, invalid tiers, relations that conflict, and prerequisite cycles.
4. A player or villager completes a work task.
5. Townstead applies the XP modifiers of the career. It adds XP at the full rate up to the daily cap, and at a lower rate after the cap. It also records a Chronicle event.
6. At a checkpoint or rank-up, the character gets Insight. A rank-up can also unlock Combo Skills.
7. Townstead checks the self-discovery requirements of gated careers.
8. The Career record shows the result from the server.

Townstead saves these values in the career profile: the primary vocation, earlier careers, XP, learned choices, active skill groups, acquired careers, discovered careers, tracked goals, the ability loadout, and Archives stamps. If a data file is missing or changes, Townstead does not move that history to a different career.

## Authoring Order

Make a career in this order:

1. Extend an existing profession with a minimal `profession.json`.
2. Add `progression.json` with rank thresholds and a positive `daily_cap`.
3. Add `work.json` with one `poi` provider, so the work has a place in the world.
4. Add one `tasks` entry. Make sure that completed work gives the correct Career XP.
5. Add files in `trade/` if the Profession has merchant offers.
6. Add one directory for each Path in `path/`, and list its Skills by level in `path.json`.
7. Add the Skill files of each Path in the `skill/` directory of that Path.
8. Add gated careers and Combo Skills after each career works alone.
9. When more than one mod adds to the same career, move the workplaces and stations of each optional mod into a Career provider.

In this order, a broken workstation, a career that nobody can reach, and an invalid skill graph each show up at a different step.

Continue with [Profession Files](/careers/profession-files/). To add a new machine, see [Workstations](/careers/workstations/). To let an optional mod extend a career from a different pack, see [Career Providers](/careers/career-providers/).
