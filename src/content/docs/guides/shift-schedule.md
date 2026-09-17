---
title: Shift Schedule
description: Decide when each villager works, sleeps, socialises, and rests.
---

Every villager follows a schedule of what to do at each hour of the day. Out of the box it is the vanilla villager routine. On the Shift Schedule screen you can change it, one villager at a time or a whole village at once.

## Opening The Schedule

Open the MCA Blueprint and press **Shifts**. The screen lists every villager in the village, one row each, with a name column on the left and the hours of the day across the top. Long villages run to several pages.

Hover a name to see the villager's profession, rank, and chronotype. Hover a cell to see what they are scheduled to do at that hour.

## The Four Activities

| Activity | What the villager does |
| --- | --- |
| **Work** | Goes to their workplace and does their job. |
| **Meet** | Free time. Visits a hangout, talks, and socialises. |
| **Idle** | Wanders near home. Nothing in particular. |
| **Sleep** | Goes to bed. |

The day starts at 6 in the morning at the left edge and runs round to 5 the next morning at the right. A thin line across the grid marks the current time.

A soft band on each row marks the villager's natural sleep window, set by their [chronotype](/guides/needs/energy/#chronotypes). Sleeping inside that band recovers energy at full speed, and working outside it tires them less. Line up **Sleep** with the band and **Work** away from it.

## Editing The Daily Schedule

Click a cell to step it through Idle, Work, Meet, and Sleep. To set many cells at once, click an activity in the legend under the grid to pick it up, then click or drag across cells to paint it. Click the same legend entry again to put it down. With an activity picked up, clicking an hour label at the top sets that hour for every villager on the list.

Changes apply as soon as you make them. There is no save button.

**Reset All** returns every villager on the list to the vanilla routine.

## Templates

A template is a saved day. Press the template button on a villager's row to open the list:

- **Built-in:** Vanilla Default, Standard Day, Early Bird, Night Owl, and Day Off. The three named after chronotypes place sleep in that chronotype's window. Day Off has no work at all.
- **Custom:** your own. **Save As…** stores the selected villager's current day under a name, tagged with their chronotype. Click a custom template's title to rename it. Custom templates can also be edited cell by cell in the preview, duplicated, or deleted.

**Load** applies the template to that villager. A villager on a template keeps its name in the list until you edit their cells by hand, which turns the row back into a custom day.

To apply a template to several villagers, tick the checkbox on each row, then press **Apply to N…** and pick the template.

## Weekly Schedules

The **Weekly** tab gives each villager a different day for each day of the week. It needs a calendar that has weeks. Without one, the tab shows a message instead. See [Calendars & Stamps](/guides/calendars-and-stamps/).

Each villager is either **Daily** or **Weekly**. Press **Use Weekly** on a row to switch. In weekly mode, click a day to assign a template to it and right-click to clear it. A day with nothing assigned falls back to the villager's daily schedule, so you can set only the weekend and leave the rest alone.

The toolbar fills days faster:

- **Fill all days**, **Fill weekdays**, and **Fill weekend** put one template across the chosen days.
- **Copy week** takes one villager's week; **Paste week** puts it on every ticked villager.
- **Week Plans** are saved weeks. Standard Week and Night Owl Week give five working days and two days off; Every Other Day alternates. Apply one to the ticked villagers.

The row also shows today's day and which template is in force.

## How The Schedule Interacts With Needs

- **Sleep** pauses the slow drain of hunger and thirst, so nobody wakes up starving. A sleeping villager will get up for a drink but not for a meal.
- A villager whose energy drops to 20% goes to bed no matter what the schedule says, and one still asleep when Work begins stays asleep only if they are that worn out. See [Energy](/guides/needs/energy/).
- Villagers advance their careers and fill orders only during Work hours. A villager scheduled to Meet or Idle all day earns nothing. See [Careers](/guides/professions/).
- A villager who is hungry, thirsty, or too cold interrupts any activity to fix it, then returns to the schedule.
