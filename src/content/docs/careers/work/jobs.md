---
title: Work Jobs
description: Declare block-interaction and entity-delivery Jobs that give a task engine its world operations.
---

A Job supplies world operations to one of Townstead's general executors and registers the task ID that Professions place in their `work.json`. The task entry itself is described in the [Field Reference](/careers/work-tasks/#field-reference).

## Work Job Documents

A work-job document supplies world operations to a reusable task engine. Place it at:

```text
data/<namespace>/work_job/<job>.json
```

The `type` selects the general executor. The `task` names the work that Professions place on their schedules and is registered by the Job document itself. The executor owns semantic fields such as `target`, `source`, and `destination`; authors do not invent structural role names.

### Block Interaction

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

Use `block` for one target block. Use `blocks` for several block IDs or `#tag` references. A target-level `condition` is a Pheno block condition shared by every interaction. Townstead tries interactions in authored order and obtains the first applicable item from the worker or work-site storage. `xp` supplies the default award; an interaction may override it.

The default interaction invokes Minecraft's real block-use behaviour with the selected item. `output` identifies one dropped result that Townstead may collect; `outputs` accepts several item IDs. These fields do not create items or prescribe a count. An interaction may provide an explicit Pheno block `action` when ordinary block use is not sufficient. Items returned by that action enter ordinary work-site storage automatically.

The work display derives its held item from the applicable interaction's `item` selector. A new tool tag therefore appears in the villager's hands with no further declaration. Generic Job tools are shown only while the Job has a runnable target or source; listing a possible tool does not make an idle worker repeatedly equip it.

#### Managed requirements

A block interaction may require temporary preparation. Put these facts in `requirements`, not in an interaction condition, when the worker can establish and later remove them:

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

`satisfied_when` is evaluated at the main target and states the successful world condition. The name is deliberately explicit: it is not a condition for beginning the failure path. A requirement without `provision` must already be satisfied. A managed requirement adds the following fields:

- `id` is a local, stable name used by feedback rules.
- `provision.at` is a block selector rooted at the main target. It may yield several candidates in preferred order.
- `provision.item` and optional `item_condition` describe the tool obtained from the worker or work-site storage.
- `start` establishes the requirement at a selected source. The engine verifies `satisfied_when` afterward; running an action alone is not success.
- `managed_when` is a safety check at the selected source before cleanup.
- `stop` reverses the temporary preparation. It must not require an inventory item, because abandoned work is cleaned after its lease expires.

Townstead does not run `stop` when the world already satisfied the requirement. When Townstead performs `start`, it records a persistent lease on that source. Workers sharing the preparation hold separate leases, and cleanup occurs only after the final holder releases it. Interrupted leases expire and are cleaned after reload. Cleanup also refuses to act if the source block has been replaced or no longer passes `managed_when`.

This mechanism is general. It can heat a station, power a machine, fill a vessel, open access, or light a work area without making those concepts part of the Job executor.

An interaction may also have its own Pheno block `condition` and `item_condition`. The former tests the target; the latter tests the selected stack after it has matched `item`. Use them when a stage requires a different tool, a wet cloth, sufficient durability, or another property of the actual input. `output` and `outputs` are optional for an explicit action that returns its products directly or performs successful work without an item result, such as cleaning a spill. The Job still records one completion and awards XP.

An explicit action is an ordered block-action array. The Job makes its selected stack available as the `item` role:

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

The engine checks applicability without changing the world before it claims a target. If an action needs a block entity, a resolvable mapped block, or another runtime prerequisite, its preflight check can refuse the interaction. The action array then runs in order as one work attempt. See [Pheno Actions](/pheno/actions/#data-authored-block-procedures) for the procedure vocabulary.

Successful completion also records the Job's resource ID in the Chronicle. The example therefore increments `example:beehive_harvest` without a separately authored counter field. Renaming the resource renames the activity; merely referring to an ID does not create a Job or a counter.

The block-interaction executor drives villager AI. Players earn the same credit through a separate bridge described in [Player Work](/careers/work/history/#player-work).

Block-interaction Jobs expose executor-level diagnostic signals under `townstead_work:block_interaction/`, including `has_worksite`, `has_target`, `has_ready_target`, and `has_input`. These names describe reusable executor state, not a particular Job or block. Prefer ordinary Pheno world conditions when the same fact can be stated without a signal.

### Entity Delivery

An entity-delivery job declares an entity `source` and block `destination` directly:

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

`source.item` is an optional item ID or item-tag selector. When present, the engine obtains one from the worker or work-site storage and equips it while running `source.action`. `source.results` maps an eligible entity type to the exact item that the engine must observe before it begins the delivery. It does not create that result. A cancelled mod event may therefore produce the mapped item without leaving a dead entity, while an action that produces no mapped item simply produces no delivery.

`source.condition` is an ordinary Pheno entity condition. `range` is measured in blocks; `interval` and a literal `cooldown` are measured in ticks. `xp` is awarded after delivery. A server setting may supply `cooldown` instead of a literal:

```json
"cooldown": {
  "scope": "server",
  "file": "example-server.toml",
  "path": ["workers", "deliveryCooldown"],
  "default": 2400
}
```

`destination.placement` locates the delivered block relative to the destination and can set or copy block-state properties. Its optional Pheno block `action` runs at the placed block after placement. The field names describe the engine's operation; profession-specific nouns remain resource values.
