import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";

function GlobalStatsSection() {
  const [globalStats, setGlobalStats] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["globalStats"],
    queryFn: async () => await fetchData.fetchGlobalStats(),
  });

  useEffect(() => {
    if (!isLoading && data) setGlobalStats(data);
  }, [data, isLoading]);

  function isLoaded(obj) {
    return obj && Object.keys(obj).length > 0;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold text-accent">
        Global Crypto Stats
      </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isLoaded(globalStats) && (
          <div className="grid grid-cols-2 gap-2 p-2 bg-secondary/8 rounded-xl opacity-80">
            <p>Active CyptoCurrencies</p>
            <p className="opacity-100">
              : {globalStats.active_cryptocurrencies}
            </p>
            <p>Ongoing ICOs</p>
            <p className="opacity-100">: {globalStats.ongoing_icos}</p>
            <p>Ended ICOs</p>
            <p className="opacity-100">: {globalStats.ended_icos}</p>
            <p>Markets</p>
            <p className="opacity-100">: {globalStats.markets}</p>
            <p>Total Market Cap/BTC</p>
            <p className="opacity-100">
              : {globalStats.total_market_cap?.btc ?? "N/A"}
            </p>
          </div>
        )
      )}
    </div>
  );
}
export default React.memo(GlobalStatsSection);
