import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchTopHeadlines = async (data, setData) => {
  try {
    const response = await axios.get(`${URLS.NEWS_URL}/top-headlines`, {
      params: {
        category: "business",
        country: "us",
      },
    });
    setData((data = response.data));
  } catch (error) {
    console.error("Error fetching top headlines:", error);
  }
  return console.log(data);
};
