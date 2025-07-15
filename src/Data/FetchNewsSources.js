import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchNewsSources = async (data, setData) => {
  try {
    const response = await axios.get(`${URLS.NEWS_URL}/sources`, {
      params: {
        category: "business",
        country: "us",
      },
    });

    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching news sources:", error);
  }
  return console.log(data);
};
