import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchCoinChart = async (coinId, days = 30, data, setData) => {
  try {
    const response = await axios.get(
      `${URLS.COINGECKO_URL}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
          interval: "daily",
        },
      }
    );

    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching coin chart:", error);
  }
  return console.log(data);
};
