import {Layout, makeScene2D, Rect, Line, Curve, Latex, Shape, Circle} from '@motion-canvas/2d';
import {all, createRef, Direction, Reference, sequence, ThreadGenerator, useRandom} from '@motion-canvas/core';


function range(n: number) {
    return [...Array(n).keys()]
}

function getArrow(ref: Reference<Line>, color: string, price: number) {
    const direction: number = price > 0 ? 1 : -1;
    return <Line
        ref={ref}
        points={[[-direction * 100, 0], [direction * 100, 0]]} stroke={color}
        arrowSize={45} lineWidth={40}
        position={[0, 0]}
        startArrow
    />
}


export default makeScene2D(function* (view) {
    const COLORS = ["red", "green", "blue"];
    let random = useRandom();
    let n = 5;

    const prices = random.intArray(n, -20, 20);
    const colors = Array.from({length: n}, () => COLORS[random.nextInt(0, COLORS.length)]);
    const elephants = Array.from({length: n}, () => createRef<Circle>());
    const arrows = Array.from({length: n}, () => createRef<Line>());
    const price_tags = Array.from({length: n}, () => createRef<Latex>());
    
    const offers_layout = createRef<Layout>();
    const per_offer_layouts = Array.from({length: n}, () => createRef<Layout>());
    view.add(<Layout layout ref={offers_layout} gap={20} width={500} height={800} alignItems={'center'} direction={'column'}>
        {range(n).map(i =>
            <Layout layout ref={per_offer_layouts[i]} gap={100} width={500} height={200} alignItems={'center'} direction={'row'}>
            <Circle ref={elephants[i]} height={100} width={100} fill={colors[i]}></Circle>
            {getArrow(arrows[i], "white", prices[i])}
            <Layout layout width={100} height={100} alignItems={'center'} justifyContent={'center'}>
            <Latex ref={price_tags[i]} tex={Math.abs(prices[i]).toString()} fill={'white'} scale={2}/>
            </Layout>
            </Layout>
        )}
    </Layout>)

    yield* sequence(
        0.025,
        ...range(n).map(i => all(
            elephants[i]().opacity(0).opacity(1, 0.5),
            arrows[i]().opacity(0).opacity(1, 0.5),
            price_tags[i]().opacity(0).opacity(1, 0.5)
        )),
    );

});
