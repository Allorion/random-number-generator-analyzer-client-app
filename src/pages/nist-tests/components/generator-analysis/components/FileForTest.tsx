import React, {ChangeEvent, FC, useState} from "react";
import {ALPaper} from "../../../../../allorion-ui";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks/redux";
import {
    genAnalEditBitstreams,
    genAnalEditFile,
    genAnalEditNumberOfBits,
    genAnalSelectById
} from "../../../reducers/GeneratorAnalysisSlice";
import {
    selectAllFilesBinarySequence
} from "../../../../global-elements/api-requests/list-files-binary-sequence/reducers/ListFilesBinarySequenceSlice";

interface IProps {
    idEl: string
}

const FileForTest: FC<IProps> = ({idEl}) => {

    const genAnalElement = useAppSelector(state => genAnalSelectById(state, idEl))

    const [selectFile, setSelectFile] = useState<string | '#null'>(genAnalElement === undefined ? '#null' : genAnalElement.nameFile)

    const {loading} = useAppSelector(state => state.dataListFilesBinarySequenceReducer)

    const filesBinarySequence = useAppSelector(selectAllFilesBinarySequence)

    const dispatch = useAppDispatch()

    const handleSelectFile = (e: SelectChangeEvent<string>) => {
        setSelectFile(e.target.value)
    }

    const handleEditFile = () => {
        dispatch(genAnalEditFile({uid: idEl, fileName: selectFile}))
    }

    const handleNumberOfBits = (e: ChangeEvent<HTMLInputElement>) => {

        let event = +e.target.value

        dispatch(genAnalEditNumberOfBits({
            uid: idEl,
            numberOfBits: event
        }))
    }

    const handleCheckNumberOfBits = () => {

        const data = genAnalElement!.numberOfBits

        if (data !== undefined) {
            if (data < 100000 || data > 1000000 || data === null) {
                dispatch(genAnalEditNumberOfBits({
                    uid: idEl,
                    numberOfBits: 100000
                }))
            }
        }
    }

    const handleBitstreams = (e: ChangeEvent<HTMLInputElement>) => {

        let event = +e.target.value

        dispatch(genAnalEditBitstreams({
            uid: idEl,
            bitstreams: event
        }))
    }

    const handleCheckBitstreams = () => {

        const data = genAnalElement!.bitstreams

        if (data !== undefined) {
            if (data < 1 || data > 20 || data === null) {
                dispatch(genAnalEditBitstreams({
                    uid: idEl,
                    bitstreams: 10
                }))
            }
        }
    }

    const fileName = genAnalElement?.nameFile.split(':')

    return (
        <React.Fragment>
            <ALPaper label={'Выбор файла для тестирования'}>
                <div className={'file-for-test'}>
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
                    <Button
                        disabled={selectFile === '#null'}
                        color={'success'}
                        variant={'contained'}
                        onClick={handleEditFile}
                    >
                        Подтвердить выбор файла
                    </Button>
                    {(genAnalElement !== undefined && fileName !== undefined && genAnalElement.nameFile !== "#null") &&
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Алгоритм генерации последовательности</TableCell>
                                        <TableCell>Количество символов</TableCell>
                                        <TableCell>Дата и время создания</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>1</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>3</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>{fileName[0]}</TableCell>
                                        <TableCell>{fileName[1]}</TableCell>
                                        <TableCell>{fileName[2]}:{fileName[3]}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div className={'params-test'}>
                                <TextField
                                    fullWidth={true}
                                    type={"number"}
                                    label={'Количество битов в одном тесте'}
                                    placeholder={'100000'}
                                    value={genAnalElement.numberOfBits}
                                    onChange={handleNumberOfBits}
                                    onBlur={handleCheckNumberOfBits}
                                    helperText={'от 100т. до 1млн.'}
                                />
                                <TextField
                                    fullWidth={true}
                                    type={'number'}
                                    label={'Количество тестов для данного файла'}
                                    placeholder={'10'}
                                    value={genAnalElement.bitstreams}
                                    onChange={handleBitstreams}
                                    onBlur={handleCheckBitstreams}
                                    helperText={'Не менее 1 и не более 20'}
                                />
                            </div>
                        </>
                    }
                </div>
            </ALPaper>
        </React.Fragment>
    )
};

export default FileForTest;