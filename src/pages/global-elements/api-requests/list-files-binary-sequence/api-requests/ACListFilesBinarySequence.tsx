import {createAsyncThunk} from "@reduxjs/toolkit";
import {IListFilesBinarySequence} from "../reducers/ListFilesBinarySequenceSlice";

export const fetchListFilesBinarySequence = createAsyncThunk(
    'fetchListFilesBinarySequence',
    async () => {

        let url = 'http://localhost:3001/api/files-binary-sequence/list'

        let response = await fetch(url, {
            method: 'GET',
            headers: {},
        });

        const json: IListFilesBinarySequence = await response.json();

        return json.listFiles

    }
)