import CountRepeatsTestHome from "./CountRepeatsTestHome";
import CountRepeatsTestAnalysis from "./components/CountRepeatsTestAnalysis";


export const CountRepeatsTest: { data: { element: JSX.Element, path: string }[] } = {
    data: [
        {
            element: <CountRepeatsTestHome/>,
            path: "/count-repeats-test/home/",
        },
        {
            element: <CountRepeatsTestAnalysis/>,
            path: "/count-repeats-test/generator-analysis/",
        },
    ]
}