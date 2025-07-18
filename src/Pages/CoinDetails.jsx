import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

export default function CoinDetails() {
  const { coinId } = useParams();
  const [coinDetails, setCoinDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCoin = async () => {
      setIsLoading(true);
      await fetchData.fetchCoinDetails(coinId, setCoinDetails);
      setIsLoading(false);
    };
    fetchCoin();
  }, [coinId]);

  function isLoaded(obj) {
    return obj && Object.keys(obj).length > 0;
  }

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        isLoaded(coinDetails) && (
          <div className="flex flex-col p-8 text-read/80">
            <h2 className="text-read font-bold text-4xl">{coinDetails.name}</h2>
            <div>
              <img src={coinDetails.image?.large} alt={coinDetails.id} />
              <p>{coinDetails.country_origin}</p>
              <p>{coinDetails.genesis_date}</p>
              <p>{coinDetails.sentiment_votes_up_percentage}</p>
              <p>{coinDetails.sentiment_votes_down_percentage}</p>
              <p>{coinDetails.market_cap_rank}</p>
              <p>{coinDetails.market_data?.current_price?.usd}</p>
              <p>{coinDetails.market_data?.total_volume?.btc}</p>
              <p>{coinDetails.market_data?.high_24h?.btc}</p>
              <p>{coinDetails.market_data?.low_24h?.btc}</p>
              <p>{coinDetails.market_data?.total_supply}</p>
              <p>{coinDetails.market_data?.max_supply}</p>
              <p>{coinDetails.market_data?.circulating_supply}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
}
