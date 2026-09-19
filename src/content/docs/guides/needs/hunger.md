---
title: Hunger
description: How villagers get hungry, what they eat, and where they look for it.
---

Hunger runs from 0 to 100. New villagers start at 80. Points drain with time and activity, and come back when the villager eats. Hunger never kills a villager. It changes their mood, their speed, and what they do next.

## States

| State | Hunger | Effect |
| --- | ---: | --- |
| Well-Fed | 80 to 100 | Small mood boost |
| Adequate | 50 to 79 | None |
| Hungry | 25 to 49 | Mood drains, villager goes looking for food |
| Famished | 1 to 24 | Mood drains faster, movement speed -25% |
| Starving | 0 | Large mood drain, still slowed. The moment recorded in the Chronicle. |

Babies are never slowed by hunger.

## How Hunger Drains

Every meal leaves a reserve behind it, the same way saturation works for players. Richer food leaves a larger reserve. Drain eats the reserve first, and the hunger meter only starts to fall once the reserve is gone. That is why a villager who ate a good meal can stay at the same number for a long time and then start dropping.

Two things eat away at it:

- **Time.** Roughly once a Minecraft hour a villager loses a point. This pauses while they are on their Rest shift, so nobody wakes up starving.
- **Activity.** Working, walking, patrolling, and fighting each add exhaustion, and every so often that exhaustion costs a point. Fighting is the most expensive, then chores, then patrols. Simply being awake costs a little.

A drowsy or exhausted villager burns through food 25% faster. Rested villagers eat less. See [Energy](/guides/needs/energy/).

## What They Eat

Villagers eat anything that is food, scaled up so a meal actually matters: a food's nutrition is multiplied by 3.5. Bread restores about 17 points, a cooked steak about 28. Better food goes further, and it also leaves the larger reserve described above.

They refuse food that would hurt them. Anything whose food definition carries a harmful effect is skipped: rotten flesh, pufferfish, spider eyes, raw chicken, poisonous potatoes, and any modded food with the same kind of effect. Helpful effects are applied as normal, so a golden apple does what it does for a player. Chorus fruit works, and teleports them, unless you turn that off.

Meat from people is off the menu unless you enable it. See [Cannibalism](/reference/configuration/#cannibalism).

## When They Eat

A villager goes looking for food once hunger drops to 50, and treats it as an emergency at 25. When they sit down to eat they keep going until they reach 90, so one trip to the pantry covers most of a day. If they are also thirsty they drink in the same sitting.

During Rest hours they will only drink, not eat, and they never eat while asleep.

## Where They Look

A hungry villager checks sources in this order:

1. **Their own inventory.** Villagers carry a few spare rations when they can.
2. **Served food, dropped items, and containers** within 48 blocks of where they are. A dish on a [serving plate](/guides/cooking/#serving-food), a pizza set out on a table, chests, barrels, and any modded storage that works like a chest all count. Villagers take the most nourishing option, and the nearest one when there is a tie. Served food gets a bonus in that comparison, so a laid table beats bread in a chest, while a stew in the pantry still beats a plated apple. From a container they take up to four spare rations for later; from a plate they eat one serving on the spot.
3. **Served food elsewhere in the village**, when nothing within reach will do.
4. **Ripe crops** as a last resort. This is off by default, because it lets a hungry village strip your farm.

Every source has a toggle in the [configuration](/reference/configuration/#hunger). Turning off `preferServedFood` moves plates behind chests and dropped items, so villagers only eat from a table when the pantry is out of reach.

If you want to keep a chest for yourself, mark it as protected storage. See [Storage](/reference/configuration/#storage). Two villagers never go for the same item: each claims its target before walking.

## Bowls, Bottles, And Buckets

After a stew or a milk bucket the villager is left holding the empty. They return it to the container the food came from when they next pass it, otherwise to the nearest kitchen storage or any storage once the origin has been out of reach for too long, and only keep carrying it if there is nowhere to put it. Drop-off is never a dedicated trip, and it waits until the villager is not on their Work shift so tools are not taken mid-task.

## Starvation

Starving villagers do not die. They are slowed, unhappy, and the moment they hit zero enters the Chronicle as a survival event, so it appears in the village's history.

With the cannibalism setting at its trait tier or above, a villager who slides into starvation has a very small chance of coming out of it changed, and that too is recorded. At the default setting this never happens.

## Keeping Them Fed

The simplest setup is a stocked chest near where villagers live. A [farmer](/guides/farming/) refills it once the farm is producing. A [cook](/guides/cooking/) makes meals from the harvest, and a meal restores far more per item than raw food and leaves a larger reserve. For a village of other jobs, keep a farmer nearby or hand out food yourself. Put serving plates in the room where people gather so the cook can leave meals where they will be eaten. See [Serving Food](/guides/cooking/#serving-food).

Children cannot fetch their own food. Nearby adults bring it to them. See [Villager Needs](/guides/needs/#caring-for-young).
