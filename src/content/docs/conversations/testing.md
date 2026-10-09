---
title: Testing
description: How to check conversation data for errors and read whole conversations without waiting for them in game.
---

## 1. Check the Log

After you add or change files, run `/reload` and read the game log (`logs/latest.log`). Look for these lines:

```txt
Loaded 13 conversation topics (0 rejected)
Loaded 37 moves, 13 subjects, 2 encounters, 73 frames, 2656 parts in 77 pools, 1 voices (0 diagnostics)
```

Both counts at the end must be 0. Each problem has its own line before the summary:

- Topic files report as `Conversation rejected: <topic> $.<path>: <problem>`.
- All other conversation files report as `Conversation data: <problem>`.

`/townstead social conversations` lists the loaded topics in chat, and shows the topic errors in red.

### Problems Townstead Reports

| Problem | Fix |
| --- | --- |
| `<family> <file> rejected: <field>: unknown field` | A field name is wrong, or is in the wrong place. The path shows where. |
| `... rejected: ...: is required` | A required field is missing. |
| `... rejected: lines.<id>: ids use lowercase letters, digits and underscores` | Rename the line ID. |
| `... rejected: malformed mods gate` | Fix the `mods` expression. See [Mod Gates](/conversations/#mod-gates). |
| `duplicate line id <key>` | Two lines in the same voice and pool have the same ID. Townstead keeps one. |
| `line <key> does not end a sentence` | End the text with punctuation. |
| `nothing answers the question <aspect>` | Add parts with this `answers` value. |
| `parts name an unknown pair <pair>` | Define the pair, or fix `opens` or `responds`. |
| `nothing in the common voice responds to the pair <pair>` | Add common-voice parts that respond to the pair. |
| `frames name an unknown move <move>` | Define the move, or fix the frame's `move`. |
| `frame for <move> uses an empty pool <pool>` | Add lines to the pool, or fix the slot name. |
| `frame for <move>: pool <pool> asks questions but is not the last slot` | Move the question pool to the last slot. |
| `voice <voice> extends in a cycle` | Fix `extends`, so the chain ends. |
| `encounter <id> uses an unknown move <move>` | Define the move, or fix the sequence. |
| `extended_buildings <id> talk: <problem>` | Fix the building's `talk` block. |

A topic can also be rejected when its turns are unreachable, loop, run longer than 8 turns, or put an outcome on a turn with replies. See [Rules for the Graph](/conversations/topics/#rules-for-the-graph).

The log does not catch everything. A line can load and still never appear: its requirements may never be true, or no subject may have its variant. Use a simulation to find those.

## 2. Simulate Conversations

A simulation runs many whole conversations at once with the real villagers near you. Nothing happens in the world. All commands need operator permission.

```txt
/townstead social simulate 100
/townstead social simulate 50 64
/townstead social simulate pair @e[type=mca:female_villager,limit=1,sort=nearest] <another villager> 20
```

| Command | Runs |
| --- | --- |
| `/townstead social simulate [count] [radius]` | `count` conversations (default 20, at most 500) between random pairs of MCA villagers within `radius` blocks (default 32). |
| `/townstead social simulate pair <first> <second> [count]` | `count` conversations (default 10, at most 200) between two villagers. The villager who starts changes each time. |

The chat shows a summary:

```txt
100 encounters (31 hangout), 812 lines, 8.1 per encounter, 11 topics, 0 set-piece lines, 0 unanswered questions, 0 unreplied pairs, 3 failed steps. Busiest pools: greeting 96, farewell 71, weather_remark 58
```

| Number | Meaning |
| --- | --- |
| Unanswered questions | A question with no answer on the next line. It must be 0. |
| Unreplied pairs | A required pair with no reply on the next line. It must be 0. |
| Failed steps | Steps for which Townstead could not build a line. A few are normal. Many point to a pool with too few lines for its conditions. |
| Busiest pools | The pools that were used most. A busy pool with few lines repeats itself. Add lines to it. |

The full transcript goes to `logs/townstead-conversations.txt`. For each conversation, it shows the two villagers, the context, why it ended, and its topics. Under each line, it shows the move and the key of each part, so you can find the part in its line file. Keys from the common voice leave out `dialogue.townstead.common.`:

```txt
=== 1. Aldo and Brina (idle), 6 lines, ended: closed
    topics: townstead:weather
  Aldo:            Hey there! Busy day?
                     [townstead:greet] [greeting.hey_there, greet_follow.busy_day]
  Brina:           Hi, Aldo. Busy, but I like it. You?
                     [townstead:greet_back] [greeting_return.hi_other, answer.busy_but_i_like_it, greet_q_back.you]
```

A simulation uses the villagers' real personalities, cultures, relationships, needs, memories and village. It does not check distance or line of sight, and it gives no gossip, memories or relationship changes.

## 3. Watch One Conversation

```txt
/townstead social conversation <first> <second>
/townstead social conversation <first> <second> townstead:weather
/townstead social inspect <first> <second>
```

`conversation` starts a real conversation between two villagers, so you can watch the gestures and chat. It gives no memories, opinion or mood changes. Add a topic ID to force that topic.

`inspect` shows what Townstead knows about the pair: context facts, relationship tags and qualities, memories, bonds, and the gate weight of each topic. Use it when a topic never starts.

To see every line in the log as villagers speak, set `debugLogging = true` under `[debug]` in the server configuration. Each line is logged as `[Conversation] <speaker> (<move>): <text>`.

## 4. Test a Culture

A culture voice only speaks for villagers of that culture. Existing villagers move toward a new culture slowly, over years of game time (see [Cultures change over time](/conversations/voices/#writing-a-culture-voice)), so test with a new village.

1. Install the culture pack in the world, and run `/reload`.
2. Check that the founding profile loaded: `/townstead founding profiles`.
3. Make a village with the culture:

   ```txt
   /townstead debug village "examplepack:fisherfolk" 10
   ```

   Or refill the village you are in: `/townstead debug village repopulate "examplepack:fisherfolk" 10`.
4. Run `/townstead social simulate 100` in the village, and read the transcript.

See [Debug Villages](/reference/commands/#debug-villages) for all village commands.

## 5. Test a Language

Townstead translates each line for each player, in the language of that player's game. To test a translation, change your game language and watch conversations in chat, or start one with `/townstead social conversation`. The simulation transcript is always in English.

Check that:

- every selector has a `*` form;
- words that change with gender use selectors;
- the frame keys fit the language, for example with no spaces for Chinese.

See [Translations](/conversations/translations/).

## Checklist for a New Pool or Voice

- The log shows 0 rejected topics and 0 diagnostics.
- Every question has an answer, and every pair has a reply in the common voice.
- The busiest pools in a simulation have enough lines, so they do not repeat within a few conversations.
- Lines with `requires`, `variants` or `persp` appear in the transcript when the situation fits.
- No line talks about seats, drinks or "tonight" where they do not fit. See [Venue and Time Lines](/conversations/state-and-requirements/#venue-and-time-lines).
