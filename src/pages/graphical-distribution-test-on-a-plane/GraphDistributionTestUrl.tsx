import GraphicalDistributionTestOnPlaneHome from "./GraphicalDistributionTestOnPlaneHome";
import GraphicalDistributionTestOnPlaneAnalysis from "./components/GraphicalDistributionTestOnPlaneAnalysis";


export const GraphDistributionTestUrl: { data: { element: JSX.Element, path: string }[] } = {
    data: [
        {
            element: <GraphicalDistributionTestOnPlaneHome/>,
            path: "/graph-distribution-test/home/",
        },
        {
            element: <GraphicalDistributionTestOnPlaneAnalysis/>,
            path: "/graph-distribution-test/generator-analysis/",
        },
    ]
}