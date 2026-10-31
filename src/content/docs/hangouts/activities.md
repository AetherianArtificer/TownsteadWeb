---
title: Activities
description: "What visitors do together at a venue: conversations, rounds, meals, and service by staff."
---

An activity is a short moment that visitors share at a venue, such as a conversation, a round of drinks, or a meal. Put each activity in `data/<namespace>/hangout_activity/<name>.json`, and list it in the `activities` of a [venue](/hangouts/venues/).

```json
{
  "schema": "townstead:hangout_activity/v2",
  "kind": "drink",
  "minimum_participants": 2,
  "maximum_participants": 5,
  "duration_ticks": 360,
  "roles": { "patron": 5 },
  "postures": ["townstead:sit"],
  "participant_when": { "type": "pheno:life_stage", "stage": "adult" },
  "service": {
    "courses": [
      { "id": "house_round", "kind": "drink", "role": "bartender", "at_ticks": 140, "lease_ticks": 100 }
    ]
  },
  "on_service_accepted": {
    "type": "pheno:performance", "performance": "townstead:raise_a_glass", "channel": "hospitality", "duration_ticks": 60
  },
  "performance": { "id": "townstead:round_at_the_table", "channel": "social", "duration_ticks": 360, "priority": 15 },
  "social_cues": { "conversations": true, "dialogue_interval_ticks": 240 }
}
```

## Fields

| Field | Default | Description |
| --- | --- | --- |
| `schema` | | Required. `townstead:hangout_activity/v2`. |
| `mods` | | Optional. Townstead loads the file only when these mods are present. |
| `kind` | `socialize` | `socialize`, `eat`, `drink`, or `mixed` (eat or drink). It sets what [service](#service) gives. |
| `minimum_participants` | `2` | The activity needs at least this many visitors. Use `1` for something a visitor does alone. |
| `maximum_participants` | `minimum_participants`, and at least `2` | The most visitors in the activity. |
| `duration_ticks` | `240` | How long the activity lasts. |
| `yield_to_groups` | `false` | With `true`, a visitor who does this activity alone can leave it to join a group activity. |
| `roles` | | Role names mapped to counts. Townstead gives roles to the members in order. Members after the counts run out get the role `participant`. |
| `postures` | all | The [spot postures](/hangouts/spots/) that can take part. With no list, every posture can. |
| `participant_when` | | Pheno condition. Each member must pass it, at the start and while the activity lasts. |
| `start_when` | | Pheno condition on the visitor who starts the activity. |
| `continue_when` | | Pheno condition. Each other member must pass it to join, and each member must pass it to stay. |
| `on_start`, `on_tick`, `on_finish` | | Pheno actions on each member. `on_tick` runs at regular intervals. `on_finish` runs only when the activity completes. |
| `performance` | | A [performance](/reactions/performances/) that each member plays when the activity starts. See below. |
| `social_cues` | | Conversations, lines, and expressions. See [Social Cues](#social-cues). |
| `service_when` | | Pheno condition. A member who fails it is refused service. |
| `service` | | Courses that staff serve. See [Service](#service). |
| `on_service_accepted`, `on_service_refused`, `on_service_missing` | | Pheno actions on the member after service. |

The `performance` object has `id`, `channel` (default `social`), `duration_ticks` (default: the activity's), `priority` (default `0`), and `fallback` (default `vanilla_gesture`). These work as in [`pheno:performance`](/reactions/performances/#performances). When the channel is `social` and the activity uses conversations, the conversation plays the gestures instead.

## How an Activity Starts

After a visitor arrives, Townstead tries the activities of the venue in order. It uses the first activity where:

- the visitor's spot has a posture in `postures`, and the visitor passes `participant_when` and `start_when`;
- enough other visitors at the same venue can join: they are within the policy's `social_radius`, pass `companion_when`, have a matching posture, and pass `participant_when` and `continue_when`.

Townstead asks first the visitors with the strongest [bonds](/hangouts/policy/#bonds) to the first visitor, and then the nearest ones.

A visitor who is already in an activity joins a new one only when their current activity has `yield_to_groups` and they are alone in it.

The activity ends when its time is over, or when fewer than `minimum_participants` members are left. If no activity can start, the visitor tries again a short time later.

## Social Cues

```json
"social_cues": {
  "conversations": true,
  "dialogue_interval_ticks": 240,
  "expressions": ["townstead_expressions:music"],
  "expression_interval_ticks": 120
}
```

| Field | Default | Description |
| --- | --- | --- |
| `conversations` | `false` | With `true`, two members start a [conversation](/conversations/) at each interval, when conversations are on. |
| `dialogue_intent` | | Without conversations, one member says a contextual line with this intent at each interval. The line can read the facts `hangout`, `venue:<id>`, and `venue_tag:<tag>`. |
| `dialogue_interval_ticks` | `180` | Ticks between conversations or lines. |
| `expressions` | | [Expression cues](/reactions/performances/#expressions). One member shows one of them at each interval. |
| `expression_interval_ticks` | `120` | Ticks between expressions. |

Only one member speaks or shows an expression at a time. Members take turns.

## Service

Without `service`, each member gets one try at service halfway through the activity. For `eat`, `drink`, or `mixed`, the member uses an [amenity](/packs/amenities/) within 4 blocks that feeds or gives water. For `socialize`, service always succeeds. Then Townstead runs `on_service_accepted` or `on_service_refused`.

With `service`, staff serve each member in courses:

```json
"service": {
  "courses": [
    { "id": "drinks", "kind": "drink", "role": "bartender", "at_ticks": 60, "lease_ticks": 100 },
    { "id": "meal", "kind": "eat", "role": "server", "at_ticks": 180, "eligible_when": { "type": "pheno:life_stage", "stage": "adult" } }
  ]
}
```

| Course Field | Default | Description |
| --- | --- | --- |
| `id` | `course_<n>` | A name, unique in the activity. |
| `kind` | `mixed` | `eat`, `drink`, or `mixed`. The course needs an amenity of that kind near the member. |
| `role` | | Required. A `staff_roles` key of the venue. It must not be a visitor role from `roles`. |
| `at_ticks` | `0` | How long after the start of the activity the course is served. |
| `lease_ticks` | `100` | How long Townstead reserves the staff member for this course. |
| `eligible_when` | | Pheno condition. A member who fails it is refused this course. |

For each member and course, in order:

| Result | When | Action |
| --- | --- | --- |
| Refused | The member fails `service_when` or `eligible_when`, or the amenity cannot be used. | `on_service_refused` |
| Missing | No staff member for the role is within 32 blocks, or no amenity of the course kind is near the member. | `on_service_missing` |
| Accepted | A staff member is free, and the member uses the amenity. | `on_service_accepted` |

A staff member is a villager who passes the role's condition, works at the venue building, and is not visiting.
