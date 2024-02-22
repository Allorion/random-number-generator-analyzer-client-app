import StackOfBooksTestHome from "./StackOfBooksTestHome";
import StackOfBooksGenAnalysis from "./components/generator-analysis/StackOfBooksGenAnalysis";

export const StackOfBooksTestUrls: { data: { element: JSX.Element, path: string }[] } = {
    data: [
        {
            element: <StackOfBooksTestHome/>,
            path: "/stack-of-books/home/",
        },
        {
            element: <StackOfBooksGenAnalysis/>,
            path: "/stack-of-books/generator-analysis/",
        },
    ]
}