---
title: Configuration
description: Reference for the Townstead config, both server and client.
---

# Configuration

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
| `enableChorusFruitTeleport`   | `true`  | `true`, `false` | Lets villagers teleport when they eat chorus fruit, just like players do. |
| `enableEmptyContainerDropoff` | `true`  | `true`, `false` | Lets villagers store empty bowls, bottles, and buckets in nearby storage after eating or drinking. Skipped while actively working so tools are not taken mid-task. |

### Thirst

Thirst settings are only applied when a supported thirst mod is installed.

```toml
[needs.thirst]
```

| Setting                               | Default | Values          | Description |
| ------------------------------------- | ------: | --------------- | ----------- |
| `enableVillagerThirst`                | `true`  | `true`, `false` | Enables villager thirst when a thirst backend mod (TWT, LSO) is installed. |
| `enableSelfInventoryDrinking`         | `true`  | `true`, `false` | Allows villagers to drink thirst-restoring items from their own inventory. |
| `enableGroundItemThirstSourcing`      | `true`  | `true`, `false` | Allows villagers to collect thirst-restoring items from ground items. |
| `enableContainerThirstSourcing`       | `true`  | `true`, `false` | Allows villagers to pull thirst-restoring items from containers and item handlers. |
| `enableCropThirstSourcing`            | `false` | `true`, `false` | Allows villagers to harvest mature crops for thirst-restoring food or drink as an emergency fallback. Disabled by default to save crops and help with performance. |
| `thirstLethalFallback`                | `false` | `true`, `false` | Allows dehydration to kill villagers. (NOT CURRENTLY WORKING) |
| `enableCookWaterPurification`         | `true`  | `true`, `false` | Allows cook villagers to purify impure water bottles in available kitchen skillets. |
| `preferKitchenStorageForEmptyBottles` | `true`  | `true`, `false` | When villagers drink from bottles, prefers depositing empty bottles into kitchen storage. |

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

## Work and Professions

### Farming

Farming settings control farm radius, targeting cadence, water placement, grooming, and request messages.

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
| `enableFarmerRequestChat`         | `true`  | `true`, `false`  | Allows farmers to announce missing supplies in local chat. |
| `farmerRequestIntervalTicks`      | `3600`  | `200` to `24000` | Minimum ticks between farmer shortage request messages. |

### Fishing

```toml
[fishing]
```

| Setting                           | Default | Values           | Description |
| --------------------------------- | ------: | ---------------- | ----------- |
| `enableFishermanRequestChat`      | `true`  | `true`, `false`  | Allows fishermen to announce missing rods or water in local chat. |
| `fishermanRequestIntervalTicks`   | `3600`  | `200` to `24000` | Minimum ticks between fisherman shortage request messages. |
| `fishermanWaterSearchRadius`      | `16`    | `4` to `48`      | How many blocks away from the barrel to look for water when fishing. |
| `fishermanInventoryFullThreshold` | `16`    | `1` to `64`      | Number of items the fisherman carries before returning to deposit. |

### Cooking

Cooking settings appear when Farmer's Delight is installed.

```toml
[cooking]
```

| Setting                    | Default | Values           | Description |
| -------------------------- | ------: | ---------------- | ----------- |
| `enableCookRequestChat`    | `true`  | `true`, `false`  | Allows cooks to announce missing kitchen supplies in local chat. |
| `cookRequestIntervalTicks` | `3600`  | `200` to `24000` | Minimum ticks between cook shortage request messages. |

```toml
[cooking.barista]
```

| Setting                       | Default | Values           | Description |
| ----------------------------- | ------: | ---------------- | ----------- |
| `enableBaristaRequestChat`    | `true`  | `true`, `false`  | Allows baristas to announce missing cafe supplies in local chat. |
| `baristaRequestIntervalTicks` | `3600`  | `200` to `24000` | Minimum ticks between barista shortage request messages. |

### Butchery

