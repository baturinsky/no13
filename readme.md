Triskaidekagenesis

There are two usual approaches to handle the Jam's theme.
First one is to look at the theme and think how it can be gamyfied.
Second is to take some idea you had mothballed for a while, 
and use the Jam as a motivation to finally implement it, while adding the game's theme as some twist of mechanic.

This year I have mad both, and this game is the former. 
I have tried to make game that is as literal and direct about the theme as possible.

It's literally about the *fear* of *number* *13*.
Not of 13 of something, not of something labeled "13" - of the number itself, and things that make it 13.
So, the core "mechanic" is the numbers, and operations with them.
What is the most direct, yet not completely trivial things we can make with numbers? Arithmetical operations.
And thus we get the mechanics - avoid getting 13 with arithmetical operations with numbers.

On the other hand, I have tried to focus on the fear, phobia. so, I tried to convey not just avoiding, 13, 
but simulate the *fear* of it. Disturbing sounds, blurred vision, shaking, etc.

On the other way, I have tried to simulate those effects wearing down. As you solve the taks,
audio and visual effects should be weaker and weaker, until on the last stage, 
Nina will just make 13 without noticing it, indicating that she is now free of her phobia.


Now, as for implementation of the math part. 

Finding all possible numbers was not that complex. Here is an extremely complex explanation of it :)

Algorithm is following - to find all results of N cards, split them into two groups 
in all possible ways (2**(N-1)-1 variants), get all possible results of each part, 
and then use the four operation on each pair of possible values (in both orders for "/" and "-").

I have a "cache" of all possible results for each card subset I have already calculated,
with the way I get them in string form.

For optimisation, I have limited the posible results to numbers 0-100, and blamed Nina for it.

Surprisingly hard part were the brackets. There were way too much of them in the result, 
and I could not find a simple way to find out which of them I can omiss.
finally, I just added another step in the number combination algorithm - 
when I solve the task for N cards, I first add the result of adding them all, 
and multiplying them all, and write them down.

It's a bit coplicated, so here is an example.

Let's say I have cards 1,2,4.

First, I write down "(1 + 2 + 4)" = 7, "(1 * 2 * 4)" = 8.
Then, I chack all the combinations, there is only three of them  "1|2,4", "2|1,4", "4|1,2".

Then, I see that "1,2" can only give three variants, "(2-1)"=1, "(2*1)"=2, "(2+1)"=3. 
And I try all possible ways to use them with the other part, 4.
For 1 that's "(4/1)"=4, "(4+1)"=5, "(4-1)"=3. 
1/4 = 0.25 and 1-4=-3, but we drop them, because "Nina can't work with fractions and negatives".

We use the string "solutions" for subset to get the solutions for the superset.
So, results will be "(4/(2-1))"=4, "(4+(2-1))"=5, "(4-(2-1))"=3 etc.


I have probably confused you even more by now.