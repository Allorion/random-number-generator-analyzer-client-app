// *********************************************************************************************************************
// Хранилище проекта
// *********************************************************************************************************************


import {combineReducers, configureStore} from '@reduxjs/toolkit'
import dataListFilesBinarySequenceReducer
    from "../pages/global-elements/api-requests/list-files-binary-sequence/reducers/ListFilesBinarySequenceSlice";
import {nistTestsStore} from "../pages/nist-tests/store/nistTestsStore";


const obj = Object.assign(
    {
        dataListFilesBinarySequenceReducer
    },
    nistTestsStore
)

const rootReducer = combineReducers(obj)

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
