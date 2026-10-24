---
title: Models From Other Mods
description: Use the models, animations, and textures of another installed mod in a rig, without copying them.
---

A rig can use the models, animations, and textures of another installed mod. Townstead reads these files from the other mod when the game runs. Your pack names the files by ID, and does not include a copy.

Do not copy the files of another mod into your pack. Refer to them by ID. Then your pack contains only your own data, and the other mod keeps its own art.

## How Townstead Finds a File

A rig names each file by an ID, such as `othermod:geo/creature.geo.json`. Townstead looks for the file in this order:

1. A file in a data pack at `data/<namespace>/<path>`. Townstead sends these files to each client.
2. A file in the client assets at `assets/<namespace>/<path>`. These are the assets of installed mods and resource packs.

| ID | In a data pack | In client assets |
| --- | --- | --- |
| `othermod:geo/creature.geo.json` | `data/othermod/geo/creature.geo.json` | `assets/othermod/geo/creature.geo.json` |
| `othermod:bbmodel/creature.bbmodel` | `data/othermod/bbmodel/creature.bbmodel` | `assets/othermod/bbmodel/creature.bbmodel` |
| `othermod:animations/creature.animation.json` | `data/othermod/animations/creature.animation.json` | `assets/othermod/animations/creature.animation.json` |
| `othermod:textures/entity/creature.png` | `data/othermod/textures/entity/creature.png` | `assets/othermod/textures/entity/creature.png` |

So when your pack does not have the file, Townstead uses the file that the other mod has in its jar. Townstead converts a `.bbmodel` file to geometry, from a data pack or from client assets.

To find the IDs, open the jar of the other mod as a ZIP file, and look in its `assets/` folder.

## Install the Other Mod Everywhere

The rig loads on the server, and the model draws on each client. Install the other mod on the server and on every client.

Gate your files on the other mod with `mods`, so that they load only when it is installed. Put the gate on the rig, and on the species, ancestry, lineage, and root files that use it. See [Pack Compatibility](/reference/compatibility/#gates).

```json
{
  "schema": "townstead:rig/v1",
  "mods": "othermod",
  "model": { "type": "geometry", "file": "othermod:geo/creature.geo.json" }
}
```

## Geometry Models

Many mods keep their models as Bedrock geometry (`.geo.json`) or as Blockbench projects (`.bbmodel`). Use a `geometry` model for these:

```json
{
  "schema": "townstead:rig/v1",
  "mods": "othermod",
  "model": {
    "type": "geometry",
    "file": "othermod:geo/creature.geo.json"
  },
  "texture": "othermod:textures/entity/creature.png",
  "bones": {
    "head": "head",
    "body": "body",
    "right_arm": "right_arm",
    "left_arm": "left_arm",
    "right_leg": "right_leg",
    "left_leg": "left_leg"
  },
  "animation": {
    "file": "othermod:animations/creature.animation.json",
    "clips": [
      { "state": "sleeping", "clip": "sleep" },
      { "state": "moving", "clip": "walk" },
      { "clip": "idle" }
    ]
  },
  "hold": {
    "mainhand": { "bone": "right_arm", "offset": [0, 2, -1] }
  },
  "hair": false
}
```

- `bones` maps Townstead's animation channels to the bone names in the model. Open the model in Blockbench to see the bone names. See [Bones](/roots/rigs/model/#bones).
- A geometry model has no animation of its own. Use the `animation` block to play the keyframe clips of the other mod. See [Animation](/roots/rigs/model/#animation).
- A geometry model can have nested bones. Held items, the face, boots, and wearables follow the full chain of parent bones.
- A geometry arm has no item pose. When the villager holds an item, Townstead raises the arm of the grip a little.

## Entity Layer Models

Some mods register their models as entity model layers, in the same way as vanilla. Use an `entity_layer` model, and give the model class of the other mod in `class`:

```json
{
  "schema": "townstead:rig/v1",
  "mods": "othermod",
  "model": {
    "type": "entity_layer",
    "layer": "othermod:creature#main",
    "class": "com.example.othermod.client.model.CreatureModel"
  },
  "texture": "othermod:textures/entity/creature.png"
}
```

With `class`, the model animates with the walk and head movement of the other mod. See [Model Class](/roots/rigs/model/#model-class).

## Textures

Point the rig at the texture of the other mod, as in the examples. Do not copy it.

Do not use a vanilla entity texture, such as `minecraft:textures/entity/spider/spider.png`. Many resource packs replace vanilla entity textures with a different size and layout, and the rig then draws with holes. For a vanilla model, put your own texture in `data/<namespace>/textures/`, and name it as `<namespace>:textures/...`. No resource pack can replace a texture in your namespace.

A vanilla model layer, such as `minecraft:spider#main`, is safe to use. Resource packs do not replace model layers.

## Outfits From Other Models

An outfit can add bones from a second model of the other mod, such as a hat from a farmer version of the creature. See [Outfits](/roots/rigs/gear/#outfits).

```json
"outfits": {
  "farmer": {
    "when": { "type": "pheno:profession", "profession": "minecraft:farmer" },
    "pieces": [ { "model": "othermod:geo/creature_farmer.geo.json", "bones": ["straw_hat"] } ]
  }
}
```

## Troubleshooting

Townstead logs a warning when it cannot use a file:

| Log line | Cause |
| --- | --- |
| `Rig asset ... was not found in the data pack or client assets` | The ID is wrong, or the other mod is not installed on this client. |
| `Rig geometry ... could not be parsed` | The file is not valid geometry JSON. |
| `Rig model class ... could not be built` | The class name is wrong, or the class has no constructor that takes one `ModelPart`. |
| `Rig model class ... is not an entity model` | The class is not a model class. |
| `Rig model ... cannot animate this entity; drawing it at rest` | The model of the other mod works only with its own entity. Townstead draws the model at rest. Clips and poses still apply. |

To see which clip each body plays, set `debugLogging` in the server config. The log then shows a `[RigClips]` line each time a body changes clip.
