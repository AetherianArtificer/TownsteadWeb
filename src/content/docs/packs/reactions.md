---
title: Reactions
description: Authoring guide and reference for Townstead reaction data packs.
---

# Reactions

Reactions are still under active development. They are available for pack authors to try, but the feature is not fully stable yet; expect bugs and behaviour changes while it settles.

The Reactions system lets villagers respond to gestures, activities, surroundings, time, and nearby events with animations and optional sounds, particles, and relationship changes.

A reaction begins with:

```json
{
  "schema": "townstead:reaction/v2"
}
```

Files without `schema` use the legacy v1 format and remain supported.

A reaction answers four questions:

1. **What can start it?** The entries in `triggers`.
2. **When is it allowed?** The reaction and choice conditions.
3. **What can the villager perform?** The entries in `choices`.
4. **How often can it happen?** Chance, cooldown, and animation locking.

Pheno supplies conditions and follow-up actions. Reactions keeps its own responsibilities: event triggers, personality-weighted animation selection, movement locking, social mirroring, and relationship changes.

Reactions are loaded on the server from data packs. The currently available animation backend is Emotecraft, so clients need the corresponding emotes to see authored animations. See the [Pheno reference](/packs/pheno/) for available `when` conditions and `do` actions.

## File Location

Place reaction files in:

```text
data/<namespace>/townstead/reactions/<path>.json
```

For example:

```text
example_reactions/
├── pack.mcmeta
└── data/
    └── example/
        └── townstead/
            └── reactions/
                └── wave.json
```

This creates the reaction ID:

```text
example:wave
```

## Minimal Reaction

```json
{
  "schema": "townstead:reaction/v2",
  "display_name": "Wave",
  "cooldown": "10s",
  "triggers": [
    {
      "type": "gesture",
      "emote": "emotecraft:waving"
    }
  ],
  "choices": [
    {
      "animation": {
        "type": "emotecraft",
        "id": "waving"
      }
    }
  ]
}
```

When a nearby player or villager waves, this reaction attempts to make the observing villager wave in return. A successful play places that reaction on a 200-tick cooldown for that villager.

## How Selection Works

When a trigger matches, Townstead:

1. Rejects sleeping or animation-locked villagers.
2. Checks the reaction cooldown.
3. Rolls the reaction-level `chance`.
4. Checks reaction-level conditions.
5. Removes choices whose Pheno conditions, legacy tags, cooldowns, or chance rolls fail.
6. Multiplies each remaining choice's `weight` by its personality multiplier.
7. Selects one choice by weighted random choice.
8. Asks the animation backend to play it.
9. Applies cooldowns, sound, particles, movement locking, hearts, and mirroring.
10. Runs the selected choice's Pheno `do`, followed by the reaction-level `do`.

Cooldowns are only claimed after an animation successfully starts. Failed attempts do not consume them.

Commands bypass sleeping and animation-lock checks, but other gates still apply.

## Reaction Fields

| Field | Values | Default | Description |
| --- | --- | ---: | --- |
| `display_name` | String |  | Human-readable name used by debugging tools. |
| `tags` | String array | `[]` | Descriptive reaction tags. Also used by nearby-reaction context tags. |
| `schema` | `townstead:reaction/v2` | Required | Selects the current reaction authoring format. |
| `cooldown` | Duration | `100t` | Per-villager cooldown for the whole reaction. Accepts ticks or values such as `"10s"`. |
| `chance` | Number or percentage | `1.0` | Chance that a matching trigger proceeds, such as `0.75` or `"75%"`. |
| `lock` | Duration | `0t` | Fallback movement lock when the emote duration is unknown. |
| `when` | Pheno condition |  | Condition that must pass before choices are considered. |
| `do` | Pheno action or array |  | Runs after the selected animation starts successfully. |
| `mirror_radius` | Integer, `0+` | `0` | Radius in which the played emote is broadcast as a gesture to other villagers. |
| `mirror_chance` | Number, `0.0–1.0` | `0.0` | Chance for each nearby villager to receive the mirrored gesture. |
| `hearts` | Integer | `0` | MCA relationship-heart change for the player who caused the reaction. |
| `triggers` | Object array | `[]` | Events that can nominate this reaction. |
| `choices` | Object array | `[]` | Weighted performance candidates. |
| `replace` | `true`, `false` | `false` | Replaces lower-priority definitions instead of merging with them. |

The current format also accepts the legacy aliases `cooldown_ticks`, `lock_ticks`, and `bindings`. Twenty ticks equal one second under normal server timing.

## Triggers

