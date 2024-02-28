// *********************************************************************************************************************
// Хранилище проекта
// *********************************************************************************************************************


import {combineReducers, configureStore} from '@reduxjs/toolkit'
import dataListFilesBinarySequenceReducer
    from "../pages/global-elements/api-requests/list-files-binary-sequence/reducers/ListFilesBinarySequenceSlice";
import {nistTestsStore} from "../pages/nist-tests/store/nistTestsStore";
import {stackOfBooksTestsStore} from "../pages/stack-of-books-test/store/stackOfBooksTestsStore";
import graphDistributionTestOnPlaneReducer from "../pages/graphical-distribution-test-on-a-plane/reducers/GraphDistributionTestOnPlaneSlice";
import countRepeatsTestReducer from "../pages/count-repeats-test/reducers/CountRepeatsTestSlice";


const obj = Object.assign(
    {
        dataListFilesBinarySequenceReducer,
        graphDistributionTestOnPlaneReducer,
        countRepeatsTestReducer
    },
    nistTestsStore,
    stackOfBooksTestsStore
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
