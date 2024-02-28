import React, { FC } from "react";
import { IDataResultCountRepeatsTest } from "../reducers/CountRepeatsTestSlice";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import zoomPlugin from 'chartjs-plugin-zoom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    zoomPlugin,
)

interface IProps {
    data: IDataResultCountRepeatsTest;
}

const CountRepeatsChartsAnalysis: FC<IProps> = ({ data }) => {
    const coors: { x: number[]; y: number[] } = { x: [], y: [] };

    Object.entries(data.result).forEach(([key, value]) => {
        coors.x.push(+key);
        coors.y.push(value);
    });

    // Создаем объект с данными для графика
    const dataChart = {
        labels: coors.x, // Массив с данными для x
        datasets: [
            {
                label: `График последовательности ${data.nameFile}`, // Название графика
                data: coors.y, // Массив с данными для y
                borderColor: "#257493", // Цвет линии графика
                pointBackgroundColor: "white", // Цвет точек графика
            },
        ],
    };

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

    //@ts-ignore
    return <Line data={dataChart} options={options}/>;
};

export default CountRepeatsChartsAnalysis;