A reaction can contain any number of triggers. Multiple triggers are alternatives: any one of them can nominate the reaction.

### Gesture

Fires when the named emote plays near and roughly in front of a villager. This includes gestures from players and mirrored reactions from other villagers.

```json
{
  "type": "gesture",
  "emote": "emotecraft:waving",
  "max_distance": 6.0,
  "min_dot": 0.6
}
```

| Field | Values | Default | Description |
| --- | --- | ---: | --- |
| `emote` | Emote reference or bare name | Required | Emote to observe. Matching is case-insensitive and ignores the backend prefix. |
| `max_distance` | Number | `6.0` | Parsed for the trigger, but not currently enforced. Gesture broadcasts currently use the broadcaster radius. |
| `min_dot` | Number | `0.6` | Parsed for the trigger, but not currently enforced. |

### Context Enter

Nominates the reaction when any listed context tag newly becomes present.

```json
{
  "type": "context_enter",
  "tags": ["near_player_friend", "morning"]
}
```

Use this for transitions such as entering a building, approaching music, or becoming hungry. It does not continuously repeat while the context remains unchanged.

The trigger's `tags` field is used to find candidate reactions. Put tags that must all be present in reaction-level `conditions.required_tags`, choice-level `required_tags`, or Pheno `when`.

### Context Present

Nominates the reaction during context scans when any listed context tag is present.

```json
{
  "type": "context_present",
  "tags": ["near_music"]
}
```

Use `cooldown` to control how often the reaction can repeat. This is appropriate for ongoing situations such as dancing near music. Put tags that must all be present in reaction-level `conditions.required_tags`, choice-level `required_tags`, or Pheno `when`.

### Task

Fires when a Townstead villager task reports a named lifecycle phase.

```json
{
  "type": "task",
  "task": "townstead:example_task",
  "phase": "start"
}
```

Both values must exactly match the task event after case normalisation. Phases are task-defined and may include values such as `start`, `transition:<state>`, or `stop:<result>`.

### Idle Spot

Fires when a villager idles near a Townstead idle-spot point of interest.

```json
{
  "type": "idle_spot",
  "spot": "example:bench"
}
```

The `spot` value must match the ID supplied by the idle-spot system.

### Time

Checks villagers at an interval while the named time phase is active.

```json
{
  "type": "time",
  "phase": "evening",
  "interval_ticks": 1200
}
```

| Field | Values | Default | Description |
| --- | --- | ---: | --- |
| `phase` | Time phase | Required | Phase to match. |
| `interval_ticks` | Integer, `20+` | `1200` | Parsed, but not currently enforced. Use reaction `cooldown` to control repetition. |

Common phases are `day`, `night`, `dawn`, and `dusk`.

## Pheno Conditions

Use `when` on the whole reaction:

```json
{
  "when": {
    "type": "pheno:environment",
    "time": "day",
    "weather": "clear"
  }
}
```

Or on an individual choice:

```json
{
  "when": {
    "type": "pheno:health",
    "min": 10
  }
}
```

Reaction-level `when` is tested first. Choice-level `when` removes only that choice from weighted selection.

When a player gesture caused the reaction, Pheno receives the villager as `self` and the player as `other`. Other trigger sources normally have no counterpart.

## Legacy Context Conditions

The legacy `conditions` and choice `required_tags` fields remain available for compatibility. New packs should prefer Pheno `when` whenever the condition can be expressed through Pheno.

```json
{
  "conditions": {
    "required_tags": ["near_player_friend", "under_open_sky"],
    "time": "morning",
    "weather": "clear"
  }
}
```

| Field | Description |
| --- | --- |
| `required_tags` | Every listed context tag must be present. |
| `time` | Reserved time-phase condition. Parsed and merged, but not currently enforced. |
| `weather` | Reserved weather condition. Parsed and merged, but not currently enforced. |

Use `required_tags` for working time and weather gates:

```json
{
  "conditions": {
    "required_tags": ["morning", "raining"]
  }
}
```

Clear weather does not currently emit a `clear` tag.

Gesture, task, idle-spot, time, and command contexts do not currently carry the full context-tag set. `required_tags` conditions are therefore most useful with `context_enter` and `context_present` triggers.

## Context Tag Reference

Context tags are resolved around each villager during periodic scans.

### Needs and State

