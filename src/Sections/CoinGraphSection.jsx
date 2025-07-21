import { useState } from "react";
import * as options from "../services/utils";
import CoinGraph from "../Components/CoinGraph";
import useFetchGraphData from "../Hooks/useFetchGraphData";
import useGetCoinsListAndPrice from "../Hooks/useGetCoinsListAndPrice";

export default function CoinGraphSection() {
  const [chartType, setChartType] = useState("candlestick");
  const [coinId, setCoinId] = useState("bitcoin");
  const [days, setDays] = useState(1);
  const [ohlc, area] = useFetchGraphData(coinId, days); // returns useQuery data
  const [coinsList, currentPrice] = useGetCoinsListAndPrice(coinId);

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

  return (
    <div>
      {coinsList.length > 0 && (
        <div>
          <div className="px-4 flex flex-col gap-8">
            <div className="text-4xl flex justify-between">
              <select
                onChange={(e) => setCoinId(e.target.value)}
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
                    }}
                  >
                    {obj.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {coinsList.length <= 0 ? (
            <p>Loading Chart...</p>
          ) : (
            <div className="w-[100%] h-[350px] bg-secondary/8">
              <CoinGraph
                options={
                  chartType === "candlestick"
                    ? options.ohlcOptions
                    : options.areaOptions
                }
                series={chartType === "candlestick" ? ohlc?.data : area?.data}
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
