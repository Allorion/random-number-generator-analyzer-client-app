import React, {FC, useEffect, useState} from "react";
import {
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {
    removeAllGraphDistributionTestOnPlane, removeOneGraphDistributionTestOnPlane,
    selectAllGraphDistributionTestOnPlane
} from "../reducers/GraphDistributionTestOnPlaneSlice";
import {
    selectAllFilesBinarySequence
} from "../../global-elements/api-requests/list-files-binary-sequence/reducers/ListFilesBinarySequenceSlice";
import {fetchAddGraphDistributionTestOnPlane} from "../api/ACAddGraphDistributionTestOnPlane";
import {ALPaper} from "../../../allorion-ui";
import {
    fetchListFilesBinarySequence
} from "../../global-elements/api-requests/list-files-binary-sequence/api-requests/ACListFilesBinarySequence";

import "../static/css/graph-distribution-test.css";
import {checkStrIsNum} from "../../global-elements/functions/checkStrIsNum";

interface IProps {

}

const GraphicalDistributionTestOnPlaneAnalysis: FC<IProps> = ({}) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        return function cleanup() {
            dispatch(removeAllGraphDistributionTestOnPlane())
        };
    }, [])

    useEffect(() => {
        dispatch(fetchListFilesBinarySequence())
    }, []);

    const [selectFile, setSelectFile] = useState<string | '#null'>('#null')
    const [bitCount, setBitCount] = useState<number>(100000)
    const [bitFlag, setBitFlag] = useState<boolean>(false)
    const [fillingDensity, setFillingDensity] = useState<boolean>(false)

    const {loading} = useAppSelector(state => state.dataListFilesBinarySequenceReducer)

    const filesBinarySequence = useAppSelector(selectAllFilesBinarySequence)

    const allGraphDistributionTestOnPlane = useAppSelector(selectAllGraphDistributionTestOnPlane)

    const handleSelectFile = (e: SelectChangeEvent<string>) => {
        setSelectFile(e.target.value)
    }

    const startAnalysis = () => {

        const warning: string[] = []

        if (selectFile === '#null') {
            warning.push('- Не выбран файл')
        }

        if (bitCount < 100 || bitCount > 100000000) {
            warning.push('- Длина бит должна быть больше или равна 100 и меньше либо равна 100млн')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
            return
        } else {
            dispatch(fetchAddGraphDistributionTestOnPlane({
                nameFile: selectFile,
                bitCount,
                bitFlag,
                fillingDensity,
            }))
        }

    }

    const deleteGraph = (uid: string) => {
        dispatch(removeOneGraphDistributionTestOnPlane(uid))
    }

    const handleLengthBitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const num = e.target.value

        if (checkStrIsNum(num)) {
            setBitCount(+num)
        }
    }

    const handleBlurLengthBitChange = () => {
        if (+bitCount > 100000000) {
            setBitCount(100000000)
        } else if (+bitCount < 100) {
            setBitCount(100)
        }
    }

    const handleFillingDensity = () => {
        setFillingDensity(!fillingDensity)
    }

    const handleBitFlag = () => {
        setBitFlag(!bitFlag)
    }

    return (
        <React.Fragment>
            <header>
                <h1>Анализ сгенерированной последовательности с помощью графического тест "Распределение на плоскости"</h1>
            </header>
            <main className={'analysis-graph-distr-plane'}>
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
                            value={bitCount}
                            onChange={handleLengthBitChange}
                            helperText={'от 100 до 100млн'}
                            onBlur={handleBlurLengthBitChange}
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={fillingDensity}
                                        onClick={handleFillingDensity}
                                    />
                                }
                                label="Учитывать плотность заполнения"
                            />
                            {!fillingDensity &&
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={bitFlag}
                                            onClick={handleBitFlag}
                                        />
                                    }
                                    label="Побитовый анализ"
                                />
                            }
                        </FormGroup>
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
                    {allGraphDistributionTestOnPlane.length > 0 &&
                        allGraphDistributionTestOnPlane.map((img, index) => {
                            return (
                                <ALPaper key={index} label={`Анализируемая последовательность ${img.nameFile}`}>
                                    <Button color={'error'} onClick={() => deleteGraph(img.uid)}>Удалить график</Button>
                                    <figure className={'bloc-img'}>
                                        <img src={img.img}
                                             alt={`Анализируемая последовательность ${img.nameFile}`}/>
                                    </figure>
                                </ALPaper>
                            )
                        })
                    }
                </div>
            </main>

        </React.Fragment>
    )
};

export default GraphicalDistributionTestOnPlaneAnalysis;