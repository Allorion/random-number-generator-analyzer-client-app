import {createAsyncThunk} from "@reduxjs/toolkit";

interface IProps {
    "nameFile": string,
    "bitCount": number,
    bitFlag: boolean,
    fillingDensity: boolean,
}

export const fetchAddGraphDistributionTestOnPlane = createAsyncThunk(
    'fetchAddGraphDistributionTestOnPlane',
    async (data: IProps) => {

        let url = 'http://localhost:3001/api/graph-distribution-test-on-a-plane/start-analysis'

        let response = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        const status = response.status

        const respData: string | string[] = status === 200 ? URL.createObjectURL(await response.blob()) : await response.json();

        return {respData: respData, nameFile: data.nameFile}

    }
)