| Tags | Meaning |
| --- | --- |
| `hungry`, `peckish` | Hunger is below Townstead's emergency or adequate threshold. |
| `thirsty`, `parched` | Hydration is below Townstead's emergency or adequate threshold. |
| `exhausted`, `drowsy`, `tired` | Fatigue has crossed the corresponding threshold. |
| `unemployed` | The villager has no profession. |
| `at_workstation` | The villager is near their workstation. |
| `pregnant` | MCA reports the villager as pregnant. |
| `alone` | No other villagers are nearby. |
| `in_crowd` | At least three other villagers are nearby. |
| `near_baby_villager` | A baby or toddler villager is nearby. |

### Villagers and Family

| Tags | Meaning |
| --- | --- |
| `is_married`, `is_engaged`, `is_promised` | The villager has the corresponding MCA relationship state. |
| `near_spouse`, `near_parent`, `near_family` | A corresponding family member is nearby. |
| `near_working_villager` | A nearby villager is working. |
| `near_resting_villager` | A nearby villager is resting. |
| `near_meeting_villager` | A nearby villager is meeting. |

### Players

| Tags | Meaning |
| --- | --- |
| `near_player_friend` | A nearby player has at least 30 hearts with the villager. |
| `near_player_stranger` | A nearby player's hearts are between friend and disliked thresholds. |
| `near_player_disliked` | A nearby player has at most -10 hearts. |
| `near_player_spouse` | The villager's player spouse is nearby. |
| `being_watched_by_player` | A nearby player is looking towards the villager. |
| `player_holding:<item>` | A nearby player holds the named item path, such as `player_holding:diamond`. |
| `player_holding_tag:<namespace>:<tag>` | A nearby player's held item belongs to the named item tag. |

### Threats and Events

| Tags | Meaning |
| --- | --- |
| `near_zombie_villager` | A zombie villager is nearby. |
| `near_mob_threat` | A hostile mob is nearby. |
| `outsider_present` | An illager is nearby. |
| `raid_active` | A raid is active at the villager's position. |
| `near_grave` | An MCA tombstone is nearby. |
| `in_dialogue_with_player` | The MCA dialogue screen is open for this villager. |
| `dialogue_just_ended` | Dialogue with the villager ended roughly within the last three seconds. |

### Nearby Reactions

| Tag pattern | Meaning |
| --- | --- |
| `near_reacting:<namespace>:<reaction>` | A nearby villager is currently locked by that exact reaction. |
| `near_reacting_tag:<tag>` | A nearby villager is currently performing a reaction carrying that reaction tag. |

For example, a reaction tagged `dancing` causes nearby villagers to receive `near_reacting_tag:dancing` while its lock is active.

Bindings with `allow_movement: true` do not create a reaction lock, so they do not contribute these nearby-reaction tags.

### Time and Schedule

| Tags | Meaning |
| --- | --- |
| `day`, `night`, `dawn`, `dusk` | Broad Minecraft time phases. |
| `early_morning`, `morning`, `noon`, `afternoon`, `evening`, `late_night` | Display-hour periods. |
| `hour:<0–23>` | Current display hour. |
| `day:<number>` | Current world-day number. |
| `on_shift:<name>` | Current named Townstead shift. |
| `shift_custom` | The villager is using a custom shift. |

### Weather and Environment

| Tags | Meaning |
| --- | --- |
| `raining`, `thundering` | Current level weather. |
| `under_open_sky`, `under_roof` | Whether the villager can see the sky. |
| `in_dark` | Both block and sky light are below 4. |
| `near_water`, `near_lava` | The corresponding fluid is nearby. |
| `biome:<namespace>:<biome>` | Current biome ID. |
| `freezing`, `cold`, `temperate`, `hot` | Current biome temperature band. |
| `dimension:<namespace>:<dimension>` | Current dimension ID. |
| `in_building:<type>` | MCA building type containing the villager. The namespace is removed. |
| `near_music` | A registered music source, including a playing jukebox, is nearby. |

## Choices

A choice is one possible animation and its local rules.

```json
{
  "animation": {
    "type": "emotecraft",
    "id": "waving",
    "allow_movement": true
  },
  "weight": 2.0,
  "chance": "100%",
  "personality_weights": {
    "friendly": 2.0,
    "introverted": 0.4,
    "default": 1.0
  }
}
```

