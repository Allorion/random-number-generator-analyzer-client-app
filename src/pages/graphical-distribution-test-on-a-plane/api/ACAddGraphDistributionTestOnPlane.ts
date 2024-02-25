import {createAsyncThunk} from "@reduxjs/toolkit";

interface IProps {
    "nameFile": string,
    "bitCount": number,
    "zoom": number
}

export const fetchAddGraphDistributionTestOnPlane = createAsyncThunk(
    'fetchAddGraphDistributionTestOnPlane',
    async (data: IProps) => {
        console.log(data)
        let url = 'http://localhost:3001/api/graph-distribution-test-on-a-plane/start-analysis'

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const json: Blob = await response.blob();

        return {blob: json, nameFile: data.nameFile}

    }
)