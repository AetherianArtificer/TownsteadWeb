---
title: Life Cycles
description: Life-cycle genes, stages, timing, death loot, and default cycle
---

A life-cycle gene defines how a villager or player moves through stages.

Gene type: `townstead_roots:life_cycle`

## Minimal Life Cycle

For a first custom life cycle, define:

1. A `townstead_roots:life_cycle` gene.
2. A short `stages` array.
3. Each stage's `id`, `label`, `presents_as`, and `days`.

Add `rig`, `mobile`, `needs`, `talkable`, `death_loot`, and custom `narrative_age` only when basic stage progression works.

## Gene Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `type` | string | yes | `townstead_roots:life_cycle`. |
| `stages` | array | yes | Ordered life stages. |
| `variance` | number | no | Per-stage random age spread at spawn. `0.1` means each stage can roll about 10% shorter or longer. Defaults to `0`. |
| `ageless` | boolean | no | If true, the cycle names stages but calendar progression is frozen at the resolved stage. |

Life-cycle genes use replace semantics. A later life-cycle gene with stages replaces the earlier cycle rather than merging stage-by-stage.

## Example

```json
{
  "schema": "townstead:gene/v2",
  "type": "townstead_roots:life_cycle",
  "display_name": "Human-Like Life",
  "variance": 0.1,
  "stages": [
    {
      "id": "baby",
      "label": "Baby",
      "presents_as": "baby",
      "days": 2
    },
    {
      "id": "adult",
      "label": "Adult",
      "presents_as": "adult",
      "days": 47,
      "on_end": "stay"
    }
  ]
}
```

## Stage Fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `id` | string | yes | Stable stage id used for saved data and runtime lookups. |
| `label` | component | no | Display label. Defaults to the stage id. |
| `presents_as` | string | yes | Canonical stage axis. |
| `days` | integer | no | Base duration of the stage in Townstead life days. Minimum `1`, default `1`. |
| `on_end` | string | no | `next`, `stay`, `die`, or `loop`. |
| `scale` | number | no | Render scale for this stage. Defaults from `presents_as`. |
| `narrative_age` | number array | no | Apparent age range, such as `[18, 64]`. |
| `rig` | id | no | Stage-specific rig override. |
| `mobile` | boolean | no | Whether the stage can move. Defaults to `true`. |
| `needs` | boolean | no | Whether hunger/thirst/needs apply. Defaults to `true`. |
| `talkable` | boolean | no | Whether normal interaction is allowed. Defaults to `true`. |
| `death_loot` | array | no | Extra drops added on death for this stage. |

## Canonical Stages

| Value | Meaning |
| --- | --- |
| `baby` | Baby-like behaviour and scale defaults. |
| `toddler` | Toddler-like behaviour and scale defaults. |
| `child` | Child-like behaviour and scale defaults. |
| `teen` | Teen-like behaviour and scale defaults. |
| `adult` | Adult behaviour. MCA adult gates treat this as adult. |
| `senior` | Senior-like behaviour and scale defaults. |

## Timing And Age

`days` controls biological pacing. It is the base duration of the stage in Townstead life days before variance and aging-scale handling are applied. Life days are the age-progression counter; they are not the apparent age shown to players, and they are protected from calendar relabelling.

`variance` gives each newly spawned villager slightly different stage lengths. It is rolled separately for each stage. For example, with `variance: 0.1`, a `10` life-day stage can become about `9` to `11` life days for one villager, while another stage on the same villager rolls separately. Use `0` when every villager should use the exact authored stage lengths.

`narrative_age` controls what age the villager or player appears to be. If no stage in the cycle uses `narrative_age`, Townstead derives apparent age from lived days and the configured aging scale. If any stage provides `narrative_age`, the cycle uses the authored bands and interpolates within the current stage.

## End Actions

| `on_end` | Behaviour |
| --- | --- |
| `next` | Move to the next stage. |
| `stay` | Stay in the current stage. |
| `die` | Die when the stage ends. |
| `loop` | Loop back through the cycle. |

When `on_end` is omitted, non-last stages use `next` and the final stage uses `stay`.

## Death Loot

`death_loot` entries are added on top of normal drops.

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `item` | id | yes | Item id to drop. |
| `count` | integer | no | Exact count. Overrides `min` and `max`. |
| `min` | integer | no | Minimum count. Defaults to `1`. |
| `max` | integer | no | Maximum count. Defaults to `min`. |
| `chance` | number | no | Drop chance from `0` to `1`. Defaults to `1`. |

## Default Cycle

When no effective life-cycle gene is found, Townstead uses:

| Stage | `presents_as` | Base Life Days | End |
| --- | --- | --- | --- |
| Baby | `baby` | `2` | next |
| Toddler | `toddler` | `2` | next |
| Child | `child` | `9` | next |
| Teen | `teen` | `5` | next |
| Adult | `adult` | `47` | next |
| Senior | `senior` | `25` | stay |

The default cycle totals `90` apparent years before aging scale is applied.

## Mixed Founders

Mixed founders can blend life cycles only when each selected root has the same compatible stage shape: same stage ids, same order, and compatible canonical `presents_as` values. If the cycles do not match, the dominant root's life cycle is used.
