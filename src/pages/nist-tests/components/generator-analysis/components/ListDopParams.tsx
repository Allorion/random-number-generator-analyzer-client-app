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

    const handleEditDopParam = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, nameParam: TNameDopParam) => {

        let data: number | null = +e.target.value

        if (data === null || data === 0 || data === undefined) {
            data = 128
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
                                handleEditDopParam(e, "bftParam")
                            }}
                        />
                    }
                </div>
            </ALPaper>
        </React.Fragment>
    )
};

export default ListDopParams;