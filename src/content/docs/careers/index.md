---
title: How Careers Work
description: Overview of professions, careers, progression, skills, work, and cross-career mastery.
---

Townstead Careers is the progression layer around Minecraft professions. A career uses the profession's registry ID as its identity. The definition at `minecraft:farmer` extends the Farmer profession; the definition at `townstead:cook` extends the Cook profession.

The design rule is simple: **progression is work history**. A successful Cook task advances Cook. A successful Farmer task advances Farmer. Generic Minecraft XP and unrelated work do not become career XP.

## The Model

| Term | Meaning |
| --- | --- |
| Profession | The Minecraft registry identity used for occupation, appearance, and trading. |
| Career | The durable history layered onto that profession ID: XP, rank, learned skills, evidence, and earlier periods of work. |
| Primary vocation | The one career a person currently declares as their work. |
| Gated career | A career with `acquisition_routes`. Its Pheno requirements must pass before it can be acquired. |
| Skill | A learned option owned by one career. It can grant capabilities or a Pheno power. |
| Path | A named group of skills inside one career. Paths organise specialisation; they are not child careers. |
| Title | A display name earned by learning every skill in a declared build. |
| Combo Skill | An automatic benefit earned from rank thresholds in two or more careers. |
| Insight | The shared skill-point budget. Every career rank earns it; every registered skill spends it. |
| Career provider | A document from an optional mod that adds workplaces, work, stations, or clothing to a career or path it does not own. |
| Job site | A block, building, or site rule that makes work available in the world. |
| Work task | A reference to one of Townstead's built-in work engines, narrowed by data-defined targets and conditions. |

## Careers Are Flat

Every career is an independent top-level record. Do not model a Pastry Chef as a child node below Cook. If it is its own profession, give it its own career definition, and use requirements such as Cook XP or Chronicle counters only if it should be gated.

Use the three relationship mechanisms for three different jobs:

- Use `requirements` and `acquisition_routes` when one career requires earlier experience.
- Use `paths` when several skills form a specialisation inside one career.
- Use a Combo Skill when mastery of several careers produces a shared benefit.

Work advances exactly the career that owns the task. A Baker task advances Baker. It does not advance Cook unless a separate mechanic explicitly awards Cook XP.

## Practised And Gated Careers

A profession definition with no `acquisition_routes` is practised. A character can take it up through the Archives and establish its history by doing the work.

A definition with one or more `acquisition_routes` is gated. The career becomes acquirable when its `requirements` condition passes through one of those routes. `self_discovery` is checked after successful career work. Other route names are declarations for an interaction supplied by Townstead or another mod.

This distinction also affects registry startup:

- A practised career normally extends a `VillagerProfession` that is already registered.
- A gated definition in a global Townstead Career pack can register its own `VillagerProfession` at startup.
- An ordinary world data pack loads after registries freeze. It can add the Career layer, but it cannot create a new `VillagerProfession` ID.

Install a Career pack as a Data Pack for the Minecraft profile, then restart Minecraft. Launchers such as CurseForge place an installed Data Pack in the profile's `datapacks/` directory. Townstead recognises packs containing Townstead Profession documents there, mounts them as server data and client resources, and scans them before the profession and POI registries freeze.

For a manual installation, put the pack in the profile's `datapacks/` directory. `config/townstead/career-packs/` is also supported as an explicit development and server-administration route.

CurseForge may offer to install one of the global Data Pack loaders it recognises when it installs the file. Townstead does not require that loader for a Career pack, although using one does not prevent Townstead from recognising the pack.

Do not move a profile-installed Career pack into an individual save. `/reload` can update reloadable Career content, but adding or changing `register_profession`, its job blocks, or its registered work sound requires a restart.

## File Map

The directory layout keeps one career and its skills together:

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

The paths produce these IDs:

```text
profession: <namespace>:<career>
path skill: <namespace>:<career>/<path>/<skill>
root skill: <namespace>:<career>/<skill>
```

Documents that serve a career without belonging to it live in their own folders:

```text
data/<namespace>/combo_skill/<name>.json
data/<namespace>/career_provider/<name>.json
data/<namespace>/work_job/<job>.json
data/<namespace>/workstation/<name>.json
data/<namespace>/storage_role/<name>.json
data/<namespace>/chronicle_work_history/<name>.json
```

A Combo Skill joins several careers. A Career provider lets an optional mod extend a career. Jobs, workstations, and storage roles describe world operations, machines, and shelves, not career identity.

## Runtime Flow

1. Townstead loads Profession definitions, shared progression, individual Paths, work composition, Career provider contributions, root and Path merchant offers, and Skills together.
2. The loader resolves aliases, paths, titles, requirements, job-site providers, work tasks, trades, and cross-references.
3. The validator reports missing skills, invalid tiers, contradictory relations, and prerequisite cycles.
4. A player or villager completes a work task.
5. Townstead applies career-specific XP modifiers, adds XP within the daily cap, and records a Chronicle event.
6. A rank-up adds to the character's shared Insight and can unlock Combo Skills.
7. Townstead checks self-discovery requirements for gated careers.
8. The Career record renders the server-authoritative result.

The career profile persists a primary vocation, earlier careers, XP, learned choices, active skill groups, acquired careers, discovered careers, tracked goals, ability loadout, and Archives stamps. Missing or changed data files do not turn that history into another career.

## Authoring Order

Build a career in this order:

1. Extend an existing profession with a minimal `profession.json`.
2. Add `progression.json` with rank thresholds and a positive `daily_cap`.
3. Add `work.json` with one `poi` provider so the work has a place in the world.
4. Add one `tasks` entry and verify that completed work grants the correct Career XP.
5. Add files in `trade/` if the Profession provides merchant offers.
6. Add one directory per Path in `path/` and list its Skills by level in `path.json`.
7. Add each Path's Skill files below that Path's `skill/` directory.
8. Add gated careers and Combo Skills after the individual careers work on their own.
9. Move each optional mod's workplaces and stations into a Career provider when more than one mod serves the same career.

This order keeps a broken workstation, an unreachable career, and an invalid skill graph from looking like the same problem.

Continue with [Profession Files](/careers/profession-files/). Use [Workstations](/careers/workstations/) when you need to teach the engine about a new machine, and [Career Providers](/careers/career-providers/) when an optional mod should extend a career it does not own.
