import React, {useEffect} from 'react';
import {Button, Container, Paper, Stack, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useNavigate} from "react-router-dom";

function GraphicalDisTableRowibutionTestOnPlaneHome() {

    const navigate = useNavigate()

    useEffect(() => {
        const formula = '<math><mi>X</mi><mo>=</mo><mi>Y</mi><mo>=</mo><msqrt><mtext>длина проверяемой битовой последовательности</mtext></msqrt></math>'

        const el = window.document.getElementById('calculation-formula-XY')

        if (el !== null) {
            el.innerHTML = formula;
        }
    }, []);

    return (
        <React.Fragment>
            <header>
                <h1 className={'gost'}>Графический тест "Распределение на плоскости"</h1>
                <Button variant={'contained'} color={'primary'}
                        onClick={() => navigate('/graph-disTableRowibution-test/generator-analysis/')}>
                    Анализировать сгенерированную последовательность
                </Button>
            </header>
            <main>
                <Container>
                    <Paper className={'container-info'}>
                        <p className={'gost'}>Графический тест “Распределение на плоскости” предназначен для визуальной оценки
                            равномерности
                            распределения последовательностей чисел, сгенерированных генераторами случайных чисел (ГСЧ).
                            Этот
                            тест позволяет оценить, насколько хорошо ГСЧ распределяет числа в многомерном пространстве.
                            Это
                            важно для проверки качества ГСЧ, которые используются в различных областях науки и техники,
                            таких
                            как криптография, статистика, моделирование и т.д.</p>
                        <h2 className={'gost'}>Принцип теста</h2>
                        <p className={'gost'}>Принцип теста заключается в следующем:</p>
                        <ul className={'gost'}>
                            <li className={'gost'}>С помощью ГСЧ генерируются пары чисел в заданном диапазоне.</li>
                            <li className={'gost'}>Каждая пара чисел интерпретируется как координаты точки на плоскости.</li>
                            <li className={'gost'}>Точки наносятся на график с соответствующим масштабом.</li>
                            <li className={'gost'}>Анализируется визуальное распределение точек на графике. Если точки равномерно
                                распределены по всей плоскости, это свидетельствует о хорошем качестве ГСЧ. Если же
                                точки образуют какие-либо узоры, кластеры, пропуски или аномалии, это указывает на
                                недостатки ГСЧ.
                            </li>
                        </ul>
                        <p className={'gost'}>Следует отметить, что этот тест является лишь одним из многих методов тестирования ГСЧ.
                            Другие
                            тесты
                            могут включать проверку равномерности распределения, тест “стопка книг”, тест
                            χ<sup>2</sup> и другие. Эти
                            тесты
                            помогают оценить различные аспекты качества ГСЧ, такие как периодичность, корреляция,
                            независимость
                            и т.д.</p>
                        <p className={'gost'}>Также стоит учесть, что графический тест “Распределение на плоскости” является визуальным и
                            субъективным, поэтому его результаты могут варьироваться в зависимости от интерпретации. Для
                            более
                            объективной оценки качества ГСЧ рекомендуется использовать набор различных статистических
                            тестов, а
                            также сравнивать результаты с теоретическими ожиданиями.</p>
                        <h2 className={'gost'}>Порядок тестирования</h2>
                        <p className={'gost'}>Для выполнения тестирования с помощью программного комплекса необходимо:</p>
                        <ol className={'gost'}>
                            <li className={'gost'}>Выбрать сгенерированную битовую последовательность, которая будет тестироваться.</li>
                            <li className={'gost'}>Указать количество бит для тестирования, которое должно быть достаточным для получения
                                статистически значимых результатов.
                            </li>
                            <li className={'gost'}>Выбрать один из двух режимов работы:</li>
                        </ol>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><span className={'gost bold'}>Режим</span></TableCell>
                                    <TableCell><span className={'gost bold'}>Описание</span></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell><span className={'gost bold'}>Анализ байтов</span></TableCell>
                                    <TableCell>
                                        <p className={'gost'}>
                                            В режиме анализа байтов битовая последовательность преобразуется в массив
                                            байт, каждый байт
                                            с нечетным индексом берется за координату X, а с четным индексом берется за
                                            координату Y,
                                            полученные координаты рисуются на графике размером 256 на 256 пикселей.
                                        </p>
                                        <p className={'gost'}>
                                            <span className={'gost bold'}>
                                                В данном режиме существует два вида отображения:
                                            </span>
                                            &nbsp;с учетом плотности заполнения, когда чем чаще встречается точка, тем более
                                            отчетливо ее видно на графике, и без учета плотности заполнения, когда
                                            каждый пиксель рисуется максимально отчетливо. Это позволяет увидеть
                                            различные характеристики распределения, такие как частота, дисперсия,
                                            асимметрия и т.д.
                                        </p>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell><span className={'gost bold'}>Анализ битов</span></TableCell>
                                    <TableCell>
                                        <p className={'gost'}>В данном режиме размер графика определяется согласно формуле:</p>
                                        <p className={'gost'} style={{ display: "flex", justifyContent: 'center', height: '27px' }}>
                                            <p className={'gost'} id={'calculation-formula-XY'}/>
                                            <span className={'gost'}>(1)</span>
                                        </p>
                                        <p className={'gost'}>
                                            <span className={'gost bold'}>
                                                * В случае, если число получается не целым, то округление производится в меньшую
                                            сторону.
                                            </span>
                                        </p>
                                        <p className={'gost'}>
                                            Построение графика осуществляется по следующему алгоритму: каждый элемент
                                            битовой
                                            последовательности рисуется по порядку, занимая положение на графике от
                                            верхнего
                                            левого
                                            угла
                                            слева на право сверху вниз, занимая каждый пиксель, если бит равен 1, то
                                            пиксель
                                            рисуется
                                            черным цветом, если 0, то белым. Это позволяет увидеть различные особенности
                                            распределения,
                                            такие как периодичность, структура, аномалии и т.д.
                                        </p>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <p className={'gost'}>По построенным графикам анализ производится визуально. Если точки равномерно распределены по
                            всей
                            плоскости, это свидетельствует о хорошем качестве ГСЧ. Если же точки образуют какие-либо
                            узоры,
                            кластеры, пропуски или аномалии, это указывает на недостатки ГСЧ.</p>
                    </Paper>
                </Container>
            </main>
        </React.Fragment>
    );
}

// Экспортируем компонент
export default GraphicalDisTableRowibutionTestOnPlaneHome;
