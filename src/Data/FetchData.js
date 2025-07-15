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

  return data;
};

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
  return data;
};

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

  return data;
};

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
  return data;
};

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
  return data;
};

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
  return data;
};

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
  return data;
};

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
  return data;
};