Butchery settings appear when the [Butchery](https://www.curseforge.com/minecraft/mc-mods/butchery) mod is installed.

```toml
[butchery]
```

| Setting                          | Default | Values           | Description |
| -------------------------------- | ------: | ---------------- | ----------- |
| `enableVillagerSlaughter`        | `true`  | `true`, `false`  | Allows butchers to slaughter allowlisted livestock inside their shop bounds. |
| `allowHumanoidSlaughter`         | `false` | `true`, `false`  | Permits villager-driven slaughter of humanoid carcasses, including villagers, pillagers, and witches. |
| `villagerSlaughterThrottleTicks` | `2400`  | `200` to `24000` | Minimum ticks between kills for a single butcher villager. |
| `includeExoticTrades`            | `false` | `true`, `false`  | Adds a second Master-tier trade pool with exotic cuts. |
| `hammerTrophyHeads`              | `false` | `true`, `false`  | Allows butchers to auto-hammer rare or display-worthy heads into breakdown drops. Off by default so those heads stay whole for trophies and armour. |

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
| `enableChorusFruitTeleport`           | `[needs.hunger]` |
| `enableEmptyContainerDropoff`         | `[needs.hunger]` |
| `enableVillagerThirst`                | `[needs.thirst]` |
| `enableSelfInventoryDrinking`         | `[needs.thirst]` |
| `enableGroundItemThirstSourcing`      | `[needs.thirst]` |
| `enableContainerThirstSourcing`       | `[needs.thirst]` |
| `enableCropThirstSourcing`            | `[needs.thirst]` |
| `thirstLethalFallback`                | `[needs.thirst]` |
| `enableCookWaterPurification`         | `[needs.thirst]` |
| `preferKitchenStorageForEmptyBottles` | `[needs.thirst]` |
| `enableVillagerFatigue`               | `[needs.fatigue]` |
| `enableFatigueAlerts`                 | `[needs.fatigue]` |
| `fatigueNocturnalMultiplier`          | `[needs.fatigue]` |
| `fatigueMisalignedMultiplier`         | `[needs.fatigue]` |
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
| `enableFarmerRequestChat`             | `[farming]` |
| `farmerRequestIntervalTicks`          | `[farming]` |
| `enableFishermanRequestChat`          | `[fishing]` |
| `fishermanRequestIntervalTicks`       | `[fishing]` |
| `fishermanWaterSearchRadius`          | `[fishing]` |
| `fishermanInventoryFullThreshold`     | `[fishing]` |
| `enableCookRequestChat`               | `[cooking]` |
| `cookRequestIntervalTicks`            | `[cooking]` |
| `enableBaristaRequestChat`            | `[cooking.barista]` |
| `baristaRequestIntervalTicks`         | `[cooking.barista]` |
| `enableVillagerSlaughter`             | `[butchery]` |
| `allowHumanoidSlaughter`              | `[butchery]` |
| `villagerSlaughterThrottleTicks`      | `[butchery]` |
| `includeExoticTrades`                 | `[butchery]` |
| `hammerTrophyHeads`                   | `[butchery]` |
| `enableFeedingYoung`                  | `[caregiving]` |
| `enableHydratingYoung`                | `[caregiving]` |
| `enableNonParentCaregivers`           | `[caregiving]` |
| `enableWorkSupplyAutomation`          | `[storage]` |
| `enableHarvestOutputStorage`          | `[storage]` |
| `respectProtectedStorage`             | `[storage]` |
| `protectedStorageBlocks`              | `[storage]` |
| `protectedStorageTags`                | `[storage]` |
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
| `reduceMotion`                        | `[accessibility]` |
| `disableParticles`                    | `[accessibility]` |
| `disableCameraMovement`               | `[accessibility]` |
| `spiritColorblindPatterns`            | `[accessibility]` |
| `spiritNarration`                     | `[accessibility]` |
| `spiritLargerHitTargets`              | `[accessibility]` |
| `spiritHighContrast`                  | `[accessibility]` |
| `spiritFontScale`                     | `[accessibility]` |
