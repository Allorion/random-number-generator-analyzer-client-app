import React, {FC} from "react";
import {HashRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import GeneratorBinaryFiles from "./pages/generator-binary-files/GeneratorBinaryFiles";
import NavBar from "./pages/global-elements/components/nav-bar/NavBar";
import {NistTestUrl} from "./pages/nist-tests/NistTestUrl";
import {StackOfBooksTestUrls} from "./pages/stack-of-books-test/StackOfBooksTestUrls";
import GraphicalDistributionTestOnPlaneHome
    from "./pages/graphical-distribution-test-on-a-plane/GraphicalDistributionTestOnPlaneHome";
import {GraphDistributionTestUrl} from "./pages/graphical-distribution-test-on-a-plane/GraphDistributionTestUrl";

const ListRoutes: FC = ({}) => {

    return (
        <React.Fragment>
            <HashRouter>
                <header className={'site-header'}>
                    <NavBar/>
                </header>
                <Routes>
                    <Route
                        path='/'
                        element={<Home/>}
                    />
                    <Route
                        path='/generator-binary-files'
                        element={<GeneratorBinaryFiles/>}
                    />

                    {/* Модуль тестов NIST */}
                    {NistTestUrl.data.map((entry) => {
                        return (
                            <Route {...entry}/>
                        )
                    })}

                    {/* Модуль теста "Стопка книг" */}
                    {StackOfBooksTestUrls.data.map((entry) => {
                        return (
                            <Route {...entry}/>
                        )
                    })}

                    {/* Модуль теста "Распределение на плоскости" */}
                    {GraphDistributionTestUrl.data.map((entry) => {
                        return (
                            <Route {...entry}/>
                        )
                    })}
                </Routes>
            </HashRouter>
        </React.Fragment>
    )
};

export default ListRoutes;