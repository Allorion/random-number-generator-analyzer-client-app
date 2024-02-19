import HomeNistTests from "./HomeNistTests";
import GeneratorAnalysis from "./components/generator-analysis/GeneratorAnalysis";

export const NistTestUrl: { data: { element: JSX.Element, path: string }[] } = {
    data: [
        {
            element: <HomeNistTests/>,
            path: "/nist-tests/home/",
        },
        {
            element: <GeneratorAnalysis/>,
            path: "/nist-tests/generator-analysis/",
        },
    ]
}