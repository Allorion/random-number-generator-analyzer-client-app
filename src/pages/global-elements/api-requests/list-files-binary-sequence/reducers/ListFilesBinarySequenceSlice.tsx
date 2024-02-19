import {createEntityAdapter, createSlice, SerializedError} from "@reduxjs/toolkit";
import {fetchListFilesBinarySequence} from "../api-requests/ACListFilesBinarySequence";

export interface IListFilesBinarySequence {
    "status": 200 | 400,
    "listFiles": string[]
}

interface IInitialState {
    loading: 'idle' | 'pending',
    error: null | SerializedError,
    noData: boolean,
}

const initialState = {
    loading: 'idle',
    error: null,
    noData: false,
} as IInitialState


const dataListFilesBinarySequenceAdapter = createEntityAdapter({
    selectId: (model: string) => model
})

export const dataListFilesBinarySequenceSlice = createSlice(
    {
        name: 'dataListFilesBinarySequenceSlice',
        initialState: dataListFilesBinarySequenceAdapter.getInitialState(initialState),
        reducers: {
            delListFilesBinarySequence(state) {
                dataListFilesBinarySequenceAdapter.removeAll(state)
                state.noData = false
            },
            setNoListFilesBinarySequence(state, action) {
                state.noData = action.payload
            }
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchListFilesBinarySequence.pending, (state) => {
                    if (state.loading === 'idle') {
                        state.loading = 'pending'
                    }
                })
                .addCase(fetchListFilesBinarySequence.fulfilled, (state, action) => {
                    if (state.loading === 'pending') {
                        dataListFilesBinarySequenceAdapter.setAll(state, action.payload)
                        if (action.payload.length === 0) {
                            state.noData = true
                        }
                        state.loading = 'idle'
                    }
                })
                .addCase(fetchListFilesBinarySequence.rejected, (state, action) => {
                    if (state.loading === 'pending') {
                        state.error = action.error
                        state.loading = 'idle'
                    }
                })
        }
    }
)

export const {
    delListFilesBinarySequence,
    setNoListFilesBinarySequence
} = dataListFilesBinarySequenceSlice.actions

export const {
    selectAll: selectAllFilesBinarySequence
    //@ts-ignore
} = dataListFilesBinarySequenceAdapter.getSelectors(state => state.dataListFilesBinarySequenceReducer)

//@ts-ignore
export const selectListFilesBinarySequence = dataListFilesBinarySequenceAdapter.getSelectors(state => state.dataListFilesBinarySequenceReducer)

export default dataListFilesBinarySequenceSlice.reducer