import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchCoinDetails = async (coinId, data, setData) => {
  try {
    const response = await axios.get(`${URLS.COINGECKO_URL}/coins/${coinId}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    });

    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching coin details:", error);
  }

  return console.log(data);
};
