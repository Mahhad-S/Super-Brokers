import React, { useEffect, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Legend } from "chart.js";
import { CandlestickController, CandlestickElement } from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

ChartJS.register(CategoryScale, LinearScale, TimeScale, Tooltip, Legend, CandlestickController, CandlestickElement);

const CandlestickChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            // Destroy existing chart instance before creating a new one
            chartRef.current.destroy();
        }

        const ctx = document.getElementById("candlestick-chart").getContext("2d");

        chartRef.current = new ChartJS(ctx, {
            type: "candlestick",
            data: {
                datasets: [
                    {
                        label: "Candlestick Data",
                        data: data,
                        borderColor: "rgba(0,0,0,0.1)",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    x: {
                        type: "time",
                        time: {
                            unit: "day",
                        },
                        title: {
                            display: true,
                            text: "Date",
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Price",
                        },
                    },
                },
            },
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas id="candlestick-chart" />;
};

export default CandlestickChart;
