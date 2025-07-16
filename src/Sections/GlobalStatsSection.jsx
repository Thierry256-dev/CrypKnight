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

  useEffect(() => {
    console.log(globalStats);
  }, [globalStats]);

  return (
    <div>
      <h2>Global Crypto Stats</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Active CyptoCurrencies: {globalStats.active_cryptocurrencies}</p>
          <p>Upcoming ICOs: {globalStats.upcoming_icos}</p>
          <p>Ongoing ICOs: {globalStats.ongoing_icos}</p>
          <p>Ended ICOs: {globalStats.ended_icos}</p>
          <p>Markets: {globalStats.markets}</p>
        </div>
      )}
    </div>
  );
}
