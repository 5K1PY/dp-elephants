import {Layout, Line, Latex, Shape, Circle} from '@motion-canvas/2d';
import {createRef, Reference} from '@motion-canvas/core';

export const COLORS = ["blue", "green"];
export const N = 5;
export const PRICES: number[] = [-6, 10, -25, 12, 30]; 
export const TYPES: number[] = [0, 0, 1, 0, 1];
export const TYPES_COLORS = Array.from(TYPES, (i) => COLORS[i]);

export function range(n: number) {
    return [...Array(n).keys()]
}

export function getArrow(ref: Reference<Line>, color: string, price: number) {
    const direction: number = price < 0 ? 1 : -1;
    return <Line
        ref={ref}
        points={[[-direction * 100, 0], [direction * 100, 0]]} stroke={color}
        arrowSize={45} lineWidth={40}
        position={[0, 0]}
        startArrow
    />
}

export function getLayout(layout: Reference<Layout>, elephants: Reference<Shape>[], arrows: Reference<Line>[], price_tags: Reference<Latex>[]) {
    const per_offer_layouts = Array.from({length: N}, () => createRef<Layout>());
    return <Layout layout ref={layout} gap={20} width={500} height={800} alignItems={'center'} direction={'column'}>
        {range(N).map(i =>
            <Layout layout ref={per_offer_layouts[i]} gap={100} width={500} height={200} alignItems={'center'} direction={'row'}>
            <Circle ref={elephants[i]} height={100} width={100} fill={TYPES_COLORS[i]}></Circle>
            {getArrow(arrows[i], "white", PRICES[i])}
            <Layout layout width={100} height={100} alignItems={'center'} justifyContent={'center'}>
                <Latex ref={price_tags[i]} tex={Math.abs(PRICES[i]).toString()} fill={'white'} scale={2}/>
            </Layout>
            </Layout>
        )}
    </Layout>;
}
