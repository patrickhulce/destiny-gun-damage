## Usage

#### Gun Summaries
Meant for quickly getting a sense for the best guns in the game. Select guns for inspection by clicking on their rows. Selected guns will be displayed in 3 charts illustrating the DPS or Adjusted DPS (toggled via the button on the top right) to normal enemies, majors, and ultras as a function of **headshot percentage**. The table below will show the metrics you select given the options of accuracy, headshot percentage, and enemy target type.

#### Compare
Meant for comparing very specific configurations of guns. Here you can manipulate attack, accuracy, headshot percentage, and clip size for each individual gun to match your arsenal and compare them. Perks can also be added to individual guns to see their effects.

## Insights and Takeaways

The following are the biggest insights I gained after crunching these numbers. I have yet to see any evidence that these are false, and all are consistent with every weapon tested so far. Also note that I can only confirm that these findings hold for fights against enemies 20+, I am not certain how damage increases at the lower levels. If you have _evidence_ proving any of these statements otherwise, please, please let me know by clicking on the 'Complain' tab above.

1.  Damage per bullet for a given weapon is a linear function of that weapon's attack stat. Impact affects this linear function's coefficient and intercept. Other known damage modifiers are percentage manipulations on the damage resulting from the linear function.
2.  Scout rifles, sniper rifles, and handcannons suffer additional penalties _to both body damage and precision damage_ when fighting majors and ultras. This penalty can be quite significant (25% penalty to handcannons against Ultras). Auto rifles and pulse rifles do not have any penalty to body damage against majors or ultras and only suffer the 2x headshot multiplier loss for precision damage.
3.  Level differences in your favor do not increase your damage output. However, you do ~33% less damage to enemies 1 level higher than you, ~45% less to enemies 2 levels higher than you, and ~53% less to enemies 3 levels higher than you regardless of the weapon you're using or its attack stat. These % decreases are applied after the ordinary damage calculation.
4.  These numbers do not immediately mean you should throw out all of the weapons with a lower DPS. There are many factors not taken into consideration here, namely recoil and your personal preference. A higher accuracy and headshot ratio can easily make an underperforming gun the leader of your arsenal. My suggestion is estimate your own accuracy and headshot % with each weapon, and head over to the 'Compare' tab to see how guns actually work best for YOU.
Other interesting information that I won't boldly state as fact is that for all intents and purposes as of October 2014, attack is unrelated to how well a weapon works against enemies of a particular level. That is to say, a weapon with a higher attack isn't disproportionately better against a level 28 than a level 20. It's just better overall (corollary to the fact that damage is a linear function of the attack stat for level 20+ enemies).

## Terminology

*   **DPS** - Damage per second as determined by the amount of damage a single clip will do divided by the number of seconds it takes to expend one clip. This metric is most useful for situations where reloading is not an issue and there is plenty of time between waves of enemies.
*   **Adjusted DPS** - Damage per second adjusted for reload time. Computed by the amount of damage a single clip will do divided by the number of seconds it takes to expend one clip plus the time until the your ammo counter is back to a full magazine. Conceptually this is the average damage per second you do over the course of a longer time span and is more useful in situations where enemies are a constant threat and sustained damage is more relevant.
*	**Accuracy** - The percent of shots you fire that hit a target.
*	**Headshot Percentage** - Of the percent of shots that hit a target, what percent of them are headshots.
*	**Enemy Target Type** - The type of enemy you are shooting. Normals are regular red health bar enemies. Majors are yellow health bar enemies. Ultras are big yellow health bar bosses (Phogath, Riksis, etc).

## Notes

#### False or Erroneous Data

Before you report false or erroneous data, please note that all numbers other than DPS and Adjusted DPS reported in tables will be the base value of the gun and will not take into account the perks/buffs applied. If you find yourself still getting different numbers, let me know! Click on the 'Complain' tab above to shoot me an email.

#### Reasoning Behind Clip-Based Damage

This computation allows for consistent handling of buffs that affect only certain parts of the magazine. There is now a meaningful comparison of the Suros Regime second half of the magazine perk and a handcannon's Final Round perk. However, note that this means you will not be doing this DPS consistently throughout the entire magazine and begins to bring an element of Adjusted DPS into DPS. If you do not like this idea, feel free to examine a weapon individually under the 'Compare' tab and remove the offending ability.

## About This Site

#### All data accurate as of October 24, 2014.

This is a site dedicated to uncovering the most efficient guns for every situation you might encounter in Destiny as well as reveal how weapon statistics actually work. The data you see here has been collected and verified by a group of Destiny players like yourself. If you're interested in getting involved, or can volunteer your design chops to make this site look less like a hobo, please get in touch.