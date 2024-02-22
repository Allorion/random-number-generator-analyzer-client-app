import React, {FC, useEffect} from "react";
import {Accordion, AccordionDetails, AccordionSummary, Button, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/redux";
import {
    fetchListFilesBinarySequence
} from "../../../global-elements/api-requests/list-files-binary-sequence/api-requests/ACListFilesBinarySequence";
import {
    addNewDataStackOfBooks,
    delDataAllStackOfBooks,
    selectAllStackOfBooks
} from "../../reducers/StackOfBooksGenAnalysisSlice";
import FileForTest from "../../../global-elements/components/FileForTest";
import {fetchDataAnalysisStackOfBooks} from "../../api/ACDataAnalysisStackOfBooks";
import {
    delAllDataStackOfBooksResultTests,
    selectAllStackOfBooksResult
} from "../../reducers/StackOfBooksResultDataSlice";
import StackOfBooksResultAnalysis from "./StackOfBooksResultAnalysis";

interface IProps {

}

const StackOfBooksGenAnalysis: FC<IProps> = ({}) => {

    const dispatch = useAppDispatch()

    const selectStackOfBooks = useAppSelector(selectAllStackOfBooks)

    const selectStackOfBooksResult = useAppSelector(selectAllStackOfBooksResult)

    useEffect(() => {
        dispatch(fetchListFilesBinarySequence())
    }, []);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleAddDataAnalysis = () => {
        dispatch(addNewDataStackOfBooks())
    }

    useEffect(() => {
        return function cleanup() {
            dispatch(delDataAllStackOfBooks())
            dispatch(delAllDataStackOfBooksResultTests())
        };
    }, [])

    const handleStartAnalysis = () => {
        if (selectStackOfBooks.length !== 0) {
            dispatch(fetchDataAnalysisStackOfBooks(selectStackOfBooks))
        }
    }

    return (
        <React.Fragment>
            <header>
                <h1>Анализ сгенерированной последовательности с помощью теста "Стопка книг"</h1>
                <Button onClick={handleAddDataAnalysis} variant={'contained'}>
                    Добавить проверку
                </Button>
            </header>
            <main>
                {selectStackOfBooks.map((opt, index) => {
                    return (
                        <Accordion key={index} expanded={expanded === 'panel' + index}
                                   onChange={handleChange('panel' + index)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    Тест {index + 1}
                                </Typography>
                                <Typography sx={{color: 'text.secondary'}}>
                                    Тестируемая
                                    последовательность {opt.nameFile !== "#null" ? opt.nameFile : '"Файл не выбран"'}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={'block-test'}>
                                <FileForTest idEl={opt.uid} flag={'stackOfBooks'}/>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
                <Button
                    className={'btn-start-analysis'}
                    sx={{marginTop: '32px'}}
                    disabled={selectStackOfBooks.length === 0}
                    variant={'contained'}
                    color={'success'}
                    onClick={handleStartAnalysis}
                >
                    Начать анализ
                </Button>
                {selectStackOfBooksResult.length !== 0 &&
                    <StackOfBooksResultAnalysis/>
                }
            </main>
        </React.Fragment>
    )
};

export default StackOfBooksGenAnalysis;