---
title: Catalog
description: Browse every building the village can recognise, see what each one needs, and pin one while you build it.
---

The Catalog is the list of every building type your village can recognise, laid out as a map of what leads to what. Townstead replaces MCA's own catalog page with it, so you reach it the same way: open the MCA Blueprint and choose **Catalog**.

## Reading The Map

Each building type is a node with an item for an icon. Buildings that come in tiers, such as the five kitchens, sit in a row joined by lines, so you can see the ladder from Hearth Kitchen to Grand Kitchen at a glance. Related buildings cluster under a heading: Core for MCA's own buildings, Integrations for the ones other mods add, and named groups such as Kitchens, Bakeries, Docks, Livestock Pens, and Wool Sheds.

Buildings your village already has are drawn in a different colour, so you can see at a glance what is built and what is not.

Drag to pan and scroll to zoom, or use the zoom buttons. Click a node to select it.

## The Details Panel

Selecting a node fills the panel on the right:

- **Name, tier, and source.** The tier as a numeral for tiered buildings, and the mod the building comes from.
- **Description.** What the building is for, when the type provides one.
- **Community Spirit.** Coloured chips showing how many points of each spirit the building adds. Hover a chip for the spirit's name. See [Community Spirit](/guides/community-spirit/).
- **Needs.** Every block the building requires, with the quantity. Long lists page. A requirement that accepts several blocks, such as "any storage", cycles through the installed options so you can see what qualifies; hover it to read the current one.

## Pinning A Building

Press **Pin** on a building you are about to build. A small checklist appears in the upper right of your screen while you play:

- **Room** lists each requirement as placed against needed, counted inside the room you are standing in. Before the room is recognised, it counts matching blocks near you instead and says so.
- **Held** shows how many of each required block you are carrying.

You have one pin at a time. When the room is recognised as that building, a message confirms it and the pin clears. Press **Unpin** to drop it early.

## When Mods Replace A Building

Some mods bring a better version of a building MCA already has. Let's Do: Bakery's bread stand, bake sale, and bakery replace MCA's plain bakery, for example. When that mod is installed, the replaced building leaves the catalog, and a room that would only have matched the old type is not recognised as it either. Nothing in the village is lost. The mod's own buildings fill the same role.

The same rule applies when a room matches more than one building type and MCA asks you to choose. Replaced types are not offered.

## Turning It Off

`useTownsteadCatalog` in the client configuration switches back to MCA's original catalog page. Townstead's buildings still exist and are still recognised. Only the browser changes. See the [configuration reference](/reference/configuration/#catalog).

Pack authors set a building's icon or hide it from the catalog through the [extended-building sidecar](/packs/buildings/#catalog). Groups, their headings, and which buildings they replace are separate catalog-group files.
