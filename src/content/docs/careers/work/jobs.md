---
title: Work Jobs
description: Declare block-interaction and entity-delivery Jobs that give a task engine its world operations.
---

A Job tells one of Townstead's general executors what to do in the world. It also registers the task ID that Professions use in their `work.json`. For the task entry, see the [Field Reference](/careers/work-tasks/#field-reference).

## Work Job Documents

Put a work-job file at:

```text
data/<namespace>/work_job/<job>.json
```

- `type` chooses the general executor.
- `task` names the work that Professions add to their schedules. The Job file registers it.
- The executor sets the field names for roles, such as `target`, `source`, and `destination`. Do not make up other role names.

## Block Interaction

```json
{
  "schema": "townstead:job/v3",
  "type": "townstead:block_interaction",
  "task": "townstead_work:interact",
  "target": {
    "block": "minecraft:beehive",
    "condition": {
      "type": "pheno:block_state",
      "property": "honey_level",
      "value": "5"
    },
    "xp": 4,
    "interactions": [
      {
        "item": "minecraft:shears",
        "output": "minecraft:honeycomb"
      },
      {
        "item": "minecraft:glass_bottle",
        "output": "minecraft:honey_bottle"
      }
    ]
  }
}
```

Use `block` for one target block. Use `blocks` for several block IDs or `#tag` references. A `condition` on the target is a Pheno block condition for every interaction. Townstead tries the interactions in the order of the file, and gets the first matching item from the worker or from work-site storage. `xp` sets the default XP. An interaction can set its own `xp`.

By default, the worker uses the selected item on the block, as a player does in Minecraft. `output` names one dropped item that Townstead can collect. `outputs` accepts several item IDs. These fields do not make items, and do not set a count. When the usual block use is not enough, give the interaction a Pheno block `action`. Townstead puts the items that the action returns into work-site storage automatically.

The villager holds the item from the `item` selector of the matching interaction. So a new tool tag shows in the villager's hands with no more data. The villager holds a Job tool only while the Job has a target or source that is ready. A tool in the list does not make an idle worker take it out again and again.

### Managed Requirements

A block interaction can need a temporary preparation, such as a lit fire. When the worker can make the preparation and later undo it, put it in `requirements`, not in an interaction condition:

```json
"requirements": [
  {
    "id": "smoke",
    "satisfied_when": {
      "type": "pheno:smokey"
    },
    "provision": {
      "at": {
        "type": "pheno:column",
        "direction": "down",
        "distance": 5,
        "where": {
          "type": "pheno:in_tag",
          "tag": "minecraft:campfires"
        }
      },
      "item": "minecraft:flint_and_steel",
      "start": {
        "type": "pheno:use_block",
        "item": "item"
      },
      "managed_when": {
        "type": "pheno:block_state",
        "property": "lit",
        "value": "true"
      },
      "stop": {
        "type": "pheno:modify_block_state",
        "property": "lit",
        "value": "false"
      }
    }
  }
]
```

Townstead checks `satisfied_when` at the main target. It describes the world when the requirement is met. It is not a condition to start the preparation. A requirement without `provision` must already be met. A managed requirement adds these fields:

- `id` is a local name for feedback rules. Do not change it.
- `provision.at` is a block selector that starts at the main target. It can find several blocks, in order of preference.
- `provision.item` and the optional `item_condition` describe the tool. Townstead gets it from the worker or from work-site storage.
- `start` makes the preparation at the selected block. The engine then checks `satisfied_when`. The action alone does not count as success.
- `managed_when` is a safety check at the selected block before cleanup.
- `stop` undoes the preparation. It must not need an inventory item, because Townstead cleans up abandoned work after its lease expires.

If the requirement was already met in the world, Townstead does not run `stop`. When Townstead runs `start`, it saves a lease on that block. Each worker who uses the preparation has a separate lease. Townstead cleans up only after the last worker releases their lease. Leases from interrupted work expire, and Townstead cleans them up after a reload. Townstead does not clean up if the block was replaced or no longer passes `managed_when`.

Use this for any preparation: heat a station, power a machine, fill a vessel, open a path, or light a work area. The Job executor does not need to know about these things.

### Interaction Conditions And Actions

An interaction can also have its own Pheno block `condition` and `item_condition`. `condition` tests the target. `item_condition` tests the selected stack after it matches `item`. Use them when a step needs a different tool, a wet cloth, enough durability, or another property of the item. `output` and `outputs` are optional for an `action` that returns its own items, or that does work with no item result, such as cleaning a spill. The Job still records one completion and gives XP.

An `action` is an ordered array of block actions. The Job gives the selected stack to the actions as the `item` role:

```json
{
  "item": "#example:hammers",
  "item_condition": {
    "type": "pheno:durability",
    "min": 2
  },
  "condition": {
    "type": "pheno:block_state",
    "property": "stage",
    "value": "2"
  },
  "action": [
    {
      "type": "pheno:loot_table",
      "table": "example:blocks/machine_stage_2"
    },
    {
      "type": "pheno:modify_block_state",
      "property": "stage",
      "value": "3"
    },
    {
      "type": "pheno:item_action",
      "item": "item",
      "action": {
        "type": "pheno:damage",
        "amount": 1
      }
    }
  ],
  "xp": 2
}
```

