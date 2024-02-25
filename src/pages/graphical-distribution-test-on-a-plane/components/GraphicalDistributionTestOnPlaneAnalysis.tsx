import React, {FC, useEffect, useState} from "react";
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";
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
    const [zoom, setZoom] = useState<number>(2)

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

        if (bitCount < 0 || bitCount > 1000000) {
            warning.push('- Длина бит должна быть больше 0 и меньше либо равна 1млн')
        }
        if (zoom < 0 && bitCount > 4) {
            warning.push('- Увеличение должно быть больше 0 и меньше либо равно 4')
        }

        if (warning.length > 0) {
            alert(warning.join('\n'))
            return
        } else {
            dispatch(fetchAddGraphDistributionTestOnPlane({nameFile: selectFile, bitCount: bitCount, zoom: zoom}))
        }

    }

    const deleteGraph = (uid: string) => {
        dispatch(removeOneGraphDistributionTestOnPlane(uid))
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
                            type={'number'}
                            label={'Длина проверяемой битовой последовательности'}
                            value={bitCount}
                            onChange={(e) => setBitCount(+e.target.value)}
                            helperText={'от 0 до 1млн'}
                        />
                        <TextField
                            type={'number'}
                            label={'Расстояние между точками на графике'}
                            value={zoom}
                            onChange={(e) => setZoom(+e.target.value)}
                            helperText={'От 1 до 4. Чем больше последовательность тем больше растояние'}
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
                    {allGraphDistributionTestOnPlane.length > 0 &&
                        allGraphDistributionTestOnPlane.map((img, index) => {
                            return (
                                <ALPaper label={`Анализируемая последовательность ${img.nameFile}`}>
                                    <Button color={'error'} onClick={() => deleteGraph(img.uid)}>Удалить график</Button>
                                    <figure className={'bloc-img'}>
                                        <img key={index} src={img.img}
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