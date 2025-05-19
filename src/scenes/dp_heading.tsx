import {makeScene2D, Txt} from '@motion-canvas/2d';
import {createRef, waitFor} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
    const dynamic_programming_heading = createRef<Txt>();
    view.add(<Txt ref={dynamic_programming_heading} fill={"white"} fontSize={128}></Txt>);
    yield* dynamic_programming_heading().text("Dynamic programming", 2);
    yield* waitFor(5.0);
    yield* dynamic_programming_heading().opacity(0, 1);
});
