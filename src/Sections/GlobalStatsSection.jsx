import { useState, useEffect } from "react";
import * as fetchData from "../Data/FetchData";

export default function GlobalStatsSection() {
  const [globalStats, setGlobalStats] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchGlobalStats = async () => {
      setIsLoading(true);
      await fetchData.fetchGlobalStats(setGlobalStats);
      setIsLoading(false);
    };
    fetchGlobalStats();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-accent">
        Global Crypto Stats
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 p-2 bg-secondary/8 rounded-xl text-read/80">
          <p>Active CyptoCurrencies</p>
          <p className="text-read">: {globalStats.active_cryptocurrencies}</p>
          <p>Ongoing ICOs</p>
          <p className="text-read">: {globalStats.ongoing_icos}</p>
          <p>Ended ICOs</p>
          <p className="text-read">: {globalStats.ended_icos}</p>
          <p>Markets</p>
          <p className="text-read">: {globalStats.markets}</p>
          <p>Total Market Cap/BTC</p>
          <p className="text-read">
            : {globalStats.total_market_cap?.btc ?? "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}
