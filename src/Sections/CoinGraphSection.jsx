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
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [coinId, setCoinId] = useState("bitcoin");
  const [markets, setMarkets] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);
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
    { name: "LineChart", type: "area" },
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

  useEffect(() => {
    setChartData((prevData) => ({
      ...prevData,
      options: {
        ...prevData.options,
        chart: { ...prevData.options.chart, type: chartType },
        ...(chartType === "area"
          ? {
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
            }
          : {
              fill: { type: "solid" },
              dataLabels: { enabled: false },
            }),
      },
    }));
  }, [chartType]);

  useEffect(() => {
    const fetchMarkets = async () => {
      await fetchData.fetchMarkets(setMarkets);
    };
    fetchMarkets();
  }, [coinId]);

  useEffect(() => {
    let currPrice;
    const handlePrice = () => {
      markets.forEach((market) => {
        if (coinId === market.id) {
          currPrice = market.current_price;
        }
      });
    };
    handlePrice();
    setCurrentPrice(currPrice);
  }, [coinId, markets]);

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
      {markets.length > 0 && (
        <div>
          <div className="px-4 flex flex-col gap-8">
            <div className="text-4xl flex justify-between">
              <select
                onChange={(e) => handleSetCoinId(e.target.value)}
                className="font-bold w-50"
              >
                {coinsList.map((item) => (
                  <option key={item.id} value={item.id} className="text-lg">
                    {item.name}
                  </option>
                ))}
              </select>
              <p>
                <span className="text-read/80 text-2xl">CurrentPrice: </span>
                <span className="text-2xl font-bold">{currentPrice}</span>
                <span className="text-read/40 text-sm"> USD</span>
              </p>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-4">
                {daysButtonData.map((item) => (
                  <button
                    key={item.days}
                    onClick={() => setDays(item.days)}
                    className={`px-4 py-1 rounded-md cursor-pointer font-bold transition duration-300  ${
                      item.days === days
                        ? "bg-accent hover:bg-accent/80"
                        : "bg-secondary/10 hover:bg-secondary/20"
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                {typeOfChartBtnData.map((obj) => (
                  <button
                    key={obj.name}
                    className={`px-4 py-1 cursor-pointer rounded-md font-bold transition duration-300  ${
                      obj.type === chartType
                        ? "bg-accent hover:bg-accent/80"
                        : "bg-secondary/10 hover:bg-secondary/20"
                    }`}
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
            <div className="w-[100%] h-[350px] bg-secondary/8">
              <CoinGraph
                options={chartData.options}
                series={chartData.series}
                type={chartType}
                height={350}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
