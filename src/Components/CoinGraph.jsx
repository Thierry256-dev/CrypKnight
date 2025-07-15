import ApexCharts from "react-apexcharts";

export default function CoinGraph({ options, series, type, height }) {
  return (
    <ApexCharts options={options} series={series} type={type} height={height} />
  );
}
