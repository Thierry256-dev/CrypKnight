import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";

export default function useFetchGraphData(coinId, days) {
  const ohlc = useQuery({
    queryKey: [coinId, days],
    queryFn: async () => await fetchData.fetchCoinChart(coinId, days),
  });

  const area = useQuery({
    queryKey: [coinId, days],
    queryFn: async () => await fetchData.fetchCoinsArea(coinId, days),
  });

  return [ohlc, area];
}