Before the engine claims a target, it checks whether the interaction can run, without changing the world. If an action needs a block entity, a mapped block, or something else that is missing, this check stops the interaction. Then the engine runs the action array in order, as one work attempt. For the action types, see [Pheno Actions](/pheno/actions/#data-authored-block-procedures).

### Credit And Diagnostics

Each completion also records the resource ID of the Job in the Chronicle. So the example adds to `example:beehive_harvest` without a separate counter field. If you rename the file, the activity gets the new name. A reference to an ID does not make a Job or a counter.

The block-interaction executor controls villagers. Players get the same credit in a different way. See [Player Work](/careers/work/history/#player-work).

Block-interaction Jobs give diagnostic signals under `townstead_work:block_interaction/`, such as `has_worksite`, `has_target`, `has_ready_target`, and `has_input`. These signals describe the state of the executor, not one Job or block. When a usual Pheno world condition can test the same thing, use the condition.

## Entity Interaction

An entity-interaction job uses an item on an animal where the animal is kept, and carries the result to storage. Shearing and milking are entity interactions.

```json
{
  "schema": "townstead:job/v3",
  "type": "townstead:entity_interaction",
  "task": "example:shear",
  "target": {
    "buildings": ["example:paddock"],
    "entities": ["#example:wool_animals"],
    "condition": {
      "type": "pheno:and",
      "conditions": [
        { "type": "pheno:baby", "inverted": true },
        { "type": "pheno:shearable" }
      ]
    },
    "interactions": [
      {
        "item": "#example:shears",
        "outputs": ["#minecraft:wool"],
        "xp": 1
      }
    ]
  }
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `target.buildings` | `[]` | Building types where the animals must stand. A trailing `*` matches a prefix. When the list is empty, Townstead uses the worker's own work site. |
| `target.entities` | `[]` | Entity IDs or `#tags`. When the list is empty, only `condition` limits the animals. |
| `target.condition` |  | A Pheno entity condition that the animal must meet. |
| `target.range` | `2` | Distance in blocks from which the worker uses the item. |
| `target.interval` | `12` | Ticks between arriving and using the item. |
| `interactions[].item` |  | Item ID or `#tag`. Townstead gets one from the worker or from work-site storage. |
| `interactions[].action` | `pheno:use_item_on` | A Pheno action. The worker is the actor and the animal is the target. |
| `interactions[].outputs` | `[]` | Item IDs or `#tags` that Townstead carries to storage. |
| `interactions[].condition` |  | A Pheno entity condition for this interaction only. |
| `interactions[].xp` | `1` | Career experience for each successful use. |
| `interactions[].activity` | the Job ID | The history counter that the use adds to. |

Without an `action`, the worker uses the item on the animal as a player does. The animal's own interaction runs, so modded animals and modded tools work without other data. The item that is left in the worker's hand, such as worn shears or a filled bucket, goes back to the worker.

For a building type with an `enclosed` site requirement, such as a pen, Townstead checks that an animal is inside by the ground that the building holds, not by its box. An animal outside an L-shaped pen is therefore outside the pen.

The Order Sheet of the worker's own work site controls the Job. The building where the animal stands has no effect. For example, a paused shearing line at a shepherd's workplace stops shearing in every pen.

After each use, Townstead carries the declared outputs to storage. It uses the Career's `storage.preferred_roles` first, and then storage beside the work site. When there is no storage, the worker keeps the outputs and continues to work while there is space in the inventory.

## Entity Delivery

An entity-delivery job declares an entity `source` and a block `destination`:

```json
{
  "schema": "townstead:job/v3",
  "type": "townstead:entity_delivery",
  "task": "townstead_work:slaughter",
  "source": {
    "item": "#example:butcher_tools",
    "buildings": ["example:livestock_pen"],
    "results": {
      "minecraft:cow": "example:cow_carcass"
    },
    "condition": {
      "type": "pheno:and",
      "conditions": [
        { "type": "pheno:alive" },
        { "type": "pheno:baby", "inverted": true },
        { "type": "pheno:named", "inverted": true }
      ]
    },
    "action": [
      { "type": "pheno:swing_hand" },
      {
        "type": "pheno:target_action",
        "action": { "type": "pheno:damage", "amount": 4, "source": "other" }
      }
    ],
    "range": 2,
    "interval": 20,
    "cooldown": 2400,
    "xp": 2
  },
  "destination": {
    "buildings": ["example:butcher_shop"],
    "block": "example:carcass_rail",
    "placement": {
      "offset": [0, -1, 0],
      "copy_properties": ["facing"],
      "action": {
        "type": "pheno:play_sound",
        "sound": "minecraft:block.chain.hit"
      }
    }
  }
}
```

`source.item` is an optional item ID or item tag. When it is present, the engine gets one from the worker or from work-site storage, and the worker holds it while `source.action` runs. `source.results` maps each entity type to the item that must appear before the engine starts the delivery. It does not make that item. So if a mod cancels the death, the mapped item can still appear without a dead entity. If the action makes no mapped item, there is no delivery.

`source.condition` is a usual Pheno entity condition. `range` is in blocks. `interval` and a number `cooldown` are in ticks. Townstead gives the `xp` after the delivery. A server setting can set `cooldown` in place of a number:

```json
"cooldown": {
  "scope": "server",
  "file": "example-server.toml",
  "path": ["workers", "deliveryCooldown"],
  "default": 2400
}
```

`destination.placement` sets where the delivered block goes, relative to the destination. It can set or copy block-state properties. Its optional Pheno block `action` runs at the block after Townstead places it. The field names describe what the engine does. Put names that belong to one profession in the resource values, not in field names.
