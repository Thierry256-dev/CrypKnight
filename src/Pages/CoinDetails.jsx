import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import CoinGraph from "../Components/CoinGraph";

export default function CoinDetails() {
  const { coinId } = useParams();
  const [coinDetails, setCoinDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: { type: "line", background: "transparent" },
      xaxis: { type: "datetime" },
      yaxis: { labels: { formatter: (v) => `$${v}` } },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.7,
          gradientToColors: ["#ed4a26"],
          inverseColors: false,
          opacityFrom: 0.7,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      stroke: { curve: "smooth", width: 2 },
      dataLabels: { enabled: false },
      theme: { mode: "dark" },
    },
  });

  useEffect(() => {
    const fetchCoin = async () => {
      setIsLoading(true);
      await fetchData.fetchCoinDetails(coinId, setCoinDetails);
      await fetchData.fetchCoinsLine(coinId, 1, setChartData);
      setIsLoading(false);
    };
    fetchCoin();
  }, [coinId]);

  function isLoaded(obj) {
    return obj && Object.keys(obj).length > 0;
  }

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
                <div className="w-full h-[300px] bg-secondary/8 rounded-lg p-2">
                  <CoinGraph
                    options={chartData.options}
                    series={chartData.series}
                    type="line"
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
