import React, {FC, useEffect, useRef, useState} from "react";
import {IDataResultCountRepeatsTest} from "../reducers/CountRepeatsTestSlice";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend, BarElement,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';
import {Button, Stack, TextField} from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
)

interface IProps {
    data: IDataResultCountRepeatsTest,
    flag: 'Bar' | 'Line'
}

const CountRepeatsChartsAnalysis: FC<IProps> = ({data, flag}) => {


    const calculate = (data: IDataResultCountRepeatsTest, step: number, setCoords: React.Dispatch<React.SetStateAction<{
        x: number[],
        y: number[]
    }>>) => {
        const coords: { x: number[]; y: number[] } = {x: [], y: []}

        // Initialize the starting point and the step size
        let startPoint = +Object.keys(data.result)[0];
        let endPoint = startPoint + step;

        // Iterate over the result object and calculate the sum for each range
        Object.entries(data.result).forEach(([key, value]) => {
            const keyNum = parseInt(key);
            // Check if the key is within the current range
            if (keyNum >= startPoint && keyNum < endPoint) {
                // If it is, add the value to the current y coordinate
                if (coords.x.includes(startPoint)) {
                    coords.y[coords.x.indexOf(startPoint)] += value;
                } else {
                    // If this is the first value in the range, add the x and y coordinates
                    coords.x.push(startPoint);
                    coords.y.push(value);
                }
            } else {
                // If the key is outside the current range, move to the next range
                while (keyNum >= endPoint) {
                    startPoint += step;
                    endPoint += step;
                }
                // Add the new range and value
                coords.x.push(startPoint);
                coords.y.push(value);
            }
        });
        setCoords(coords)
    }

    const [coords, setCoords] = useState<{ x: number[]; y: number[] }>({x: [], y: []})

    const step = useRef<number>(10)

    useEffect(() => {
        if (data.calculationAccordingLawDistribution) {
            calculate(data, step.current, setCoords)
        } else {
            const listCoords: { x: number[]; y: number[] } = {x: [], y: []}
            Object.entries(data.result).forEach(([key, value]) => {
                listCoords.x.push(+key);
                listCoords.y.push(value);
            });
            setCoords(listCoords)
        }
    }, []);

    // Создаем объект с данными для графика
    const dataChart: {
        labels: number[],
        datasets: {
            label: string,
            data: number[]
            borderColor?: string,
            pointBackgroundColor?: string,
            backgroundColor?: string,
        }[]
    } = {
        labels: coords.x, // Массив с данными для x
        datasets: [
            {
                label: `График последовательности ${data.nameFile}`, // Название графика
                data: coords.y, // Массив с данными для y
            },
        ],
    };

    if (flag === 'Line') {
        dataChart.datasets[0].borderColor = "#257493" // Цвет линии графика
        dataChart.datasets[0].pointBackgroundColor = "white" // Цвет точек графика
    } else {
        dataChart.datasets[0].backgroundColor = "#257493" // Цвет столбцов графика
    }

    // Создаем объект с опциями для графика
    const options = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Байт", // Подпись оси x
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Количество повторений", // Подпись оси y
                },
            },
        },
        plugins: {
            zoom: {
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    mode: 'x',
                }
            }
        },
        aspectRatio: 4, // Устанавливаем отношение ширины к высоте графика
    };

    const handelEditStep = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const data = e.target.value
        if (!Number.isNaN(data)) {
            step.current = +data
        }
    }

    const handleCalculate = () => {
        calculate(data, step.current, setCoords)
    }

    return (
        <React.Fragment>
            <Stack direction={'column'} spacing={2}>
                {data.calculationAccordingLawDistribution &&
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            sx={{width: 200}}
                            label={'Шаг'}
                            onChange={handelEditStep}
                        />
                        <Button
                            onClick={handleCalculate}
                        >
                            Перерисовать с учетом нового шага
                        </Button>
                    </Stack>
                }
                {/*@ts-ignore*/}
                {flag === 'Line' ? <Line data={dataChart} options={options}/> :
                    //@ts-ignore
                    <Bar data={dataChart} options={options}/>}
            </Stack>
        </React.Fragment>
    )
};

export default CountRepeatsChartsAnalysis;
