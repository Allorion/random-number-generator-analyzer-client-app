import React, {FC} from "react";
import {alExportTableToExcel, ALPaper} from "../../../../../allorion-ui";
import {useAppSelector} from "../../../../../store/hooks/redux";
import {selectAllDataAnalysisNistTests} from "../../../reducers/DataAnalysisNistTestsSlice";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary, Button,
    Table,
    TableBody, TableCell,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {htmlString} from "../../../../../allorion-ui/function-elements/alExportTableToExcel/dop-function/htmlString";
import {IDataAnalysisNistTests} from "../../../types/TypesNistTests";

interface IProps {

}

const ResultTests: FC<IProps> = ({}) => {

    const allDataAnalysisNistTests = useAppSelector(selectAllDataAnalysisNistTests)

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    console.log(allDataAnalysisNistTests)

    const renderAndExportTb = (render: boolean, opt: IDataAnalysisNistTests, index: number): JSX.Element => {
        return (
            <React.Fragment>
                {!render && <p>Тест для файла {opt.nameFile}</p>}
                <p>Выбранная ALPHA: {opt.alpha}</p>
                <p>Количество битов для одного теста: {opt.numberOfBits}</p>
                <p>Количество тестов для файла: {opt.bitstreams}</p>
                {
                    opt.dopParams.bftParam !== undefined &&
                    <p>Block Frequency Test - длина блока(M): {opt.dopParams.bftParam}</p>
                }
                {
                opt.frequencyTest !== undefined &&
                    <Accordion key={'panelFreq' + index} expanded={expanded === 'panelFreq' + index}
                               onChange={handleChange('panelFreq' + index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelFreq-content"
                        >
                            <Typography sx={{width: '70%', flexShrink: 0}}>
                                Frequency Test (Комбинированная P-Value
                                = {opt.combinePValue['frequencyTest']?.toFixed(6)})
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов {opt.frequencyTest.length}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№ п/п</TableCell>
                                        <TableCell>N-я частичная сумма(sum)</TableCell>
                                        <TableCell>S_n/n</TableCell>
                                        <TableCell>p_value</TableCell>
                                        <TableCell>Результат</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {opt.frequencyTest.map((el, indexEl) => {
                                        if (typeof el === "string") {
                                            return (
                                                <TableRow key={'frequencyTest' + indexEl}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell colSpan={4}>{el}</TableCell>
                                                </TableRow>
                                            )
                                        } else {
                                            return (
                                                <TableRow key={'frequencyTest' + indexEl}
                                                          sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell>{el.a}</TableCell>
                                                    <TableCell>{el.b}</TableCell>
                                                    <TableCell>{el.pValue?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                }
                {
                    opt.blockFrequency !== undefined &&
                    <Accordion key={'panelBlockFreq' + index} expanded={expanded === 'panelBlockFreq' + index}
                               onChange={handleChange('panelBlockFreq' + index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelBlockFreq-content"
                        >
                            <Typography sx={{width: '70%', flexShrink: 0}}>
                                Block Frequency Test (Комбинированная P-Value
                                = {opt.combinePValue['blockFrequency']?.toFixed(6)})
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов {opt.blockFrequency.length}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№ п/п</TableCell>
                                        <TableCell>Chi<sup>2</sup></TableCell>
                                        <TableCell># of substrings</TableCell>
                                        <TableCell>Длина блока</TableCell>
                                        <TableCell>Note: bits were discarded</TableCell>
                                        <TableCell>p_value</TableCell>
                                        <TableCell>Результат</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {opt.blockFrequency.map((el, indexEl) => {
                                        if (typeof el === "string") {
                                            return (
                                                <TableRow key={'blockFrequency' + indexEl}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell colSpan={6}>{el}</TableCell>
                                                </TableRow>
                                            )
                                        } else {
                                            return (
                                                <TableRow key={'blockFrequency' + indexEl}
                                                          sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell>{el.a}</TableCell>
                                                    <TableCell>{el.b}</TableCell>
                                                    <TableCell>{el.c}</TableCell>
                                                    <TableCell>{el.d}</TableCell>
                                                    <TableCell>{el.pValue?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                }
                {
                    opt.cumulativeSums !== undefined &&
                    <Accordion key={'panelCumul' + index} expanded={expanded === 'panelCumul' + index}
                               onChange={handleChange('panelCumul' + index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelCumul-content"
                        >
                            <Typography sx={{width: '70%', flexShrink: 0}}>
                                Cumulative Sums Test (Комбинированная P-Value
                                = Forward: {opt.combinePValue['cumulativeSums']?.forward.toFixed(6)} Backwards: {opt.combinePValue['cumulativeSums']?.backwards.toFixed(6)})
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов Forward {opt.cumulativeSums.forward.length}
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов Backwards {opt.cumulativeSums.backwards.length}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ALPaper label={'Forward'}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>№ п/п</TableCell>
                                            <TableCell>The maximum partial sum</TableCell>
                                            <TableCell>p_value</TableCell>
                                            <TableCell>Результат</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {opt.cumulativeSums.forward.map((el, indexEl) => {
                                            if (typeof el === "string") {
                                                return (
                                                    <TableRow key={'cumulativeSumsForward' + indexEl}>
                                                        <TableCell>{indexEl + 1}</TableCell>
                                                        <TableCell colSpan={3}>{el}</TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return (
                                                    <TableRow
                                                        sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}
                                                        key={'cumulativeSumsForward' + indexEl}
                                                    >
                                                        <TableCell>{indexEl + 1}</TableCell>
                                                        <TableCell>{el.a}</TableCell>
                                                        <TableCell>{el.pValue.toFixed(6)}</TableCell>
                                                        <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </ALPaper>
                            <ALPaper label={'Backwards'}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>№ п/п</TableCell>
                                            <TableCell>The maximum partial sum</TableCell>
                                            <TableCell>p_value</TableCell>
                                            <TableCell>Результат</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {opt.cumulativeSums.backwards.map((el, indexEl) => {
                                            if (typeof el === "string") {
                                                return (
                                                    <TableRow key={'cumulativeSumsBackwards' + indexEl}>
                                                        <TableCell>{indexEl + 1}</TableCell>
                                                        <TableCell colSpan={3}>{el}</TableCell>
                                                    </TableRow>
                                                )
                                            } else {
                                                return (
                                                    <TableRow
                                                        sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}
                                                        key={'cumulativeSumsBackwards' + indexEl}
                                                    >
                                                        <TableCell>{indexEl + 1}</TableCell>
                                                        <TableCell>{el.a}</TableCell>
                                                        <TableCell>{el.pValue.toFixed(6)}</TableCell>
                                                        <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        })}
                                    </TableBody>
                                </Table>
                            </ALPaper>
                        </AccordionDetails>
                    </Accordion>
                }
                {
                    opt.runTest !== undefined &&
                    <Accordion key={'panelRun' + index} expanded={expanded === 'panelRun' + index}
                               onChange={handleChange('panelRun' + index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelRun-content"
                        >
                            <Typography sx={{width: '70%', flexShrink: 0}}>
                                Run Test (Комбинированная P-Value
                                = {opt.combinePValue['runTest']?.toFixed(6)})
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов {opt.runTest.length}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№ п/п</TableCell>
                                        <TableCell>Pi</TableCell>
                                        <TableCell>V_n_obs (Total # of runs)</TableCell>
                                        <TableCell>V_n_obs - 2 n pi
                                            (1-pi)<br/>-----------------------<br/>2 sqrt(2n) pi (1-pi)</TableCell>
                                        <TableCell>p_value</TableCell>
                                        <TableCell>Результат</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {opt.runTest.map((el, indexEl) => {
                                        if (typeof el === "string") {
                                            return (
                                                <TableRow key={"runTest" + indexEl}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell colSpan={5}>{el}</TableCell>
                                                </TableRow>
                                            )
                                        } else {
                                            return (
                                                <TableRow key={"runTest" + indexEl}
                                                          sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell>{el.a}</TableCell>
                                                    <TableCell>{el.b}</TableCell>
                                                    <TableCell>{el.c}</TableCell>
                                                    <TableCell>{el.pValue?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                }
                {
                    opt.longestRunOfOnes !== undefined &&
                    <Accordion key={'panelLong' + index} expanded={expanded === 'panelLong' + index}
                               onChange={handleChange('panelLong' + index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelLong-content"
                        >
                            <Typography sx={{width: '70%', flexShrink: 0}}>
                                Longest Runs Of Ones Test (Комбинированная P-Value
                                = {opt.combinePValue['longestRunOfOnes']?.toFixed(6)})
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов {opt.longestRunOfOnes.length}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table sx={{width: '100%'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>№ п/п</TableCell>
                                        <TableCell>N (# of substrings)</TableCell>
                                        <TableCell>M (Substring Length)</TableCell>
                                        <TableCell>Chi^2</TableCell>
                                        <TableCell> </TableCell>
                                        <TableCell>p_value</TableCell>
                                        <TableCell>Результат</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {opt.longestRunOfOnes.map((el, indexEl) => {
                                        if (typeof el === "string") {
                                            return (
                                                <TableRow key={'longestRunOfOnes' + indexEl}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell colSpan={6}>{el}</TableCell>
                                                </TableRow>
                                            )
                                        } else {

                                            const keyAssignment: string[] = []
                                            const valueAssignment: number[] = []
                                            Object.entries(el.assignment!).forEach(([key, value]) => {
                                                keyAssignment.push(key)
                                                valueAssignment.push(value)
                                            })
                                            return (
                                                <TableRow key={'longestRunOfOnes' + indexEl}
                                                          sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell>{el.a}</TableCell>
                                                    <TableCell>{el.b}</TableCell>
                                                    <TableCell>{el.c}</TableCell>
                                                    <TableCell>
                                                        {`≤ ${keyAssignment.splice(0, keyAssignment.length - 1).join(' ')} ≥ ${keyAssignment[keyAssignment.length - 1]}`}
                                                        <br/>
                                                        ---------------------
                                                        <br/>
                                                        {valueAssignment.join(' ')}
                                                    </TableCell>
                                                    <TableCell>{el.pValue?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                }
                {
                    opt.rankTest !== undefined &&
                    <Accordion key={'panelRank' + index} expanded={expanded === 'panelRank' + index}
                               onChange={handleChange('panelRank' + index)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panelRank-content"
                        >
                            <Typography sx={{width: '70%', flexShrink: 0}}>
                                Rank Test (Комбинированная P-Value
                                = {opt.combinePValue['rankTest']?.toFixed(6)})
                            </Typography>
                            <Typography sx={{color: 'text.secondary'}}>
                                Выполнено тестов {opt.rankTest.length}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Table sx={{width: '100%'}}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell rowSpan={2}>№ п/п</TableCell>
                                        <TableCell colSpan={3}>Probability</TableCell>
                                        <TableCell colSpan={3}>Frequency</TableCell>
                                        <TableCell rowSpan={2}># of matrices</TableCell>
                                        <TableCell rowSpan={2}>Chi<sup>2</sup></TableCell>
                                        <TableCell rowSpan={2}>NOTE: BITS WERE DISCARDED</TableCell>
                                        <TableCell rowSpan={2}>p_value</TableCell>
                                        <TableCell rowSpan={2}>Результат</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>P_32</TableCell>
                                        <TableCell>P_31</TableCell>
                                        <TableCell>P_30</TableCell>
                                        <TableCell>F_32</TableCell>
                                        <TableCell>F_31</TableCell>
                                        <TableCell>F_30</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {opt.rankTest.map((el, indexEl) => {
                                        if (typeof el === "string") {
                                            return (
                                                <TableRow key={'rankTest' + indexEl}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell colSpan={11}>{el}</TableCell>
                                                </TableRow>
                                            )
                                        } else {
                                            return (
                                                <TableRow key={'rankTest' + indexEl}
                                                          sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                    <TableCell>{indexEl + 1}</TableCell>
                                                    <TableCell>{el.a?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.b?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.c?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.d}</TableCell>
                                                    <TableCell>{el.e}</TableCell>
                                                    <TableCell>{el.f}</TableCell>
                                                    <TableCell>{el.g}</TableCell>
                                                    <TableCell>{el.h}</TableCell>
                                                    <TableCell>{el.i}</TableCell>
                                                    <TableCell>{el.pValue?.toFixed(6)}</TableCell>
                                                    <TableCell>{el.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    })}
                                </TableBody>
                            </Table>
                        </AccordionDetails>
                    </Accordion>
                }
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <ALPaper className={'result-tests'} label={'Результат выполнения тестов'}>
                <div className={'block-result'}>
                    {allDataAnalysisNistTests.map((opt, index) => {
                        return (
                            <ALPaper label={opt.nameFile} key={index}>
                                <Button
                                    color={'primary'}
                                    variant={'contained'}
                                    onClick={() => {
                                        alExportTableToExcel({
                                            jsxElement: htmlString(renderAndExportTb(false, opt, index)),
                                            fileName: `result-nist-tests ${opt.nameFile.slice(0, opt.nameFile.length - 4)}`,
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
                            </ALPaper>
                        )
                    })}
                </div>
            </ALPaper>
        </React.Fragment>
    )
};

export default ResultTests;