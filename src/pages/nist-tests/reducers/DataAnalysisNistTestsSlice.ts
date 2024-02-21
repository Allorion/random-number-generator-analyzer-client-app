import {createEntityAdapter, createSlice, SerializedError} from "@reduxjs/toolkit";
import {IDataAnalysisNistTests} from "../types/TypesNistTests";
import {fetchDataAnalysisNistTests} from "../api-requests/ACDataAnalysisNistTests";

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

const dataAnalysisNistTestsAdapter = createEntityAdapter({
    selectId: (model: IDataAnalysisNistTests) => model.uid
})

export const dataAnalysisNistTestsSlice = createSlice({
    name: 'dataAnalysisNistTestsSlice',
    initialState: dataAnalysisNistTestsAdapter.getInitialState(initialState),
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchDataAnalysisNistTests.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(fetchDataAnalysisNistTests.fulfilled, (state, action) => {
                if (state.loading === 'pending') {

                    if (action.payload[0] !== undefined && typeof action.payload[0] !== "string") {
                        state.errorList = []
                        if (action.payload.length === 0) {
                            state.noData = true
                        }
                        //@ts-ignore
                        dataAnalysisNistTestsAdapter.setAll(state, action.payload)
                    } else {
                        //@ts-ignore
                        state.errorList = action.payload
                    }

                    state.loading = 'idle'
                }
            })
            .addCase(fetchDataAnalysisNistTests.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.loading = 'idle'
                    state.error = action.error
                }
            })
    }
})

export const {} = dataAnalysisNistTestsSlice.actions

export const {
    selectAll: selectAllDataAnalysisNistTests
    //@ts-ignore
} = dataAnalysisNistTestsAdapter.getSelectors(state => state.dataAnalysisNistTestsReducer)

export default dataAnalysisNistTestsSlice.reducer