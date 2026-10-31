---
title: Writing in Ink
description: The Ink language, the tools to write it, and what Townstead adds to Ink for stories.
---

Stories are written in **Ink**, a scripting language for interactive dialogue made by [inkle](https://www.inklestudios.com/ink/). Ink is plain text: you write the lines, mark the choices, and Ink keeps track of where the player is.

## Learn Ink

| Resource | What it is |
| --- | --- |
| [Writing with Ink](https://github.com/inkle/ink/blob/master/Documentation/WritingWithInk.md) | The official guide to the language. Start here. |
| [Inky](https://github.com/inkle/inky/releases) | inkle's free editor. It shows your story as you write it, and lets you play it. |
| [ink on GitHub](https://github.com/inkle/ink) | The language, its documentation and its issues. |
| [blade-ink](https://github.com/bladecoder/blade-ink) | The Java version of the Ink runtime that Townstead uses. |

Most stories use only a few parts of Ink:

| Ink | Used for |
| --- | --- |
| Knots (`=== name ===`) and stitches (`= name`) | Scenes and their parts. A quest is a knot. |
| Choices (`+ [Reply]`) | The player's replies. |
| Diverts (`-> knot`) and tunnels (`-> knot ->` and `->->`) | Moving between scenes. |
| `VAR` and conditions (`{met: ...}`) | Remembering what happened. |
| Functions (`=== function name() ===`) | Lines that Townstead asks for, such as the menu entry. |
| Alternatives (`{~a\|b\|c}`) | Variety in repeated lines. |
| Tags (`# who: ...`) | Information for Townstead, such as who says a line. |

## How Townstead Reads Your Files

- Townstead compiles every `.ink` file in the story folder, and in its subfolders, as one story. You do not need `INCLUDE` lines.
- `story.ink` comes first, then the other files in name order.
- A file that another file includes with `INCLUDE` is not added a second time.
- A file named like `meeting.fr_fr.ink` is skipped. These names are kept for translations. For now, a story has one language.
- Every story needs a `greet` knot. A conversation starts there.

## Where a Conversation Starts

When the player picks the story in the dialogue screen, Townstead starts at the first of these that applies:

1. A quest that is ready to hand back: its `= done` stitch, or `= skipped`. See [Quests](/stories/quests/).
2. The `greet` knot, when your [`scene_ready()`](#functions-your-story-can-have) function returns `true`.
3. An open quest that has a `= waiting` stitch.
4. The `greet` knot.

Step 2 lets a scene play while a quest is open. Without `scene_ready()`, the waiting lines of an open quest play at every talk until the quest is done.

When the player leaves a conversation in the middle, the next talk picks up where they left off. See [`resumed()`](#functions-your-story-can-have).

## Tags

| Tag | Where | Effect |
| --- | --- | --- |
| `# who: <role>` | On a line | Another villager says the line. See [Scenes & Cast](/stories/scenes/#the-cast). |
| `# emote: <name>` | On a line | The speaker plays a reaction, such as `# emote: wave`. A bare name looks for `townstead:reaction_<name>`, then `townstead:<name>`. See [Reactions](/reactions/). |
| `# advance` | On a choice | Marks the choice that moves the story or quest on. The dialogue screen shows it differently. |
| `# quest:`, `# about:`, `# goal:`, `# reward:`, `# skip if:`, `# label:` | On a knot | Make the knot a quest. See [Quests, Goals & Rewards](/stories/quests/#quest-tags). |
| `# overheard: once` | On a knot | The knot plays in chat when the player walks past. See [Overheard Scenes](/stories/scenes/#overheard-scenes). |

## Variables That Townstead Sets

Declare any of these with `VAR` and Townstead fills it in when a conversation opens. A variable you do not declare is not set.

```text
VAR player_name = ""
VAR today = 0
```

| Variable | Value |
| --- | --- |
| `player_name` | The player's name. |
| `villager_name` | The name of the villager telling the story. |
| `village_name` | The name of the teller's village. |
| `profession` | The teller's profession, without its namespace, such as `farmer`. |
| `today` | The world day number. |
| `quest_ready` | `true` when a quest is ready to hand back. |
| `quest_open` | `true` when a quest is open. |
| `interrupted` | `true` when the last conversation ended in the middle. |
| `chance` | A new number from 1 to 100 each time a conversation opens. |

For a Persona, Townstead also sets:

| Variable | Value |
| --- | --- |
| `given_name`, `family_name` | The names the Persona rolled. See [Names](/stories/persona-files/#names). |
| Each extra name | By its key in `names.extra`. |
| Each roll | By the roll's name, such as `hometown`. See [Rolls](/stories/persona-files/#rolls). |
| Each roll's `vars` | By their names, from the option that was rolled. |

:::tip[Use `chance` for randomness]
Townstead saves the Ink state between conversations. Ink's `RANDOM()` can then give the same result each time. Use `chance` when a choice must be random each time.
:::

## Helper Functions

Townstead gives every story these functions. You do not need to declare them.

### Reading the World

| Function | Returns |
| --- | --- |
| `check("name")` | `true` when a named [condition](/stories/conditions-actions/#conditions) holds, or when a named goal is met. |
| `count("name")` | For an event goal: how many times the event happened since the player met the teller. For a value goal: its current value. |
| `who("role")` | A name. `"player"` is the player, `"me"` is the teller. A named condition gives the first resident it holds for. Otherwise, the role is a profession, and `who` gives a resident of the teller's village with that profession. Empty when nobody fits. |
| `here("role")` | `true` when a villager for the role is near the player. See [The Cast](/stories/scenes/#the-cast). |
| `is("name", "condition")` | `true` when the resident of the teller's village with that name passes a named condition. With `""`, `true` when they still live there. |
| `building("raised")` | The building the player most recently raised in the teller's village. `"upgraded"` for the one they last upgraded, `""` for either. |
| `career_path()` | The career path the teller has learned the most skills in, such as `"tiller"`. Empty before their first path skill. |
| `most_harvested()` | The crop that the teller's village harvested most. |
| `mod("modid")` | `true` when the mod is installed. |
| `can_build("kitchen")` | `true` when this modpack can build the building. A plain name matches every tier from every mod. |

### Personas

| Function | Returns |
| --- | --- |
| `roll("ns:persona", "roll")` | What the world rolled for a Persona, such as `roll("examplepack:keeper", "hometown")`. It rolls now if needed, so one Persona can talk about another before they arrive. |
| `persona_name("ns:persona")` | The name of a Persona in the teller's village, or in any village, as this player knows it. Empty when there is none. |

`who()` and `persona_name()` give the name that this player knows. For a Persona with `"family_name": "told"`, that is the given name until the Persona tells this player. See [Names](/stories/persona-files/#names).

### Relationships

| Function | Effect |
| --- | --- |
| `rel("quality")` | The teller's feeling toward the player in a [relationship quality](/guides/relationships/), from -100 to 100, such as `rel("trust")`. |
| `demeanor()` | One word for how the teller treats the player now. See [Demeanor](/stories/relationships/#demeanor). |
| `trust(5)` | Changes the teller's trust in the player. |
| `contribute("quality", 5, "reason")` | Changes any quality. `reason` is a short label for the change. |
| `memory("id")` | The teller keeps a memory about the player. |

A quality without a namespace means `townstead:`. See [Relationships & Demeanor](/stories/relationships/).

### Actions

| Function | Effect |
| --- | --- |
| `act("name")` | Runs a named [action](/stories/conditions-actions/#actions) from the JSON file. Returns `true` when the action worked, and `false` when it failed or does not exist. |
| `act_on("name", "villager")` | Runs a named action on the resident of the teller's village with that name, with the player as `other`. Returns `false` when nobody of that name lives there. |

Use the result of `act()` when a line must match what happened:

```text
+ [I've brought someone.]
    {act("take_on_recruit"):
        Good. They start tomorrow.
    - else:
        Not this one.
    }
```

When an action fails, the player often sees the reason from the action itself, such as "There is no room in the order."

## Functions Your Story Can Have

Write these as Ink functions. Townstead calls each one when it needs it. Each one returns a line, or `""` for nothing.

| Function | Townstead uses it for |
| --- | --- |
| `menu()` | The story's entry in the dialogue screen. Without it, or when it returns `""`, the entry is the `# label:` of an open quest, else the `# label:` of the `greet` knot. |
| `greeting()` | A line the villager says when the dialogue screen opens. |
| `calling()` | A line that calls the player over. See [Calling the Player](/stories/scenes/#calling-the-player). |
| `farewell()` | What a Persona says when the player asks them to leave town. |
| `resumed()` | A line to pick up a conversation that the player left in the middle, such as "Where were we?" |
| `scene_ready()` | Returns `true` or `false`, not a line. With `true`, the talk starts at `greet` even while a quest is open. See [Where a Conversation Starts](#where-a-conversation-starts). |

```text
=== function menu() ===
{quest_ready:
    ~ return "I think it's done."
}
~ return "Got a minute?"
```

A story that picks its next scene in a function can use that function for `scene_ready()`. In this example, `next_scene()` returns `-> chat` when no scene is ready:

```text
=== function scene_ready() ===
~ temp next = next_scene()
~ return not (next == -> chat)
```

These functions only read. Do not change variables or start quests in them.

## Using Inky

Inky plays one file at a time. To test a whole story in Inky:

1. Make `story.ink` the root. Give it an `INCLUDE` line for each other file.
2. Declare each helper you use with `EXTERNAL`, such as `EXTERNAL check(what)`.
3. Write a fallback for each helper: an ordinary Ink function with the same name, which returns a test value. Inky uses the fallback. Townstead uses its own helper. See [External functions](https://github.com/inkle/ink/blob/master/Documentation/RunningYourInk.md#external-functions) in the Ink documentation.

Townstead accepts a story written this way.

:::caution[Inky and other editors]
Inky keeps its own copy of each open file. If you change a file in another editor while Inky has it open, close and open it again in Inky first. Otherwise Inky can save its old copy over your change.
:::
