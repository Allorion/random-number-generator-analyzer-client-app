import {createAsyncThunk} from "@reduxjs/toolkit";
import {IDataResultCountRepeatsTest} from "../reducers/CountRepeatsTestSlice";

interface IProps {
    "nameFile": string,
    "byteCount": number,
}

export const fetchCountRepeatsTest = createAsyncThunk(
    'fetchCountRepeatsTest',
    async (data: IProps) => {

        let url = 'http://localhost:3001/api/count-repeats-test/start-tests'

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const json: IDataResultCountRepeatsTest | string[] = await response.json()

        return json

    }
)