---
title: Personas
description: "The persona.json file: who a Persona is, when they arrive, what they roll, how they take gifts, and when they leave."
---

A Persona is one person with their own story. Townstead rolls who they are once for each world. They arrive in the player's village when their arrival goals are met, and only their own villager tells their story.

## Folder

```text
data/<namespace>/persona/<id>/
  persona.json
  story.ink
  quests.ink
```

The folder name is the Persona ID. `data/examplepack/persona/old_sailor/` is the Persona `examplepack:old_sailor`. Its story has the ID `examplepack:persona/old_sailor`. Commands such as `/townstead story reset` use that ID.

Put any number of `.ink` files in the folder and its subfolders. The story needs a `greet` knot. See [Writing in Ink](/stories/ink/).

## Example

```json
{
  "name": "Old Sailor",
  "arrives": [
    {
      "text": "Live in a village with a dock",
      "condition": { "type": "pheno:village", "has_building": "dock" }
    }
  ],
  "arrival": "walk_in",
  "villager": {
    "profession": "fisherman",
    "personality": { "friendly": 2, "witty": 1 }
  },
  "names": {
    "given": { "female": ["Marit", "Sölvi"], "male": ["Bram", "Oskel"] },
    "family": ["Netley", "Tidewell"]
  },
  "rolls": {
    "home_port": [
      { "value": "north", "vars": { "gift": "minecraft:cod" } },
      { "value": "south", "vars": { "gift": "minecraft:tropical_fish" } }
    ]
  },
  "gifts": [
    { "items": ["$gift"], "response": "loves", "knot": "gift_from_home", "relationship": { "affection": 5 } },
    { "items": ["#minecraft:boats"], "response": "likes", "knot": "gift_boat" }
  ]
}
```

## Fields

