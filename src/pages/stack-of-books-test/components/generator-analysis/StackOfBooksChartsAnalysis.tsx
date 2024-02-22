import React, {FC} from "react";
import { ResponsiveBar } from '@nivo/bar'
import {IRespDataStackOfBooks} from "../../types/TypesStackOfBooks";

interface IProps {
    data: IRespDataStackOfBooks
}

const StackOfBooksChartsAnalysis: FC<IProps> = ({data}) => {

    return (
        <React.Fragment>
            <ResponsiveBar
                data={data.result.map((opt, index) => { return { x: index + 1, pValue: opt.pValue } })}
                keys={["pValue"]}
                maxValue={1}
                padding={0.6}
                margin={{
                    top: 50,
                    right: 10,
                    bottom: 60,
                    left: 50
                }}
                indexBy="x"
                enableLabel={false}
                borderRadius={2}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'pValue',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    truncateTickAt: 0
                }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Номер теста',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    truncateTickAt: 0
                }}
                label={`График последовательности ${data.nameFile}`}
            />
        </React.Fragment>
    )
};

export default StackOfBooksChartsAnalysis;