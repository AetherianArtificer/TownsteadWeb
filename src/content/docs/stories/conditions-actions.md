---
title: Conditions, Actions & Checkpoints
description: Named Pheno conditions and actions that Ink can use, and checkpoints for testing scenes.
---

Ink can ask about the world and change it, through Pheno conditions and actions that you name in `story.json` or `persona.json`. The Ink then uses the names, so the story stays readable.

## Conditions

```json
"conditions": {
  "storm": { "type": "pheno:environment", "weather": "thunder" },
  "has_dock": { "type": "pheno:village", "has_building": "dock" },
  "is_child": { "type": "pheno:life_stage", "stage": "child" }
}
```

Each key is a name, and each value is a [Pheno condition](/pheno/conditions/). Townstead tests it on the teller, with the player as `other`.

Use a condition in Ink with `check()`:

```text
{check("storm"):
    No boats out today.
}
```

A named condition is also a role. `who("is_child")` gives the name of the first resident it holds for, and `# who: is_child` has that villager say a line. See [The Cast](/stories/scenes/#the-cast).

`is("Marit", "is_child")` tests a named condition on the resident called Marit.

Many conditions are useful in stories. See [Story Tools](/stories/story-tools/) for the ones made for stories, such as `pheno:persona_roll` and `pheno:near_marker`.

## Actions

```json
"actions": {
  "give_map": {
    "type": "pheno:mark_structure",
    "key": "old_wreck",
    "min": 300,
    "max": 900
  },
  "share_name": { "type": "pheno:share_family_name" }
}
```

Each key is a name, and each value is a [Pheno action](/pheno/actions/). Townstead runs it on the teller, with the player as `other`.

Run an action from Ink with `act()`:

```text
Here, I drew you a map. It's not far.
~ act("give_map")
```

## Checkpoints

A checkpoint is a starting point for testing. It sets the story up as if the player had already played to a scene, then opens that scene.

```json
"checkpoints": {
  "after_nets": {
    "note": "After the nets quest. The player knows the sailor's name.",
    "vars": { "met": 2, "done_nets": true },
    "knot": "wreck_offer",
    "act": ["share_name"],
    "counters": { "examplepack:nets_mended": 1 },
    "villager_counters": { }
  }
}
```

| Field | Description |
| --- | --- |
| `knot` | The knot to open. The default is `greet`. |
| `vars` | Ink variables to set before the knot opens. |
| `act` | Named actions to run first. |
| `counters` | Chronicle counters to raise on the player, to at least these amounts. |
| `villager_counters` | Chronicle counters to raise on the teller. |
| `note` | A line shown in chat, to say what the checkpoint is for. |

Open a checkpoint with `/townstead scene <checkpoint>` while you look at the teller. See [Testing & Commands](/stories/testing/).
