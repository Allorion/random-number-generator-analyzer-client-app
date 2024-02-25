import React, {FC, useEffect, useState} from "react";
import "./NavBar.css"
import {Link, useLocation} from "react-router-dom";

interface IProps {

}

const NavBar: FC<IProps> = ({}) => {

    const location = useLocation()

    const [url, setUrl] = useState<string[]>(['', ''])

    useEffect(() => {
        setUrl(location.pathname.split('/'))
    }, [location]);

    return (
        <React.Fragment>
            <nav className={'nav-bar'}>
                <Link
                    to={'/'}
                    className={`nav-link ${url[1] === '' ? 'active' : ''}`}
                >
                    <b>ALLORION Analyzer Random Generator</b>
                </Link>
                <Link
                    to={'/generator-binary-files/'}
                    className={`nav-link ${url[1] === 'generator-binary-files' ? 'active' : ''}`}
                >
                    Генератор бинарных последовательностей
                </Link>
                <div className={`nav-link ${url[1] === 'nist-tests' ? 'active' : ''} dropdown`}>
                    Статистические тесты NIST
                    <ul className={'nav-link-dropdown'}>
                        <Link
                            to={'/nist-tests/home/'}
                        >
                            <li className={`${`${url[1]}-${url[2]}` === 'nist-tests-home' ? 'active' : ''}`}>
                                NIST Statistical Test
                            </li>
                        </Link>
                        <Link
                            to={'/nist-tests/generator-analysis/'}
                        >
                            <li className={`${`${url[1]}-${url[2]}` === 'nist-tests-generator-analysis' ? 'active' : ''}`}>
                                Анализ генератора
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className={`nav-link ${url[1] === 'stack-of-books' ? 'active' : ''} dropdown`}>
                    Статистический тест "Стопка книг"
                    <ul className={'nav-link-dropdown'}>
                        <Link
                            to={'/stack-of-books/home/'}
                        >
                            <li className={`${`${url[1]}-${url[2]}` === 'stack-of-books-home' ? 'active' : ''}`}>
                                "Стопка книг"
                            </li>
                        </Link>
                        <Link
                            to={'/stack-of-books/generator-analysis/'}
                        >
                            <li className={`${`${url[1]}-${url[2]}` === 'stack-of-books-generator-analysis' ? 'active' : ''}`}>
                                Анализ генератора
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className={`nav-link ${url[1] === 'stack-of-books' ? 'active' : ''} dropdown`}>
                    Графический тест "Распределение на плоскости"
                    <ul className={'nav-link-dropdown'}>
                        <Link
                            to={'/graph-distribution-test/home/'}
                        >
                            <li className={`${`${url[1]}-${url[2]}` === 'stack-of-books-home' ? 'active' : ''}`}>
                                "Распределение на плоскости"
                            </li>
                        </Link>
                        <Link
                            to={'/graph-distribution-test/generator-analysis/'}
                        >
                            <li className={`${`${url[1]}-${url[2]}` === 'stack-of-books-generator-analysis' ? 'active' : ''}`}>
                                Анализ генератора
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    )
};

export default NavBar;