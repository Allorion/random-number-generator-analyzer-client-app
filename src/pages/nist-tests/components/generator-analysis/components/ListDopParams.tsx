import React, {ChangeEvent, FC} from "react";
import {TextField} from "@mui/material";
import {ALPaper} from "../../../../../allorion-ui";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks/redux";
import {genAnalEditDopParam, genAnalSelectById} from "../../../reducers/GeneratorAnalysisSlice";
import {TNameDopParam} from "../../../types/TypesNistTests";

interface IProps {
    idEl: string
}

const ListDopParams: FC<IProps> = ({idEl}) => {

    const dispatch = useAppDispatch()

    const genAnalElement = useAppSelector(state => genAnalSelectById(state, idEl))

    const handleEditDopParam = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nameParam: TNameDopParam, defaultData: number) => {

        let data: number | null = +e.target.value

        if (data === null || data === 0 || data === undefined) {
            data = defaultData
        }

        dispatch(genAnalEditDopParam({
            uid: idEl,
            nameParam: nameParam,
            data: data
        }))
    }

    return (
        <React.Fragment>
            <ALPaper className={'list-dop-params'} label={'Дополнительные обязательные параметры'}>
                <div className={'block-dop-params'}>
                    {genAnalElement?.listTests.find(opt => opt === 'blockFrequency') !== undefined &&
                        <TextField
                            type={"number"}
                            className={'text-field-dop-params'}
                            label={'Block Frequency Test - длина блока (M):'}
                            placeholder={'128'}
                            value={genAnalElement?.dopParams?.bftParam}
                            onChange={(e) => {
                                handleEditDopParam(e, "bftParam", 128)
                            }}
                        />
                    }
                    {genAnalElement?.listTests.find(opt => opt === 'overlappingTemplateMatchings') !== undefined &&
                        <TextField
                            type={"number"}
                            className={'text-field-dop-params'}
                            label={'Overlapping Template Test - длина блока (m):'}
                            placeholder={'9'}
                            value={genAnalElement?.dopParams?.ottParam}
                            onChange={(e) => {
                                handleEditDopParam(e, "ottParam",9)
                            }}
                        />
                    }
                    {genAnalElement?.listTests.find(opt => opt === 'approximateEntropy') !== undefined &&
                        <TextField
                            type={"number"}
                            className={'text-field-dop-params'}
                            label={'Approximate Entropy Test - длина блока (m):'}
                            placeholder={'10'}
                            value={genAnalElement?.dopParams?.aetParam}
                            onChange={(e) => {
                                handleEditDopParam(e, "aetParam", 10)
                            }}
                        />
                    }
                    {genAnalElement?.listTests.find(opt => opt === 'serialTest') !== undefined &&
                        <TextField
                            type={"number"}
                            className={'text-field-dop-params'}
                            label={'Serial Test - длина блока (m):'}
                            placeholder={'16'}
                            value={genAnalElement?.dopParams?.stParam}
                            onChange={(e) => {
                                handleEditDopParam(e, "stParam", 16)
                            }}
                        />
                    }
                    {genAnalElement?.listTests.find(opt => opt === 'linearComplexity') !== undefined &&
                        <TextField
                            type={"number"}
                            className={'text-field-dop-params'}
                            label={'Linear Complexity Test - длина блока (M):'}
                            placeholder={'500'}
                            value={genAnalElement?.dopParams?.lctParam}
                            onChange={(e) => {
                                handleEditDopParam(e, "lctParam", 500)
                            }}
                        />
                    }
                </div>
            </ALPaper>
        </React.Fragment>
    )
};

export default ListDopParams;