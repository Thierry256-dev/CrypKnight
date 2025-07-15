import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import CoinGraph from "../Components/CoinGraph";

export default function CoinGraphSection() {
  const [chartData, setChartData] = useState({
    series: [{ name: "Bitcoin", data: [] }],
    options: {
      chart: {
        type: "candlestick",
        zoom: { enabled: false },
        toolbar: { show: false },
        background: "#1f1616",
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
      colors: ["#ff0000ff"],
      theme: {
        mode: "dark",
      },
    },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCandles = async () => {
      setIsLoading(true);
      await fetchData.fetchCoinChart("bitcoin", 1, setChartData);
      setIsLoading(false);
    };
    fetchCandles();
  }, [chartData]);
  return (
    <div>
      {isLoading ? (
        <p>Loading Chart...</p>
      ) : (
        <CoinGraph
          options={chartData.options}
          series={chartData.series}
          type="candlestick"
          height={350}
        />
      )}
    </div>
  );
}
