import React, {FC, JSX} from "react";
import {useAppSelector} from "../../../../store/hooks/redux";
import {selectAllStackOfBooksResult} from "../../reducers/StackOfBooksResultDataSlice";
import {alExportTableToExcel, ALPaper} from "../../../../allorion-ui";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {htmlString} from "../../../../allorion-ui/function-elements/alExportTableToExcel/dop-function/htmlString";
import {IRespDataStackOfBooks} from "../../types/TypesStackOfBooks";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StackOfBooksChartsAnalysis from "./StackOfBooksChartsAnalysis";

interface IProps {

}

const StackOfBooksResultAnalysis: FC<IProps> = ({}) => {

    const selectStackOfBooksResult = useAppSelector(selectAllStackOfBooksResult)

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const renderAndExportTb = (render: boolean, opt: IRespDataStackOfBooks, index: number): JSX.Element => {
        return (
            <React.Fragment>
                {!render && <p>Тест для файла {opt.nameFile}</p>}
                <p>Выбранная ALPHA: {opt.alpha}</p>
                <p>Количество битов для одного теста: {opt.numberOfBits}</p>
                <p>Количество тестов для файла: {opt.bitstreams}</p>
                <p>Длина блока: {opt.blockSize}</p>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>№ п/п</TableCell>
                            <TableCell>Статистика хи-квадрат (chi)</TableCell>
                            <TableCell>Число степеней свободы (n)</TableCell>
                            <TableCell>Критическое значение хи-квадрат</TableCell>
                            <TableCell>Частота группы (frequencies)</TableCell>
                            <TableCell>Основной результат прохождения теста</TableCell>
                            <TableCell>pValue</TableCell>
                            <TableCell>По результату p_value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {opt.result.map((el, indexEl) => {
                            if (typeof el === "string") {
                                return (
                                    <TableRow key={indexEl}>
                                        <TableCell>{indexEl + 1}</TableCell>
                                        <TableCell colSpan={6}>{el}</TableCell>
                                    </TableRow>
                                )
                            } else {
                                return (
                                    <TableRow key={indexEl}
                                              sx={{backgroundColor: el.passed ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                        <TableCell>{indexEl + 1}</TableCell>
                                        <TableCell>{el.chi.toFixed(6)}</TableCell>
                                        <TableCell>{el.df}</TableCell>
                                        <TableCell>{el.chiCritical}</TableCell>
                                        <TableCell>{el.frequencies.slice(0, 30).join(', ')}{el.frequencies.length > 30 ? '...' : ''}</TableCell>
                                        <TableCell>{el.passed ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                        <TableCell>{el.pValue.toFixed(6)}</TableCell>
                                        <TableCell>{el.resultPValue === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                    </TableRow>
                                )
                            }
                        })}
                    </TableBody>
                </Table>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <ALPaper className={'result-tests'} label={'Результат выполнения тестов'}>
                <div className={'block-result'}>
                    {selectStackOfBooksResult.map((opt, index) => {
                        return (
                            <Accordion key={'panelStackOfBooksTest' + index}
                                       expanded={expanded === 'panelStackOfBooksTest' + index}
                                       onChange={handleChange('panelStackOfBooksTest' + index)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panelStackOfBooksTest-content"
                                >
                                    <Typography sx={{width: '70%', flexShrink: 0}}>
                                        Тест последовательности {opt.nameFile}
                                    </Typography>
                                    <Typography sx={{width: '70%', flexShrink: 0}}>
                                        Количество пройденных тестов {opt.quantityCompletedTests}/{opt.bitstreams}
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Button
                                        color={'primary'}
                                        variant={'contained'}
                                        onClick={() => {
                                            alExportTableToExcel({
                                                jsxElement: htmlString(renderAndExportTb(false, opt, index)),
                                                fileName: `result-stack-of-books-test ${opt.nameFile.slice(0, opt.nameFile.length - 4)}`,
                                            }).then(result => {
                                                if (result) {
                                                    // setExportSuccess({
                                                    //     title: 'Экспорт выполнен',
                                                    //     variant: "success",
                                                    //     body: 'Таблица добавлена в Excel',
                                                    //     open: true
                                                    // })
                                                } else {
                                                    // setExportSuccess({
                                                    //     title: 'Экспорт не выполнен',
                                                    //     variant: "error",
                                                    //     body: 'Таблица не добавлена в Excel',
                                                    //     open: false
                                                    // })
                                                }
                                            })
                                        }}
                                    >
                                        Выполнить экспорт в Excel
                                    </Button>
                                    {renderAndExportTb(true, opt, index)}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </div>
            </ALPaper>
            <ALPaper label={'Графики по результатам выполнения тестов'}>
                {selectStackOfBooksResult.map((opt, index) => {
                    return (
                        <ALPaper label={`Результат тестирования последовательности ${opt.nameFile}`}>
                            <div style={{width: "auto", height: 400}}>
                                <StackOfBooksChartsAnalysis data={opt}/>
                            </div>
                        </ALPaper>
                    )
                })}
            </ALPaper>
        </React.Fragment>
    )
};

export default StackOfBooksResultAnalysis;