import {IGeneratorAnalysisFilterData, INameTests, TNameDopParam} from "../types/TypesNistTests";
import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {generateUniqueId} from "../../global-elements/functions/generateUniqueId";

const defaultData: IGeneratorAnalysisFilterData = {
    nameFile: '#null',
    listTests: [],
    alpha: 0.05,
    dopParams: {
        bftParam: undefined,
        nottParam: undefined,
        ottParam: undefined,
        aetParam: undefined,
        stParam: undefined,
        lctParam: undefined
    },
    bitstreams: 10,
    numberOfBits: 100000,
    uid: ''
}

const generatorAnalysisFilterDataAdapter = createEntityAdapter({
    selectId: (model: IGeneratorAnalysisFilterData) => model.uid
})

export const generatorAnalysisFilterDataSlice = createSlice({
    name: 'generatorAnalysisFilterDataSlice',
    initialState: generatorAnalysisFilterDataAdapter.getInitialState(),
    reducers: {
        addNewData(state) {
            generatorAnalysisFilterDataAdapter.addOne(state, Object.assign({}, defaultData, {
                uid: generateUniqueId(),
            }))
        },
        delData(state, action) {
            generatorAnalysisFilterDataAdapter.removeOne(state, action.payload)
        },
        editFile(state, action: { payload: { uid: string, fileName: string }, type: string }) {
            generatorAnalysisFilterDataAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    nameFile: action.payload.fileName,
                }
            })
        },
        editNumberOfBits(state, action: { payload: { uid: string, numberOfBits: number }, type: string }) {
            generatorAnalysisFilterDataAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    numberOfBits: action.payload.numberOfBits,
                }
            })
        },
        editBitstreams(state, action: { payload: { uid: string, bitstreams: number }, type: string }) {
            generatorAnalysisFilterDataAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    bitstreams: action.payload.bitstreams,
                }
            })
        },
        updateListTests(state, action: {
            payload: { uid: string, fileName: INameTests, checked: boolean },
            type: string
        }) {

            if (state.entities[action.payload.uid] !== undefined) {

                let list = state.entities[action.payload.uid]!.listTests

                if (action.payload.checked) {
                    list.push(action.payload.fileName)
                } else {
                    list = list.filter(el => el !== action.payload.fileName)
                }

                generatorAnalysisFilterDataAdapter.updateOne(state, {
                    id: action.payload.uid,
                    changes: {
                        listTests: list,
                    }
                })
            }
        },
        editDopParam(state, action: {
            payload: { uid: string, nameParam: TNameDopParam, data: number },
            type: string
        }) {

            generatorAnalysisFilterDataAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    dopParams: Object.assign({}, state.entities[action.payload.uid].dopParams, {[action.payload.nameParam]: action.payload.data})
                }
            })
        }

    }
})

export const {
    addNewData: genAnalAddNewData,
    editFile: genAnalEditFile,
    editNumberOfBits: genAnalEditNumberOfBits,
    editBitstreams: genAnalEditBitstreams,
    updateListTests: genAnalUpdateListTests,
    editDopParam: genAnalEditDopParam,
} = generatorAnalysisFilterDataSlice.actions


export const {
    selectAll: genAnalSelectAll,
    selectById: genAnalSelectById,
// @ts-ignore
} = generatorAnalysisFilterDataAdapter.getSelectors(state => state.generatorAnalysisFilterDataReducer)


export default generatorAnalysisFilterDataSlice.reducer