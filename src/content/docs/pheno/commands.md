---
title: Commands
description: Operator commands for validating, inspecting, and testing Pheno.
---

All `/pheno` commands require permission level 2. They are intended for pack authoring, diagnostics, and parity checks.

| Command | Description |
| --- | --- |
| `/pheno validate` | Reports Pheno diagnostics from the most recent datapack compile. |
| `/pheno explain <target>` | Shows effective capabilities for a living entity, including applied and ignored contributions. |
| `/pheno expand <gene>` | Prints the normalized form of a loaded gene. Long output is truncated in chat. |
| `/pheno dump` | Writes generated Pheno reference files to the server's `pheno/` directory. |
| `/pheno parity <target>` | Compares legacy gene outputs with capability-layer outputs for a living entity. |
| `/pheno skills <target>` | Under development. Lists learned profession skills on a living entity. |
| `/pheno learn <target> <skill>` | Under development. Teaches a profession skill using the normal skill rules. |
| `/pheno learn <target> <skill> force` | Under development. Teaches a profession skill while bypassing normal skill rules. |
| `/pheno forget <target> <skill>` | Under development. Removes a learned profession skill using the normal skill rules. |
| `/pheno forget <target> <skill> force` | Under development. Removes a learned profession skill while bypassing normal skill rules. |

`<target>` uses Minecraft's normal single-entity selector syntax.
