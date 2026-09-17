---
title: Gated Careers And Registration
description: Acquisition routes, registry timing, and what each runtime surface needs.
---

A career is practised or gated depending on one field. This page covers the gate, when a new villager profession can be registered, and what each runtime surface needs from a pack.

## Practised And Gated Careers

The presence of acquisition routes is the classification rule.

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

- No routes means that the career is practised and can be taken up directly.
- One or more routes means that the career is gated and must be acquired.
- `requirements` is the authority. The requirement lines on the Career record are display hints extracted from the condition.
- A malformed `requirements` condition refuses the complete profession definition. A broken gate never becomes an always-true gate.
- `self_discovery` is checked after successful work. A custom mentor or institution interaction must call the acquisition route itself.

Use [Pheno Conditions](/pheno/conditions/) for the condition language.

### Registry Timing

Townstead scans profession definitions in installed mods and recognised Career packs during registry startup. A CurseForge Data Pack installation goes into the profile's `datapacks/` directory; Townstead identifies it by its Townstead Profession document. The manual `config/townstead/career-packs/` directory remains available for development and server administration. Both locations accept an unpacked pack directory or a ZIP file. A loose KubeJS `data/` directory is scanned in the same way.

Townstead reads adjacent `work.json` before the registries freeze, so it can register the profession ID and a POI for declared job blocks. It also mounts each recognised Career pack as required server data and client resources. Unrelated packs in the profile-level `datapacks/` directory remain the responsibility of Minecraft or their chosen data-pack loader.

A definition added only to a save's `datapacks/` directory loads too late to register a new `VillagerProfession`. Install a pack that creates a profession at the profile level, and restart Minecraft. A restart is also required after changing its registered profession ID, job blocks, or `work_sound`; `/reload` remains sufficient for its reloadable Career documents.

For a dedicated server, install the same registry-creating Career pack on the server and each client. Static profession and POI entries must agree before a client joins; the server cannot add them to an already-started client by sending a resource pack.

The startup scanner accepts only Townstead profession schemas. A gated Career registers by default. A practised Career must set `register_profession` to `true`; either kind can set it to `false` to opt out. The scanner also applies `mods` before registration and resolves `work_sound` while constructing the registered profession.

### Complete Runtime Support

A Career definition and a Minecraft villager profession are related, but they are not the same runtime object. Check each surface that the pack intends to support:

| Surface | Data Required | Loading Boundary |
| --- | --- | --- |
| Career record and player progression | `profession.json`, `progression.json`, Skills, and completed work that awards Career XP | A world data pack is sufficient. |
| New villager profession ID | `register_profession: true` and a valid POI declaration in `work.json` | Install the Data Pack for the profile through CurseForge, or put it in profile-level `datapacks/`; then restart. Townstead registers it before the registry freezes. |
| Villager work | A registered profession, a reachable POI, a Profession task, and a matching Job or code-owned work engine | Villager AI. A player who performs the same block-interaction Job by hand also earns the Career XP; see [Work Tasks](/careers/work/history/#player-work). |
| Villager trades | Root and optional Path contributions in `trade/` | Merchant levels are Minecraft levels 1 through 5, independent of Career rank thresholds and Path levels. |
| Blocked-work dialogue | `feedback.json`, files in `feedback/`, and a language file under `data/<namespace>/lang/` | Voice selection uses the villager's actual personality and Root. |
| Career and dialogue wording | `data/<namespace>/lang/<locale>.json` | Townstead supplies these strings to its own server-authored UI and dialogue components. |
| Profession label in Townstead and other viewers | `entity.<namespace>.villager.<path>` and `entity.minecraft.villager.<namespace>.<path>` in `assets/<namespace>/lang/<locale>.json` | Townstead mounts client assets from a global Career pack. The second form covers viewers such as JEP that derive a label from the full registry ID. A language file under `data/` does not add either client translation key. |
| Pack or collection name | `townstead.pack.<namespace>` in `assets/<namespace>/lang/<locale>.json` | Optional player-facing source name, such as `Your Studio Careers`. Townstead uses it when grouping namespaced content and shares it with supported viewers, including Jade. The label applies to all resources in that namespace; it is not a Jade setting or a Profession ID. |
| Profession clothing | Optional `clothing` chain plus MCA-compatible catalogues and client textures | The chain chooses among installed wardrobes; gender and outfit weights belong to the clothing catalogue. |
| Chronicle work totals | Automatic Job/task IDs, plus optional `chronicle_work_history` estimates | No counter declaration belongs in the Profession. |
| Chronicle stories and headlines | Chronicle event templates that refer to the automatic activity | Totals alone do not invent narrative events. |

`work_sound` is optional. When present in a startup-scanned definition, it becomes the registered villager profession's work sound. Omitting it leaves the profession without a dedicated registry work sound; it does not prevent Career data from loading.

For example, a Beekeeper pack can define Career identity, Paths, Skills, feedback, offers, a job-block POI, and a new profession ID. Install that pack as a profile Data Pack so the profession selector and registry-based viewers such as JEP can discover the registered profession. A block-interaction Job teaches villagers to harvest a hive, and a player who harvests a full hive with the same item earns the same Beekeeper XP.
