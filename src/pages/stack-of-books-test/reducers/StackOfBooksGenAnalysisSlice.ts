import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";
import {generateUniqueId} from "../../global-elements/functions/generateUniqueId";
import {IStackOfBooksGenAnalysis} from "../types/TypesStackOfBooks";

const defaultData: IStackOfBooksGenAnalysis = {
    nameFile: '#null',
    alpha: 0.05,
    blockSize: 2,
    bitstreams: 10,
    numberOfBits: 100000,
    uid: ''
}

const stackOfBooksGenAnalysisAdapter = createEntityAdapter({
    selectId: (model: IStackOfBooksGenAnalysis) => model.uid
})

const stackOfBooksGenAnalysisSlice = createSlice({
    name: 'stackOfBooksGenAnalysisSlice',
    initialState: stackOfBooksGenAnalysisAdapter.getInitialState(),
    reducers: {
        addNewData(state) {
            stackOfBooksGenAnalysisAdapter.addOne(state, Object.assign({}, defaultData, {
                uid: generateUniqueId(),
            }))
        },
        delData(state, action) {
            stackOfBooksGenAnalysisAdapter.removeOne(state, action.payload)
        },
        delDataAll(state) {
            stackOfBooksGenAnalysisAdapter.removeAll(state)
        },
        editFile(state, action: { payload: { uid: string, fileName: string }, type: string }) {
            stackOfBooksGenAnalysisAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    nameFile: action.payload.fileName,
                }
            })
        },
        editNumberOfBits(state, action: { payload: { uid: string, numberOfBits: number }, type: string }) {
            stackOfBooksGenAnalysisAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    numberOfBits: action.payload.numberOfBits,
                }
            })
        },
        editBitstreams(state, action: { payload: { uid: string, bitstreams: number }, type: string }) {
            stackOfBooksGenAnalysisAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    bitstreams: action.payload.bitstreams,
                }
            })
        },
        editBlockSize(state, action: { payload: { uid: string, blockSize: number }, type: string }) {
            stackOfBooksGenAnalysisAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    blockSize: action.payload.blockSize,
                }
            })
        },
        editAlpha(state, action: { payload: { uid: string, alpha: number }, type: string }) {
            stackOfBooksGenAnalysisAdapter.updateOne(state, {
                id: action.payload.uid,
                changes: {
                    alpha: action.payload.alpha,
                }
            })
        },
    }
})

export const {
    addNewData: addNewDataStackOfBooks,
    delData: delDataStackOfBooks,
    delDataAll: delDataAllStackOfBooks,
    editFile: editFileStackOfBooks,
    editNumberOfBits: editNumberOfBitsStackOfBooks,
    editBitstreams: editBitstreamsStackOfBooks,
    editBlockSize: editBlockSizeStackOfBooks,
    editAlpha: editAlphaStackOfBooks
} = stackOfBooksGenAnalysisSlice.actions


export const {
    selectAll: selectAllStackOfBooks,
    selectById: selectByIdStackOfBooks
    //@ts-ignore
} = stackOfBooksGenAnalysisAdapter.getSelectors(state => state.stackOfBooksGenAnalysisReducer)

export default stackOfBooksGenAnalysisSlice.reducer