`persona.json` accepts every field of [`story.json`](/stories/story-files/#storyjson) except `attach`, and these:

| Field | Description |
| --- | --- |
| `name` | What commands and the log call the Persona. The villager gets a name of their own. See [Names](#names). The default is the folder name. |
| `arrives` | Goals that make the Persona arrive. See [Arrival](#arrival). |
| `arrival` | `walk_in` or `appear`. The default is `walk_in`. |
| `villager` | Who the villager is. See [The Villager](#the-villager). |
| `unique` | `village`: one in each village, so each player's town can have its own. `world`: one in the whole world. The default is `village`. |
| `downed` | `true` when the Persona is [downed](/stories/downed/) instead of dying. The default is `true`. |
| `names` | Name lists that the world rolls from. See [Names](#names). |
| `family_name` | `shown` or `told`. See [Names](#names). The default is `shown`. |
| `rolls` | Things the world rolls once, such as a hometown. See [Rolls](#rolls). |
| `gifts` | How the Persona takes gifts. See [Gifts](#gifts). |
| `mca_menu` | Which MCA interactions show. See [MCA Menu](#mca-menu). |
| `dialogue_theme` | The look of the dialogue screen when this Persona speaks: a dialogue theme ID, or a theme written in place. Without it, the player's own theme. |
| `moves_on` | What makes the Persona leave for another village. See [Moving On](#moving-on). |
| `requires_mods` | Mod IDs. The Persona loads only when all of them are installed. |

## Arrival

`arrives` is a list of goals. When **any one** of them is met, the Persona arrives.

```json
"arrives": [
  { "text": "Raise 3 buildings in a settlement", "value": { "type": "pheno:standing", "source": "deeds" }, "target": 9 },
  { "text": "Earn good standing in a village", "value": { "type": "pheno:standing" }, "target": 20 }
]
```

- Each goal is a condition goal or a value goal. See [Goals](/stories/quests/#goals). An event goal cannot make a Persona arrive.
- Townstead tests the goals on the player, where they stand. `pheno:village` is the village the player stands in.
- An entry can also be the name of a [shared goal](/stories/quests/#shared-goals-and-rewards), such as `"examplepack:good_standing"`.
- Without `arrives`, the Persona only comes with `/townstead persona spawn`, or when another Persona [introduces](/stories/story-tools/#phenointroduce_persona) them.

Every five seconds, for each player who stands in a village, Townstead tests each Persona that:

- does not already live in that village;
- has not met this player anywhere;
- with `"unique": "world"`, does not live anywhere yet and is not on the road.

When a goal is met, the Persona arrives:

| `arrival` | How they come |
| --- | --- |
| `walk_in` | They appear out of the player's sight at the edge of the village, and walk to the player. |
| `appear` | They appear at the centre of the village. |

After that, the Persona treats the player as someone they have met. MCA's first-meeting lines never play for a Persona.

## The Villager

| Field | Description |
| --- | --- |
| `profession` | Their job. A bare name such as `farmer` means `minecraft:farmer`. Nothing can change a pinned profession: not hiring, not joining an order, not the job screen. |
| `root` | Their [Root](/roots/). |
| `gender` | `male` or `female`. |
| `personality` | MCA personalities to roll from. A list gives each one the same weight. An object maps each one to a weight. Personalities that this MCA version does not have are left out. |
| `schedule` | A week plan or shift template ID. |
| `outfit` | Clothing they always wear: an MCA clothing texture ID, or an object with `female`, `male` and `any`. The texture must be listed in an MCA clothing file. A change of job does not change it. |
| `states` | Entity states they arrive with, as a map from state ID to amount. |
| `mainhand` | An item ID they arrive holding. |

Without `villager`, the Persona is an ordinary villager roll.

## Names

```json
"names": {
  "given": { "female": ["Marit", "Neva"], "male": ["Bram", "Corin"] },
  "family": ["Netley", "Tidewell"],
  "extra": { "ship": ["the Gull", "the Second Chance"] }
},
"family_name": "told"
```

| Field | Description |
| --- | --- |
| `given` | Given names by gender: `female`, `male` and `any`. A plain list is for any gender. |
| `family` | Family names. |
| `extra` | Other names that belong to the story, such as the name of a ship. Each key is a list. |

- The world rolls the names once. The same Persona has the same name in every village of that world.
- In Ink, the rolled names are the variables `given_name`, `family_name`, and each `extra` key, such as `ship`.
- Without `names`, the Persona gets an ordinary name.

With `"family_name": "told"`, each player sees the Persona's family name only after the story tells it, with the action [`pheno:share_family_name`](/stories/story-tools/#phenoshare_family_name). Until then, that player sees the given name only.

| Where the name shows | Before the player is told | After |
| --- | --- | --- |
| Nameplate, dialogue screen, inventory title, quest ledger | Given name | Full name |
| Story lines, from `who()` and `persona_name()` | Given name | Full name |
| Lines the teller calls out, and messages to one player | Given name | Full name |
| Text that every player can see: chat messages, death messages, Chronicle entries, the family tree | Given name | Given name |

Text that every player can see always shows the given name, because some players may not know the family name. With MCA Capitals installed, Capitals shows a surname of its own for the Persona.

## Rolls

A roll is a fact about the Persona that Townstead decides once for each world, such as where they come from.

```json
"rolls": {
  "home_port": [
    { "value": "north", "weight": 2, "profession": "fisherman", "vars": { "gift": "minecraft:cod" } },
    { "value": "south", "gender": "female", "outfit": "examplepack:skins/clothing/persona/sailor_south.png" },
    { "value": "inland", "when": { "type": "pheno:mod_loaded", "mod": "examplefarmingmod" } }
  ]
}
```

| Field | Description |
| --- | --- |
| `value` | Required. The rolled value. In Ink, it is the variable with the roll's name, such as `home_port`. |
| `weight` | How likely the option is. The default is 1. |
| `when` | A Pheno condition, tested on the player. The option can only be rolled when it is true. |
| `profession`, `gender`, `outfit` | Replace the values in `villager` when this option is rolled. |
| `vars` | Ink variables that this option sets, such as `gift`. |

- Townstead makes each roll the first time it needs it, and saves the result.
- When an update removes the rolled value from the list, the world rolls again.
- Other stories can read a roll with [`roll()`](/stories/ink/#personas) in Ink, or with the condition [`pheno:persona_roll`](/stories/story-tools/#phenopersona_roll).

## Gifts

`gifts` is a list of rules. Townstead uses the first rule that matches the gift. Any other gift is an ordinary MCA gift.

```json
"gifts": [
  {
    "items": ["$gift"],
    "response": "loves",
    "knot": "gift_loved",
    "relationship": { "affection": 5 },
    "first": { "knot": "gift_from_home", "relationship": { "affection": 10 } }
  },
  { "items": ["minecraft:rotten_flesh"], "response": "dislikes", "knot": "gift_rotten" }
]
```

| Field | Description |
| --- | --- |
| `items` | Required. Item IDs, `#tags`, or `$name` for a roll variable, such as `$gift`. An ID can name a potion, such as `minecraft:potion[potion=minecraft:water]` for a water bottle. |
| `response` | `loves`, `likes` or `dislikes`. The default is `likes`. A disliked gift is handed back. |
| `knot` | The Ink knot that answers the gift. It can read the variable `gift_item`, the gift's name in the player's language. |
| `relationship` | Changes to [relationship qualities](/guides/relationships/), such as `{"affection": 5}`. |
| `satisfaction` | Hearts and mood, as for an MCA gift. The default is 30 for `loves`, 15 for `likes`, and -15 for `dislikes`. |
| `first` | What happens the first time instead: `knot` and `relationship`. With `"per_item": true`, the first time for each kind of item. |

A gift knot that the Ink does not have stops the Persona from loading.

Townstead checks a Persona's `gifts` before any [gift reaction](/packs/gift-reactions/). Gift reactions use the same fields, and they work for every villager.

## MCA Menu

By default, a Persona hides MCA's small talk from the interaction screen, because their own story speaks for them. The hidden answers are `chat`, `joke`, `story`, `hug`, `flirt`, `kiss`, `procreate`, `procreate_engaged`, `apologize`, `rumors`, `rock_paper_scissor` and `adopt`.

| `mca_menu` | Effect |
| --- | --- |
| `"all"` | Show every MCA answer. |
| `{"keep": ["chat"], "hide": ["hire"]}` | Show `keep` again, and also hide `hide`. |

## Leaving Town

A player can ask a Persona to leave, from the **More** page of the interaction screen. The Persona says the line from their story's [`farewell()`](/stories/ink/#functions-your-story-can-have) function, walks out of town, and goes when nobody can see them. They never come back to that town, but they can still arrive in another one. The player's story and bond with them are cleared.

## Moving On

`moves_on` lists what makes a Persona leave for another village on their own:

| Value | When |
| --- | --- |
| `order_dissolved` | The order they belong to is dissolved. |
| `town_fallen` | Their town has fallen. |

The Persona goes on the road as the same villager. They arrive later in another village where their arrival goals are next met.
