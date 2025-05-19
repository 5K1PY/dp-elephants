$\gdef\O$

## Intro

TODO Prerequisites:
- Complexity
- Basic algorithms
- Recursion

## The problem

Long time ago, there was a merchant trading elephants. The merchant was very
experienced, so he had almost infinite money and also knew that every day someone would either sell a particular kind of elephant for given sum, or buy a particular kind for given price. With his experience, he could even predict
the kinds and prices of the elephants.

However, tending for elephants is indeed very difficult, and being a bit
risk-averse the merchant decided to have only have one elephant at the time.
Given this constraint, he wondered, how much money he could make by trading elephants...

For example, here our merchant could buy a blue elephant for 6 and sell
it later for 12. However, the best solution turns out to be sell it earlier
for 10 and and then trade a then trade the green elephant, making 9 in total.

## Dynamic programming

Ok, so in order to solve this problem we will need to take a detour
and learn about dynamic programming — a technique often used in solving problems.

Don't try make to make sense of the name — its main purpose was to government officials and while the purpose was fulfilled, the name confuses people to this day. If you want to read more about the name, check the sources in the description.

What dynamic programming boils down to, is the fact the entire history doesn't
matter while only the very recent things do.

## Fibonacci

To better understand this problem, let's demonstrate this on a simple problem
first — calculating fibonacci numbers. If we want to calculate $F_5$, we need
to calculate $F_4$ and $F_3$. And for $F_4$ we need to calculate $F_3$ and $F_2$.
And so on...

However, as you might have guessed, we are calculating the same fibonacci number again and again... However, if we store the results and only calculate each
fibonacci number once, we get to time complexity of $\O(n)$.

## LIS

Now, let's crank up the difficulty a bit and find the longest increasing
subsequence. Given a sequence of numbers, we want to choose
some numbers, so the new sequence is increasing and as long as possible.

Imagine we have already some subsequence and we want to add an element to the end
of it. The only thing it needs to satisfy, is that it's bigger than last element.

As I have said, the entire history (in this case the entire subsequence)
doesn't matter, while only the most recent part (the last element) does.

So let's use dynamic programming — let's denote $\ell_i$ as the longest
increasing subsequence ending with element $i$. All of the $\ell_i$ are
at least one, because sequence of one element is always increasing.

Next, if we want to truly calculate $\ell_i$

## Elephants

Ok 

