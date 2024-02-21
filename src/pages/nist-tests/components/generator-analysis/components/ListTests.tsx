import React, {FC} from "react";
import {ALPaper} from "../../../../../allorion-ui";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks/redux";
import {genAnalSelectById, genAnalUpdateListTests} from "../../../reducers/GeneratorAnalysisSlice";
import {Checkbox, FormControlLabel, FormGroup} from "@mui/material";
import {INameTests} from "../../../types/TypesNistTests";

interface IProps {
    idEl: string
}


const ListTests: FC<IProps> = ({idEl}) => {

    const dispatch = useAppDispatch()

    const genAnalElement = useAppSelector(state => genAnalSelectById(state, idEl))

    const handleUpdateListTest = (e: React.MouseEvent, nameTest: INameTests) => {
        dispatch(genAnalUpdateListTests({
            uid: idEl,
            fileName: nameTest,
            //@ts-ignore
            checked: e.target.checked
        }))
    }

    const checkTest = (nameTest: INameTests) => {
        return genAnalElement?.listTests.find(opt => opt === nameTest) !== undefined
    }

    return (
        <React.Fragment>
            <ALPaper className={'list-tests'} label={'Список тестов'}>
                <div className={'block-list'}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'frequencyTest')}
                                    checked={checkTest('frequencyTest')}
                                />
                            }
                            label={"Частотный (побитовый) тест (Frequency Monobit Test)"}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'blockFrequency')}
                                    checked={checkTest('blockFrequency')}
                                />
                            }
                            label={'Тест на блочную частоту (Block Frequency Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'cumulativeSums')}
                                    checked={checkTest('cumulativeSums')}
                                />
                            }
                            label={'Тест на кумулятивные суммы (Cumulative Sums Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'runTest')}
                                    checked={checkTest('runTest')}
                                />
                            }
                            label={'Тест серий (Runs Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'longestRunOfOnes')}
                                    checked={checkTest('longestRunOfOnes')}
                                />
                            }
                            label={'Тест на самую длинную серию единиц (Longest Run of Ones Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'rankTest')}
                                    checked={checkTest('rankTest')}
                                />
                            }
                            label={'Тест на ранг бинарных матриц (Rank Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'overlappingTemplateMatchings')}
                                    checked={checkTest('overlappingTemplateMatchings')}
                                />
                            }
                            label={'Тест на совпадение перекрывающихся шаблонов (Overlapping Template Matchings Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'universal')}
                                    checked={checkTest('universal')}
                                />
                            }
                            label={'Универсальный статистический тест Маурера (Universal Statistical Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'approximateEntropy')}
                                    checked={checkTest('approximateEntropy')}
                                />
                            }
                            label={'Тест приблизительной энтропии (Approximate Entropy Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'randomExcursions')}
                                    checked={checkTest('randomExcursions')}
                                />
                            }
                            label={'Тест на произвольные отклонения (Random Excursions Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'randomExcursionsVariant')}
                                    checked={checkTest('randomExcursionsVariant')}
                                />
                            }
                            label={'Тест на произвольные отклонения с вариантами (Random Excursions Variant Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'serialTest')}
                                    checked={checkTest('serialTest')}
                                />
                            }
                            label={'Тест на периодичность (Serial Test)'}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    onClick={(e) => handleUpdateListTest(e, 'linearComplexity')}
                                    checked={checkTest('linearComplexity')}
                                />
                            }
                            label={'Тест на линейную сложность (Linear Complexity)'}
                        />
                    </FormGroup>
                </div>
            </ALPaper>
        </React.Fragment>
    )
};

export default ListTests;