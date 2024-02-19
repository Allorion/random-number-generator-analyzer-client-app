import {createAsyncThunk} from "@reduxjs/toolkit";
import {IDataAnalysisNistTests, IGeneratorAnalysisFilterData} from "../types/TypesNistTests";

export const fetchDataAnalysisNistTests = createAsyncThunk(
    'fetchDataAnalysisNistTests',
    async (data: IGeneratorAnalysisFilterData[]) => {

        let url = 'http://localhost:3001/api/nist-tests/start-analysis'

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const json: IDataAnalysisNistTests[] = await response.json();

        return json

    }
)