import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import CoinGraph from "../Components/CoinGraph";

export default function CoinGraphSection() {
  const [chartType, setChartType] = useState("candlestick");
  const [chartData, setChartData] = useState({
    series: [{ name: "Bitcoin", data: [] }],
    options: {
      chart: {
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
      colors: ["#ff5100ff"],
      theme: {
        mode: "dark",
      },
    },
  });
  const [isLoading, setIsLoading] = useState(true);
  const [coinId, setCoinId] = useState("bitcoin");
  const [coinsList, setCoinsList] = useState([]);
  const [days, setDays] = useState(1);

  const daysButtonData = [
    { name: "Day", days: 1 },
    { name: "Week", days: 7 },
    { name: "Month", days: 30 },
    { name: "Year", days: 365 },
  ];

  const typeOfChartBtnData = [
    { name: "CandleSticks", type: "candlestick" },
    { name: "LineChart", tpye: "line" },
  ];

  useEffect(() => {
    const fetchCoins = async () => {
      await fetchData.fetchMarkets(setCoinsList);
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    const fetchCandles = async () => {
      setIsLoading(true);
      if (chartType === "line") {
        const lineData = async () =>
          await fetchData.fetchCoinsLine(coinId, days, setChartData);
        lineData();
      } else {
        await fetchData.fetchCoinChart(coinId, days, setChartData);
      }
      setIsLoading(false);
    };
    fetchCandles();
  }, [coinId, days, chartType]);

  const handleSetCoinId = (value) => {
    setCoinId(value);
  };
  function handleChartTypeChange() {
    setChartData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        chart: { ...prevData.options.chart, type: chartType },
      },
    }));
  }
  return (
    <div>
      <div>
        <div>
          <select onChange={(e) => handleSetCoinId(e.target.value)}>
            {coinsList.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            {daysButtonData.map((item) => (
              <button
                key={item.days}
                onClick={() => setDays(item.days)}
                className="px-4 py-1 bg-accent rounded-md cursor-pointer"
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="flex gap-4">
            {typeOfChartBtnData.map((obj) => (
              <button
                className="px-4 py-1 bg-accent cursor-pointer rounded-md"
                onClick={() => {
                  setChartType(obj.type);
                  handleChartTypeChange();
                }}
              >
                {obj.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <p>Loading Chart...</p>
      ) : (
        <CoinGraph
          options={chartData.options}
          series={chartData.series}
          type={chartType}
          height={350}
        />
      )}
    </div>
  );
}
