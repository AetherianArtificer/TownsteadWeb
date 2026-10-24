---
title: Your First Story
description: Make a villager story with a quest, test it in game, then turn it into a Persona.
---

This page makes a small story for farmers, with one quest, and then turns it into a Persona. It takes a few minutes. You need a data pack in a world with Townstead, and a text editor. The [Inky](https://github.com/inkle/inky/releases) editor helps, but it is not required.

## 1. Make the Folder

In your data pack, make this folder:

```text
data/examplepack/story/granary/
```

The folder name is the story ID: `examplepack:granary`.

## 2. Say Who Tells It

Make `story.json` in the folder:

```json
{
  "schema": "townstead:story/v1",
  "attach": { "profession": "farmer" },
  "goals": {
    "granary": {
      "text": "Build a granary in {teller}'s village",
      "condition": { "type": "pheno:village", "has_building": "granary" }
    }
  }
}
```

- `attach` makes every farmer tell this story.
- `goals` names a goal for the quest. `{teller}` shows the farmer's name in the Quest Ledger.

## 3. Write the Story

Make `story.ink` in the same folder:

```text
=== greet ===
Another good harvest, and nowhere to put it.
+ [Can I help?]
    -> granary -> DONE
+ [Goodbye.]
    Mind the rows on your way out.
    -> DONE

=== granary ===
# quest: Somewhere to keep the grain
# about: The farmers need a granary to store the harvest.
# goal: granary
If we had a granary, none of this would go to waste.
->->

= waiting
Still piling sacks by the door. A granary would fix that.
-> DONE

= done
A granary! The sacks are off the floor at last.
-> DONE
```

- Every story needs a `greet` knot. Each conversation starts at this knot.
- The `granary` knot is a quest, because it has a `# quest:` tag. The quest starts the first time the story enters the knot.
- `= waiting` plays when the player talks to the farmer while the quest is open.
- `= done` plays once the goal is met. Then the quest is complete.

## 4. Test It

1. Run `/reload`.
2. Run `/townstead story errors`. It must say `No problems.` If it lists a problem, it names the file and the line.
3. Talk to a farmer. Pick the story's entry in the dialogue screen, then **Can I help?**
4. Open the Quest Ledger. The quest shows with its goal.
5. Build a granary, and talk to the farmer again.

To play the story again from the start, run `/townstead story reset examplepack:granary`.

## 5. Turn It into a Persona

A Persona is one person, not every farmer. Move the files to a Persona folder:

```text
data/examplepack/persona/granary_keeper/
  persona.json
  story.ink
```

Rename `story.json` to `persona.json`, and replace `attach` with who the Persona is and when they arrive:

```json
{
  "name": "Granary Keeper",
  "villager": { "profession": "farmer" },
  "arrives": [
    {
      "text": "Live in a village with a farm",
      "condition": { "type": "pheno:village", "has_building": "farm" }
    }
  ],
  "goals": {
    "granary": {
      "text": "Build a granary in {teller}'s village",
      "condition": { "type": "pheno:village", "has_building": "granary" }
    }
  }
}
```

`name` is what commands and the log call the Persona. The villager still gets a name of their own.

Run `/reload`, then stand in a village with a farm. Within a few seconds, the Granary Keeper walks in from the edge of the village toward you. To skip the wait, run `/townstead persona spawn examplepack:granary_keeper`.

## Next Steps

- [Writing in Ink](/stories/ink/): what Townstead adds to Ink, with the helpers and variables you can use.
- [Personas](/stories/persona-files/): names, rolls, gifts and more.
- [Quests, Goals & Rewards](/stories/quests/): every goal shape, and how to pay rewards.
