$\gdef\O{\mathcal O}$

## Intro

TODO Prerequisites:
- Complexity
- Basic algorithms
- Recursion

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

