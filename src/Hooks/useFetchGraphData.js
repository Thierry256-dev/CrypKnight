import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

export default function useFetchGraphData(coinId, days) {
  const [ohlcData, setOhlcData] = useState({
    series: [{ name: "Bitcoin", data: [] }],
    options: {
      chart: {
        zoom: { enabled: false },
        toolbar: { show: false },
        background: "#1f1616",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      xaxis: {
        type: "datetime",
        labels: { datetimeUTC: false },
      },
      yaxis: {
        labels: { formatter: (value) => `$${value.toFixed(2)}` },
      },
      tooltip: {
        x: { format: "dd MMM HH:mm" },
      },
      colors: ["#ff5100ff"],
      theme: {
        mode: "dark",
      },
      stroke: {
        width: 2,
      },
      grid: {
        show: false,
        borderColor: "transparent",
      },
      fill: { type: "solid" },
      dataLabels: { enabled: false },
    },
  });
  const [areaData, setAreaData] = useState({
    series: [{ name: "Bitcoin", data: [] }],
    options: {
      chart: {
        zoom: { enabled: false },
        toolbar: { show: false },
        background: "#1f1616",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      xaxis: {
        type: "datetime",
        labels: { datetimeUTC: false },
      },
      yaxis: {
        labels: { formatter: (value) => `$${value.toFixed(2)}` },
      },
      tooltip: {
        x: { format: "dd MMM HH:mm" },
      },
      colors: ["#ff5100ff"],
      theme: {
        mode: "dark",
      },
      stroke: {
        width: 2,
      },
      grid: {
        show: false,
        borderColor: "transparent",
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#f05d19ff"],
          inverseColors: false,
          opacityFrom: 0.1,
          opacityTo: 0.3,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
    },
  });

  useEffect(() => {
    const fetchSeries = async () => {
      await fetchData.fetchCoinChart(coinId, days, setOhlcData);
      await fetchData.fetchCoinsLine(coinId, days, setAreaData);
    };
    fetchSeries();
  }, [coinId, days]);

  return [ohlcData, areaData];
}
