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
    const [zoom, setZoom] = useState<number>(1)
    const [bitFlag, setBitFlag] = useState<boolean>(false)

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
        if (!bitFlag && zoom < 0 && bitCount > 4) {
            warning.push('- Увеличение должно быть больше 0 и меньше либо равно 4')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
            return
        } else {
            dispatch(fetchAddGraphDistributionTestOnPlane({
                nameFile: selectFile,
                bitCount: bitCount,
                zoom: zoom,
                bitFlag: bitFlag
            }))
        }

    }

    const deleteGraph = (uid: string) => {
        dispatch(removeOneGraphDistributionTestOnPlane(uid))
    }

    const handleLengthBitChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const num = e.target.value

        if (checkStrIsNum(num)) {
            if (+num > 100000000) {
                setBitCount(100000000)
            } else if (+num < 100) {
                setBitCount(100)
            } else {
                setBitCount(+num)
            }
        }
    }

    const handleZoomChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        const num = e.target.value

        if (checkStrIsNum(num)) {
            if (+num > 4) {
                setZoom(4)
            } else if (+num < 1) {
                setZoom(1)
            } else {
                setZoom(+num)
            }
        }
    }

    const handleBitFlag = () => {
        setBitFlag(!bitFlag)
    }

    return (
        <React.Fragment>
            <header>
                <h1>Анализ сгенерированной последовательности с помощью теста "Стопка книг"</h1>
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
                        />
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={bitFlag}
                                        onClick={handleBitFlag}
                                    />
                                }
                                label="Побитовый анализ"
                            />
                        </FormGroup>
                        {!bitFlag &&
                            <TextField
                                type={'text'}
                                label={'Расстояние между точками на графике'}
                                value={zoom}
                                onChange={handleZoomChange}
                                helperText={'От 1 до 4. Чем больше последовательность тем больше расстояни. 1 = квадрату 256х256'}
                            />
                        }
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