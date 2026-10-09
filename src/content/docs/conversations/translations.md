---
title: Translations
description: How to translate conversation lines, choose word forms by gender, and order parts for each language.
---

The English text of a line is in its [line file](/conversations/lines/). Other languages use lang files in the data pack. Townstead translates each line on the server, for each player, in the language that player's game uses.

Townstead ships translations for `de_de`, `fr_fr`, `ru_ru`, `uk_ua` and `zh_cn`.

## Lang Files

```text
data/<namespace>/lang/<locale>.json
```

A lang file maps full line keys to text:

```json
{
  "dialogue.townstead.common.weather_remark.this_rain_wont_quit": "Dieser Regen hört einfach nicht auf.",
  "dialogue.examplepack.fisherfolk.greeting.ahoy": "Ahoi!"
}
```

- The key is `dialogue.<voice namespace>.<voice path>.<pool path>.<id>`. See [Line IDs and Keys](/conversations/lines/#line-ids-and-keys).
- Any namespace works. Townstead reads `lang` from every namespace in every data pack. Townstead keeps its own dialogue translations in `data/townstead_dialogue/lang/`.
- A culture pack ships its own translations. For example, a fisherfolk pack can use `data/examplepack/lang/`.
- When a language has no translation for a line, the player sees the English text.
- A translation for a line that does not exist does nothing.

Because the lang files are in the data pack, they reach every player from the server. The player does not need a resource pack.

## Placeholders

Use the same placeholders as the English line, by name:

```json
"dialogue.townstead.common.claim.who_got_married": "{who} hat geheiratet!"
```

- A translation can leave out a placeholder that the English line has.
- Only print the slots that the English line prints, and `{self}` and `{other}`. A placeholder with a form, such as `{self_demonym/genitive}`, counts as its slot. Townstead checks the English line to know which slots a part needs. Another slot can be missing, and then it prints as nothing.
- `{mob}` and `{a_mob}` can replace each other. Some languages have no article, so they use `{mob}` where English uses `{a_mob}`.

## Word Forms

Many languages change words by the gender of a person. Use a [selector](/conversations/text/#word-forms):

```json
"...i_heard": "{self.gender:f=Я слышала|*=Я слышал}, ты {other.gender:f=вылечилась|*=вылечился}!"
```

- `self.gender`, `other.gender` and the gender of person slots such as `who.gender` are `m`, `f` or `n`. `self_demonym.gender` and `other_demonym.gender` are the gender of that person.
- Always give a `*` form. It is used for `n`, and whenever the value is missing.
- A selector can name any slot, also one that the English line does not use. When the subject has no such slot, Townstead uses the `*` form.
- In Russian and Ukrainian, write each gendered word in full: `{self.gender:f=бачила|*=бачив}`. Do not add an ending to a stem, such as `бачив{self.gender:f=...}`. Many verbs change more than the ending.
- `biome.number` is `singular` or `plural`, for languages that need it.

## Frames

Townstead joins the parts of a line in order, with spaces. A language can change this with frame keys in its lang file:

```json
{
  "townstead.frame.1": "%1$s",
  "townstead.frame.2": "%1$s%2$s",
  "townstead.frame.3": "%1$s%2$s%3$s"
}
```

- `townstead.frame.<n>` is the frame for a line with `n` parts, from 1 to 6. `%1$s` is the first part, `%2$s` the second, and so on.
- Change the order of the positions to put the parts in a different order.
- Leave out spaces for languages that do not use them. Townstead's `zh_cn` translation does this.
- A frame file can set its own `key` for one frame. Townstead then uses that key instead of `townstead.frame.<n>`.
- Without a frame key, Townstead joins the parts with spaces.

## Slot Values

Some slot values have their own translation keys:

| Slot | Key | Example |
| --- | --- | --- |
| `{biome}` | `townstead.biome_phrase.<namespace>.<path>` | `"townstead.biome_phrase.minecraft.plains": "les plaines"` |
| `{mob}` | `townstead.mob_name.<namespace>.<path>` | `"townstead.mob_name.minecraft.zombie": "Zombie"` |
| `{a_mob}` | `townstead.mob_name.<namespace>.<path>.a` | `"townstead.mob_name.minecraft.zombie.a": "ein Zombie"` |

Townstead ships these keys for the vanilla overworld biomes and the vanilla hostile mobs, in every shipped language. A pack that adds biomes or mobs can add its own keys. Without a key, the player sees the English value.

Write the biome phrase in the form your lines use. For example, French lines say "Rien que {biome}", so the French phrase includes the article: "les plaines".

### Demonyms

A [demonym placeholder](/conversations/text/#placeholders) is translated when the culture's `demonym` uses translation keys:

```json
"demonym": {
  "singular": { "translate": "culture.examplepack.fisherfolk.demonym" },
  "plural": { "translate": "culture.examplepack.fisherfolk.demonym.plural" },
  "adjective": { "translate": "culture.examplepack.fisherfolk.demonym.adj" }
}
```

A demonym written as plain text is the same in every language.

`{self_demonym}` and `{other_demonym}` agree with the gender of that person. Townstead first looks for the key with the gender added, then the key itself:

```json
"culture.examplepack.fisherfolk.demonym.f": "Fischerin",
"culture.examplepack.fisherfolk.demonym": "Fischer"
```

### Forms

A language can need a different form of a value, such as a case. Write the form after a slash: `{self_demonym/genitive}` or `{biome/dative}`. Townstead looks for these keys, in order, and uses the first one that exists:

1. `<key>.<gender>.<form>`, for a demonym that agrees with a gender;
2. `<key>.<form>`;
3. `<key>.<gender>`, for a demonym that agrees with a gender;
4. `<key>`.

When no key exists, the English value shows. The form name uses lowercase letters, digits, underscores and dots. A value with no translation key, such as a person's name, ignores the form.

```json
"culture.examplepack.fisherfolk.demonym.f.genitive": "Fischerin",
"culture.examplepack.fisherfolk.demonym.genitive": "Fischers"
```

## Set Pieces

Set-piece topics list translation keys in `lines`. Townstead looks each key up in the data pack lang files first. When no data pack has the key, the player's game translates it from a resource pack.

## Culture Words

A culture voice can have its own words, such as a fisherfolk word "haddra" for luck. Keep them in translations, because they are part of the culture:

- In languages that use the Latin alphabet, keep the spelling.
- In other scripts, write the sound in that script. For example, "haddra" becomes "хаддра" in Russian and "哈德拉" in Chinese.
- Use the same form for a word in every line.

## Checklist

- Every key matches a line that exists.
- Every selector has a `*` form.
- The translation prints no slot that the English line does not have.
- The text ends with punctuation.
- The line fits both genders, or uses selectors.
