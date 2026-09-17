---
title: Learning Rules
description: The rules that decide when a skill can be learned, and how skill groups work.
---

The server checks these rules before it records a skill for a player or a villager. The fields they read are listed in the [Field Reference](/careers/skills-and-paths/#field-reference).

## Learning Rules

The server checks all of these rules before it records a skill:

1. The character holds the career that offers the skill.
2. The character has reached the Skill's Path level in that career.
3. Every `requires` skill is learned.
4. No explicit `exclusive_with` relation conflicts with a learned skill, in either direction.
5. Every `evidence` counter has reached its target.
6. The character has enough unspent Insight for `cost`.

Insight is one shared budget. Every career in which the character has standing contributes its rank allowance, and every learned skill in any career spends from the same pool. A Farmer rank can therefore pay for a Cook skill. Rank, prerequisites, exclusivity, and evidence remain per skill.

A Path level lists alternatives, but learning one does not close the others. Use `exclusive_with` when two options must never coexist. Otherwise the cost of a second option is the Insight it consumes.

Learning a skill records durable history for players and villagers. When normal retraining removes a prerequisite, Townstead also removes every learned skill that depends on it. `retraining: locked` blocks normal removal. The current `costly` policy does not collect a cost and behaves like `free`; do not use it to promise a payment mechanic.

## Prerequisites And Exclusivity

```json
{
  "requires": ["gentle_hands", "clean_smoke"],
  "exclusive_with": ["example:beekeeper/field_keeper/rushed_harvest"]
}
```

`requires` is an AND list. A prerequisite cycle makes every skill on the cycle unreachable and produces an error.

Exclusivity is checked in both directions at runtime. For clear data, declare the relation on both skills so a reader can see the complete choice from either file.

Use `exclusive_with` for a permanent incompatibility. Do not use it only to create a path. Insight already limits how many skills a character can take.

## Evidence

`evidence` gates a skill on the character's recorded work rather than on rank alone:

```json
{
  "evidence": [
    { "key": "townstead_work:cook", "at_least": 25 }
  ]
}
```

`key` is a Chronicle counter, normally the automatic activity key of a Job or task engine described in [Completed-Work History](/careers/work/history/#completed-work-history). `at_least` is a positive count. Every entry must be met. The Career record shows each requirement with its live count, which is why evidence is a small explicit contract rather than an opaque condition.

## Skill Groups

`skill_group` separates learning from active expression:

```json
{
  "skill_group": "example:smoking_style"
}
```

Several learned skills can name the same group, but only one is active at a time. Learning a grouped skill equips it. Selecting another learned member changes the active member without deleting the old learning record.

Ungrouped learned skills are always active.
