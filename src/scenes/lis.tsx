import {Layout, makeScene2D, Rect, Latex, Shape} from '@motion-canvas/2d';
import {all, createRef, Reference, sequence, ThreadGenerator, useRandom} from '@motion-canvas/core';


function* setColors(rectangles: Array<Reference<Shape>>, j: number, i: number, lesser: boolean, duration: number): ThreadGenerator {
    yield* all(
        ...rectangles.map((ref, idx) => {
            if (idx == i) {
                return ref().fill('yellow', duration)
            } else if (idx == j) {
                return ref().fill(lesser ? 'green' : 'red', duration)
            } else {
                return ref().fill('white', duration)
            }
        })
    )
}


export default makeScene2D(function* (view) {
    let random = useRandom();
    let n = 20;

    const rectangles = Array.from({length: n}, () => createRef<Rect>());
    const values = Array.from({length: n}, () => random.nextFloat());
    const dp = Array.from({length: n}, () => createRef<Latex>());
    const dp_values = Array.from({length: n}, () => 1);

    const bars_layout = createRef<Layout>();
    view.add(<Layout layout ref={bars_layout} gap={20} width={1400} height={800} alignItems={'end'}>
        {rectangles.map(ref =>
            <Rect ref={ref} grow={1} width={(1400 - (n - 1) * 20) / 20} stroke={'white'} fill={'white'}/>
        )}
    </Layout>)

    const dp_layout = createRef<Layout>();
    view.add(<Layout layout ref={dp_layout} gap={20} width={1400} height={100} y={450} alignItems={'end'}>
        {dp.map(ref =>
            <Latex ref={ref} tex={`1`} width={(1400 - (n - 1) * 20) / 20} margin={10} fill={'white'} scale={4}/>
        )}
    </Layout>)

    yield* sequence(
        0.025,
        ...dp.map((ref, i) => ref().scale(0).scale(1, 1)),
    );
    yield* sequence(
        0.025,
        ...rectangles.map((ref, i) => ref().height(values[i] * bars_layout().height(), 1)),
    );

    let speedSlow = 0.5;
    let speedFast = 0.07;

    for (let i = 1; i < n; i++) {
        let speed = i < 7 ? speedSlow : speedFast;

        for (let j = 0; j < i; j++) {
            const lesser: boolean = values[j] < values[i];
            yield* setColors(rectangles, j, i, lesser, speed);

            if (lesser && dp_values[j] + 1 > dp_values[i]) {
                dp_values[i] = dp_values[j] + 1;
                yield* dp[i]().tex(`${dp_values[i]}`, speed);
            }
        }

    }
});
