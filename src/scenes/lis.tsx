import {Layout, makeScene2D, Rect, Latex, Shape} from '@motion-canvas/2d';
import {all, createRef, Reference, sequence, ThreadGenerator, useRandom, waitFor} from '@motion-canvas/core';


function* setColors(rectangles: Array<Reference<Shape>>, prev: Array<number>, j: number, i: number, lesser: boolean, duration: number): ThreadGenerator {
    let x: number;
    let prev_seq: Array<number> = [j];
    while ((x = prev[prev_seq[prev_seq.length-1]]) >= 0) {
        prev_seq.push(x);
    }
    yield* all(
        ...rectangles.map((ref, idx) => {
            if (idx == i) {
                return ref().fill('yellow', duration)
            } else if (idx == j) {
                if (lesser) {
                    return ref().fill('green', duration)
                } else {
                    return ref().fill('red', duration)
                }
            } else if (lesser && prev_seq.includes(idx)) {
                return ref().fill('cyan', duration)
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
    const prev = Array.from({length: n}, () => -1);

    const li = createRef<Latex>();
    view.add(<Latex ref={li} tex={'\\ell_i'} width={(1400 - (n - 1) * 20) / 20} x={-750} y={460} margin={10} fill={'white'} scale={0}/>);
    const ai =  createRef<Latex>();
    view.add(<Latex ref={ai} tex={'a_i'} fontSize={56} x={-750} y={0} margin={10} fill={'white'} scale={0}/>);
    const solution_expr = createRef<Latex>();
    view.add(<Latex ref={solution_expr} x={400} y={0} margin={10} fill={'white'} scale={1}/>);
    const solution_expr1 = ['\\ell_j = \\max_{i<j', '', '}(\\ell_i + 1)'];
    const solution_expr2 = ['\\ell_j = \\max_{i<j', '\\: \\land \\: a_i < a_j', '}(\\ell_i + 1)'];

    const bars_layout = createRef<Layout>();
    view.add(<Layout layout ref={bars_layout} gap={20} width={1400} height={800} alignItems={'end'}>
        {rectangles.map(ref =>
            <Rect ref={ref} grow={1} width={(1400 - (n - 1) * 20) / 20} stroke={'white'} fill={'white'}/>
        )}
    </Layout>)

    const dp_layout = createRef<Layout>();
    view.add(<Layout layout ref={dp_layout} gap={20} width={1400} height={100} y={450} alignItems={'end'}>
        {dp.map(ref =>
            <Latex ref={ref} tex={`1`} width={(1400 - (n - 1) * 20) / 20} margin={10} fill={'white'} scale={0}/>
        )}
    </Layout>)

    yield* sequence(
        0.025,
        ...rectangles.slice(0, n/2).map((ref, i) => ref().height(values[i] * bars_layout().height(), 1)),
    );
    yield li().scale(0).scale(1, 1);
    yield ai().scale(0).scale(1, 1);
    yield* sequence(
        0.025,
        ...dp.slice(0, n/2).map((ref, i) => ref().scale(0).scale(1, 1)),
    );

    yield* waitFor(1.0);
    yield* solution_expr().tex(solution_expr1, 1.0);
    yield* solution_expr().tex(solution_expr1).tex(solution_expr2, 1.0);
    yield* waitFor(1.0);
    yield* all(solution_expr().opacity(1).opacity(0, 1));

    // --- algorithm animation ---

    yield* sequence(
        0.025,
        ...rectangles.slice(n/2).map((ref, i) => ref().height(values[i] * bars_layout().height(), 1)),
        ...dp.slice(n/2).map((ref, i) => ref().scale(0).scale(1, 1)),
    );

    let speedSlow = 0.5;
    let speedFast = 0.1;

    for (let i = 1; i < n; i++) {
        let speed = i < 7 ? speedSlow : speedFast;

        for (let j = 0; j < i; j++) {
            const lesser: boolean = values[j] < values[i];
            yield* setColors(rectangles, prev, j, i, lesser, speed);

            if (lesser && dp_values[j] + 1 > dp_values[i]) {
                dp_values[i] = dp_values[j] + 1;
                prev[i] = j;
                yield* dp[i]().tex(`${dp_values[i]}`, speed);
            }
        }

    }
});
