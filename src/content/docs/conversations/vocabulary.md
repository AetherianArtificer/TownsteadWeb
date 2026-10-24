---
title: Built-in Vocabulary
description: Every move, pair, pool, frame and generative topic that Townstead ships.
---

This page lists the conversation data that Townstead ships. Use these IDs when you add lines, frames or topics. All IDs are in the `townstead` namespace.

Townstead also ships subjects and pools for supported mods. They have a [mod gate](/conversations/#mod-gates) and load only when that mod is installed, so this page does not list them.

## Moves

| Move | Role | Description |
| --- | --- | --- |
| `acknowledge` | topic | Reply to an open pair before the subject changes, such as a laugh. |
| `agree` | topic | Agree with what the other villager said. |
| `anecdote` | expansion | Tell a short story about the subject. Follow-up: `react_anecdote`. |
| `answer` | topic | Answer an open question before the subject changes. |
| `arrive` | opening | Arrive at a hangout and ask to join. |
| `arrive_back` | opening | Welcome a villager who arrives at a hangout. |
| `ask_detail` | topic | Ask for more about a piece of news. |
| `caution` | topic | Warn the other villager about dangerous talk. |
| `close` | closing | End the conversation in one line. |
| `close_discreet` | closing | End the conversation after secret talk. |
| `console` | topic | Comfort the other villager. |
| `disagree` | topic | Disagree with what the other villager said. |
| `doubt` | topic | Doubt a piece of news. |
| `elaborate` | expansion | Add more about the subject. Topic starter only. |
| `farewell_last` | closing | The last word of a goodbye. |
| `farewell_reply` | closing | Reply to a goodbye. |
| `greet` | opening | Greet the other villager. |
| `greet_back` | opening | Greet back, and answer a greeting question. |
| `groan` | topic | Groan at a joke. |
| `insist` | topic | Insist that the news is true. |
| `invite` | topic | Invite the other villager to do something together. |
| `joke_close` | topic | The teller's last word after a joke. |
| `leave` | closing | Leave a hangout. |
| `light_greet` | opening | A short hello for a villager already greeted today. |
| `open_subject` | topic | Bring up a subject. |
| `opinion_ask` | expansion | Ask what the other villager thinks. |
| `praise` | topic | Laugh at or praise a joke. |
| `pre_close` | closing | Say that it is time to go. |
| `react` | topic | React to a piece of news. |
| `react_anecdote` | expansion | React to a story. |
| `remark` | pause | A remark during a pause. Not used yet. |
| `reply` | topic | Reply to an invitation or a job offer. |
| `respond` | topic | Reply to news about yourself. |
| `say` | topic | A set-piece line with fixed text. |
| `share_account` | topic | Tell a piece of news. Spreads the story. |
| `tease` | topic | Tease the other villager. |
| `tell_joke` | topic | Tell a joke. |

## Pairs

| Pair | Uptake | Chance | Opened by |
| --- | --- | --- | --- |
| `complaint` | optional | 0.85 | A complaint about the weather, a need or a place. |
| `general` | optional | 0.5 | An ordinary remark. |
| `invitation` | required |  | An invitation. |
| `joke` | required |  | A joke. |
| `musing` | optional | 0.7 | A thought about something far away. |
| `news` | required |  | A piece of news. |
| `opinion` | optional | 0 | An opinion. |
| `story` | required |  | A story. |

## Pools

Pool fields come from the pool's file in `data/townstead/dialogue_pool/`. A pool without a file has no shared fields. "Used by" lists the moves whose frames use the pool. The `answer` pool has no frame: an answer slot takes parts from every pool, by their `answers`.

| Pool | Used by | Act | Subjects | Opens | Responds | Persp | Empty |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `agree_assess` | agree | react |  |  | `opinion`, `musing` |  |  |
| `anecdote` | anecdote | inform |  |  |  |  |  |
| `answer` |  |  |  |  |  |  |  |
| `arrival` | arrive | greet |  |  |  |  |  |
| `arrival_welcome` | arrive_back | greet |  |  |  |  |  |
| `ask_detail` | ask_detail |  | `mob` |  |  |  |  |
| `ask_last` | opinion_ask |  | `weather` |  |  |  |  |
| `biome_aside` | agree |  | `biome` |  |  |  | 3 |
| `biome_remark` | open_subject | assess | `biome` | `opinion` |  |  |  |
| `biome_tease` | tease | react | `biome` |  | `opinion` |  |  |
| `bridge` | bridge | filler |  |  |  |  |  |
| `claim` | share_account |  | `event` | `news` |  |  |  |
| `close_discreet` | close_discreet | farewell | `ruler` |  |  |  |  |
| `close_lead` | close | filler |  |  |  |  | 8 |
| `company_after` | reply |  | `company` |  |  |  | 3 |
| `company_invite` | invite | inform | `company` | `invitation` |  |  |  |
| `company_lead` | invite | filler | `company` |  |  |  | 4 |
| `contrast_lead` | disagree | react |  |  | `opinion` |  |  |
| `doubt_body` | doubt | react |  |  | `news` | `who`: `they` |  |
| `doubt_lead` | doubt | react |  |  | `news` |  | 3 |
| `elaborate` | elaborate |  |  | `opinion` |  |  |  |
| `event_console` | console | react | `event` |  | `news` | `who`: `you` |  |
| `event_respond` | respond | react | `event` |  | `news` | `who`: `me` |  |
| `farewell` | close | farewell |  |  |  |  |  |
| `farewell_last` | farewell_last | farewell |  |  |  |  | 12 |
| `farewell_reply` | farewell_reply | farewell |  |  |  |  |  |
| `greet_follow` | greet |  |  |  |  |  | 6 |
| `greet_q_back` | greet_back | react |  |  |  |  | 4 |
| `greeting` | arrive, greet | greet |  |  |  |  |  |
| `greeting_return` | greet_back | greet |  |  |  |  | 3 |
| `groan` | groan | react | `joke` |  | `joke` |  |  |
| `hangout_leave` | leave | farewell |  |  |  |  |  |
| `infection_advice` | console |  | `infection` |  |  | `who`: `you` | 2 |
| `infection_claim` | open_subject | assess | `infection` | `news` |  |  |  |
| `infection_console` | console | react | `infection` |  | `news` | `who`: `you` |  |
| `infection_news_claim` | share_account |  | `infection_news` | `news` |  |  |  |
| `infection_news_coda` | share_account | assess | `infection_news` |  |  | `who`: `they` | 4 |
| `infection_news_lead` | share_account | filler | `infection_news` |  |  |  | 3 |
| `infection_news_react` | react | react | `infection_news` |  | `news` | `who`: `they` |  |
| `infection_news_respond` | respond | react | `infection_news` |  | `news` | `who`: `me` |  |
| `infection_respond` | respond | react | `infection` |  | `news` | `who`: `me` |  |
| `insist` | insist |  |  |  |  |  |  |
| `joke` | tell_joke |  | `joke` | `joke` |  |  |  |
| `joke_close` | joke_close |  | `joke` |  |  |  |  |
| `joke_lead` | tell_joke | filler | `joke` |  |  |  | 4 |
| `judge` | react, share_account | assess | `event` |  |  |  | 3 |
| `laugh` | praise | react | `joke` |  | `joke` |  | 2 |
| `light_greeting` | light_greet | greet |  |  |  |  |  |
| `mob_claim` | share_account |  | `mob` | `news` |  |  |  |
| `mob_coda` | share_account | assess | `mob` |  |  |  | 6 |
| `mob_react` | react | react | `mob` |  | `news` |  |  |
| `mob_respond` | respond | react | `mob` |  | `news` | `who`: `me` |  |
| `need_advice` | console |  | `need` |  |  |  | 2 |
| `need_claim` | open_subject | assess | `need` | `complaint` |  |  |  |
| `need_lead` | open_subject | filler | `need` |  |  |  | 5 |
| `news_opener` | share_account | filler |  |  |  |  | 5 |
| `news_react` | react | react | `event` |  | `news` | `who`: `they` |  |
| `opinion_ask` | opinion_ask |  |  |  |  |  |  |
| `praise_body` | praise | react | `joke` |  | `joke` |  |  |
| `pre_close` | pre_close | farewell |  |  |  |  |  |
| `project_aside` | agree, disagree |  | `project` |  |  |  | 3 |
| `project_claim` | share_account | inform | `project` | `opinion` |  |  |  |
| `project_coda` | share_account | assess | `project` |  |  |  | 3 |
| `quest_claim` | open_subject |  | `quest` | `news` |  |  |  |
| `quest_coda` | open_subject | assess | `quest` |  |  |  | 5 |
| `quest_reply` | reply | react | `quest` |  | `news` |  |  |
| `react_anecdote` | react_anecdote | react |  |  | `story`, `general` |  |  |
| `ruler_claim` | share_account |  | `ruler` | `news` |  |  |  |
| `ruler_reaction` | caution | react | `ruler` |  | `news` |  |  |
| `uptake_complaint` | console | react |  |  | `complaint` |  |  |
| `uptake_invitation` | reply | react |  |  | `invitation` |  |  |
| `venue_aside` | agree |  | `venue` |  |  |  | 2 |
| `venue_remark` | open_subject, remark | assess | `venue` | `opinion` |  |  |  |
| `weather_aside` | agree, disagree |  | `weather` |  |  |  | 4 |
| `weather_open` | open_subject | filler | `weather` |  |  |  | 6 |
| `weather_remark` | open_subject | assess | `weather` | `opinion` |  |  |  |
| `whisper_open` | share_account | filler | `ruler` |  |  |  |  |

## Frames

| Move | Subjects | Slots |
| --- | --- | --- |
| `greet` |  | `greeting`, `greet_follow` |
| `greet_back` |  | `greeting_return`, `@answer`, `greet_q_back` |
| `close` |  | `close_lead`, `farewell` |
| `open_subject` | `weather` | `weather_open`, `weather_remark` |
| `agree` | `weather` | `agree_assess`, `weather_aside match` |
| `disagree` | `weather` | `contrast_lead`, `weather_aside oppose` |
| `open_subject` | `biome` | `biome_remark` |
| `agree` | `biome` | `agree_assess`, `biome_aside match` |
| `tease` | `biome` | `biome_tease` |
| `share_account` | `mob` | `news_opener`, `mob_claim`, `mob_coda` |
| `ask_detail` | `mob` | `ask_detail` |
| `react` | `mob` | `mob_react` |
| `respond` | `mob` | `mob_respond` |
| `share_account` | `event` | `news_opener`, `claim`, `judge` |
| `ask_detail` | `event` | `ask_detail` |
| `react` | `event` | `news_react`, `judge` |
| `respond` | `event` | `event_respond` |
| `console` | `event` | `event_console` |
| `doubt` | `event` | `doubt_lead`, `doubt_body` |
| `insist` |  | `insist` |
| `open_subject` | `quest` | `quest_claim`, `quest_coda` |
| `reply` | `quest` | `quest_reply` |
| `share_account` | `project` | `project_claim`, `project_coda match` |
| `agree` | `project` | `agree_assess`, `project_aside match` |
| `disagree` | `project` | `contrast_lead`, `project_aside oppose` |
| `share_account` | `ruler` | `whisper_open`, `ruler_claim` |
| `caution` | `ruler` | `ruler_reaction` |
| `close_discreet` | `ruler` | `close_discreet` |
| `tell_joke` | `joke` | `joke_lead`, `joke` |
| `praise` | `joke` | `laugh`, `praise_body` |
| `groan` | `joke` | `groan` |
| `joke_close` | `joke` | `joke_close` |
| `answer` |  | `@answer` |
| `acknowledge` |  | `@response` |
| `pre_close` |  | `pre_close` |
| `farewell_reply` |  | `farewell_reply` |
| `farewell_last` |  | `farewell_last` |
| `elaborate` | `weather` | `elaborate match` |
| `elaborate` | `event` | `elaborate match` |
| `elaborate` | `mob` | `elaborate` |
| `elaborate` | `project` | `elaborate match` |
| `elaborate` | `quest` | `elaborate` |
| `elaborate` | `biome` | `elaborate match` |
| `opinion_ask` | `weather` | `ask_last` |
| `opinion_ask` | `mob` | `opinion_ask` |
| `opinion_ask` | `event` | `opinion_ask` |
| `opinion_ask` | `project` | `opinion_ask` |
| `opinion_ask` | `quest` | `opinion_ask` |
| `anecdote` | `weather` | `anecdote` |
| `anecdote` | `mob` | `anecdote` |
| `anecdote` | `event` | `anecdote` |
| `anecdote` | `project` | `anecdote` |
| `anecdote` | `quest` | `anecdote` |
| `anecdote` | `biome` | `anecdote` |
| `react_anecdote` |  | `react_anecdote` |
| `arrive` |  | `arrival` |
| `arrive` |  | `greeting`, `arrival` |
| `arrive_back` |  | `@answer`, `arrival_welcome` |
| `light_greet` |  | `light_greeting` |
| `leave` |  | `@answer`, `hangout_leave` |
| `open_subject` | `venue` | `venue_remark` |
| `agree` | `venue` | `agree_assess`, `venue_aside match` |
| `remark` | `venue` | `venue_remark` |
| `open_subject` | `need` | `need_lead`, `need_claim` |
| `console` | `need` | `uptake_complaint`, `need_advice` |
| `invite` | `company` | `company_lead`, `company_invite` |
| `reply` | `company` | `uptake_invitation`, `company_after match` |
| `open_subject` | `infection` | `infection_claim` |
| `console` | `infection` | `infection_console`, `infection_advice` |
| `respond` | `infection` | `infection_respond` |
| `share_account` | `infection_news` | `infection_news_lead`, `infection_news_claim`, `infection_news_coda` |
| `react` | `infection_news` | `infection_news_react` |
| `respond` | `infection_news` | `infection_news_respond` |

## Generative Topics

| Topic | Subject | Register | First move | Replies | Expansions |
| --- | --- | --- | --- | --- | --- |
| `townstead:biome` | `townstead:biome` | `ambient` | `open_subject` | `agree`, `tease` | `elaborate`, `opinion_ask`, `anecdote` |
| `townstead:company` | `townstead:company` | `social` | `invite` | `reply` |  |
| `townstead:event` | `townstead:event` | `social` | `share_account` | `ask_detail`, `doubt`, `react`, `respond`, `console` | `elaborate`, `opinion_ask`, `anecdote` |
| `townstead:infection` | `townstead:infection` | `grief` | `open_subject` | `console`, `respond` |  |
| `townstead:infection_news` | `townstead:infection_news` | `grief` | `share_account` | `react`, `respond` |  |
| `townstead:joke` | `townstead:joke` | `humor` | `tell_joke` | `praise`, `groan` |  |
| `townstead:mob` | `townstead:mob` | `social` | `share_account` | `ask_detail`, `react`, `respond` | `elaborate`, `opinion_ask`, `anecdote` |
| `townstead:need` | `townstead:need` | `ambient` | `open_subject` | `console` |  |
| `townstead:project` | `townstead:project` | `civic` | `share_account` | `agree`, `disagree` | `elaborate`, `opinion_ask`, `anecdote` |
| `townstead:quest` | `townstead:quest` | `commerce` | `open_subject` | `reply` | `elaborate`, `opinion_ask`, `anecdote` |
| `townstead:ruler` | `townstead:ruler` | `intrigue` | `share_account` | `caution` |  |
| `townstead:venue` | `townstead:venue` | `social` | `open_subject` | `agree` |  |
| `townstead:weather` | `townstead:weather` | `ambient` | `open_subject` | `agree`, `disagree` | `elaborate`, `opinion_ask`, `anecdote` |

The set-piece topics are in `data/townstead_social/conversation/`: `townstead_social:change`, `townstead_social:checking_after_harm`, `townstead_social:craft_and_patience`, `townstead_social:food`, `townstead_social:joke`, `townstead_social:little_pleasures`, `townstead_social:rain`, `townstead_social:reassurance`, `townstead_social:remembered_kindness`, `townstead_social:repair`, `townstead_social:shared_trade`, `townstead_social:speaking_after_harm`.
