import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

export default function useGetCoinsListAndPrice(id) {
  const [coinsList, setCoinsList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    const fetchCoins = async () => {
      await fetchData.fetchMarkets(setCoinsList);
    };
    fetchCoins();
  }, []);

  useEffect(() => {
    if (!id || coinsList.length === 0) return;

    const matchedCoin = coinsList.find((coin) => coin.id === id);
    if (matchedCoin) {
      setCurrentPrice(matchedCoin.current_price);
    }
  }, [id, coinsList]);

  return [coinsList, currentPrice];
}
