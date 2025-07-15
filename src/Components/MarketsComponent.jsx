import React, { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import CoinCard from "./CoinCard";

export default function MarketsComponent() {
  const [markets, setMarkets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMarkets = async () => {
      setIsLoading(true);
      await fetchData.fetchMarkets(markets, setMarkets);
      setIsLoading(false);
    };
    fetchMarkets();
  }, []);
  return (
    <div>
      <h1>Markets</h1>
      {isLoading ? (
        <p>Loading Markets...</p>
      ) : (
        markets.map((market) => (
          <CoinCard
            key={market.id}
            price={market.current_price}
            name={market.name}
            marketCap={market.market_cap}
            volume={market.total_volume}
            priceChange={market.price_change_percentage_24h}
            lastUpdated={new Date(market.last_updated).toLocaleString()}
          />
        ))
      )}
    </div>
  );
}
