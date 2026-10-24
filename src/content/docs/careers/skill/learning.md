---
title: Learning Rules
description: The rules that decide when a skill can be learned, and how skill groups work.
---

The server checks these rules before it records a skill for a player or a villager. The [Field Reference](/careers/skills-and-paths/#field-reference) lists the fields that the rules read.

## Learning Rules

The server checks all of these rules before it records a skill:

1. The character has the career that offers the skill.
2. The character has reached the Path level of the Skill in that career.
3. The character has learned every skill in `requires`.
4. No learned skill conflicts with this skill through `exclusive_with`, in either direction.
5. Every `evidence` counter has reached its target.
6. The character has enough unspent Insight for the `cost`.

All careers share one Insight total. Each career adds the Insight that its Career XP has earned, and each skill in any career spends from the same total. For example, Farmer ranks can pay for a Cook skill. The rank, prerequisites, exclusivity, and evidence still apply to each skill separately.

A Path level lists choices, but a character who learns one choice can still learn the others. Use `exclusive_with` when two choices must never go together. Without it, a second choice only costs more Insight.

Townstead saves each learned skill for players and villagers. When normal retraining removes a prerequisite, Townstead also removes each learned skill that needs it. `retraining: locked` stops normal removal. Currently, `costly` takes no cost and works the same as `free`. Do not use it to promise a payment.

## Prerequisites And Exclusivity

```json
{
  "requires": ["gentle_hands", "clean_smoke"],
  "exclusive_with": ["example:beekeeper/field_keeper/rushed_harvest"]
}
```

Every skill in `requires` is required. In a prerequisite cycle, no character can reach any skill on the cycle, and Townstead reports an error.

Townstead checks exclusivity in both directions. To make the data clear, declare the relation on both skills. Then a reader sees the full choice in either file.

Use `exclusive_with` for two skills that can never go together. Do not use it only to make a path. Insight already limits how many skills a character can take.

## Evidence

`evidence` makes a skill need recorded work, not only a rank:

```json
{
  "evidence": [
    { "key": "townstead_work:cook", "at_least": 25 }
  ]
}
```

`key` is a Chronicle counter. It is usually the activity key that Townstead records for a Job or task engine. See [Completed-Work History](/careers/work/history/#completed-work-history). `at_least` is a positive count. Every entry must be met. The Career record shows each requirement with its current count. For this reason, evidence is a short list of counters, not a free condition.

## Skill Groups

`skill_group` lets a character learn several skills but use only one at a time:

```json
{
  "skill_group": "example:smoking_style"
}
```

Several learned skills can name the same group. Only one of them is active at a time. When a character learns a skill in a group, that skill becomes active. When the character chooses another learned skill in the group, that skill becomes active, and the character keeps the old skill.

A learned skill with no group is always active.
