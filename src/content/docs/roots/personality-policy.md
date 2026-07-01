---
title: Personality Policy
description: How species, ancestries, and lineages narrow or expand personality pools.
---

Personality policy controls the personality pool used when a villager receives a root. It lets a species, ancestry, or lineage favour some personalities, remove others, or inherit a broader pool from a less-specific identity layer.

The `personalities` field does not create new personalities by itself. It points to existing MCA personalities or custom personality ids, then gives Townstead the weights and exclusions to use while rolling.

Custom personality files are documented separately in [Personalities](/packs/personalities/).

## Field

```json
{
  "personalities": {
    "inherit": false,
    "allow": {
      "my_pack:watchful": 3,
      "odd": 1
    },
    "deny": ["my_pack:reckless"]
  }
}
```

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| `inherit` | boolean | no | Whether this policy should merge broader policies beneath it. Defaults to `false`. |
| `allow` | object | no | Personality refs mapped to roll weights. Higher weights make that personality more likely. |
| `deny` | array | no | Personality refs removed from the available pool. |

No individual field inside `personalities` is required. A useful policy normally includes `allow`, `deny`, or both; an empty policy has no effect.

Personality refs can be custom personality ids, such as `my_pack:watchful`, or base MCA personality names, such as `odd`.

## Resolution

Townstead starts with the selected root and checks personality policies in this order:

1. Lineage
2. Ancestry
3. Species

The nearest non-empty policy defines the pool. If that policy has `inherit: true`, broader policies are merged underneath it. More-specific weights win when the same personality ref appears more than once, and `deny` removes refs from the final pool.

If no policy applies, Townstead leaves personality selection to vanilla MCA behaviour.
