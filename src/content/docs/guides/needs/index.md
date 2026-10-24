---
title: Villager Needs
description: The four meters every villager tracks, and where to read them.
---

Every villager in Townstead keeps track of how they are doing. A well-fed, rested, comfortable villager works well and stays in a good mood. When a need runs low, they slow down, get grumpy, and go looking for a fix on their own.

Needs never kill a villager. The consequences are mood, movement speed, and behaviour: a hungry villager goes to find food, a tired one heads for bed, a cold one looks for a fire.

## The Four Meters

| Need | Range | Refilled by | Page |
| --- | --- | --- | --- |
| Hunger | 0 to 100 | Eating | [Hunger](/guides/needs/hunger/) |
| Thirst | 0 to 20 | Drinking. Only present when a thirst mod is installed. | [Thirst](/guides/needs/thirst/) |
| Energy | 100% down to 0% | Sleeping in a bed, ideally at the right hours | [Energy](/guides/needs/energy/) |
| Temperature | Body temperature in degrees | Shelter, fires, shade, dry clothes | [Temperature](/guides/needs/temperature/) |

Each need has a healthy band, a neutral band, and warning bands. The best band gives a small mood boost. The warning bands drain mood and, at the bottom, slow the villager down.

## Reading Status

Open a villager's dialogue screen. A column of icons sits next to their portrait: hunger, thirst (if a thirst mod is installed), energy, and temperature. Hover any icon for the exact value and the name of the current state.

Each icon is its own picture, and it changes as the need gets worse:

- **Hunger** and **Energy** have three versions: full while the villager is fine, half once they are hungry or tired, and low once they are famished or drowsy.
- **Thirst** uses the installed thirst mod's own icon, at the level that mod would show for a player.
- **Temperature** uses the installed temperature mod's own gauge when there is one, otherwise Townstead's own icon, one per tier.

The tooltip names the state and colours it: white when fine, gold once the villager will go looking for a fix, and red once they are slowed.

A **Schedule** line at the top of the screen shows what the villager is meant to be doing right now, which helps when someone is asleep at noon or working at midnight. See [Shift Schedule](/guides/shift-schedule/).

The same values appear in the MCA villager editor if you want to set them directly.

## Rest Freezes Passive Drain

While a villager is on their Rest shift, hunger and thirst stop draining passively. They wake up roughly as they went to sleep instead of starving overnight.

## Caring For Young

Babies and children cannot fetch their own food. When a child's hunger drops below 50, or thirst below 12, nearby adults and teens bring them something. Helpers search up to 48 blocks for food or drink and walk it over.

Parents help first. If no parent is within 48 blocks, any other villager can step in unless they are in a crabby mood or have collapsed from exhaustion. Both behaviours can be switched off in the [configuration](/reference/configuration/#caregiving).

## Needs And Roots

A villager's [Root](/guides/roots/) can change or remove a need. A root with no diet never gets hungry, a root that drinks nothing never gets thirsty, and a root that tolerates any climate never feels the cold. Hidden needs disappear from the status icons. Life stages such as an egg can switch off every need until the villager hatches.

## Needs And Conversation

Needs leak into what villagers say. A hungry villager brings it up in idle chat, and a villager who is famished, parched, or exhausted will not stop for a conversation at all. Reactions can also key off need states such as *peckish* or *drowsy*.

## Turning Needs Off

Each need has an enable switch in the server config: `enableVillagerHunger`, `enableVillagerThirst`, `enableVillagerFatigue`, and `enableVillagerTemperature`. Disabling a need removes its decay, its behaviours, its mood effect, and its icon. See the [configuration reference](/reference/configuration/#needs).
