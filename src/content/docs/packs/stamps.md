---
title: Stamps
description: Complete reference and walkthrough for custom Townstead stamp resource packs.
---

Stamp packs add artwork that players can place on Townstead's calendar. They are standard Minecraft resource packs: Townstead discovers PNG files in a designated texture folder and adds them to the stamp drawer automatically.

Stamp packs do not define calendar profiles or need to be installed on the server. Each player installs the resource pack on their own client.

## Quick Start

This example adds three stamps.

### Folder Structure

```text
example_stamps/
├── pack.mcmeta
└── assets/
    └── example/
        └── textures/
            └── stamps/
                ├── creeper.png
                ├── reminder.png
                └── golden_pickaxe.png
```

The folder immediately below `assets` is your namespace. Use a unique, lowercase namespace for your project:

```text
assets/example/textures/stamps/creeper.png
       ───────                         ↓
       namespace          example:textures/stamps/creeper.png
```

Townstead scans every installed resource-pack namespace for PNG files under `textures/stamps`.

### pack.mcmeta

Create `pack.mcmeta` in the root of the resource pack:

```json
{
  "pack": {
    "description": "Example Townstead Stamps",
    "pack_format": 15,
    "supported_formats": [15, 34]
  }
}
```

This example covers Townstead's supported Minecraft versions:

| Minecraft version | Resource-pack format |
| --- | ---: |
| 1.20.1 | `15` |
| 1.21.1 | `34` |

`pack_format` is Minecraft metadata, not a Townstead setting. The `supported_formats` range allows one resource pack to be used across both versions. Minecraft may still warn that a pack was made for another version; the stamp texture layout itself is compatible.

### Stamp Images

Add each stamp as a PNG under:

```text
assets/<namespace>/textures/stamps/
```

Townstead displays stamps at 16 by 16 pixels. A 16 by 16 source image gives the sharpest pixel-art result, but larger square images can be used and will be scaled down. Transparent backgrounds are supported and recommended.

Texture file names must follow Minecraft resource-location rules:

- Use lowercase letters, numbers, underscores, hyphens, periods, and forward slashes.
- Do not use spaces or uppercase letters.
- Keep each file name unique within its namespace.

Subfolders are supported:

```text
assets/example/textures/stamps/mobs/creeper.png
assets/example/textures/stamps/tools/golden_pickaxe.png
```

## Display Names

Townstead derives the name shown in the stamp drawer from the file name:

| File name | Display name |
| --- | --- |
| `creeper.png` | Creeper |
| `golden_pickaxe.png` | Golden Pickaxe |
| `reminder.png` | Reminder |

Directories and namespaces are not included in the display name. Choose descriptive file names so players can distinguish the stamps easily.

Stamp display names are generated directly from file names and cannot currently be translated or overridden with a language file.

## Installing the Pack

1. Place the resource-pack folder or ZIP file in the client's `resourcepacks` folder.
2. Open **Options → Resource Packs**.
3. Enable the stamp pack.
4. Open or reopen Townstead's calendar.

Townstead refreshes the stamp catalogue when resources reload. If the calendar was already open while enabling the pack, close and reopen it.

## Using Stamps

Open the calendar and select the **Stamps** drawer. From there, a player can:

- Choose stamp artwork and place it on a day
- Add or edit a caption
- Drag an existing stamp to another day or position
- Change a stamp between private and public
- Replace its artwork
- Delete it

Private stamps are visible only to the player who placed them. Public stamps are visible to everyone on the server.

## Multiplayer and Missing Packs

The server stores a placed stamp's texture ID, caption, date, position, visibility, owner, and the name of the resource pack that supplied its artwork. The image itself is not sent by the server.

Every player who should see the artwork must install a resource pack containing the same texture ID. For example:

```text
example:textures/stamps/creeper.png
```

If another player does not have that texture, the stamp remains present and interactive, but Townstead displays a missing-art placeholder. Its tooltip identifies the source pack when that information is available.

Resource packs may replace a stamp by providing a texture with the same namespace and path. As with other Minecraft resources, the highest-priority enabled pack wins.

## Complete Example

```text
complete_example_stamps/
├── pack.mcmeta
└── assets/
    └── complete_example/
        └── textures/
            └── stamps/
                ├── appointment.png
                ├── birthday.png
                ├── festival.png
                └── harvest.png
```

`pack.mcmeta`:

```json
{
  "pack": {
    "description": "Complete Example Townstead Stamps",
    "pack_format": 15,
    "supported_formats": [15, 34]
  }
}
```

The resulting texture IDs are:

```text
complete_example:textures/stamps/appointment.png
complete_example:textures/stamps/birthday.png
complete_example:textures/stamps/festival.png
complete_example:textures/stamps/harvest.png
```

## Troubleshooting

### The pack does not appear in Resource Packs

Check that `pack.mcmeta` is valid JSON and sits at the root of the folder or ZIP file. It must not be inside an extra enclosing folder.

### The stamp drawer says no packs are installed

Check that the images are PNG files under exactly:

```text
assets/<namespace>/textures/stamps/
```

Then reload resources or restart the client.

### A stamp has a missing-art placeholder

The enabled resource packs do not contain the texture ID stored with that stamp. Enable the original pack or add a texture with the same namespace and path.

### A stamp looks blurry or distorted

Use a square image designed to remain readable at 16 by 16 pixels. Fine details and non-square source images do not scale well at the calendar's display size.
