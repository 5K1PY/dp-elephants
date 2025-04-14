import {Layout, makeScene2D, Line, Latex, Circle} from '@motion-canvas/2d';
import {all, createRef, Reference, sequence, useRandom} from '@motion-canvas/core';
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
        <Layout layout ref={layout} gap={200} width={1200} height={1000} alignItems={'center'}>
            <Layout layout gap={20} width={800} height={1000} alignItems={'center'} direction={'column'}>
                {...range(N+1).map(t =>
                    <Layout layout ref={layout} gap={200} width={600} height={200} alignItems={'center'} direction={'row'}>
                        {...range(COLORS.length+1).map(i =>
                            <Latex
                                ref={dp_latex[t][i]}
                                tex={dp[t][i] === -Infinity ? '-\\infty' : dp[t][i].toString()}
                                fill={i? COLORS[i-1] : 'white'}
                                scale={2}
                                opacity={0}
                            ></Latex>
                        )}
                    </Layout>
                )}
            </Layout>
            {getLayout(statement_layout, elephants, arrows, price_tags)}
        </Layout>
    );

    const duration = 1.5;
    for (let t=0; t<N+1; t++) {
        console.log(dp_latex[t].length);
        yield* all(
            ...dp_latex[t].map(ref => ref().opacity(0).opacity(1, duration))
        )

        if (t == N) break;
    }
    yield* all(
        ...range(N).map(i => all(
            elephants[i]().opacity(0).opacity(1, duration),
            arrows[i]().opacity(0).opacity(1, duration),
            price_tags[i]().opacity(0).opacity(1, duration)
        )),
    );

});
