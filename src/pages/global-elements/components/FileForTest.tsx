import React, {ChangeEvent, FC, useState} from "react";
import {ALPaper} from "../../../allorion-ui";
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
import {useAppDispatch, useAppSelector} from "../../../store/hooks/redux";
import {
    editAlphaGenAnal,
    genAnalEditBitstreams,
    genAnalEditFile,
    genAnalEditNumberOfBits,
    genAnalSelectById
} from "../../nist-tests/reducers/GeneratorAnalysisSlice";
import {
    selectAllFilesBinarySequence
} from "../api-requests/list-files-binary-sequence/reducers/ListFilesBinarySequenceSlice";
import {
    editAlphaStackOfBooks,
    editBitstreamsStackOfBooks, editBlockSizeStackOfBooks, editFileStackOfBooks, editNumberOfBitsStackOfBooks,
    selectByIdStackOfBooks
} from "../../stack-of-books-test/reducers/StackOfBooksGenAnalysisSlice";

interface IProps {
    idEl: string,
    flag: 'nist' | 'stackOfBooks'
}

const FileForTest: FC<IProps> = ({idEl, flag}) => {

    const genAnalElementNist = useAppSelector(state => genAnalSelectById(state, idEl))
    const genAnalElementStackOfBooks = useAppSelector(state => selectByIdStackOfBooks(state, idEl))
    const genAnalElement = flag === 'nist' ? genAnalElementNist : genAnalElementStackOfBooks

    const [selectFile, setSelectFile] = useState<string | '#null'>(genAnalElement === undefined ? '#null' : genAnalElement.nameFile)

    const editBitstreams = flag === 'nist' ? genAnalEditBitstreams : editBitstreamsStackOfBooks
    const editFile = flag === 'nist' ? genAnalEditFile : editFileStackOfBooks
    const editNumberOfBits = flag === 'nist' ? genAnalEditNumberOfBits : editNumberOfBitsStackOfBooks
    const editAlpha = flag === 'nist' ? editAlphaGenAnal : editAlphaStackOfBooks

    const {loading} = useAppSelector(state => state.dataListFilesBinarySequenceReducer)

    const filesBinarySequence = useAppSelector(selectAllFilesBinarySequence)

    const dispatch = useAppDispatch()

    const handleSelectFile = (e: SelectChangeEvent<string>) => {
        setSelectFile(e.target.value)
    }

    const handleEditFile = () => {
        dispatch(editFile({uid: idEl, fileName: selectFile}))
    }

    const handleNumberOfBits = (e: ChangeEvent<HTMLInputElement>) => {

        let event = +e.target.value

        dispatch(editNumberOfBits({
            uid: idEl,
            numberOfBits: event
        }))
    }

    const handleCheckNumberOfBits = () => {

        const data = genAnalElement!.numberOfBits

        if (data !== undefined) {
            if (data < 100000 || data > 1000000 || data === null) {
                dispatch(editNumberOfBits({
                    uid: idEl,
                    numberOfBits: 100000
                }))
            }
        }
    }

    const handleBitstreams = (e: ChangeEvent<HTMLInputElement>) => {

        let event = +e.target.value

        dispatch(editBitstreams({
            uid: idEl,
            bitstreams: event
        }))
    }

    const handleCheckBitstreams = () => {

        const data = genAnalElement!.bitstreams

        if (data !== undefined) {
            if (data < 1 || data > 100 || data === null) {
                dispatch(editBitstreams({
                    uid: idEl,
                    bitstreams: 10
                }))
            }
        }
    }

    const handleBlockSize = (e: ChangeEvent<HTMLInputElement>) => {

        let event = +e.target.value

        dispatch(editBlockSizeStackOfBooks({
            uid: idEl,
            blockSize: event
        }))
    }

    const handleCheckBlockSize = () => {

        //@ts-ignore
        const data = genAnalElement!.blockSize

        if (data !== undefined) {
            if (data < 2 || data > 10 || data === null) {
                dispatch(editBlockSizeStackOfBooks({
                    uid: idEl,
                    blockSize: 2
                }))
            }
        }
    }

    const handleEditAlpha = (e: ChangeEvent<HTMLInputElement>) => {

        let event = +e.target.value

        dispatch(editAlpha({
            uid: idEl,
            alpha: event
        }))
    }

    const handleCheckAlpha = () => {

        const data = genAnalElement!.alpha

        if (data !== undefined) {
            if (data < 0.01 || data > 0.1 || data === null) {
                dispatch(editAlpha({
                    uid: idEl,
                    alpha: 0.05
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
                                    helperText={'Не менее 1 и не более 100'}
                                />
                                {flag === 'stackOfBooks' &&
                                    <TextField
                                        fullWidth={true}
                                        type={'number'}
                                        label={'Длина блока'}
                                        placeholder={'2'}
                                        //@ts-ignore
                                        value={genAnalElement.blockSize}
                                        onChange={handleBlockSize}
                                        onBlur={handleCheckBlockSize}
                                        helperText={'Не менее 2 и не более 10'}
                                    />
                                }
                                <TextField
                                    fullWidth={true}
                                    type={'number'}
                                    label={'Alpha'}
                                    placeholder={'0.05'}
                                    value={genAnalElement.alpha}
                                    onChange={handleEditAlpha}
                                    onBlur={handleCheckAlpha}
                                    helperText={'Не менее 0.01 и не более 0.1'}
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