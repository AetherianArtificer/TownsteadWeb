---
title: Commands
description: Reference for Townstead commands.
sidebar:
  order: 2
---

Townstead commands begin with `/townstead`. Commands marked **Operator** require permission level 2. Other commands are available to players, subject to normal server command permissions.

## Calendar

| Command | Access | Description |
| --- | --- | --- |
| `/townstead calendar get` | Player | Shows the active calendar profile, current date, season, world-day counter, and epoch offset. |
| `/townstead calendar set-year <year>` | Operator | Changes the displayed calendar year without changing the underlying day counters. |
| `/townstead calendar set-profile <id>` | Operator | Overrides the calendar profile for the world. Use `auto` to clear the override and return to automatic profile selection. |
| `/townstead calendar set-day <worldDay>` | Operator | Sets the world-day counter and updates the displayed date. |
| `/townstead calendar set-date <year> <month> <day>` | Operator | Sets the displayed date using the active calendar profile while preserving villager ages. |
| `/townstead calendar match-today` | Operator | Synchronises the calendar date with the current real-world date. |
| `/townstead calendar time-mode` | Player | Shows the effective calendar time mode and whether it comes from the config or a world override. |
| `/townstead calendar time-mode normal` | Operator | Uses normal Minecraft time progression for this world. |
| `/townstead calendar time-mode real_clock` | Operator | Uses real-clock calendar progression for this world. |
| `/townstead calendar time-mode default` | Operator | Clears the world override and returns to the configured default. |

## Emotes

An emote target must be a player or an MCA villager. When no target is supplied, the command applies to the player running it.

| Command | Description |
| --- | --- |
| `/townstead emote play <id>` | Plays an emote on yourself. |
| `/townstead emote play <id> <target>` | Plays an emote on the selected player or MCA villager. |
| `/townstead emote stop` | Stops your active emote. |
| `/townstead emote stop <target>` | Stops the selected player or MCA villager's active emote. |

Emote IDs are resource locations, such as `townstead:wave`.

## Reactions

These commands are primarily intended for testing reaction data.

| Command | Description |
| --- | --- |
| `/townstead reaction list` | Lists all loaded reactions, including their binding and trigger counts. |
| `/townstead reaction play <id>` | Attempts to play a reaction on the MCA villager you are looking at, or the nearest MCA villager within 16 blocks. |
| `/townstead reaction play <id> <target>` | Attempts to play a reaction on a selected MCA villager. |

A reaction may still decline to play because of its cooldown, chance, or available candidates.

## Memory Diagnostics

All memory commands are **Operator** commands intended for server administration and troubleshooting.

| Command | Description |
| --- | --- |
| `/townstead memory report` | Reports village, building, saved-data, cache, and AI-budget statistics. |
| `/townstead memory profile start` | Clears existing profiler data and starts collecting samples. |
| `/townstead memory profile stop` | Stops collecting profiler samples. |
| `/townstead memory profile reset` | Clears all collected profiler counters. |
| `/townstead memory profile report` | Shows profiler status and up to 12 timing rows. |
| `/townstead memory migrate-now` | Immediately scans villages and migrates or compacts legacy synthetic building data. |
| `/townstead memory purge-caches` | Clears Townstead's runtime caches. They will be rebuilt as needed. |
