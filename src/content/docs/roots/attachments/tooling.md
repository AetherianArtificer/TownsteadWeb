---
title: Tooling & Commands
description: The attachment doctor, live adjustment commands, gene granting, and the authoring loop
---

Attachments ship with their own authoring toolkit under `/townstead attachment`, plus a gene-granting command for fast iteration. All of these require operator permission.

## The Doctor

```text
/townstead attachment doctor
```

Runs every health check and prints located problems. It validates, among other things:

- Genes pointing at attachment definitions that do not exist, and definitions no gene grants.
- Morph, visibility, pose, physics, and animation bones missing from the geometry, checked against the union of the base and every stage-swapped model.
- Unknown pose or animation state names and unparseable conditions.
- Morph and visibility channel names no granting gene rolls.
- Texture dimensions that disagree with the geometry's declared UV space.
- Targets that resolve to no attachment point, and unknown `hides_under` slots.
- Physics parameters outside their ranges and invalid segmentation setups.
- A `tint` block combined with the anonymous size shorthand, and gene-tinted definitions whose granting gene declares no tint.

A shorter self-check pass also runs at every reload and prints to the server log, so a broken pack is a located error rather than a silently missing part.

## Live Adjustment

```text
/townstead attachment adjust <id> offset <x> <y> <z>
/townstead attachment adjust <id> rotation <x> <y> <z>
/townstead attachment adjust <id> scale <s>
/townstead attachment adjust <id> bone <name>
/townstead attachment adjust <id> physics <chain|all> <param> <value>
```

`adjust` edits the loaded definition and re-broadcasts it, so placement and physics feel update on every rendered bearer instantly, with no redeploy. Changes last until the next reload. The physics form covers every spring parameter, including `response_vertical`, `response_forward`, `response_lateral`, and `response_turn`; `chain` is an index or `all`.

The rebroadcast definition also applies to bearers and points rendered after the command. Adjustments exist only in server memory and disappear on `/reload` or server restart unless saved with `dump` and pasted into the pack.

```text
/townstead attachment dump <id>
```

`dump` prints the definition as file-ready JSON with the live adjustments folded in. Click the message to copy it, then paste it back into the pack file.

```text
/townstead attachment dump-geo <id>
```

`dump-geo` writes the definition's live geometry blob to `townstead-dump/<id>.geo.json` on the server: the exact bytes clients render. For a `.geo.json` source that is a copy of the file; for a `.bbmodel` source it is the converted output, which makes it the ground truth when a Blockbench import looks wrong.

## Granting Genes For Testing

```text
/townstead gene grant <villager> "<ns>:<gene>"
/townstead gene revoke <villager> "<ns>:<gene>"
```

`grant` puts any registered gene on a live villager: homozygous, with a fresh variant, size, and colour roll, expressed and rendering the same frame, inheriting like a natural roll. No root wiring is needed, which makes it the fastest way to see an attachment on a real body.

## The Authoring Loop

The intended iteration cycle, end to end:

1. Export geometry and texture from Blockbench into the pack, write a minimal definition and gene.
2. `/reload`, then `/townstead attachment doctor` to catch reference mistakes.
3. `/townstead gene grant` the gene onto a nearby villager.
4. Nudge placement and physics live with `adjust` while watching the villager.
5. `/townstead attachment dump` and paste the result back into the file.
6. `/reload` to confirm the file now matches what you tuned.

Because blobs are content-addressed and cached, every pack-only change is picked up by connected clients on `/reload` with no rejoin and no resource pack.

## Reload, Sync, And Cache Lifecycle

`/reload` re-reads every definition, point, referenced geometry, texture, emissive mask, and animation, then replaces the loaded server registry wholesale. It therefore discards every live `adjust` value. After loading, Townstead broadcasts a fresh manifest to all connected players; no reconnect is required.

Clients replace their definition and point maps, reset pose, animation, and physics instance state, and request blobs they do not possess. Changed asset bytes have a new SHA-1 and are fetched automatically. Live adjustments do not change blob hashes because they alter definition placement or physics values rather than asset bytes, but their manifest broadcast still affects existing and future instances immediately.

Received blobs persist at `<game directory>/townstead/attachment-cache/<sha1>` and already materialized blobs remain reusable in memory. Identical bytes therefore reuse one cached geometry, texture, or animation across definitions, reloads, and sessions. A changed file becomes a new hash rather than overwriting the old cache entry; unused entries are harmless and may be deleted while the game is stopped if storage cleanup is needed.
