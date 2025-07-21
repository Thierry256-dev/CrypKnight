import React from "react";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import * as fetchData from "../Data/FetchData";

function TrendingSection() {
  const [trendingCoins, setTrendingCoins] = useState([]);
  const [trendingNfts, setTrendingNfts] = useState([]);
  const [coins, setCoins] = useState(true);

  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: [],
    queryFn: async () => await fetchData.fetchTrending(),
  });

  useEffect(() => {
    if (!isLoading && data) {
      setTrendingCoins(data.coins);
      setTrendingNfts(data.nfts);
    }
  }, [data, isLoading]);

  const changeBtns = [
    { name: "Coins", state: true },
    { name: "NFTS", state: false },
  ];

  const handleCoinNavigation = (coinId) => {
    navigate(`/coindetails/${coinId}`);
  };

  return (
    <div className="w-[40%] h-[100%] px-2">
      <div>
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl p-2">Trending</h2>
          <div className="flex gap-2 px-4">
            {changeBtns.map((obj) => (
              <button
                key={obj.name}
                className={`px-4 rounded-4xl h-10 cursor-pointer ${
                  obj.state === coins ? "bg-accent/90" : "bg-black/40"
                }`}
                onClick={() => setCoins(obj.state)}
              >
                <strong>{obj.name}</strong>
              </button>
            ))}
          </div>
        </div>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="p-4 h-[490px]">
          {coins ? (
            <div className="flex flex-col gap-2 h-[100%] overflow-y-auto">
              {trendingCoins.length > 0 &&
                trendingCoins.map((obj) => (
                  <div
                    key={obj.item.id}
                    className="flex justify-between w-[100%] p-2 bg-secondary/8 rounded-lg"
                    onClick={() => handleCoinNavigation(obj.item.id)}
                  >
                    <div className="flex gap-2 items-center w-auto">
                      <img
                        src={obj.item.small}
                        alt={obj.item.name}
                        className="w-10 rounded-sm"
                      />
                      <p>{obj.item.symbol}</p>
                    </div>
                    <div className="flex flex-cols w-[50%] gap-4 bg-black/20 rounded-sm p-1">
                      <div className="grid grid-cols-1">
                        <p className="text-read/80">Rank:</p>
                        <p className="text-read/80">Price:</p>
                      </div>
                      <div className="grid grid-cols-1">
                        <p className="text-accent">
                          {obj.item.market_cap_rank}
                        </p>
                        <p className="text-green-400">
                          ${obj.item.data.price.toFixed(4)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 h-[100%] overflow-y-auto">
              {trendingNfts.length > 0 &&
                trendingNfts.map((obj) => (
                  <div
                    key={obj.key}
                    className="flex flex-col justify-between w-[100%] gap-2 p-2 bg-secondary/8 rounded-md text-read/80"
                  >
                    <div>
                      <img
                        src={obj.thumb}
                        alt={obj.id}
                        className="w-100 h-40 rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1 bg-black/20 rounded-sm p-2">
                      <p>{obj.name}</p>
                      <p>{obj.symbol}</p>
                      <p className="font-semibold text-accent">
                        {obj.data.floor_price}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(TrendingSection);
