$\gdef\O{\mathcal O}$

## Intro

TODO Prerequisites:
- Complexity
- Basic algorithms

## The problem

Long time ago, there was a merchant trading elephants. The merchant was very
experienced, so he had almost infinite money and also knew that every day someone
would either sell a particular kind of elephant for given sum, or buy a particular
kind for given price. With his experience, he could even predict the kinds and prices
of the elephants.

However, tending for elephants is indeed very difficult, so the merchant decided to
have only have one elephant at the time. Given this constraint, he wondered,
how much money he could make by trading elephants...

For example, here our merchant could buy a blue elephant for 6 and sell
it later for 12. However, the best solution turns out to be sell it earlier
for 10 and and then trade a then trade the green elephant, making 9 in total.

## Dynamic programming

Ok, so in order to solve this problem we will need to take a detour
and learn about dynamic programming — a technique often used in solving problems.

Don't try make to make sense of the name — its main purpose was to government officials
and while it was fulfilled, the name confuses people to this day. If you want to read more about the name,
check the sources in the description.

What dynamic programming boils down to, is the fact the entire history doesn't
matter while only the very recent things do.

## LIS

Next, let's crank up the difficulty a bit and find the longest increasing
subsequence. That is, given a sequence of numbers $a_i$, we want to choose
some numbers, so the new sequence is increasing and as long as possible.

Imagine we have already some subsequence and we want to add an element to the end
of it. The only thing it needs to satisfy is that it's bigger than last element.
As I have said, the entire history (in this case the entire subsequence)
doesn't matter, while only the most recent part (the last element) does.

So let's use dynamic programming — let's denote $\ell_i$ as the length of the longest
increasing subsequence ending with element $i$. Imagine we want to calculate $\ell_j$
and we already have the values for all previous indexes. We can take some longest subsequence
that ends before $j$ with smaller element than the one at $j$ and add our element to it.

Now we can calculate all $\ell_i$ values and find the biggest one,
which gives us an $\O(n^2)$ algorithm. If we would want to find the subsequence itself
we can remember how we calculated each $\ell_i$ (namely the position of the maximum)
and then construct it from the back.

Some of you would surely note that a faster algorithm exists, but that is a story for
another time.

## Elephants

So, armed with the knowledge of dynamic programming, let's return to our original problem.
You can pause the video to figure it our yourself, however it is rather hard.

Like I said, entire history does not matter. (In this case) So what are the things that matter here?
1. What day are we in.
2. What kind of elephant (if any) we currently have.
3. And how much money we made or lost.

Let us organize the values in the table. Rows will denote what day is it and columns which elephant we have. Each cell will store, the maximum value of money we can make.

Before the beginning of the first day, we have no elephants and we have made no money.
We cannot have a blue or a green before the first day, so we will just write $-\infinity$
to denote that this is impossible.

Now let's calculate the following row. In the first day, we can buy an elephant
for 6 coins. We can always do nothing, and if want to end up with no elephant
that's our only option. If we want to end up with blue elephant, we can either have
elephant in the previous day or have no elephant or pay for a new one. The option where
we make more money is the maximum one. For selling this is similar, but we gain coins
and end up with no elephant.

...

We can read how much money we can make in the last row, if we have no elephant.
(It is always better to not buy the elephant in the first place.) If we would want
to know, when to buy and when to sell, we could use the same approach in the Longest increasing subsequence, by remembering which of the preceding two values was the maximum
and then walk backwards.

So what is our time complexity? As there can be as many kinds of elephants as there are days,
our time complexity is $\O(n^2)$ where $n$ is the number of days.

But this can be improved. Can you spot the key observation here?

...

The rows are really similar here. In fact only one number can change. When we can buy an elephant, it's the state with new elephant. If we are selling, it's the state without an elephant. So instead of constructing the new row number by number, we can only change one value. Therefore we do only one change per day, which yields $\O(n)$ algorithm.

## Other problem

