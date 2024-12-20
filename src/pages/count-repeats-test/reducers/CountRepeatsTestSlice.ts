import {createEntityAdapter, createSlice, SerializedError} from "@reduxjs/toolkit";
import {fetchCountRepeatsTest} from "../api/ACCountRepeatsTest";
import generateUniqueID from "../../../functions/generateUniqueID";

export interface IDataResultCountRepeatsTest {
    result: Record<number, number>,
    nameFile: string,
    uid: string,
    calculationAccordingLawDistribution: boolean,
    flag: 'Line' | 'Bar'
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

const countRepeatsTestAdapter = createEntityAdapter({
    selectId: (model: IDataResultCountRepeatsTest) => model.uid
})

export const countRepeatsTestSlice = createSlice({
    name: 'countRepeatsTestSlice',
    initialState: countRepeatsTestAdapter.getInitialState(initialState),
    reducers: {
        removeAll(state) {
            countRepeatsTestAdapter.removeAll(state)
        },
        removeOne(state, action) {
            countRepeatsTestAdapter.removeOne(state, action.payload)
        },
        editFlag(state, action: { payload: { id: string, flag: 'Line' | 'Bar' }, type: string }) {
            console.log(state)
            console.log(action.payload.id)
            countRepeatsTestAdapter.updateOne(state, {
                id: action.payload.id,
                changes: {
                    flag: action.payload.flag
                }
            })
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchCountRepeatsTest.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(fetchCountRepeatsTest.fulfilled, (state, action: {
                payload: IDataResultCountRepeatsTest | string[],
                type: string
            }) => {
                if (state.loading === 'pending') {

                    const data = action.payload

                    if (Array.isArray(data)) {
                        alert(data.join('\n - '))
                    } else {
                        countRepeatsTestAdapter.addOne(state, Object.assign({}, data, {
                            uid: generateUniqueID(),
                            flag: 'Bar'
                        }))
                    }

                    state.loading = 'idle'
                }
            })
            .addCase(fetchCountRepeatsTest.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.error = action.error
                    state.loading = 'idle'
                }
            })
    }
})

export const {
    removeAll: removeAllCountRepeatsTest,
    removeOne: removeOneCountRepeatsTest,
    editFlag: editFlagCountRepeatsTest,
} = countRepeatsTestSlice.actions

export const {
    selectAll: selectAllCountRepeatsTest,
    //@ts-ignore
} = countRepeatsTestAdapter.getSelectors(state => state.countRepeatsTestReducer)

export default countRepeatsTestSlice.reducer