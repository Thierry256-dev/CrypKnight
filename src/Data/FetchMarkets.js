import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchMarkets = async (data, setData) => {
  try {
    const response = await axios.get(`${URLS.COINGECKO_URL}/coins/markets`, {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });

    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching markets:", error);
  }

  console.log(data);
};
