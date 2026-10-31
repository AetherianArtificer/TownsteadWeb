---
title: Stamps
description: "Add stamp art that players place on the calendar, with a resource pack."
---

Stamps are small pictures that players put on days of the calendar, such as a birthday, a festival, or a reminder. Each player adds stamp art with a resource pack.

A stamp pack is a client resource pack, not a data pack. The server does not need it, and it has no calendar profile.

## Make a Stamp Pack

1. Make this folder:

    ```text
    examplepack_stamps/
    ├── pack.mcmeta
    └── assets/
        └── examplepack/
            └── textures/
                └── stamps/
                    ├── birthday.png
                    ├── harvest_festival.png
                    └── market-day.png
    ```

2. Put this in `pack.mcmeta`:

    ```json
    {
      "pack": {
        "description": "Example Stamps",
        "pack_format": 15,
        "supported_formats": [15, 34]
      }
    }
    ```

    Use `15` for Minecraft 1.20.1 and `34` for 1.21.1. With `supported_formats`, one pack works on both.

3. Put the folder or a ZIP of it in the `resourcepacks` folder of the client. Turn it on in **Options → Resource Packs**.

4. Open the calendar, and open the **Stamps** drawer.

## Stamp Images

Townstead reads every PNG file in `assets/<namespace>/textures/stamps/`, in every enabled resource pack. Subfolders also work, such as `textures/stamps/mobs/creeper.png`.

- Townstead draws stamps at 16 × 16 pixels. A 16 × 16 image looks sharpest. A larger square image is made smaller.
- Use a transparent background.
- Use only lowercase letters, numbers, `_`, `-`, and `.` in file names, as for all Minecraft resources.

The name in the drawer comes from the file name. Townstead changes `_` and `-` to spaces and starts each word with a capital letter, so `harvest_festival.png` is "Harvest Festival" and `market-day.png` is "Market Day". The folders and the namespace are not part of the name. You cannot translate stamp names.

Townstead finds new stamps when the calendar opens. If the calendar was open when you turned on the pack, close it and open it again.

## Using Stamps

In the **Stamps** drawer of the calendar, a player can:

- put a stamp on a day;
- add or change a caption;
- drag a stamp to another day or place;
- make a stamp private or public;
- change the picture of a stamp;
- remove a stamp.

Only the player who placed a private stamp can see it. Every player on the server can see a public stamp.

## Multiplayer

The server saves each stamp: its texture ID, such as `examplepack:textures/stamps/birthday.png`, the caption, the date, the place on the day, who placed it, whether it is public, and the name of the pack it came from. The server does not save or send the picture.

Each player who must see the picture needs a resource pack with the same texture ID. A player without it still sees the stamp and can use it, but sees the first letter of the stamp name in place of the picture. The tooltip shows the name of the pack that the stamp came from.

A resource pack can replace a stamp with a picture at the same namespace and path. The pack higher in the resource pack list is used.

## Troubleshooting

| Problem | Check |
| --- | --- |
| The pack is not in the Resource Packs list | `pack.mcmeta` is valid JSON, and is at the top of the folder or ZIP, not inside another folder. |
| The drawer has no stamps | The images are PNG files in `assets/<namespace>/textures/stamps/`. Then close the calendar and open it again. |
| A stamp shows a letter in place of its picture | No enabled pack has its texture ID. Turn on the pack it came from, or add a picture at the same path. |
| A stamp looks blurry | Use a square image that is clear at 16 × 16 pixels. |