| Field | Values | Default | Description |
| --- | --- | ---: | --- |
| `animation` | Object | Required | Animation backend, ID or IDs, and playback settings. |
| `weight` | Number, `0+` | `1.0` | Relative selection weight. |
| `chance` | Number or percentage | `1.0` | Independent eligibility roll before weighted selection. |
| `shots` | Integer, `1+` | `1` | Number of animation repetitions used when calculating the lock duration. |
| `cooldown` | Duration | `0t` | Per-villager cooldown for this choice. |
| `allow_movement` | `true`, `false` | `false` | Allows vanilla movement to continue and prevents reaction locking. |
| `parts_skip` | String array |  | Body parts omitted from the animation. |
| `personality_weights` | Object | `{}` | Multipliers applied to this choice's weight. |
| `when` | Pheno condition |  | Condition required for this choice. |
| `do` | Pheno action or array |  | Runs after this choice's animation starts. |
| `required_tags` | String array | `[]` | Legacy context tags required for this choice. |
| `sound` | Object |  | Sound played after the animation starts. |
| `particles` | Object |  | Particle burst emitted after the animation starts. |
| `speech_pool` | String |  | Reserved speech-pool reference. Parsed but not currently emitted. |

If `allow_movement` is true and `parts_skip` is omitted, Townstead defaults it to:

```json
["legs", "torso"]
```

Legacy `ref` and `args` fields remain accepted.
The legacy `cooldown_ticks` alias remains accepted as well.

### Animation

