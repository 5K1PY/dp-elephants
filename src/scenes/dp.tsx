import {Layout, makeScene2D, Rect, Line, Latex, Circle} from '@motion-canvas/2d';
import {all, createRef, Reference, delay, sequence, useRandom, waitFor} from '@motion-canvas/core';
import {range, N, getLayout, PRICES, TYPES, COLORS} from '../elephants';

export default makeScene2D(function* (view) {
    let random = useRandom();

    const elephants = Array.from({length: N}, () => createRef<Circle>());
    const arrows = Array.from({length: N}, () => createRef<Line>());
    const price_tags = Array.from({length: N}, () => createRef<Latex>());
    const dp = Array.from({ length: N + 1 }, () => [0, ...Array(COLORS.length).fill(-Infinity)]);
    const dp_latex: Reference<Latex>[][] = Array.from({ length: N + 1 }, () => Array.from({ length: COLORS.length+1 }, () => createRef<Latex>()));
    for (let t=1; t<N+1; t++) {
        dp[t][0] = Math.max(dp[t-1][0], dp[t-1][TYPES[t-1]+1] + PRICES[t-1]);
        for (let i=0; i<COLORS.length; i++) {
            
            if (TYPES[t-1] == i && PRICES[t-1] < 0) dp[t][i+1] = Math.max(dp[t-1][i+1], dp[t-1][0] + PRICES[t-1]);
            else dp[t][i+1] = dp[t-1][i+1];
        }
    }

    const layout = createRef<Layout>();
    const statement_layout = createRef<Layout>();
    view.add(
        <Layout layout ref={layout} gap={200} width={1300} height={1000} alignItems={'center'}>
            <Layout layout gap={20} width={900} height={1000} alignItems={'center'} direction={'column'}>
                {...range(N+1).map(t =>
                    <Layout layout ref={layout} gap={250} width={600} height={200} alignItems={'center'} direction={'row'}>
                        {...range(COLORS.length+1).map(i =>
                            <Latex
                                ref={dp_latex[t][i]}
                                tex={dp[t][i] === -Infinity ? '-\\infty' : dp[t][i].toString()}
                                fill={i? COLORS[i-1] : 'white'}
                                scale={1.8}
                                opacity={0}
                            ></Latex>
                        )}
                    </Layout>
                )}
            </Layout>
            {getLayout(statement_layout, elephants, arrows, price_tags)}
        </Layout>
    );

    const do_nothing = createRef<Rect>();
    view.add(<Rect ref={do_nothing} height={160} width={210} stroke={'white'} lineWidth={10} opacity={0}/>);
    const use_offer = createRef<Rect>();
    const price_circle = createRef<Circle>()
    const price = createRef<Latex>()
    view.add(
        <>
            <Rect ref={use_offer} height={160} width={210} stroke={'white'} lineWidth={10} opacity={0}/>
            <Circle ref={price_circle} fill={'white'} size={80}
                opacity={use_offer().opacity}
                position={() => use_offer().bottomRight()}/>
            <Latex ref={price} fill={'black'} width={70}
                opacity={use_offer().opacity}
                position={() => use_offer().bottomRight()}
            />
        </>
    );

    yield* all(
        ...range(N).map(i => all(
            elephants[i]().opacity(0).opacity(1, 1.5),
            arrows[i]().opacity(0).opacity(1, 1.5),
            price_tags[i]().opacity(0).opacity(1, 1.5)
        )),
    );

    for (let t=0; t<N+1; t++) {
        if (t == 0) {
            yield* sequence(0.5,
                ...dp_latex[t].map(ref => ref().opacity(0).opacity(1, 1.5))
            )
        } else {
            for (let i=0; i<COLORS.length+1; i++) {
                price().tex((PRICES[t-1] > 0 ? "+" : "") + PRICES[t-1].toString());
                if (PRICES[t-1] > 0 && i == 0) {
                    yield* all(
                        do_nothing().absolutePosition(dp_latex[t-1][i]().absolutePosition()).opacity(0).opacity(1, 1),
                        use_offer().absolutePosition(dp_latex[t-1][TYPES[t-1]+1]().absolutePosition()).opacity(0).opacity(1, 1),
                    );
                } else if (PRICES[t-1] < 0 && i == TYPES[t-1]+1) {
                    yield* all(
                        do_nothing().absolutePosition(dp_latex[t-1][i]().absolutePosition()).opacity(0).opacity(1, 1),
                        use_offer().absolutePosition(dp_latex[t-1][0]().absolutePosition()).opacity(0).opacity(1, 1),
                    );
                } else {
                    yield* do_nothing().absolutePosition(dp_latex[t-1][i]().absolutePosition()).opacity(0).opacity(1, 1);
                }

                yield* all(
                    dp_latex[t][i]().opacity(0).opacity(1, 1.0),
                    delay(0.3, do_nothing().opacity(0, 1)),
                    delay(0.3, use_offer().opacity(0, 1)),
                );
            }
        }
    }

    yield* waitFor(5.0);

    const change = Array.from({length: N}, () => createRef<Circle>());
    view.add(
        <>
            {...range(N).map(t =>
                <Circle ref={change[t]} fill={'red'} size={20} opacity={0}/>
            )}
        </>
    );
    for (let t=0; t<N; t++) {
        for (let i=0; i<=COLORS.length; i++) {
            if (dp[t][i] != dp[t+1][i]) {
                yield* change[t]().absolutePosition(
                    dp_latex[t][i]().absolutePosition().add(dp_latex[t+1][i]().absolutePosition()).div(2)
                ).opacity(0).opacity(1, 1.0);
            }
        }
    }
    yield* all(
        ...range(N).map(t => change[t]().opacity(0, 1.0))
    );
});
