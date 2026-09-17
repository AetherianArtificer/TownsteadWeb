---
title: Energy
description: How villagers get tired, sleep, and recover.
---

Energy is shown as a bar from 100% down to 0%. Underneath, Townstead tracks fatigue from 0 to 20: fatigue rises with activity and falls with sleep. A villager with 0 fatigue has full energy.

## States

| State | Energy | Effect |
| --- | ---: | --- |
| Energized | 85% to 100% | Small mood boost |
| Alert | 65% to 80% | None |
| Tired | 45% to 60% | Mood drains, speed -10% |
| Drowsy | 5% to 40% | Mood drains faster, speed -20%, stops production work, heads for bed |
| Exhausted | 0% | Large mood drain, speed -30%, collapses on the spot |

Babies do not get tired.

## How Fatigue Builds

Fatigue ticks up in steps through the day. Work is the fastest way to tire out, socialising is about half as tiring, and idling barely registers. Fighting doubles the rate.

A full day's work leaves a villager tired by evening, and a long one leaves them drowsy, which is why the schedule matters.

## Recovery

Sleep is the main way to recover:

- **Bed, during the villager's sleep window:** full recovery in about eight in-game hours.
- **Bed, outside the window:** about half the rate. A villager forced to sleep at the wrong time needs most of a day to recover.
- **Resting without a bed:** almost nothing.
- **A lounger or a beach towel:** a little. Some [hangout](/guides/hangouts/) furniture lets villagers rest while they socialise.

## Collapse

A villager who hits 0% energy while awake collapses. They stop moving, puff smoke, and tell anyone nearby what happened. They get back on their feet after a short rest, and say so, but they are not fit for work until they have recovered a little further. The whole episode takes a couple of minutes. While drowsy or collapsed a villager will drink any energy item they are carrying.

The chat lines can be turned off with `enableFatigueAlerts`.

## Emergency Rest

When energy drops to 20% or below, Townstead overrides the shift and sends the villager to bed whatever the schedule says. A villager already asleep when their Work shift starts keeps sleeping only if they are that badly worn out.

## Chronotypes

Each villager has a chronotype, a gene that sets when they naturally sleep:

| Chronotype | Sleeps roughly | How common |
| --- | --- | ---: |
| Standard | 11 PM to 7 AM | 55% |
| Early Bird | 9 PM to 5 AM | 20% |
| Night Owl | 1 AM to 9 AM | 20% |
| Nocturnal | 7 AM to 3 PM | 5% |

Villagers roll their chronotype at birth and inherit it like any other gene.

That table is the human mix. The chronotype is a gene carried by the villager's ancestry, and a [root](/guides/roots/) can carry a different one: different odds for the same four chronotypes, or entirely new chronotypes with their own sleeping hours. A root pack can make a whole people nocturnal, or give them a short sleep in the middle of the day. Whatever the root defines, the shift schedule shows the resulting sleep window on the villager's row, and the same recovery and fatigue rules apply to it.

Sleeping in bed during that window is what earns the fast recovery rate. Working during the villager's natural waking hours also builds fatigue about 25% slower, and working through their sleep window builds it 25% faster. Both multipliers are in the [configuration](/reference/configuration/#fatigue).

On the [shift schedule](/guides/shift-schedule/) a soft band on each villager's row marks their sleep window. Schedule **Rest** over the band and **Work** outside it to keep them aligned.

## Coffee And Energy Items

Items in the `townstead:energy_restoring` tag, such as Rustic Delight coffees, restore 25% energy on the spot. Data packs can add any drink to the tag. Items that restore energy show a small bolt in their tooltip. A Beverage Artisan running a cafe keeps a drowsy shift going.
