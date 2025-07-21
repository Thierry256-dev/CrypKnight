import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";
import CoinCard from "../Components/CoinCard";

function MarketsSection() {
  const [markets, setMarkets] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["markets"],
    queryFn: async () => await fetchData.fetchMarkets(),
  });

  useEffect(() => {
    if (!isLoading && data) setMarkets(data);
  }, [isLoading, data]);

  return (
    <div className="p-8 text-read h-[100%]">
      <h1 className="text-read text-4xl font-bold pb-4">Markets</h1>
      {isLoading ? (
        <p>Loading Markets...</p>
      ) : (
        markets.length > 0 && (
          <div className="flex flex-col bg-secondary/10 rounded-2xl p-2 gap-4">
            <div className="grid grid-cols-6 px-2 items-center text-xl">
              <p>Coin</p>
              <p>Price</p>
              <p>Market Cap</p>
              <p>Volume</p>
              <p>Price Change{" %"}</p>
              <p>Last Updated</p>
            </div>
            <div className="flex flex-col gap-2 h-[820px] overflow-y-auto">
              {markets.map((market) => (
                <CoinCard
                  key={market.id}
                  price={market.current_price}
                  name={market.name}
                  image={market.image}
                  marketCap={market.market_cap}
                  volume={market.total_volume}
                  priceChange={market.price_change_percentage_24h}
                  lastUpdated={new Date(market.last_updated).toLocaleString()}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default React.memo(MarketsSection);
