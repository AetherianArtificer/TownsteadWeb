---
title: Mixed Cultures & Drift
description: How each villager carries a mix of cultures, and how that mix changes every day.
---

Each villager with a culture has a **mix**: a share of each culture and subculture they carry. The shares add up to 100%. A new villager has one culture at 100%. Over time, the people around them move the mix.

The culture with the largest share is the villager's culture. Players see the top culture of it. When another culture becomes the largest, the villager's culture changes.

## What the Mix Changes

| Part | How the mix applies |
| --- | --- |
| Culture | The culture with the largest share. Context facts in conversations use its top culture. |
| Conversation voice | For each line, Townstead picks one culture from the mix, by share. See [Voices & Cultures](/conversations/voices/#which-voices-a-villager-uses). |
| Clothing | Every culture in the mix adds its clothing preferences, weighted by share. See [Clothing](/cultures/clothing/#mixed-cultures). |

Names do not change. A villager keeps the name they were given.

## Daily Drift

Once a day, Townstead moves each loaded villager's mix toward a target. The target combines three sources:

| Source | Adult weight | Child weight |
| --- | --- | --- |
| [Home](#home): the villager's home village | 65% | 35% |
| [Close people](#close-people): partner and close friends | 35% | 15% |
| Parents: the average mix of the villager's parents | none | 50% |

When a source is missing, the other sources share its weight. A villager with no home village, no close people and no parents with a culture does not drift.

### Speed

| Villager | Speed |
| --- | --- |
| Adult | Moves about two thirds of the way to the target in three years. |
| Child | Moves four times as fast as an adult. |

The years are the world's calendar years. A share below 2% drops out of the mix.

A villager who was not loaded catches up when they next load in a village, for up to 365 missed days.

### Home

The home pull starts from the combined mix of every loaded resident of the village. Then, for each top culture in the village, half of its share moves to the subcultures that suit the village:

- subcultures whose `spirit` the village fits;
- subcultures whose `forms` include the village's founding profile.

When no subculture of a culture suits the village, the culture's share stays as it is. See [Subcultures](/cultures/subcultures/#drift-between-subcultures).

### Close People

Close people are the villager's partner, and every villager whose affection the villager holds at 40 or more. Townstead uses the average mix of the close people who are loaded.

## Examples

- A fisherfolk villager moves to a village of hillfolk. Over about three years, most of their mix becomes hillfolk. Their culture changes when the hillfolk share passes the fisherfolk share.
- A child of a fisherfolk parent and a hillfolk parent starts with one parent's culture. In a few seasons, their mix moves toward the average of both parents and the village.
- A farming town of a culture builds docks and markets. Its people drift from the farming subculture toward the merchant subculture. Players still see the same culture.

## Check a Mix

`/townstead culture villager` shows the mix of the villager you look at, and the last day it drifted. `/townstead culture village` shows what the village you are in pulls toward. See [Testing & Commands](/cultures/testing/).
