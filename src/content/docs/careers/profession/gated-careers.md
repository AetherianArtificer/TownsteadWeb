---
title: Gated Careers And Registration
description: Acquisition routes, registry timing, and what each runtime surface needs.
---

A career is either practised or gated. This page describes the gate, when a pack can register a new villager profession, and what a pack must supply for each part of the game.

## Practised And Gated Careers

- A **practised** career is open to everyone. A character takes it up and learns it by doing the work.
- A **gated** career must be earned first. The character must meet its `requirements`, and then gain it through one of its `acquisition_routes`.

To make a career gated, give it at least one acquisition route. A career with no `acquisition_routes` is practised.

```json
{
  "requirements": {
    "type": "pheno:and",
    "conditions": [
      {
        "type": "pheno:career_xp",
        "career": "minecraft:farmer",
        "at_least": 120
      },
      {
        "type": "pheno:chronicle_count",
        "key": "townstead_beekeeping:beehive_harvest",
        "at_least": 20
      }
    ]
  },
  "acquisition_routes": [
    "self_discovery",
    "mentor",
    "institution"
  ]
}
```

- Townstead decides from `requirements` only. The requirement lines on the Career record are hints that Townstead makes from the condition.
- If the `requirements` condition is malformed, Townstead rejects the whole profession definition. A broken gate never passes.
- Townstead checks `self_discovery` after successful work. A custom mentor or institution interaction must start the acquisition route itself.

For the condition language, see [Pheno Conditions](/pheno/conditions/).

### Registry Timing

At startup, Townstead reads the profession definitions in installed mods and in recognised Career packs. CurseForge installs a Data Pack in the `datapacks/` directory of the profile. Townstead recognises a Career pack by its Townstead Profession file. You can also use the `config/townstead/career-packs/` directory for development and server administration. Both locations accept a pack directory or a ZIP file. Townstead also reads a KubeJS `data/` directory in the same way.

Townstead reads the `work.json` next to each definition before the registries freeze. Then it can register the profession ID, and a POI for the declared job blocks. It also mounts each recognised Career pack as required server data and client resources. Townstead does not load other packs in the `datapacks/` directory of the profile. Minecraft or your data-pack loader loads them.

A definition that is only in the `datapacks/` directory of a save loads too late to register a new `VillagerProfession`. Install a pack that adds a profession in the profile, and restart Minecraft. You must also restart after you change the registered profession ID, the job blocks, or `work_sound`. For the other Career files, `/reload` is enough.

For a dedicated server, install the same Career pack on the server and on each client when the pack adds a profession. The profession and POI entries must be the same on both sides before a client joins. The server cannot add them to a running client with a resource pack.

At startup, Townstead reads only Townstead profession schemas. By default, Townstead registers a gated Career. A practised Career must set `register_profession` to `true` to register. Either kind can set it to `false` to not register. Townstead checks `mods` before it registers the profession, and reads `work_sound` when it makes the profession.

### Complete Runtime Support

A Career definition and a Minecraft villager profession are related, but they are different things in the game. Check each part that the pack must support:

| Part of the game | Data required | When it loads |
| --- | --- | --- |
| Career record and player progression | `profession.json`, `progression.json`, Skills, and completed work that gives Career XP | A world data pack is enough. |
| New villager profession ID | `register_profession: true` and a valid POI declaration in `work.json` | Install the Data Pack in the profile through CurseForge, or put it in the `datapacks/` directory of the profile. Then restart. Townstead registers the profession before the registry freezes. |
| Villager work | A registered profession, a POI that villagers can reach, a Profession task, and a matching Job or work engine in code | Villager AI. A player who does the same block-interaction Job by hand also earns the Career XP. See [Player Work](/careers/work/history/#player-work). |
| Villager trades | Root contributions and optional Path contributions in `trade/` | Merchant levels are Minecraft levels 1 to 5. They do not depend on Career ranks or Path levels. |
| Dialogue for blocked work | `feedback.json`, files in `feedback/`, and a language file in `data/<namespace>/lang/` | Townstead chooses the voice from the villager's personality and Root. |
| Career and dialogue text | `data/<namespace>/lang/<locale>.json` | Townstead uses these strings in its own screens and dialogue. |
| Profession name in Townstead and other viewers | `entity.<namespace>.villager.<path>` and `entity.minecraft.villager.<namespace>.<path>` in `assets/<namespace>/lang/<locale>.json` | Townstead mounts the client assets of a global Career pack. Viewers such as JEP use the second form, which they make from the full registry ID. A language file in `data/` does not add these client keys. |
| Pack name | `townstead.pack.<namespace>` in `assets/<namespace>/lang/<locale>.json` | Optional. A name that players see, such as `Your Studio Careers`. Townstead shows it when it groups content by namespace, and gives it to supported viewers such as Jade. The name applies to all resources in that namespace. It is not a Jade setting or a Profession ID. |
| Profession clothing | An optional `clothing` list, MCA clothing catalogues, and client textures | The list chooses from the installed clothing. The clothing catalogue sets the gender and the outfit weights. |
| Chronicle work totals | Job and task IDs, which Townstead counts automatically, and optional `chronicle_work_history` estimates | Do not declare counters in the Profession. |
| Chronicle stories and headlines | Chronicle event templates that refer to the counted work | Townstead does not make story events from totals alone. |

`work_sound` is optional. In a definition that Townstead reads at startup, it is the work sound of the registered villager profession. Without it, the profession has no work sound of its own. The Career data still loads.

For example, a Beekeeper pack can define the Career, Paths, Skills, feedback, offers, a job-block POI, and a new profession ID. Install that pack as a Data Pack in the profile. Then the profession selector and registry viewers such as JEP can find the new profession. A block-interaction Job lets villagers harvest a hive. A player who harvests a full hive with the same item gets the same Beekeeper XP.
