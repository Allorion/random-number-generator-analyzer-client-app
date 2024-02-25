import {createEntityAdapter, createSlice, SerializedError} from "@reduxjs/toolkit";
import {fetchAddGraphDistributionTestOnPlane} from "../api/ACAddGraphDistributionTestOnPlane";
import {generateUniqueID} from "web-vitals/dist/modules/lib/generateUniqueID";

interface IGraphDistributionTestOnPlaneSlice {
    img: string,
    uid: string,
    nameFile: string,
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

const graphDistributionTestOnPlaneAdapter = createEntityAdapter({
    selectId: (model: IGraphDistributionTestOnPlaneSlice) => model.uid
})

export const graphDistributionTestOnPlaneSlice = createSlice({
    name: 'graphDistributionTestOnPlaneSlice',
    initialState: graphDistributionTestOnPlaneAdapter.getInitialState(initialState),
    reducers: {
        removeAll(state) {
            graphDistributionTestOnPlaneAdapter.removeAll(state)
        },
        removeOne(state, action) {
            graphDistributionTestOnPlaneAdapter.removeOne(state, action.payload)
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchAddGraphDistributionTestOnPlane.pending, (state) => {
                if (state.loading === 'idle') {
                    state.loading = 'pending'
                }
            })
            .addCase(fetchAddGraphDistributionTestOnPlane.fulfilled, (state, action: {
                payload: { blob: Blob | string[], nameFile: string }
            }) => {
                if (state.loading === 'pending') {

                    if (!Array.isArray(action.payload.blob)) {
                        // Создаем URL-адрес для данных картинки
                        const imageUrl = URL.createObjectURL(action.payload.blob);
                        graphDistributionTestOnPlaneAdapter.addOne(state, {
                            img: imageUrl,
                            uid: generateUniqueID(),
                            nameFile: action.payload.nameFile
                        })
                    } else {
                        alert(action.payload.blob.join('\n - '))
                    }

                    state.loading = 'idle'
                }
            })
            .addCase(fetchAddGraphDistributionTestOnPlane.rejected, (state, action) => {
                if (state.loading === 'pending') {
                    state.error = action.error
                    state.loading = 'idle'
                }
            })
    }
})

export const {
    removeAll: removeAllGraphDistributionTestOnPlane,
    removeOne: removeOneGraphDistributionTestOnPlane,
} = graphDistributionTestOnPlaneSlice.actions

export const {
    selectAll: selectAllGraphDistributionTestOnPlane,
    //@ts-ignore
} = graphDistributionTestOnPlaneAdapter.getSelectors(state => state.graphDistributionTestOnPlaneReducer)

export default graphDistributionTestOnPlaneSlice.reducer