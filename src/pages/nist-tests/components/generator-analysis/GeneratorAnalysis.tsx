import React, {FC, useEffect} from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "../../static/css/generator-analysis.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Typography
} from "@mui/material";
import FileForTest from "./components/FileForTest";
import ListTests from "./components/ListTests";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks/redux";
import {genAnalAddNewData, genAnalSelectAll} from "../../reducers/GeneratorAnalysisSlice";
import {
    fetchListFilesBinarySequence
} from "../../../global-elements/api-requests/list-files-binary-sequence/api-requests/ACListFilesBinarySequence";
import ListDopParams from "./components/ListDopParams";
import {fetchDataAnalysisNistTests} from "../../api-requests/ACDataAnalysisNistTests";
import {selectAllDataAnalysisNistTests} from "../../reducers/DataAnalysisNistTestsSlice";
import ResultTests from "./components/ResultTests";

interface IProps {

}

const GeneratorAnalysis: FC<IProps> = ({}) => {

    const dispatch = useAppDispatch()

    const genAnalSelect = useAppSelector(genAnalSelectAll)
    const allDataAnalysisNistTests = useAppSelector(selectAllDataAnalysisNistTests)

    useEffect(() => {
        dispatch(fetchListFilesBinarySequence())
    }, []);

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    const handleAddDataAnalysis = () => {
        dispatch(genAnalAddNewData())
    }

    const handleStartAnalysis = () => {
        if (genAnalSelect.length !== 0) {
            dispatch(fetchDataAnalysisNistTests(genAnalSelect))
        }
    }

    return (
        <React.Fragment>
            <header>
                <h1>Анализ сгенерированной последовательности с помощью тестов NIST</h1>
                <Button onClick={handleAddDataAnalysis} variant={'contained'}>
                    Добавить проверку
                </Button>
            </header>
            <main>
                {genAnalSelect.map((opt, index) => {
                    return (
                        <Accordion key={index} expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1bh-content"
                            >
                                <Typography sx={{width: '33%', flexShrink: 0}}>
                                    Тест {index + 1}
                                </Typography>
                                <Typography sx={{color: 'text.secondary'}}>
                                    Тестируемая последовательность {opt.nameFile !== "#null" ? opt.nameFile : '"Файл не выбран"'}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails className={'block-test'}>
                                <FileForTest idEl={opt.uid}/>
                                {opt.nameFile !== "#null" && <ListTests idEl={opt.uid}/>}
                                {opt.listTests.find(opt => {
                                    if (opt === 'blockFrequency') {
                                        return opt
                                    }
                                    return undefined
                                }) !== undefined && <ListDopParams idEl={opt.uid}/>}
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
                <Button
                    className={'btn-start-analysis'}
                    sx={{marginTop: '32px'}}
                    disabled={genAnalSelect.length === 0}
                    variant={'contained'}
                    color={'success'}
                    onClick={handleStartAnalysis}
                >
                    Начать анализ
                </Button>
                {allDataAnalysisNistTests.length !== 0 &&
                    <ResultTests/>
                }
            </main>
        </React.Fragment>
    )
};

export default GeneratorAnalysis;