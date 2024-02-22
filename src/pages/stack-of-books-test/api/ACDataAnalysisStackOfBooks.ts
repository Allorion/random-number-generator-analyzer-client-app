import {createAsyncThunk} from "@reduxjs/toolkit";
import {IRespDataStackOfBooks, IStackOfBooksGenAnalysis} from "../types/TypesStackOfBooks";

export const fetchDataAnalysisStackOfBooks = createAsyncThunk(
    'fetchDataAnalysisStackOfBooks',
    async (data: IStackOfBooksGenAnalysis[]) => {

        let url = 'http://localhost:3001/api/stack-of-books-tests/start-analysis'

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const json: IRespDataStackOfBooks[] | string[] = await response.json();

        return json

    }
)