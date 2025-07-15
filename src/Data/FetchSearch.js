import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchSearch = async (query, data, setData) => {
  try {
    const response = await axios.get(`${URLS.COINGECKO_URL}/search`, {
      params: {
        query: query,
      },
    });

    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
  return console.log(data);
};
