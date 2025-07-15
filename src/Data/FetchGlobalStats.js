import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchGlobalStats = async (data, setData) => {
  try {
    const response = await axios.get(`${URLS.COINGECKO_URL}/global`, {
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
    console.error("Error fetching global stats:", error);
  }
  return console.log(data);
};
