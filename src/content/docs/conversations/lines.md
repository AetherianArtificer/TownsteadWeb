---
title: Pools & Line Files
description: Pool files and line files, where the text of conversations lives.
---

A **pool** is a named set of parts that fill one kind of slot, such as `weather_remark` or `farewell`. A **line file** adds parts to a pool, with their English text. A **pool file** sets fields that every part in the pool shares, in every voice.

Most packs only need line files. You can add lines to any pool that Townstead ships. See [Built-in Vocabulary](/conversations/vocabulary/#pools) for the list.

## Line Files

```text
data/<namespace>/dialogue_line/<any path>.json
```

The path is yours. Townstead merges all line files for the same pool, from every pack. You can split a pool into several files, such as `weather_remark/rain.json` and `weather_remark/snow.json`.

### Example

```json
{
  "schema": "townstead:dialogue_line/v1",
  "pool": "weather_remark",
  "groups": [
    { "variant": "rain", "stance": "+", "lines": {
        "fields_needed_this": "The fields needed this, at least.",
        "rain_means_mushrooms": "Rain means mushrooms. I love mushrooms.",
        "puddles": { "text": "Puddles!", "stages": "child" }
    }},
    { "variant": "rain", "stance": "-", "lines": {
        "this_rain_wont_quit": "This rain won't quit.",
        "my_boots_will_never_dry": { "text": "My boots will never dry.", "opens": "complaint" },
        "who_ordered_this_rain": { "text": "Who ordered this rain? Not me.", "personalities": ["crabby", "grumpy"] }
    }}
  ]
}
```

### File Fields

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:dialogue_line/v1`. |
| `pool` | Yes | The pool ID. A bare ID such as `weather_remark` means `townstead:weather_remark`. |
| `voice` | No | The [voice](/conversations/voices/) of these parts. The default is `townstead:common`. |
| `lines` | No | A map from line ID to text, or to an object with `text` and [line fields](/conversations/line-fields/). |
| `groups` | No | A list of groups. Each group can have line fields, `lines`, `groups` and `empty`. |
| `empty` | No | Adds an empty part in this voice, with this weight. See [Empty Parts](#empty-parts). |
| Line fields | No | Any [line field](/conversations/line-fields/). It applies to every line in the file. |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

### Line IDs and Keys

A line ID uses lowercase letters, digits and underscores. Townstead builds the full key from the voice, the pool and the ID:

```text
dialogue.<voice namespace>.<voice path>.<pool path>.<id>
```

For example, the line `puddles` above is `dialogue.townstead.common.weather_remark.puddles`. Translations use this key. See [Translations](/conversations/translations/).

- A line ID must be unique in its voice and pool. Townstead reports a duplicate and keeps the first one.
- You can change the English text as much as you like. Keep the ID, so the translations stay attached.
- Change the ID only when the line means something different.

### How Fields Combine

A part takes its fields from, in order:

1. the pool file,
2. the top of the line file,
3. each group around it, from the outside in,
4. the line itself.

A nearer value replaces a farther one, with two exceptions:

- `state` adds up. A nearer `state` adds its keys, and replaces only the keys it names again.
- `requires` adds up. A part must meet every requirement from every level.

`variant` and `variants` are one field in two spellings. A nearer one replaces both.

For example, in this file the line `stay_cosy` has the variant `rain`, the stance `+`, and both requirements:

```json
{
  "schema": "townstead:dialogue_line/v1",
  "pool": "weather_aside",
  "requires": "venue.amenity:seating",
  "groups": [
    { "variant": "rain", "stance": "+", "lines": {
        "stay_cosy": { "text": "Good day to stay in and keep cosy.", "requires": "time:night" }
    }}
  ]
}
```

### Errors

An error in a line file stops the whole file from loading. Townstead reports:

- an unknown field, with its path in the file;
- a line ID with characters other than lowercase letters, digits and underscores;
- a line with no `text`;
- a duplicate line ID;
- a line that does not end a sentence. The text must end with `.`, `!`, `?`, `…`, a closing quote or bracket, or `。`, `！` or `？`.

The last two do not stop the file. They only report the line.

## Pool Files

```text
data/<namespace>/dialogue_pool/<pool>.json
```

The file ID is the pool ID. A pool file sets fields for every part of the pool, in every voice. A pool with no pool file is valid: its parts only have their own fields.

```json
{
  "schema": "townstead:dialogue_pool/v1",
  "act": "react",
  "subjects": "mob",
  "persp": { "who": "me" },
  "responds": "news"
}
```

| Field | Required | Description |
| --- | --- | --- |
| `schema` | Yes | Must be `townstead:dialogue_pool/v1`. |
| Line fields | No | Any [line field](/conversations/line-fields/) except `text`. |
| `empty` | No | The weight of the pool's empty part, from 0 to 100. See [Empty Parts](#empty-parts). |
| `mods` | No | A [mod gate](/conversations/#mod-gates). |

Put the meaning of a pool in its pool file: `act`, `subjects`, `opens`, `responds` and `persp`. Every voice then shares it, and each line file only needs text and the fields that make its lines different.

## Empty Parts

An empty part adds no text. Use it for slots that are optional, such as a lead-in ("Phew.") before a remark.

- An `empty` weight in a pool file adds one empty part that every voice shares.
- An `empty` weight in a line file or group adds an empty part in that file's voice, with the fields around it.

Townstead picks an empty part by weight, like any other part. The higher the weight, the more often the slot stays empty. The last slot of a line is never empty when the rest of the line is empty. A line with no text at all is not spoken.

Some examples from the pools that Townstead ships:

| Pool | `empty` | Effect |
| --- | --- | --- |
| `news_opener` | 5 | "Oh, you'll love this." comes before some news, not all. |
| `need_lead` | 5 | "Can I complain for a second?" comes before some needs. |
| `need_advice` | 2 | "Get something to eat." comes after some sympathy. |
| `mob_coda` | 6 | "Keep a torch lit tonight." comes after some warnings. |
