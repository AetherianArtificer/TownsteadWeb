---
title: Chef's Delight
description: How Chef's Delight professions join the Cook Career
---

Townstead treats cooking as one Career. Chef's Delight adds another way to describe its workers,
but it does not add sibling Careers to Townstead's Career record.

When Chef's Delight is installed:

- `chefsdelight:cook` is a root alias for `townstead:cook`.
- `chefsdelight:chef` means `townstead:cook` on the **Chef** Path.
- The Chef Path, its Skills, and its completion title become available to Cooks.

Without Chef's Delight, neither mapping loads and the Chef Path is absent. A supported kitchen
provider can still make the ordinary Cook Career available.

These mappings live in a separate Profession compatibility contribution rather than the Cook
definition. This keeps Cook independent of any one kitchen mod and leaves room for other cooking
integrations to contribute their own identities without replacing Cook or Chef's Delight's mapping.
Compatibility files can expand as an integration gains more identity-level requirements; Cook's
Paths, Skills, work, and trades remain in their ordinary Career documents.

## Acquisition and profession identity

Townstead's kitchen-building rules are the ordinary way to employ a Cook. Chef's Delight keeps
ownership of its cooking-pot and skillet POIs. If its own rules assign one of its professions,
Townstead reads that registry identity through the mappings above; it does not need a second Cook
Career or a borrowed POI declaration.

This distinction preserves both sides of the integration. Career XP, Skills, feedback, work, and
Townstead trades use the canonical Cook identity. Chef's Delight can still recognise the raw
profession that it assigned, retain its native POI, and keep its existing offers.

Townstead's profession picker and Just Enough Professions consolidate these identities while the
Townstead Cook handler is enabled. They show Cook rather than advertising Cook and Chef as three
unrelated jobs. Disabling that handler leaves Chef's Delight's native profession presentation and
POI limits in charge.

## Authoring against Chef's Delight

Data that names `chefsdelight:cook` applies to every Cook. Data that names
`chefsdelight:chef` is Path-specific and applies only to a Cook on the Chef Path. This distinction
is honoured by Pheno profession conditions and path-aware building workforce checks.

For example:

```json
{
  "type": "pheno:profession",
  "profession": "chefsdelight:chef"
}
```

This matches a Chef's Delight Chef and a `townstead:cook` who has entered the Chef Path. It does
not match an unspecialised Cook.
