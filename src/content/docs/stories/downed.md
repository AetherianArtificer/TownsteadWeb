---
title: Downed
description: Villagers who are downed instead of dying, and how they get back up.
---

A downed villager does not die. They fall, lie still for a while, and get back up. By default, every Persona is downed instead of dying, so a story never loses its main character to a stray arrow. A data pack can give the same protection to other villagers, such as guards or leaders.

## What Happens

When a covered villager would die:

1. They drop to 1 health and lie down. Nearby players see a message, such as "Marit is down."
2. While down, nothing can hurt them, and nothing targets them.
3. They get up after the [recovery time](#settings), with some of their health back.
4. A player can help them up sooner: use the villager, as you would to talk to them.

A downed villager stays down across a restart.

When a villager falls somewhere nobody can reach, such as into the void or lava, Townstead carries them to their home village. When they have none, Townstead carries them to the nearest village.

`/kill` still kills a downed villager.

## Who Is Covered

| Villager | Covered when |
| --- | --- |
| A Persona | `"downed": true` in `persona.json`, which is the default, and permadeath is off. |
| Any other villager | A [downed rule](#other-villagers) matches them. |

## Other Villagers

A downed rule names the villagers it covers with a Pheno condition.

```text
data/<namespace>/downed/<name>.json
```

```json
{ "when": { "type": "pheno:profession", "profession": "mca:guard" } }
```

| Field | Description |
| --- | --- |
| `when` | A [Pheno condition](/pheno/conditions/), tested on the villager. |

A villager is covered when any rule matches.

## Settings

| Setting | Where | Effect |
| --- | --- | --- |
| **Personas** dial | Switchboard | **On**: Personas are downed. **On, can die**: Personas die like anyone else. **Off**: no Personas. |
| `permadeath` | `[personas]` in the server configuration | `true` makes Personas die like anyone else. The default is `false`. The **Personas** dial sets it. |
| `downedRecovery` | `[personas]` in the server configuration | How long a downed villager stays down when nobody helps. See below. |

| `downedRecovery` | Stays down |
| --- | --- |
| `MINUTES` | About five minutes. |
| `DAWN` (default) | Until the next dawn, and at least half a day. |
| `DAY` | A full day. |

## In a Story

A Persona can die when permadeath is on, or when `persona.json` has `"downed": false`. A Persona who dies is gone from the village. Write other stories so that they still make sense without them: check with `here()` or `persona_name()` before a scene that needs them.
