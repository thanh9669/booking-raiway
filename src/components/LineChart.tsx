import React, { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from 'prop-types';
import { ApexOptions } from 'apexcharts';

// Dynamically import the ApexCharts component
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// Define the props interface
interface LineChartProps {
    options: ApexOptions;
    type: "line" | "area" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
    series: ApexAxisChartSeries | ApexNonAxisChartSeries;
}


const LineChart: React.FC<LineChartProps> = (props) => {
    const [options] = useState(props.options);
    const [type] = useState(props.type);
    const [series] = useState(props.series);

    return (
        <ReactApexChart
            options={options}
            series={series}
            type={type}
            width="100%"
        />
    );
};

LineChart.propTypes = {
    options: PropTypes.object.isRequired,
    type: PropTypes.any.isRequired,
    series: PropTypes.array.isRequired
};
LineChart.defaultProps = {
    options: {},
    type: 'bar',
    series: []
};

export default LineChart;
