---
title: Configuration
description: Reference for the Townstead config, both server and client.
sidebar:
  order: 1
---

Townstead splits configuration between server-side behaviour and client-side preferences. Server settings control villager AI, needs, work, storage, calendar behaviour, and integrations. Client settings control local settings: audio, catalog UI, and accessibility options.

Tables are grouped by configuration section, such as `[needs.hunger]`, with the setting names shown as they appear inside that section.

## Quick Examples

### Disable Villager Hunger

```toml
[needs.hunger]
enableVillagerHunger = false
```

### Protect Food Storage

```toml
[storage]
respectProtectedStorage = true
protectedStorageBlocks = ["minecraft:barrel"]
protectedStorageTags = ["townstead:protected_food_storage"]
```

### Slow Villager Aging

```toml
[calendar]
agingScale = 16.0
```

`agingScale` sets how many Minecraft days equal one year of villager age. Higher values make everyone age more slowly.

### Block Roots on a Server

```toml
[roots]
blockedSpecies = ["townstead_roots:webster"]
blockedRoots = ["townstead_roots:moon_elf"]
```

Blocked roots disappear from the root picker and stop spawning naturally. See [Roots](#roots) for the full rules.

## Server Settings

Server settings affect world behaviour. On a dedicated server, the server's values decide how villagers behave.

## Needs

### Hunger

```toml
[needs.hunger]
```

Hunger controls whether villagers get hungry, where they look for food, and what clean up they do after eating.

| Setting                       | Default | Values          | Description |
| ----------------------------- | ------: | --------------- | ----------- |
| `enableVillagerHunger`        | `true`  | `true`, `false` | Enables villager hunger. When disabled, villagers skip hunger decay, eating behaviours, and hunger-driven mood drift. |
| `enableSelfInventoryEating`   | `true`  | `true`, `false` | Allows villagers to eat food from their own inventory. |
| `enableGroundItemSourcing`    | `true`  | `true`, `false` | Allows villagers to collect food from ground items. |
| `enableContainerSourcing`     | `true`  | `true`, `false` | Allows villagers to pull food from containers and item handlers. |
| `enableCropSourcing`          | `false` | `true`, `false` | Allows villagers to harvest mature crops for food as an emergency fallback. Disabled by default to save crops and help with performance. |
| `preferServedFood`            | `true`  | `true`, `false` | Ranks plated meals and other served food alongside chests and dropped items, with a bonus, so a nearby laid table beats a far pantry. When false, villagers eat served food only when no stored or dropped food is reachable. |
| `enableChorusFruitTeleport`   | `true`  | `true`, `false` | Lets villagers teleport when they eat chorus fruit, just like players do. |
| `enableEmptyContainerDropoff` | `true`  | `true`, `false` | Lets villagers store empty bowls, bottles, and buckets in nearby storage after eating or drinking. Skipped while actively working so tools are not taken mid-task. |

### Thirst

Thirst settings are only applied when a supported thirst mod is installed. Supported backends are Thirst Was Taken, Thirst Was Reclaimed, Legendary Survival Overhaul, and Tough As Nails.

```toml
[needs.thirst]
```

| Setting                               | Default | Values          | Description |
| ------------------------------------- | ------: | --------------- | ----------- |
| `enableVillagerThirst`                | `true`  | `true`, `false` | Enables villager thirst when a thirst backend mod is installed. |
| `enableSelfInventoryDrinking`         | `true`  | `true`, `false` | Allows villagers to drink thirst-restoring items from their own inventory. |
| `enableGroundItemThirstSourcing`      | `true`  | `true`, `false` | Allows villagers to collect thirst-restoring items from ground items. |
| `enableContainerThirstSourcing`       | `true`  | `true`, `false` | Allows villagers to pull thirst-restoring items from containers and item handlers. |
| `enableCropThirstSourcing`            | `false` | `true`, `false` | Allows villagers to harvest mature crops for thirst-restoring food or drink as an emergency fallback. Disabled by default to save crops and help with performance. |
| `thirstLethalFallback`                | `false` | `true`, `false` | Allows dehydration to kill villagers. (NOT CURRENTLY WORKING) |
| `enableCookWaterPurification`         | `true`  | `true`, `false` | Allows cook villagers to purify impure water bottles in available kitchen skillets. |
| `preferKitchenStorageForEmptyBottles` | `true`  | `true`, `false` | When villagers drink from bottles, prefers depositing empty bottles into kitchen storage. |
| `preferredBackend`                    | `"auto"` | `"auto"`, `"legendary_survival_overhaul"`, `"thirst"`, `"tough_as_nails"` | Which thirst mod drives villager thirst when more than one is installed. `auto` prefers Legendary Survival Overhaul, then Thirst Was Reclaimed or Thirst Was Taken, then Tough As Nails. Pinning a backend falls back to that order if the pinned mod is not installed. `thirst` covers both Thirst Was Taken and Thirst Was Reclaimed, since they share a mod id and cannot be installed together. |

### Fatigue

Fatigue controls how villagers accumulate exhaustion during activity and recover through rest.

```toml
[needs.fatigue]
```

| Setting                       | Default | Values          | Description |
| ----------------------------- | ------: | --------------- | ----------- |
| `enableVillagerFatigue`       | `true`  | `true`, `false` | Enables villager fatigue. |
| `enableFatigueAlerts`         | `true`  | `true`, `false` | Shows local chat alerts when villagers collapse from exhaustion or recover. |
| `fatigueNocturnalMultiplier`  | `0.75`  | Number          | Fatigue accumulation multiplier when working during aligned cycle hours. |
| `fatigueMisalignedMultiplier` | `1.25`  | Number          | Fatigue accumulation multiplier when working during misaligned cycle hours. |

### Temperature

```toml
[needs.temperature]
```

| Setting                    | Default  | Values | Description |
| -------------------------- | -------: | ------ | ----------- |
| `enableVillagerTemperature` | `true`  | `true`, `false` | Enables villager body temperature. Villagers drift toward the climate at their position, dress for it, and seek a hearth or shade when they are uncomfortable. |
| `preferredBackend`         | `"auto"` | `"auto"`, `"legendary_survival_overhaul"`, `"cold_sweat"`, `"tough_as_nails"`, `"builtin"` | Which mod reports the ambient temperature. `auto` prefers Legendary Survival Overhaul, then Cold Sweat, then Tough As Nails, then Townstead's own model. `builtin` ignores temperature mods. |

### Conversations

```toml
[conversations]
```

| Setting           | Default | Values         | Description |
| ----------------- | ------: | -------------- | ----------- |
| `enabled`         | `true`  | `true`, `false` | Allows villagers to start conversations on their own, including during hangouts. Operator previews still work when this is off. |
| `idleStartChance` | `0.3`   | `0.0` to `1.0` | Chance, on each idle check about every ten seconds, that a villager invites a nearby available villager to talk. Hangout and Pheno conversations use their own timing. |

### Cannibalism

```toml
[cannibalism]
```

Who may eat meat from people, which is any item in the `townstead:cannibal_meats` tag. Each tier includes the ones below it.

| Setting   | Default | Values | Description |
| --------- | ------: | ------ | ----------- |
| `mode`    | `OFF`   | `OFF`, `PREDATORS`, `TRAIT`, `EVERYONE` | `OFF`: nobody. `PREDATORS`: roots that eat sapients may eat other kinds, never their own. `TRAIT`: predators as above, and villagers with the cannibal trait may eat anything. `EVERYONE`: anything goes. At `TRAIT` and above, a villager who slides into starvation has a very small chance of acquiring the trait. |
| `produce` | `false` | `true`, `false` | Offers and works sapient meat at worksites: order sheets list it and eligible jobs may process it. |

## Work and Professions

### Work feedback

These settings apply to every profession, including professions added by data packs. Profession feedback JSON still decides what a villager can say and may request a longer interval; the server configuration supplies the universal policy and the shortest permitted interval.

```toml
[feedback]
```

| Setting                              | Default | Values           | Description |
| ------------------------------------ | ------: | ---------------- | ----------- |
| `enableWorkFeedback`                 | `true`  | `true`, `false`  | Allows villagers to speak about their work, including one-time events and repeated requests. |
| `enableRepeatedWorkRequests`         | `true`  | `true`, `false`  | Allows villagers to repeat requests when missing supplies, tools, targets, or worksites block their work. One-time work events remain enabled. |
| `minimumRequestIntervalTicks`        | `3600`  | `200` to `24000` | Sets the minimum ticks between repeated work-feedback messages from one villager. A profession may use a longer interval in its feedback JSON. |

### Farming

Farming settings control farm radius, targeting cadence, water placement, and grooming.

```toml
[farming]
```

| Setting                           | Default | Values           | Description |
| --------------------------------- | ------: | ---------------- | ----------- |
| `enableFarmAssist`                | `true`  | `true`, `false`  | Enables lightweight farming assist: anti-trample and idle unstuck nudges for harvest chores. |
| `farmerFarmRadius`                | `12`    | `4` to `32`      | Maximum horizontal farm radius around the anchor used by farmer AI. |
| `farmerCellCooldownTicks`         | `120`   | `0` to `2400`    | Minimum ticks before reworking the same soil cell. |
| `farmerPathfailMaxRetries`        | `3`     | `1` to `20`      | How many times a target can fail pathing before it is temporarily blacklisted. |
| `farmerIdleBackoffTicks`          | `60`    | `0` to `1200`    | Ticks to wait before reacquiring work after no valid target is found. |
| `enableFarmerWaterPlacement`      | `true`  | `true`, `false`  | Allows farmers to place water sources in cells painted Water in the plot planner. |
| `farmerWaterSourceSearchRadius`   | `72`    | `8` to `192`     | Maximum horizontal distance farmers may travel to find water for bucket refills. |
| `farmerWaterSourceVerticalRadius` | `8`     | `2` to `32`      | Vertical search radius for nearby water sources when refilling buckets. |
| `farmerGroomRadius`               | `1`     | `0` to `4`       | Radius around planned farm cells where farmers may clear removable weeds. |
| `farmerGroomScanIntervalTicks`    | `60`    | `20` to `1200`   | Ticks between farmer grooming target scans. |

### Fishing

```toml
[fishing]
```

| Setting                           | Default | Values           | Description |
| --------------------------------- | ------: | ---------------- | ----------- |
| `fishermanWaterSearchRadius`      | `16`    | `4` to `48`      | How many blocks away from the barrel to look for water when fishing. |
| `fishermanInventoryFullThreshold` | `16`    | `1` to `64`      | Number of items the fisherman carries before returning to deposit. |

### Profession Work

These settings are general policy seams for data-authored work. A Job may consult one of them without adding a Profession- or mod-specific section to Townstead's configuration.

```toml
[professionWork]
```

| Setting                    | Default | Values           | Description |
| -------------------------- | ------: | ---------------- | ----------- |
| `allowLethalWork`          | `true`  | `true`, `false`  | Allows data-authored villager Jobs that deliberately kill a living target. |
| `lethalWorkCooldownTicks`  | `2400`  | `200` to `24000` | Default minimum time between lethal work actions by one villager. |
| `processTrophyOutputs`     | `false` | `true`, `false`  | Allows authored Jobs to process rare display-worthy outputs rather than preserve them. |

### Caregiving

```toml
[caregiving]
```

| Setting                       | Default | Values          | Description |
| ----------------------------- | ------: | --------------- | ----------- |
| `enableFeedingYoung`          | `true`  | `true`, `false` | Allows adults to feed hungry babies, toddlers, and children. |
| `enableHydratingYoung`        | `true`  | `true`, `false` | Allows adults to bring drinks to thirsty babies, toddlers, and children. Only appears when thirst backend is active. |
| `enableNonParentCaregivers`   | `true`  | `true`, `false` | Allows non-parent villagers to help feed children when parents are absent. |

## Storage

Storage settings decide whether villagers automate supply movement and which containers are off-limits.

```toml
[storage]
```

| Setting                      | Default                                | Values                | Description |
| ---------------------------- | -------------------------------------: | --------------------- | ----------- |
| `enableWorkSupplyAutomation` | `false`                                | `true`, `false`       | Allows chore supply restocking and output storage automation from nearby containers. |
| `enableHarvestOutputStorage` | `true`                                 | `true`, `false`       | Allows harvesting villagers to store gathered output in nearby containers. |
| `respectProtectedStorage`    | `true`                                 | `true`, `false`       | When true, villagers will not take food from protected storage blocks or tags. |
| `protectedStorageBlocks`     | `[]`                                   | List of block IDs     | Block IDs that villagers must not take food from. |
| `protectedStorageTags`       | `["townstead:protected_food_storage"]` | List of block tag IDs | Block tags treated as protected storage. |

Use full resource IDs for protected storage entries:

```toml
[storage]
protectedStorageBlocks = ["minecraft:barrel", "minecraft:chest"]
protectedStorageTags = ["townstead:protected_food_storage"]
```

## Roots

Roots settings let a server disable specific identity content without editing data packs. Each list takes resource ids. A root is blocked when its own id is listed, or when the species, ancestry, or lineage it resolves through is listed.

```toml
[roots]
```

| Setting             | Default | Values               | Description |
| ------------------- | ------: | -------------------- | ----------- |
| `blockedRoots`      | `[]`    | List of root ids     | Roots to disable on this server. |
| `blockedSpecies`    | `[]`    | List of species ids  | Blocks every root that resolves to a listed species. |
| `blockedAncestries` | `[]`    | List of ancestry ids | Blocks every root whose ancestry is listed, whether the root declares the ancestry directly or reaches it through its lineage. |
| `blockedLineages`   | `[]`    | List of lineage ids  | Blocks every root that selects a listed lineage. |

Blocking does three things:

1. Blocked roots are hidden from the root picker, for both players and the villager editor.
2. Blocked roots are never rolled for naturally spawned villagers, including as part of a mixed-ancestry founder.
3. The server rejects any attempt to apply a blocked root, so clients cannot bypass the picker.

Blocking is not retroactive. Villagers and players that already carry a blocked root keep it, keep their appearance, and can still pass it to children. Blocking only stops new selection and new natural spawns.

Id entries follow two conveniences:

- Entries without a namespace assume `townstead_roots`, so `"moon_elf"` means `"townstead_roots:moon_elf"`.
- Legacy `townstead_origins` ids are accepted and treated as the matching `townstead_roots` id.

```toml
[roots]
blockedRoots = ["townstead_roots:moon_elf"]
blockedSpecies = ["townstead_roots:webster"]
blockedAncestries = []
blockedLineages = []
```

This example removes the Moon Elf root and every Webster root from the picker and from natural spawns, while other elves stay available.

## Calendar and Aging

Calendar settings control profile selection, offline time behaviour, aging, and new-world start dates.

```toml
[calendar]
```

| Setting                 | Default  | Values               | Description |
| ----------------------- | -------: | -------------------- | ----------- |
| `profile`               | `"auto"` | `auto` or profile ID | Active calendar profile. Use `auto` to detect seasonal mods, or pin a profile ID such as `townstead_calendar:default`, `townstead_calendar:serene`, `townstead_calendar:tfc`, or `townstead_calendar:ecliptic`. |
| `realClockCalendar`     | `false`  | `true`, `false`      | When true, the calendar also advances by the real-world days that elapsed while the game was off. When false, it tracks Minecraft days only. Compatible with day-cycle mods either way. |
| `agingScale`            | `8.0`    | `0.01` to `100000.0` | Minecraft days per villager age year. Raise it to slow all aging; lower it to speed all aging. |
| `disableVillagerAging`  | `false`  | `true`, `false`      | When true, villagers hold their current life stage and apparent age, and away-time age catch-up is skipped. Animals still grow normally while loaded. |
| `randomizeStart`        | `true`   | `true`, `false`      | Applies only to new worlds. Rolls a random starting year and day-of-year when the world is freshly created. |
| `startYearMin`          | `1500`   | `0` to `100000`      | Applies only to new worlds. Lower bound for the rolled starting display year. |
| `startYearMax`          | `2200`   | `0` to `100000`      | Applies only to new worlds. Upper bound for the rolled starting display year. If this is less than or equal to the minimum, only the minimum is used. |

### Real-Time Calendar

When `realClockCalendar` is `false`, Townstead follows Minecraft's day counter. Use this for vanilla pacing or with day-cycle mods that already control the length of a Minecraft day.

When `realClockCalendar` is `true`, Townstead also adds the real-world days that elapsed while the game was off when the world loads again. Use it for long-haul life-sim worlds where the calendar should keep moving while you are away.

## Integrations

### Chef's Delight Compatibility

This section appears when Chef's Delight is installed.

```toml
[chefsdelight_compat]
```

| Setting               | Default | Values          | Description |
| --------------------- | ------: | --------------- | ----------- |
| `enableTownsteadCook` | `true`  | `true`, `false` | When enabled, Townstead handles cook AI and profession assignment. When disabled, Chef's Delight handles cooking instead. |

## Debugging

Debug settings are useful while testing behaviour, but are usually noisy in regular play.

```toml
[debug]
```

| Setting              | Default | Values          | Description |
| -------------------- | ------: | --------------- | ----------- |
| `debugVillagerAI`    | `false` | `true`, `false` | Enables debug chat messages for villager AI, including farmer and cook behaviour. |
| `debugVillagerSleep` | `false` | `true`, `false` | Enables sleep and rest debug logs and villager debug state updates. |

## Client Settings

Client settings affect only the local player's presentation and UI.

### Needs Display

```toml
[needs_display]
```

| Setting           | Default   | Values                  | Description |
| ----------------- | --------: | ----------------------- | ----------- |
| `temperatureUnit` | `CELSIUS` | `CELSIUS`, `FAHRENHEIT` | Unit for temperature readouts in tooltips and on the thermometer. |

### Mood Audio

```toml
[mood_audio]
```

| Setting                 | Default | Values          | Description |
| ----------------------- | ------: | --------------- | ----------- |
| `muteMoodVocalizations` | `true`  | `true`, `false` | Mutes villager mood vocalizations tied to laughter, celebration, and crying. |

### Catalog

```toml
[catalog]
```

| Setting               | Default | Values          | Description |
| --------------------- | ------: | --------------- | ----------- |
| `useTownsteadCatalog` | `true`  | `true`, `false` | Uses the Townstead extended catalog with kitchen building tiers. Disable to use MCA's original catalog. |

### Resource HUD

The resource HUD has its own focused settings screen with a live preview and reset button. It is a sub-screen of Townstead's client configuration rather than a replacement for the mod configuration screen, and is available on both supported 1.20.1 and 1.21.1 builds. These settings are local to the player.

```toml
[resource_hud]
```

| Setting | Default | Values | Description |
| --- | ---: | --- | --- |
| `anchor` | `PACK_DECIDED` | Six screen anchors or `PACK_DECIDED` | Overrides every meter's datapack anchor. `PACK_DECIDED` honours each resource separately. |
| `offsetX` | `4` | `-4096` to `4096` | Horizontal pixels from the selected anchor before HUD scale. |
| `offsetY` | `4` | `-4096` to `4096` | Vertical pixels from the selected anchor before HUD scale. |
| `scale` | `1.0` | `0.5` to `3.0` | Additional meter scale on top of Minecraft's GUI scale. |
| `stack` | `DOWN` | `DOWN`, `RIGHT` | Direction used when several meters share an anchor. |
| `visibility` | `CONTEXTUAL` | `CONTEXTUAL`, `NOT_AT_REST`, `ALWAYS`, `NEVER` | Global presentation rule for meters the datapack allows. |
| `exitStyle` | `FADE` | `INSTANT`, `FADE`, `SLIDE`, `FLICKER` | Transition used when a contextual meter leaves. `INSTANT` disables the transition; `ALWAYS` visibility prevents disappearance entirely. |
| `holdTicks` | `60` | `0` to `1200` | How long a contextual meter remains fully visible after a value or definition change. |
| `fadeTicks` | `10` | `0` to `200` | Duration of the selected exit transition after the hold time. |
| `showValues` | `true` | `true`, `false` | Shows the current and maximum values beside meters. |

`NOT_AT_REST` keeps a meter visible while its value differs from the resource's authored `start` value. Otherwise it uses the same contextual hold and exit transition. The ability wheel temporarily keeps meters visible regardless of this choice.

`SLIDE` fades while moving toward the nearest top or bottom edge. `FLICKER` disappears in increasingly sparse flashes. Reduce Motion turns either of those into a plain fade. The settings screen repeats the selected exit treatment in its live preview.

The settings screen uses a practical `-256` to `256` range for the offset sliders. The wider file range is retained for unusual display layouts.

Datapack authors control a meter's shape, frame, effects, recommended anchor, and eligibility. Players retain final control over placement, scale, labels, and whether eligible meters are shown. See [Resource HUD](/roots/resource-hud/).

### Accessibility

```toml
[accessibility]
```

| Setting                    | Default | Values          | Description |
| -------------------------- | ------: | --------------- | ----------- |
| `reduceMotion`             | `false` | `true`, `false` | Reduces non-essential motion across Townstead UI, including dialogue text effects, the calendar stamp drawer slide, and similar effects. Emotion colours still apply. |
| `disableParticles`         | `false` | `true`, `false` | Disables screen-space and world-space particles during dialogue. |
| `disableCameraMovement`    | `false` | `true`, `false` | Prevents the camera from rotating to face the villager during dialogue. |
| `spiritColorblindPatterns` | `false` | `true`, `false` | Adds distinct hatching patterns to Spirit page bars so they can be told apart without colour. |
| `spiritNarration`          | `false` | `true`, `false` | Announces the hovered spirit row through the narrator. |
| `spiritLargerHitTargets`   | `false` | `true`, `false` | Grows Spirit page row heights and bar thickness for easier clicking on touch or low-precision setups. |
| `spiritHighContrast`       | `false` | `true`, `false` | Uses stronger borders and pure black/white text on the Spirit page. |
| `spiritFontScale`          | `1.0`   | `1.0` to `2.0`  | Text scale multiplier for the Spirit page. Respects Minecraft's overall GUI scale. |

## Full Setting Index

Use this list when you already know the setting name and just need to find its section.

| Setting                               | Config Category |
| ------------------------------------- | ----------- |
| `enableVillagerHunger`                | `[needs.hunger]` |
| `enableSelfInventoryEating`           | `[needs.hunger]` |
| `enableGroundItemSourcing`            | `[needs.hunger]` |
| `enableContainerSourcing`             | `[needs.hunger]` |
| `enableCropSourcing`                  | `[needs.hunger]` |
| `preferServedFood`                    | `[needs.hunger]` |
| `enableChorusFruitTeleport`           | `[needs.hunger]` |
| `enableEmptyContainerDropoff`         | `[needs.hunger]` |
| `enableVillagerThirst`                | `[needs.thirst]` |
| `enableSelfInventoryDrinking`         | `[needs.thirst]` |
| `enableGroundItemThirstSourcing`      | `[needs.thirst]` |
| `enableContainerThirstSourcing`       | `[needs.thirst]` |
| `enableCropThirstSourcing`            | `[needs.thirst]` |
| `thirstLethalFallback`                | `[needs.thirst]` |
| `enableVillagerTemperature`           | `[needs.temperature]` |
| `preferredBackend`                    | `[needs.temperature]` |
| `enabled`                             | `[conversations]` |
| `idleStartChance`                     | `[conversations]` |
| `mode`                                | `[cannibalism]` |
| `produce`                             | `[cannibalism]` |
| `enableCookWaterPurification`         | `[needs.thirst]` |
| `preferKitchenStorageForEmptyBottles` | `[needs.thirst]` |
| `preferredBackend`                    | `[needs.thirst]` |
| `enableVillagerFatigue`               | `[needs.fatigue]` |
| `enableFatigueAlerts`                 | `[needs.fatigue]` |
| `fatigueNocturnalMultiplier`          | `[needs.fatigue]` |
| `fatigueMisalignedMultiplier`         | `[needs.fatigue]` |
| `enableWorkFeedback`                  | `[feedback]` |
| `enableRepeatedWorkRequests`          | `[feedback]` |
| `minimumRequestIntervalTicks`         | `[feedback]` |
| `enableFarmAssist`                    | `[farming]` |
| `farmerFarmRadius`                    | `[farming]` |
| `farmerCellCooldownTicks`             | `[farming]` |
| `farmerPathfailMaxRetries`            | `[farming]` |
| `farmerIdleBackoffTicks`              | `[farming]` |
| `enableFarmerWaterPlacement`          | `[farming]` |
| `farmerWaterSourceSearchRadius`       | `[farming]` |
| `farmerWaterSourceVerticalRadius`     | `[farming]` |
| `farmerGroomRadius`                   | `[farming]` |
| `farmerGroomScanIntervalTicks`        | `[farming]` |
| `fishermanWaterSearchRadius`          | `[fishing]` |
| `fishermanInventoryFullThreshold`     | `[fishing]` |
| `allowLethalWork`                     | `[professionWork]` |
| `lethalWorkCooldownTicks`             | `[professionWork]` |
| `processTrophyOutputs`                | `[professionWork]` |
| `enableFeedingYoung`                  | `[caregiving]` |
| `enableHydratingYoung`                | `[caregiving]` |
| `enableNonParentCaregivers`           | `[caregiving]` |
| `enableWorkSupplyAutomation`          | `[storage]` |
| `enableHarvestOutputStorage`          | `[storage]` |
| `respectProtectedStorage`             | `[storage]` |
| `protectedStorageBlocks`              | `[storage]` |
| `protectedStorageTags`                | `[storage]` |
| `blockedRoots`                        | `[roots]` |
| `blockedSpecies`                      | `[roots]` |
| `blockedAncestries`                   | `[roots]` |
| `blockedLineages`                     | `[roots]` |
| `profile`                             | `[calendar]` |
| `realClockCalendar`                   | `[calendar]` |
| `agingScale`                          | `[calendar]` |
| `disableVillagerAging`                | `[calendar]` |
| `randomizeStart`                      | `[calendar]` |
| `startYearMin`                        | `[calendar]` |
| `startYearMax`                        | `[calendar]` |
| `enableTownsteadCook`                 | `[chefsdelight_compat]` |
| `debugVillagerAI`                     | `[debug]` |
| `debugVillagerSleep`                  | `[debug]` |
| `muteMoodVocalizations`               | `[mood_audio]` |
| `useTownsteadCatalog`                 | `[catalog]` |
| `anchor`                              | `[resource_hud]` |
| `offsetX`                             | `[resource_hud]` |
| `offsetY`                             | `[resource_hud]` |
| `scale`                               | `[resource_hud]` |
| `stack`                               | `[resource_hud]` |
| `visibility`                          | `[resource_hud]` |
| `exitStyle`                           | `[resource_hud]` |
| `holdTicks`                           | `[resource_hud]` |
| `fadeTicks`                           | `[resource_hud]` |
| `showValues`                          | `[resource_hud]` |
| `reduceMotion`                        | `[accessibility]` |
| `disableParticles`                    | `[accessibility]` |
| `disableCameraMovement`               | `[accessibility]` |
| `spiritColorblindPatterns`            | `[accessibility]` |
| `spiritNarration`                     | `[accessibility]` |
| `spiritLargerHitTargets`              | `[accessibility]` |
| `spiritHighContrast`                  | `[accessibility]` |
| `spiritFontScale`                     | `[accessibility]` |
