import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";
import CoinGraph from "../Components/CoinGraph";
import * as options from "../services/utils";
import useFetchGraphData from "../Hooks/useFetchGraphData";

export default function CoinDetails() {
  const { coinId } = useParams();
  const [chartType, setChartType] = useState("candlestick");
  const [days, setDays] = useState(1);
  const [coinDetails, setCoinDetails] = useState({});
  const [ohlc, area] = useFetchGraphData(coinId, days); //returns data to be used as series data

  const { data, isLoading } = useQuery({
    queryKey: [coinId],
    queryFn: async () => await fetchData.fetchCoinDetails(coinId),
  });

  useEffect(() => {
    if (!isLoading && data) setCoinDetails(data);
  }, [data, isLoading]);

  function isLoaded(obj) {
    return obj && Object.keys(obj).length > 0;
  }

  const chartTypes = [
    { name: "CandleStick", type: "candlestick" },
    { name: "LineChart", type: "area" },
  ];

  const daysArray = [
    { id: "1", interval: 1, name: "Day" },
    { id: "2", interval: 7, name: "Week" },
    { id: "3", interval: 30, name: "Month" },
    { id: "4", interval: 365, name: "Year" },
  ];

  return (
    <div className="text-read/90 w-[100%] min-h-screen flex flex-col items-center bg-secondary/5 p-4 md:p-8">
      {isLoading ? (
        <p className="text-center text-lg text-accent">Loading...</p>
      ) : (
        isLoaded(coinDetails) && (
          <div className="w-full max-w-4xl bg-white dark:bg-black/30 rounded-xl shadow-lg p-4 md:p-8 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={coinDetails.image?.large}
                alt={coinDetails.id}
                className="w-24 h-24 rounded-full border-4 border-accent shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-accent mb-2">
                  {coinDetails.name}
                </h2>
                <div className="flex flex-wrap gap-4 text-read/80">
                  <span className="bg-secondary/10 px-3 py-1 rounded-lg font-semibold">
                    {coinDetails.symbol?.toUpperCase()}
                  </span>
                  <span>
                    Rank: <strong>{coinDetails.market_cap_rank}</strong>
                  </span>
                  <span>Origin: {coinDetails.country_origin || "N/A"}</span>
                  <span>Genesis: {coinDetails.genesis_date || "N/A"}</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-accent mb-2">
                  Market Data
                </h3>
                <p>
                  Current Price:{" "}
                  <span className="font-bold text-green-500">
                    ${coinDetails.market_data?.current_price?.usd ?? "N/A"}
                  </span>
                </p>
                <p>
                  Total Volume (BTC):{" "}
                  <span>
                    {coinDetails.market_data?.total_volume?.btc ?? "N/A"}
                  </span>
                </p>
                <p>
                  24h High (BTC):{" "}
                  <span>{coinDetails.market_data?.high_24h?.btc ?? "N/A"}</span>
                </p>
                <p>
                  24h Low (BTC):{" "}
                  <span>{coinDetails.market_data?.low_24h?.btc ?? "N/A"}</span>
                </p>
                <p>
                  Total Supply:{" "}
                  <span>{coinDetails.market_data?.total_supply ?? "N/A"}</span>
                </p>
                <p>
                  Max Supply:{" "}
                  <span>{coinDetails.market_data?.max_supply ?? "N/A"}</span>
                </p>
                <p>
                  Circulating Supply:{" "}
                  <span>
                    {coinDetails.market_data?.circulating_supply ?? "N/A"}
                  </span>
                </p>
                <p>
                  Sentiment Up Votes:{" "}
                  <span className="text-green-500">
                    {coinDetails.sentiment_votes_up_percentage ?? "N/A"}%
                  </span>
                </p>
                <p>
                  Sentiment Down Votes:{" "}
                  <span className="text-red-500">
                    {coinDetails.sentiment_votes_down_percentage ?? "N/A"}%
                  </span>
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold text-accent mb-2">
                  Price Chart (1 day)
                </h3>
                <div className="flexjustify-around">
                  <select
                    name="days-select"
                    id="days"
                    onClick={(e) => setDays(e.target.value)}
                  >
                    {daysArray.map((obj) => (
                      <option key={obj.id} value={obj.interval}>
                        {obj.name}
                      </option>
                    ))}
                  </select>
                  <select
                    name="tyep-select"
                    id="chartType"
                    onClick={(e) => setChartType(e.target.value)}
                  >
                    {chartTypes.map((obj) => (
                      <option key={obj.name} value={obj.type}>
                        {obj.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-full h-[300px] bg-secondary/8 rounded-lg p-2">
                  <CoinGraph
                    options={
                      chartType === "candlestick"
                        ? options.ohlcOptions
                        : options.areaOptions
                    }
                    series={chartType === "candlestick" ? ohlc.data : area.data}
                    type={chartType}
                    height={280}
                  />
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
