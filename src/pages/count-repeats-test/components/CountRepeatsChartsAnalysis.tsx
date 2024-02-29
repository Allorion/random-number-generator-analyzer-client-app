import React, {FC} from "react";
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
    const coors: { x: number[]; y: number[] } = {x: [], y: []};

    Object.entries(data.result).forEach(([key, value]) => {
        coors.x.push(+key);
        coors.y.push(value);
    });

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
        labels: coors.x, // Массив с данными для x
        datasets: [
            {
                label: `График последовательности ${data.nameFile}`, // Название графика
                data: coors.y, // Массив с данными для y
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

    //@ts-ignore
    return flag === 'Line' ? <Line data={dataChart} options={options}/> : <Bar data={dataChart} options={options}/>;
};

export default CountRepeatsChartsAnalysis;
