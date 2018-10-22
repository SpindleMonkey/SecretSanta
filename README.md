# SecretSanta
Secret Santa generator

This is a coding exercise in three parts, and is defined [here](MLB_Coding_Exercise.pdf).

My solution can be found at [www.constantlykephart.com/MLB](http://www.constantlykephart.com/MLB/).

## Environment
This was tested in Firefox on a Mac. No testing was done on any other platform, but I expect most browsers will work; no promises tablets/phones will be usable.

## Overview
I wrote this in JavaScript since that's the most recent language I've been working with. This wasn't the best language choice because there was quite a bit of overhead needed (HTML, CSS) to run the solutions in the browser. I'd pick another language if I were to do this over.

I hard-coded the families I used for testing due to the time constraint. Ideally, my solution would allow for an input file, and would produce a file as output (or even individual emails/texts so nobody knows all of the assignments!).

## Part 1
My solution for part 1 is a simple shifting of the family list. The shift, or offset, is randomly generated so it's possible you'd get different assignments from year to year. Since a shift of 0 is not allowed, you don't have to worry about anybody being assigned themself (unless, of course, the family grows, and then you should use the Part 2 solution!).

## Part 2
In order to not duplicate Secret Santa assignments more frequently than every 3 years, I added a history array to each family member to track the previous 3 years' partners. I also switched to randomly generated assignments. 

Known issue: Occasionally, I can't make an assignment because all of the possible partners have been assigned. I need to add some code to work back through the current Secret Santa/partner assignments and find somebody who can swap partners with the current Secret Santa, but until that fix is made, I assign the first available partner (meaning the 3-year rule and/or being your own partner rule is broken); watch the console for these occcurences!

## Part 3
Since I promised my solution by the end of the weekend, and I had definitely used more than 2-3 hours on parts 1 and 2, I don't have a completed part 3. My plan is to take part 2, add another field to each of the family members to show immediate family members, and then modify findPartner() from part 2 to check that the selected partner is not part of the immediate family. I expect there will be issues with not being able to assign everybody a partner, and I'm pretty sure I'll have to re-think how I use data structures and the existing assignments to adjust partner assignments.