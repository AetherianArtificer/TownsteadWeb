---
title: Overview
description: What Pheno is, where Townstead uses it, and how to read the Pheno reference.
---

Pheno is Townstead's shared behaviour language, a bit like the cause and effect engine. It describes conditions, actions, selectors, values, capabilities, and runtime context that other Townstead systems can embed.

## What Pheno Provides

| Area | Purpose |
| --- | --- |
| [Conditions](/pheno/conditions/) | Decide whether something is true in the current context. |
| [Actions](/pheno/actions/) | Do something in the world, to an entity, to an item, or at a block position. |
| [Selectors](/pheno/selectors-values/#selectors--values) | Choose entities or blocks for actions and conditions. |
| [Values](/pheno/selectors-values/#values) | Provide numbers from runtime context. |
| [Structure](/pheno/structure/) | How typed nodes, domains, context, wrappers, authoring rules, and validation fit together. |
| [Context](/pheno/context/) | How Pheno decides the current actor, target, origin, block, item, holder, or cause. |
| [Diagnostics](/pheno/diagnostics/) | Report unknown types, malformed fields, and generated reference data for pack authors. |

Start with the [examples](/pheno/examples/) page if you want to see conditions, actions, selectors, and values working together before reading the reference tables.

## Where It Appears

Pheno is embedded inside other data formats. The outer file owns the `schema` field and selects the authoring rules for its nested Pheno blocks.

For example, a gene can use a Pheno action:

```json
{
  "schema": "townstead:gene/v2",
  "type": "pheno:active_ability",
  "cooldown": "10s",
  "do": {
    "type": "pheno:heal",
    "amount": 4
  }
}
```

A reaction can use a Pheno condition:

```json
{
  "schema": "townstead:reaction/v2",
  "when": {
    "type": "pheno:environment",
    "weather": "clear"
  }
}
```

Nested Pheno objects do not declare their own schema.
