import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchAllNews = async (data, setData) => {
  try {
    const response = await axios.get(`${URLS.NEWS_URL}/everything`, {
      params: {
        q: "cryptocurrency",
      },
    });

    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching news:", error);
  }
  return console.log(data);
};
