import {createEntityAdapter, createSlice, SerializedError} from "@reduxjs/toolkit";
import {IRespDataStackOfBooks} from "../types/TypesStackOfBooks";
import {fetchDataAnalysisStackOfBooks} from "../api/ACDataAnalysisStackOfBooks";

interface IInitialState {
    loading: 'idle' | 'pending',
    error: null | SerializedError,
    noData: boolean,
    errorList: string[]
}

const initialState = {
    loading: 'idle',
    error: null,
    noData: false,
} as IInitialState


const stackOfBooksResultDataAdapter = createEntityAdapter({
    selectId: (model: IRespDataStackOfBooks) => model.uid
})

export const stackOfBooksResultDataSlicer = createSlice({
    name: 'stackOfBooksResultDataSlicer',
    initialState: stackOfBooksResultDataAdapter.getInitialState(initialState),
    reducers: {
        delAllData(state) {
            stackOfBooksResultDataAdapter.removeAll(state)
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchDataAnalysisStackOfBooks.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(fetchDataAnalysisStackOfBooks.fulfilled, (state, action) => {
                if (state.loading === 'pending') {
                    if (action.payload[0] !== undefined && typeof action.payload[0] !== "string") {
                        state.errorList = []
                        if (action.payload.length === 0) {
                            state.noData = true
                        }
                        //@ts-ignore
                        stackOfBooksResultDataAdapter.setAll(state, action.payload)
                    } else {
                        //@ts-ignore
                        state.errorList = action.payload
                    }
                }
            })
            .addCase(fetchDataAnalysisStackOfBooks.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle'
                    state.error = action.error
                }
            })
    }
})

export const {
    delAllData: delAllDataStackOfBooksResultTests
} = stackOfBooksResultDataSlicer.actions

export const {
    selectAll: selectAllStackOfBooksResult
    //@ts-ignore
} = stackOfBooksResultDataAdapter.getSelectors(state => state.stackOfBooksResultDataReducer)

export default stackOfBooksResultDataSlicer.reducer