```json
{
  "animation": {
    "type": "emotecraft",
    "ids": [
      "club_penguin_dance",
      "kazotsky_kick"
    ],
    "shots": 2,
    "speed": 1.0,
    "allow_movement": false
  }
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `type` | Required | Animation backend. Currently `emotecraft`. |
| `id` |  | One animation ID without the backend prefix. |
| `ids` |  | Animation ID array. One is chosen uniformly after the choice wins weighted selection. |
| `shots` | `1` | Repetitions used when calculating animation lock duration. |
| `speed` | `1.0` | Positive playback-speed multiplier. |
| `loop_override` | `-1` | Backend loop override. |
| `allow_movement` | `false` | Allows movement and suppresses reaction locking. |
| `parts_skip` |  | Body-part names omitted from playback. |

### Personality Weights

The final selection weight is:

```text
choice weight × personality multiplier
```

Keys are matched case-insensitively against the MCA personality name. `default` is used when no exact key exists, and an omitted default acts as `1.0`.

A multiplier of `0` makes that choice unavailable to the personality.

Emote names are normalised to lowercase for playback.

## Pheno Actions

`do` accepts one Pheno action or an array of actions:

```json
{
  "do": [
    {
      "type": "pheno:spawn_particles",
      "particle": "minecraft:happy_villager",
      "count": 3
    },
    {
      "type": "pheno:play_sound",
      "sound": "minecraft:entity.villager.yes"
    }
  ]
}
```

Choice actions run before the reaction-level action. Neither runs when animation playback fails.

The legacy `sound` and `particles` choice fields remain supported, particularly for MCA gendered voice suffixes, but general-purpose effects should use Pheno.

## Sounds

Use a direct sound event:

```json
{
  "sound": {
    "id": "minecraft:entity.villager.yes",
    "volume": 0.8,
    "pitch": 1.0
  }
}
```

Or an MCA gendered voice suffix:

```json
{
  "sound": {
    "mca_voice": "greet",
    "volume": 0.8,
    "pitch_range": [0.95, 1.05]
  }
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `id` |  | Sound-event ID. |
| `mca_voice` |  | MCA voice suffix resolved as `mca:villager.<gender>.<suffix>`. |
| `volume` | `1.0` | Non-negative playback volume. |
| `pitch` | `1.0` | Fixed pitch. |
| `pitch_range` |  | Two-number minimum and maximum pitch range. |

At least `id` or `mca_voice` is required. When both are present, MCA villagers use `mca_voice`; `id` is the fallback for entities without MCA gender data. MCA voice pitch is also adjusted by the individual villager's voice tone.

## Particles

```json
{
  "particles": {
    "id": "minecraft:note",
    "count": 6,
    "spread": [0.5, 1.0, 0.5],
    "y_offset": 2.0
  }
}
```

| Field | Default | Description |
| --- | ---: | --- |
| `id` | Required | Simple particle type ID. Particle types requiring extra parameters are not supported here. |
| `count` | `1` | Number of particles. |
| `spread` | `[0.2, 0.2, 0.2]` | X, Y, and Z Gaussian spread in blocks. |
| `y_offset` | `1.0` | Height above the villager's feet. |

## Movement Locking

Unless `allow_movement` is true, a successful reaction can temporarily lock the villager against other reactions.

For known Emotecraft animations, Townstead calculates the lock from the selected emote's duration and `shots`. If the duration is unknown, it uses the reaction's `lock`. If neither supplies a duration, no lock is applied.

The lock is also what makes a reaction visible through `near_reacting:*` context tags.

## Mirroring

Mirroring lets a reaction spread socially:

```json
{
  "mirror_radius": 8,
  "mirror_chance": 0.5
}
```

After a successful animation, each nearby villager has `mirror_chance` probability of receiving a synthetic gesture event for the played emote. Any reaction with a matching `gesture` trigger may respond.

Mirroring is limited to one hop. A reaction caused by a mirrored gesture cannot mirror again.

## Relationship Hearts

```json
{
  "hearts": 1
}
```

When a player gesture causes the reaction, Townstead can add or remove MCA relationship hearts between that player and the reacting villager.

The same player, villager, and reaction combination can change hearts at most once per Minecraft day. Context, task, time, and mirrored triggers have no player cause and therefore do not change hearts.

## Pack Merging

Townstead reads every resource-pack contribution to the same reaction ID rather than only the highest-priority file.

Without `replace: true`:

- `tags`, choices, and `triggers` are concatenated and deduplicated.
- Condition `required_tags` are combined.
- Higher-priority scalar values replace lower-priority values.
- Higher-priority `conditions.time` and `conditions.weather` replace lower values when present.
- A higher-priority `hearts` value of `0` leaves the lower non-zero value intact.

Use:

```json
{
  "schema": "townstead:reaction/v2",
  "replace": true,
  "choices": [
    {
      "animation": {
        "type": "emotecraft",
        "id": "waving"
      }
    }
  ]
}
```

when the higher-priority file should completely replace the earlier definition.

This merging model allows one pack to add triggers while another adds animations, but the final merged reaction must contain at least one usable choice.

## Complete Example

```json
{
  "schema": "townstead:reaction/v2",
  "display_name": "Friendly Wave",
  "tags": ["social", "greeting"],
  "cooldown": "10s",
  "chance": "80%",
  "mirror_radius": 6,
  "mirror_chance": 0.25,
  "hearts": 1,
  "triggers": [
    {
      "type": "gesture",
      "emote": "emotecraft:waving",
      "max_distance": 6,
      "min_dot": 0.6
    }
  ],
  "when": {
    "type": "pheno:environment",
    "weather": "clear"
  },
  "choices": [
    {
      "animation": {
        "type": "emotecraft",
        "id": "waving",
        "allow_movement": true
      },
      "weight": 3,
      "personality_weights": {
        "friendly": 2.0,
        "extroverted": 2.0,
        "introverted": 0.3,
        "default": 1.0
      },
      "sound": {
        "mca_voice": "greet",
        "volume": 0.8,
        "pitch_range": [0.95, 1.05]
      },
      "do": {
        "type": "pheno:spawn_particles",
        "particle": "minecraft:happy_villager",
        "count": 3,
        "spread": 0.3
      }
    }
  ]
}
```

## Testing Commands

List loaded reactions:

```text
/townstead reaction list
```

Play a reaction on the MCA villager under the player's crosshair, or the nearest one within 16 blocks:

```text
/townstead reaction play "example:friendly_wave"
```

Play it on an explicit target:

```text
/townstead reaction play "example:friendly_wave" @e[type=mca:male_villager,limit=1,sort=nearest]
```

The command reports a failure when the reaction is unknown, on cooldown, rejected by chance, or has no eligible choice.

## Troubleshooting

### The reaction is not listed

- Confirm the file is under `data/<namespace>/townstead/reactions/`.
- Confirm the JSON is valid.
- Check the server log for a rejected contribution.
- Reload data packs after changing the file.

### The reaction is listed but does not play

- Confirm at least one choice has a valid `animation.id`, `animation.ids`, or legacy `ref`.
- Confirm the backend prefix is `emotecraft`.
- Confirm all animation references in one choice use the same backend.
- Check reaction and choice cooldowns.
- Check both `chance` fields.
- Check personality multipliers and required context tags.
- Confirm the emote exists on the client.

### A context reaction never fires

- Use `context_enter` for the transition into a state.
- Use `context_present` for repetition while a state remains true.
- Put all required tags in the trigger's `tags` as well as any stricter reaction or choice gate.
- Remember that cooldown controls repetition for `context_present`.

### Nearby villagers do not copy it

- Set both `mirror_radius` and `mirror_chance` above zero.
- Give the receiving reaction a `gesture` trigger matching the actual played emote.
- Remember that mirroring stops after one hop.

## Current Boundaries

- Reactions are server-authored data-pack content.
- Emotecraft is currently the only registered animation backend.
- `speech_pool` is reserved but not currently played.
- Context tags are resolved periodically rather than every tick.
- Trigger and context vocabularies are code-defined and may expand as more Townstead systems expose events.
