import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";

export default function useGetCoinsListAndPrice(id) {
  const [coinsList, setCoinsList] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(0);

  const { data } = useQuery({
    queryKey: [id],
    queryFn: async () => await fetchData.fetchMarkets(),
  });

  useEffect(() => {
    const currentPriceFn = () => {
      if (!id || coinsList.length === 0) return;
      const matchedCoin = coinsList.find((coin) => coin.id === id);
      if (matchedCoin) setCurrentPrice(matchedCoin.current_price);
    };
    currentPriceFn();
  }, [id, coinsList]);

  useEffect(() => {
    const coinsListFn = () => {
      if (data) setCoinsList(data);
    };
    coinsListFn();
  }, [data]);

  return [coinsList, currentPrice];
}
