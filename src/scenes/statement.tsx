import {Layout, makeScene2D, Line, Latex, Circle} from '@motion-canvas/2d';
import {all, createRef, sequence} from '@motion-canvas/core';
import {range, N, getLayout} from '../elephants';

export default makeScene2D(function* (view) {
    const elephants = Array.from({length: N}, () => createRef<Circle>());
    const arrows = Array.from({length: N}, () => createRef<Line>());
    const price_tags = Array.from({length: N}, () => createRef<Latex>());

    const layout = createRef<Layout>();
    view.add(getLayout(layout, elephants, arrows, price_tags))
    const duration = 1.5;
    yield* sequence(
        duration/3,
        ...range(N).map(i => all(
            elephants[i]().opacity(0).opacity(1, duration),
            arrows[i]().opacity(0).opacity(1, duration),
            price_tags[i]().opacity(0).opacity(1, duration)
        )),
    );
});
