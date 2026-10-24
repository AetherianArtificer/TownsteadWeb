---
title: Triggers
description: The events that a pheno:trigger gene can run an action on.
---

A `pheno:trigger` gene runs its `action` when an event happens to the bearer. For the gene fields, see [Gene Nodes](/pheno/gene-nodes/#action-genes).

## Trigger Events

| Trigger | Fires When | Counterpart (`other`) |
| --- | --- | --- |
| `when_hurt` | The bearer takes damage. | The attacker. |
| `when_attack` | The bearer damages something. | The victim. |
| `when_kill` | The bearer kills something. | The victim. |
| `when_death` | The bearer dies. | The killer. |
| `when_death_prevented` | A `pheno:prevent` death gene saves the bearer. | The killer. |
| `when_land` | The bearer lands after a fall. | none |
| `when_jump` | The bearer jumps. | none |
| `when_sleep` | The bearer starts to sleep, in a bed or another [rest spot](/packs/rest-spots/). | none |
| `when_wake_up` | The bearer wakes up. `when_wake` is the same trigger. | none |
| `when_rested` | The bearer is fully rested while it sleeps. For a player, this is when the player can skip the night. For a villager, this is when its fatigue is gone. | none |
| `when_struck_by_lightning` | Lightning strikes the bearer. | none |
| `when_equip` | The bearer's equipment changes. | none |
| `when_item_use` | The bearer finishes using an item. `item_condition` tests it. | none |
| `when_craft` | The bearer takes a crafted item. `item_condition` tests it and `item_action` changes it before it reaches the inventory; `action` is optional. | none |
| `when_enter_dimension` | The bearer arrives in another dimension. | none |
| `when_work` | The bearer completes Career work. | none |
| `press` | The bearer presses `key` (default `jump`). | none |
| `ai` | A villager's ability AI decides to, by its `ai_trigger`: `when_flying`, `when_threatened`, `when_hurt`, `when_hurt_nearby` or `always`. Players never fire it. | none |

`target: "other"` runs the action on the counterpart instead of the bearer. `bientity_condition` tests (bearer, counterpart) and fails when there is no counterpart, so a lifesteal can skip foes that do not bleed. Damage triggers expose their damage to [`pheno:event_damage`](/pheno/selectors-values/#values).

A crafting proc that sometimes adds Unbreaking:

```json
{
  "type": "pheno:trigger",
  "trigger": "when_craft",
  "item_action": {
    "type": "pheno:chance",
    "chance": 0.25,
    "action": { "type": "pheno:enchant", "enchantment": "minecraft:unbreaking", "level": 1 }
  }
}
```

Use an `ai` trigger so that villagers can use a power that players start with a key. Pair it with `pheno:keypress`. Then the key's own `press` trigger runs the power for players and villagers. In this example, a glider flaps its wings on the jump key, and villagers flap too:

```json
{ "type": "pheno:trigger", "trigger": "ai", "ai_trigger": "when_flying",
  "action": { "type": "pheno:keypress", "key": "jump" } }
```

Townstead's flight AI counts a `when_flying` `ai` trigger as a way to gain lift. Winged villagers with one take powered flights, not only glides down.
