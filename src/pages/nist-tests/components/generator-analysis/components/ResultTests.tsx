import React, {FC, JSX, useEffect} from "react";
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

    const {loading} = useAppSelector(state => state.dataAnalysisNistTestsReducer)

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const frequencyTestJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.frequencyTest === undefined) {
            return undefined
        }

        return (
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
        )
    }

    const blockFrequencyJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.blockFrequency === undefined) return undefined

        return (
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
        )

    }

    const cumulativeSumsJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.cumulativeSums === undefined) return undefined

        return (
            <Accordion key={'panelCumul' + index} expanded={expanded === 'panelCumul' + index}
                       onChange={handleChange('panelCumul' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelCumul-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Cumulative Sums Test (Комбинированная P-Value
                        =
                        Forward: {opt.combinePValue['cumulativeSums']?.forward.toFixed(6)} Backwards: {opt.combinePValue['cumulativeSums']?.backwards.toFixed(6)})
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
        )

    }

    const runTestJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.runTest === undefined) return undefined

        return (
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
        )

    }

    const longestRunOfOnesJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.longestRunOfOnes === undefined) return undefined

        return (
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
        )

    }

    const rankTestJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.rankTest === undefined) return undefined

        return (
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
        )

    }

    const overlappingTemplateMatchingsJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.overlappingTemplateMatchings === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelOverLap' + index} expanded={expanded === 'panelOverLap' + index}
                       onChange={handleChange('panelOverLap' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelOverLap-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Overlapping Template Matchings Test (Комбинированная P-Value
                        = {opt.combinePValue['overlappingTemplateMatchings']?.toFixed(6)})
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.overlappingTemplateMatchings.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table sx={{width: '100%'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>n (sequence_length)</TableCell>
                                <TableCell>m (block length of 1s)</TableCell>
                                <TableCell>M (length of substring)</TableCell>
                                <TableCell>N (number of substrings)</TableCell>
                                <TableCell>lambda [(M-m+1)/2^m]</TableCell>
                                <TableCell>eta</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>2</TableCell>
                                <TableCell>3</TableCell>
                                <TableCell>4</TableCell>
                                <TableCell>{' >= 5'}</TableCell>
                                <TableCell>Chi<sup>2</sup></TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.overlappingTemplateMatchings.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'overlappingTemplateMatchings' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={15}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={'overlappingTemplateMatchings' + indexEl}
                                                  sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell>{el.a}</TableCell>
                                            <TableCell>{el.b}</TableCell>
                                            <TableCell>{el.c}</TableCell>
                                            <TableCell>{el.d}</TableCell>
                                            <TableCell>{el.e?.toFixed(6)}</TableCell>
                                            <TableCell>{el.f?.toFixed(6)}</TableCell>
                                            <TableCell>{el['0']}</TableCell>
                                            <TableCell>{el['1']}</TableCell>
                                            <TableCell>{el['2']}</TableCell>
                                            <TableCell>{el['3']}</TableCell>
                                            <TableCell>{el['4']}</TableCell>
                                            <TableCell>{el['5']}</TableCell>
                                            <TableCell>{el['Chi^2']?.toFixed(6)}</TableCell>
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
        )

    }

    const universalJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.universal === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelUniversal' + index} expanded={expanded === 'panelUniversal' + index}
                       onChange={handleChange('panelUniversal' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelUniversal-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Universal Statistical Test (Комбинированная P-Value
                        = {opt.combinePValue['universal']?.toFixed(6)})
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.universal.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>L</TableCell>
                                <TableCell>Q</TableCell>
                                <TableCell>K</TableCell>
                                <TableCell>sum</TableCell>
                                <TableCell>sigma</TableCell>
                                <TableCell>variance</TableCell>
                                <TableCell>exp_value</TableCell>
                                <TableCell>phi</TableCell>
                                <TableCell>bits</TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.universal.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'universal' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={11}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else if (typeof el.error === 'string') {
                                    return (
                                        <TableRow key={'universal' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={11}>{el.error}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={'universal' + indexEl}
                                                  sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell>{el.a}</TableCell>
                                            <TableCell>{el.b}</TableCell>
                                            <TableCell>{el.c}</TableCell>
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
        )
    }

    const approximateEntropyJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.approximateEntropy === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelApprox' + index} expanded={expanded === 'panelApprox' + index}
                       onChange={handleChange('panelApprox' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelApprox-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Approximate Entropy Test (Комбинированная P-Value
                        = {opt.combinePValue['approximateEntropy']?.toFixed(6)})
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.approximateEntropy.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>m (block length)</TableCell>
                                <TableCell>n (sequence length)</TableCell>
                                <TableCell>Chi<sup>2</sup></TableCell>
                                <TableCell>Phi(m)</TableCell>
                                <TableCell>Phi(m+1)</TableCell>
                                <TableCell>ApEn</TableCell>
                                <TableCell>Log(2)</TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.approximateEntropy.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'approximateEntropy' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={9}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={'approximateEntropy' + indexEl}
                                                  sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell>{el.a}</TableCell>
                                            <TableCell>{el.b}</TableCell>
                                            <TableCell>{el.c?.toFixed(6)}</TableCell>
                                            <TableCell>{el.d?.toFixed(6)}</TableCell>
                                            <TableCell>{el.e?.toFixed(6)}</TableCell>
                                            <TableCell>{el.f?.toFixed(6)}</TableCell>
                                            <TableCell>{el.g?.toFixed(6)}</TableCell>
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
        )
    }

    const randomExcursionsJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.randomExcursions === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelRandEx' + index} expanded={expanded === 'panelRandEx' + index}
                       onChange={handleChange('panelRandEx' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelRandEx-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Random Excursions Test
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.randomExcursions.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>Number Of Cycles (J)</TableCell>
                                <TableCell>Sequence Length (n)</TableCell>
                                <TableCell>Rejection Constraint</TableCell>
                                <TableCell>x</TableCell>
                                <TableCell>chi<sup>2</sup></TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.randomExcursions.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'randomExcursions' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={7}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else if (el.warning !== undefined) {
                                    return (
                                        <TableRow key={'randomExcursions' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell>{el.a}</TableCell>
                                            <TableCell>{el.b}</TableCell>
                                            <TableCell>-</TableCell>
                                            <TableCell colSpan={4}>{el.warning}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    const len = el.listResult.length + 1
                                    return (
                                        <React.Fragment key={'randomExcursions' + indexEl}>
                                            <TableRow>
                                                <TableCell rowSpan={len}>{indexEl + 1}</TableCell>
                                                <TableCell rowSpan={len}>{el.a}</TableCell>
                                                <TableCell rowSpan={len}>{el.b}</TableCell>
                                                <TableCell rowSpan={len}>{el.c}</TableCell>
                                            </TableRow>
                                            {el.listResult.map((row, iRow) => {
                                                return (
                                                    <TableRow key={'dopRandomExcursions' + iRow}
                                                              sx={{backgroundColor: row.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                        <TableCell>{row.x}</TableCell>
                                                        <TableCell>{row["chi^2"]?.toFixed(6)}</TableCell>
                                                        <TableCell>{row.pValue?.toFixed(6)}</TableCell>
                                                        <TableCell>{row.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        )
    }

    const randomExcursionsVariantJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.randomExcursionsVariant === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelRandExVar' + index} expanded={expanded === 'panelRandExVar' + index}
                       onChange={handleChange('panelRandExVar' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelRandExVar-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Random Excursions Variant Test
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.randomExcursionsVariant.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>Number Of Cycles (J)</TableCell>
                                <TableCell>Sequence Length (n)</TableCell>
                                <TableCell>x</TableCell>
                                <TableCell>Total visits</TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.randomExcursionsVariant.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'randomExcursionsVariant' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={6}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else if (el.warning !== undefined) {
                                    return (
                                        <TableRow key={'randomExcursionsVariant' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell>{el.a}</TableCell>
                                            <TableCell>{el.b}</TableCell>
                                            <TableCell colSpan={4}>{el.warning}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    const len = el.listResult.length + 1
                                    return (
                                        <React.Fragment key={'randomExcursionsVariant' + indexEl}>
                                            <TableRow>
                                                <TableCell rowSpan={len}>{indexEl + 1}</TableCell>
                                                <TableCell rowSpan={len}>{el.a}</TableCell>
                                                <TableCell rowSpan={len}>{el.b}</TableCell>
                                            </TableRow>
                                            {el.listResult.map((row, iRow) => {
                                                return (
                                                    <TableRow key={'dopRandomExcursionsVariant' + iRow}
                                                              sx={{backgroundColor: row.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                                        <TableCell>{row.x}</TableCell>
                                                        <TableCell>{row.visits?.toFixed(6)}</TableCell>
                                                        <TableCell>{row.pValue?.toFixed(6)}</TableCell>
                                                        <TableCell>{row.result === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        )
    }

    const serialTestJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.serialTest === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelSer' + index} expanded={expanded === 'panelSer' + index}
                       onChange={handleChange('panelSer' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelSer-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Serial Test (Комбинированная P-Value
                        = {opt.combinePValue['serialTest'] !== undefined ? `${opt?.combinePValue['serialTest'][0] !== null ? opt.combinePValue['serialTest'][0].toFixed(6) : opt.combinePValue['serialTest'][0]} ${opt.combinePValue['serialTest'][1] !== null ? opt.combinePValue['serialTest'][1].toFixed(6) : opt.combinePValue['serialTest'][1]}` : ''})
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.serialTest.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>Block length (m)</TableCell>
                                <TableCell>Sequence length (n)</TableCell>
                                <TableCell>Psi_m</TableCell>
                                <TableCell>Psi_m-1</TableCell>
                                <TableCell>Psi_m-2</TableCell>
                                <TableCell>Del_1</TableCell>
                                <TableCell>Del_2</TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.serialTest.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'serialTest' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={9}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <React.Fragment key={'serialTest' + indexEl}>
                                            <TableRow
                                                sx={{backgroundColor: el.result[0] !== 'SUCCESS' || el.result[1] !== 'SUCCESS' ? 'rgba(255, 0, 0, 0.23)' : "white"}}
                                            >
                                                <TableCell rowSpan={3}>{indexEl + 1}</TableCell>
                                                <TableCell rowSpan={3}>{el.a}</TableCell>
                                                <TableCell rowSpan={3}>{el.b}</TableCell>
                                                <TableCell rowSpan={3}>{el.c?.toFixed(6)}</TableCell>
                                                <TableCell rowSpan={3}>{el.d?.toFixed(6)}</TableCell>
                                                <TableCell rowSpan={3}>{el.e?.toFixed(6)}</TableCell>
                                                <TableCell rowSpan={3}>{el.f?.toFixed(6)}</TableCell>
                                                <TableCell rowSpan={3}>{el.g?.toFixed(6)}</TableCell>
                                            </TableRow>

                                            {el.pValue.map((pv, iPv) => {
                                                return (
                                                    <TableRow key={'dopSer' + iPv}
                                                              sx={{backgroundColor: el.result[iPv] === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}
                                                    >
                                                        <TableCell>{pv?.toFixed(6)}</TableCell>
                                                        <TableCell>{el.result[iPv] === 'SUCCESS' ? 'Тест пройден' : 'Тест не пройден'}</TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </TableBody>
                    </Table>
                </AccordionDetails>
            </Accordion>
        )
    }

    const linearComplexityJSX = (opt: IDataAnalysisNistTests, index: number): undefined | JSX.Element => {

        if (opt.linearComplexity === undefined) {
            return undefined
        }

        return (
            <Accordion key={'panelLinComp' + index} expanded={expanded === 'panelLinComp' + index}
                       onChange={handleChange('panelLinComp' + index)}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panelLinComp-content"
                >
                    <Typography sx={{width: '70%', flexShrink: 0}}>
                        Linear Complexity (Комбинированная P-Value
                        = {opt.combinePValue['linearComplexity']?.toFixed(6)})
                    </Typography>
                    <Typography sx={{color: 'text.secondary'}}>
                        Выполнено тестов {opt.linearComplexity.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>№ п/п</TableCell>
                                <TableCell>M (substring length)</TableCell>
                                <TableCell>N (number of substrings)</TableCell>
                                <TableCell>C0</TableCell>
                                <TableCell>C1</TableCell>
                                <TableCell>C2</TableCell>
                                <TableCell>C3</TableCell>
                                <TableCell>C4</TableCell>
                                <TableCell>C5</TableCell>
                                <TableCell>C6</TableCell>
                                <TableCell>Chi<sup>2</sup></TableCell>
                                <TableCell>Note: bits were discarded!</TableCell>
                                <TableCell>p_value</TableCell>
                                <TableCell>Результат</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {opt.linearComplexity.map((el, indexEl) => {
                                if (typeof el === "string") {
                                    return (
                                        <TableRow key={'linearComplexity' + indexEl}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell colSpan={13}>{el}</TableCell>
                                        </TableRow>
                                    )
                                } else {
                                    return (
                                        <TableRow key={'linearComplexity' + indexEl}
                                                  sx={{backgroundColor: el.result === 'SUCCESS' ? "white" : 'rgba(255, 0, 0, 0.23)'}}>
                                            <TableCell>{indexEl + 1}</TableCell>
                                            <TableCell>{el.M}</TableCell>
                                            <TableCell>{el.N}</TableCell>
                                            <TableCell>{el.C0}</TableCell>
                                            <TableCell>{el.C1}</TableCell>
                                            <TableCell>{el.C2}</TableCell>
                                            <TableCell>{el.C3}</TableCell>
                                            <TableCell>{el.C4}</TableCell>
                                            <TableCell>{el.C5}</TableCell>
                                            <TableCell>{el.C6}</TableCell>
                                            <TableCell>{el.CHI2?.toFixed(6)}</TableCell>
                                            <TableCell>{el.bits}</TableCell>
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
        )
    }

    const renderAndExportTb = (render: boolean, opt: IDataAnalysisNistTests, index: number): JSX.Element => {
        return (
            <React.Fragment>
                {!render && <p>Тест для файла {opt.nameFile}</p>}
                <p>Выбранная ALPHA: {opt.alpha}</p>
                <p>Количество битов для одного теста: {opt.numberOfBits}</p>
                <p>Количество тестов для файла: {opt.bitstreams}</p>
                {
                    opt.dopParams.bftParam !== undefined &&
                    <p>Block Frequency Test - длина блока(M): {opt.dopParams?.bftParam}</p>
                }
                {opt.frequencyTest !== undefined && frequencyTestJSX(opt, index)}
                {opt.blockFrequency !== undefined && blockFrequencyJSX(opt, index)}
                {opt.cumulativeSums !== undefined && cumulativeSumsJSX(opt, index)}
                {opt.runTest !== undefined && runTestJSX(opt, index)}
                {opt.longestRunOfOnes !== undefined && longestRunOfOnesJSX(opt, index)}
                {opt.rankTest !== undefined && rankTestJSX(opt, index)}
                {opt.overlappingTemplateMatchings !== undefined && overlappingTemplateMatchingsJSX(opt, index)}
                {opt.universal !== undefined && universalJSX(opt, index)}
                {opt.approximateEntropy !== undefined && approximateEntropyJSX(opt, index)}
                {opt.randomExcursions !== undefined && randomExcursionsJSX(opt, index)}
                {opt.randomExcursionsVariant !== undefined && randomExcursionsVariantJSX(opt, index)}
                {opt.serialTest !== undefined && serialTestJSX(opt, index)}
                {opt.linearComplexity !== undefined && linearComplexityJSX(opt, index)}
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