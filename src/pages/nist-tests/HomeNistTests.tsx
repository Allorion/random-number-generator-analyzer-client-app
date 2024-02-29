import React, {FC, useEffect} from "react";
import "./static/css/nist-home.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface IProps {

}

const listFormulas: { formula: string, id: string }[] = [
    {
        formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi>χ</mi><mn>2</mn></msup><mo>=</mo><mfrac><mrow><mn>4</mn><mi>m</mi></mrow><mi>M</mi></mfrac><munderover><mo>∑</mo><mrow><mi>i</mi><mo>=</mo><mn>1</mn></mrow><mi>M</mi></munderover><mo stretchy="false">(</mo><msub><mi>f</mi><mi>i</mi></msub><mo>−</mo><mfrac><mi>m</mi><mn>2</mn></mfrac><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">\\chi^2 = \\frac{4m}{M} \\sum_{i=1}^{M} (f_i - \\frac{m}{2})^2,</annotation></semantics></math>',
        id: 'blockFrequency-formula-1'
    },
    {
        formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><msup><mi>χ</mi><mn>2</mn></msup><mo>=</mo><mfrac><mrow><mn>4</mn><mo>×</mo><mn>10</mn></mrow><mn>10</mn></mfrac><mrow><mo fence="true">[</mo><mo stretchy="false">(</mo><mn>6</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>4</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>4</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>3</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>3</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>3</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>2</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>1</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>0</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo>+</mo><mo stretchy="false">(</mo><mn>0</mn><mo>−</mo><mn>5</mn><msup><mo stretchy="false">)</mo><mn>2</mn></msup><mo fence="true">]</mo></mrow><mo>=</mo><mn>40.</mn></mrow><annotation encoding="application/x-tex">\\chi^2 = \\frac{4 \\times 10}{10} \\left[ (6 - 5)^2 + (4 - 5)^2 + (4 - 5)^2 + (3 - 5)^2 + (3 - 5)^2 + (3 - 5)^2 + (2 - 5)^2 + (1 - 5)^2 + (0 - 5)^2 + (0 - 5)^2 \\right] = 40.</annotation></semantics></math>',
        id: 'blockFrequency-formula-2'
    },
    {
        formula: '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block"><semantics><mrow><mi>p</mi><mo>=</mo><msub><mi>Q</mi><msup><mi>χ</mi><mn>2</mn></msup></msub><mo stretchy="false">(</mo><mn>40</mn><mo separator="true">,</mo><mn>9</mn><mo stretchy="false">)</mo><mo>≈</mo><mn>1</mn><mo separator="true">,</mo><mn>47</mn><mo>×</mo><mn>1</mn><msup><mn>0</mn><mrow><mo>−</mo><mn>5</mn></mrow></msup><mo separator="true">,</mo></mrow><annotation encoding="application/x-tex">p = Q_{\\chi^2}(40, 9) \\approx 1,47 \\times 10^{-5},</annotation></semantics></math>',
        id: 'blockFrequency-formula-3'
    },
]

const HomeNistTests: FC<IProps> = ({}) => {

    const navigate = useNavigate()

    useEffect(() => {

        listFormulas.forEach(opt => {
            const el = window.document.getElementById(opt.id)

            if (el !== null) {
                el.innerHTML = opt.formula;
            }
        })

    }, []);

    return (
        <React.Fragment>
            <header>
                <h1>Статистические тесты NIST</h1>
                <Button variant={'contained'} color={'primary'}
                        onClick={() => navigate('/nist-tests-legacy/generator-analysis/')}>
                    Анализировать сгенерированную последовательность
                </Button>
            </header>
            <main>
                <Container>
                    <Paper className={'container-info'}>
                        <p className={'gost'}>
                            NIST STS - это способ оценить, насколько хорошо числа, использующиеся в криптографии, похожи
                            на случайные. Пакет статистических тестов, разработанный Лабораторией информационных
                            технологий, являющейся главной исследовательской организацией Национального института
                            стандартов и технологий. В его состав входят 15 статистических тестов, целью которых
                            является определение меры случайности двоичных последовательностей, порождённых либо
                            аппаратными, либо программными генераторами случайных чисел. Эти тесты основаны на различных
                            статистических свойствах, присущих только случайным последовательностям.
                        </p>
                        <h2 className={'gost'}>Принцип теста</h2>
                        <p className={'gost'}>
                            В статистических тестах, значение P-value используется для определения статистической
                            значимости результатов. Обычно, в контексте статистических тестов, уровень значимости
                            (alpha) задается заранее и представляет собой пороговое значение, ниже которого результаты
                            считаются статистически значимыми. Рассмотрим, в каких случаях p-value должно быть больше, а
                            в каких - меньше, чем alpha:
                        </p>
                        <ol className={'gost'}>
                            <li className={'gost'}>Frequency Test, Run Test, Run Test (Longest Run of Ones), Universal
                                Statistical Test: В
                                этих
                                тестах меньшее значение p-value указывает на большую статистическую значимость.
                                Если <span className={'bold gost'}>p-value &#60; alpha</span>, то это может
                                свидетельствовать о том, что данные не
                                случайны и
                                соответствуют тестируемым статистическим гипотезам.
                            </li>
                            <li className={'gost'}>Discrete Fourier Transform (Spectral) Test, Cumulative Sums
                                (Forward), Cumulative Sums
                                (Backward): В этих тестах, наоборот, <b>большее значение p-value</b> указывает на
                                большую
                                статистическую значимость. Меньшее p-value может свидетельствовать о наличии структурных
                                особенностей в данных.
                            </li>
                            <li className={'gost'}>Random Excursion Test, Random Excursion Variant Test: Для этих тестов
                                меньшее значение
                                p-value
                                также указывает на большую статистическую значимость. Если <span
                                    className={'bold gost'}>p-value &#60; alpha</span>,
                                это может
                                указывать на наличие незапланированных "экскурсий" в данных, что может быть
                                интерпретировано как
                                аномалии.
                            </li>
                        </ol>
                        <p className={'gost'}>
                            Для сравнения p-value результатов тестов NIST, можно использовать следующие общепринятые
                            уровни значимости:
                        </p>
                        <ol className={'gost'}>
                            <li className={'gost'}><span className={'bold gost'}>0.01 (1%)</span> - для строгих
                                требований к статистической значимости.
                            </li>
                            <li className={'gost'}><span className={'bold gost'}>0.05 (5%)</span> - для типичных задач и
                                стандартной степени уверенности.
                            </li>
                            <li className={'gost'}><span className={'bold gost'}>0.1 (10%)</span> - для менее строгих
                                требований.
                            </li>
                        </ol>
                        <p className={'gost'}>
                            Выбор конкретного уровня значимости зависит от конкретной задачи и требований к
                            статистической значимости. Если p-value меньше выбранного уровня значимости, это может
                            указывать на то, что результат считается статистически значимым, и нулевая гипотеза может
                            быть отклонена.
                        </p>
                        <p className={'gost'}>
                            Тем не менее, следует учитывать, что важно учитывать контекст конкретной задачи и
                            статистические показатели, исходя из которых выбирается уровень значимости.
                        </p>


                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="frequencyTestPanel-content"
                                id="frequencyTestPanel-header"
                            >
                                Частотный (побитовый) тест (Frequency Monobit Test)
                            </AccordionSummary>
                            <AccordionDetails>
                                <p className={'gost'}>
                                    Частотный (побитовый) тест (Frequency Monobit Test) из набора NIST STS — это
                                    один из статистических тестов, которые используются для проверки случайности
                                    двоичных последовательностей, полученных от генераторов случайных чисел.
                                    Цель этого теста — определить, равномерно ли распределены нули и единицы во
                                    всей последовательности, то есть, примерно ли одинаково их количество. Это
                                    ожидается от истинно случайной последовательности.
                                </p>
                                <p className={'gost'}>
                                    Для выполнения теста нужно подсчитать сумму всех битов в последовательности,
                                    где единице соответствует +1, а нулю — -1. Затем нужно вычислить статистику
                                    S, которая равна отношению этой суммы к квадратному корню из длины
                                    последовательности. Статистика S имеет нормальное распределение со средним 0
                                    и дисперсией 1. Для получения вероятности p, которая показывает, насколько
                                    случайна последовательность, нужно вычислить функцию ошибки от модуля S и
                                    умножить результат на 2. Если p меньше 0,01, то последовательность не
                                    проходит тест, то есть не является случайной.
                                </p>
                                <p className={'gost'}>
                                    <span className={'bold'}>Пример: пусть дана последовательность длиной 100 бит:</span>
                                </p>
                                <pre
                                    className={'gost'}>
                                            <code className={'gost'}>
                                                1011010010010010001101000100100001110000101100000110000001000000000000000000000000000000000000000
                                            </code>
                                        </pre>
                                <p className={'gost'}>
                                    Сумма битов равна -36, статистика S равна -3.6, P-value равна 0,00032.
                                    Это означает, что последовательность не проходит частотный побитовый тест,
                                    так как в ней слишком много нулей по сравнению с единицами.
                                </p>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="blockFrequencyPanel-content"
                                id="blockFrequencyPanel-header"
                            >
                                Тест на блочную частоту (Block Frequency Test)
                            </AccordionSummary>
                            <AccordionDetails>
                                <p className={'gost'}>
                                    Тест на блочную частоту (Block Frequency Test) из набора NIST STS — это
                                    статистический тест, который проверяет, равномерно ли распределены нули и
                                    единицы в каждом из M неперекрывающихся блоков, созданных из двоичной
                                    последовательности. Цель этого теста — определить, близка ли доля единиц в
                                    каждом блоке к 0,5, как это ожидается от истинно случайной
                                    последовательности.
                                </p>
                                <p className={'gost'}>
                                    Для выполнения теста нужно разделить последовательность длины n на M
                                    блоков длины m, где n = Mm. Затем нужно подсчитать частоту единиц в
                                    каждом блоке и вычислить статистику χ<sup>2</sup>, которая равна:
                                </p>
                                <p className={'gost formula'} id={'blockFrequency-formula-1'} data-number="1"/>
                                <p className={'gost'}>
                                    где <em>f<sub>i</sub></em> — число единиц в <em>i</em>-м блоке.
                                    Статистика <em>X<sub>2</sub></em> имеет хи-квадрат распределение с M-1
                                    степенями свободы. Для получения вероятности p, которая показывает,
                                    насколько случайна последовательность, нужно вычислить функцию хи-квадрат от
                                    <em>X<sub>2</sub></em> и M-1. Если p меньше 0,01, то последовательность не
                                    проходит тест, то есть не является случайной.
                                </p>
                                <p className={'gost'}>
                                    <span
                                        className={'bold'}>Пример: пусть дана последовательность длиной 100 бит:</span>
                                </p>
                                <pre
                                    className={'gost'}>
                                            <code className={'gost'}>
                                                1011010010010010001101000100100001110000101100000110000001000000000000000000000000000000000000000
                                            </code>
                                        </pre>
                                <p className={'gost'}>
                                    Пусть M = 10, то есть делим последовательность на 10 блоков по 10 бит. Тогда
                                    частоты единиц в блоках будут:
                                </p>
                                <pre className={'gost'}>
                                            <code className={'gost'}>
                                                6, 4, 4, 3, 3, 3, 2, 1, 0, 0
                                            </code>
                                        </pre>
                                <p className={'gost'}>Статистика <em>X<sub>2</sub></em> будет равна:</p>
                                <p className={'gost formula'} id={'blockFrequency-formula-2'} data-number="2"/>
                                <p className={'gost'}>Вероятность p будет равна:</p>
                                <p className={'gost formula'} id={'blockFrequency-formula-3'} data-number="3"/>
                                <p className={'gost'}>
                                    где <em>Q<sub>χ<sup>2</sup></sub></em> — функция хи-квадрат. Это означает,
                                    что последовательность не проходит тест на блочную частоту, так как в ней
                                    неравномерно распределены нули и единицы в блоках.
                                </p>
                            </AccordionDetails>
                        </Accordion>



                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="frequencyTestPanel-content"
                                id="frequencyTestPanel-header"
                            >

                            </AccordionSummary>
                            <AccordionDetails>

                            </AccordionDetails>
                        </Accordion>
                    </Paper>
                </Container>
            </main>
        </React.Fragment>
    )
};

export default HomeNistTests;

