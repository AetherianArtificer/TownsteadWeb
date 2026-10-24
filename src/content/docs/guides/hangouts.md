---
title: Hangouts
description: Where villagers go to socialise, what they do there, and how to build a venue.
---

When a villager's schedule says **Meet**, they go out. They pick a venue in their village, reserve a seat, walk over, sit down, and spend a while eating, drinking, and talking with whoever else is there. Visits last a few minutes and each villager leaves on their own, so a busy tavern has people coming and going all evening.

Villagers form friendships at hangouts, and a cook or bartender assigned to the venue serves the visitors.

## Venues

A venue is a recognised MCA building with somewhere to sit. With Townstead alone, the venue is the MCA **Inn**. Supported mods add more. These are some examples:

| Venue | Building | Requires |
| --- | --- | --- |
| Tavern | MCA Inn | Nothing |
| Brew Hall | Brewery brew hall | Brewery |
| Taproom | Brewin' and Chewin' taproom | Brewin' and Chewin' |
| Tavern | Kaleidoscope Tavern tavern | Kaleidoscope Tavern |
| Winery tasting room | Vinery winery, level 2 and up | Vinery |
| Restaurant | Candlelight restaurant | Candlelight and Farm & Charm |
| Tea House | Herbal Brews tea house | Herbal Brews |
| Cocktail Bar and Beach Club | Beachparty cocktail bar and beach club | Beachparty |

Each venue holds six to ten visitors. See [Catalog](/guides/catalog/) for how buildings are recognised.

## Seats

Villagers need a free seat to visit at all. These count:

- Wooden stairs of every wood type. Stone stairs do not count.
- Chairs, seats, and benches from any mod that puts them in the common `chairs`, `seats`, or `benches` tags.
- Bar stools from Kaleidoscope Tavern and Beachparty.
- Candlelight chairs and sofas.
- Beachparty beach chairs and palm chairs.
- Beachparty beach towels and sun loungers. Villagers lie down on these and recover a little [energy](/guides/needs/energy/) while they relax.
- Vanilla carpets, used as tea mats, when Herbal Brews is installed.

One villager per seat. A chair made of two blocks is still one seat.

## Who Goes Where

Personality decides which venue a villager prefers. Friendly and playful villagers lean toward lively, social places. Gloomy and sensitive villagers lean toward quiet, cosy ones. Flirty and greedy villagers lean toward refined ones. Nobody is locked out of anywhere. Married couples strongly prefer to sit together, and friends prefer each other's company.

Guards and archers stay on duty and never visit.

Venues have rules. Rounds of drinks are for adults only. A villager who is already drunk is refused another and told so. Children can still sit in a beach bar and listen to the radio.

## What Happens There

Once a few visitors are seated, Townstead starts **beats**: short social moments among the people present.

- **Conversation.** Two to four visitors talk. Nearby players see their lines in chat, and the villagers gesture as they speak. See [Conversations & Dialogue](/guides/conversations/).
- **A round.** Two to five adults order a drink. The bartender serves it and everyone raises a glass.
- **Supper.** When someone at the table is hungry or thirsty, the server brings drinks and then food. Children get the meal but not the ale.
- **Tastings, tea, coffee breaks, dinners, and radio listening**, depending on the venue and its mod.

A villager whose needs are low eats and drinks while they are there. Visits are also where villagers build and repair [relationships](/guides/relationships/).

## Staff And Service

Serving needs staff. A bartender is a Beverage Artisan on the bartender path, a barista is one on the barista path, and a server is a bartender or a [cook](/guides/cooking/). The worker must be assigned to that building, and staff never sit down as customers at their own workplace.

Food and drink come from the building's serving plates and its amenities, such as a kitchen sink or a keg. Keep the plates full and the stock up and the beats run without gaps. When a course cannot be served, the cause is one of: no server on shift, nothing on the plates, or the patron declining.

Staff fill the order from the building's stock and the patron drinks or eats where they sit. The worker does not carry the glass across the room.

## Setting One Up

1. Build a recognised venue. An MCA Inn is the easiest start.
2. Put in seats. A few wooden stairs around a table will do.
3. Add serving plates and stock them, or a cook and bartender with storage to draw from. See [Serving Food](/guides/cooking/#serving-food) and [Orders](/guides/orders/).
4. Give villagers a **Meet** block on the [shift schedule](/guides/shift-schedule/). The default schedule already has one.
5. Add a fireplace for a warm room. See [Temperature](/guides/needs/temperature/).

Then wait for evening and watch who turns up.

## When Nobody Comes

The usual reasons are no Meet time on the schedule, no recognised building, no free seats, seats a villager cannot walk to, or a venue that is closed to them. With `debugLogging` on, the server log reports each beat that ends and each drink served under a `[Hangouts]` tag.

Visits are not saved. After a server restart, villagers go home and come back at the next Meet.

## For Pack Authors

Venues, seats, beats, and policies are all data. See [Hangouts data](/packs/hangouts/).
