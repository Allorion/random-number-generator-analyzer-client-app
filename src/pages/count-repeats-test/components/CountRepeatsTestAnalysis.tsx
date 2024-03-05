import React, {FC, useEffect, useState} from "react";
import {ALPaper} from "../../../allorion-ui";
import {Button, Checkbox, FormControlLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField} from "@mui/material";
import {
    fetchListFilesBinarySequence
} from "../../global-elements/api-requests/list-files-binary-sequence/api-requests/ACListFilesBinarySequence";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {
    selectAllFilesBinarySequence
} from "../../global-elements/api-requests/list-files-binary-sequence/reducers/ListFilesBinarySequenceSlice";
import {checkStrIsNum} from "../../global-elements/functions/checkStrIsNum";
import {fetchCountRepeatsTest} from "../api/ACCountRepeatsTest";
import {
    editFlagCountRepeatsTest,
    removeAllCountRepeatsTest,
    removeOneCountRepeatsTest,
    selectAllCountRepeatsTest
} from "../reducers/CountRepeatsTestSlice";
import '../static/css/count-repeats-test.css'
import CountRepeatsChartsAnalysis from "./CountRepeatsChartsAnalysis";

interface IProps {

}

const CountRepeatsTestAnalysis: FC<IProps> = ({}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchListFilesBinarySequence())
        dispatch(removeAllCountRepeatsTest())
    }, []);

    const [selectFile, setSelectFile] = useState<string | '#null'>('#null')
    const [byteCount, setByteCount] = useState<number>(100000)
    const [calculationAccordingLawDistribution, setCalculationAccordingLawDistribution] = useState<boolean>(false)


    const filesBinarySequence: string[] = useAppSelector(selectAllFilesBinarySequence)

    const allCountRepeatsTest = useAppSelector(selectAllCountRepeatsTest)
    const {loading} = useAppSelector(state => state.countRepeatsTestReducer)

    const handleSelectFile = (e: SelectChangeEvent<string>) => {
        setSelectFile(e.target.value)
    }

    const startAnalysis = () => {

        const warning: string[] = []

        if (selectFile === '#null') {
            warning.push('- Не выбран файл')
        }

        if (byteCount < 1 || byteCount > 125000000) {
            warning.push('- Длина бит должна быть больше или равна 1 и меньше либо равна 125млн')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
            return
        } else {
            dispatch(fetchCountRepeatsTest({nameFile: selectFile, byteCount, calculationAccordingLawDistribution}))
        }

    }

    const handleCalculationAccordingLawDistribution = () => {
        setCalculationAccordingLawDistribution(!calculationAccordingLawDistribution)
    }

    const handleEditFlagChart = (id: string, flag: 'Line' | 'Bar') => {
        dispatch(editFlagCountRepeatsTest({ id, flag }))
    }

    const handleLengthBitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const num: string = e.target.value

        if (checkStrIsNum(num)) {
            setByteCount(+num)
        }
    }

    const handleBlurLengthBitChange = () => {
        if (+byteCount > 125000000) {
            setByteCount(125000000)
        } else if (+byteCount < 1) {
            setByteCount(1)
        }
    }

    const deleteGraph = (uid: string) => {
        dispatch(removeOneCountRepeatsTest(uid))
    }


    return (
        <React.Fragment>
            <header>
                <h1>Анализ сгенерированной последовательности с помощью теста "Подсчет байтов"</h1>
            </header>
            <main className={'count-repeats-test'}>
                <ALPaper label={'Выбор файла для проверки'}>
                    <div className={'block-filters'}>
                        <Select
                            fullWidth={true}
                            value={selectFile}
                            onChange={handleSelectFile}
                        >
                            <MenuItem value={'#null'}>-</MenuItem>
                            {filesBinarySequence.map((opt, index) => {
                                return (
                                    <MenuItem key={index} value={opt}>{opt}</MenuItem>
                                )
                            })}
                        </Select>
                        <TextField
                            type={'text'}
                            label={'Длина проверяемой битовой последовательности'}
                            value={byteCount}
                            onChange={handleLengthBitChange}
                            helperText={'от 1 до 125млн'}
                            onBlur={handleBlurLengthBitChange}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={handleCalculationAccordingLawDistribution}
                                    checked={calculationAccordingLawDistribution}
                                />
                            }
                            label={'Тест на распределение'}
                        />
                        <Button
                            disabled={selectFile === '#null'}
                            color={'success'}
                            variant={'contained'}
                            onClick={startAnalysis}
                        >
                            Начать проверку выбранного файла
                        </Button>
                    </div>
                </ALPaper>
                <div className={'block-result'}>
                    {allCountRepeatsTest.length > 0 &&
                        allCountRepeatsTest.map((opt, index) => {
                            return (
                                <ALPaper key={index}
                                         label={`Анализируемая последовательность ${opt.nameFile} ${opt.calculationAccordingLawDistribution ? '(Тест на распределение)' : ''}`}>
                                    <div style={{height: 620}}>
                                        <Stack direction={'column'} spacing={2}>
                                            <Button color={'error'} onClick={() => deleteGraph(opt.uid)}>Удалить график</Button>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        onClick={() => handleEditFlagChart(opt.uid, opt.flag === 'Bar' ? 'Line' : 'Bar')}
                                                        checked={opt.flag === 'Line'}
                                                    />
                                                }
                                                label={'Точечная диаграмма'}
                                            />
                                        </Stack>
                                        <div className={'count-repeats-chart'}>
                                            <CountRepeatsChartsAnalysis data={opt} flag={opt.flag}/>
                                        </div>
                                    </div>
                                </ALPaper>
                            )
                        })
                    }
                </div>
            </main>
        </React.Fragment>
    )
};

export default CountRepeatsTestAnalysis;