import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchMarkets = async (setData) => {
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

    setData(response.data);
  } catch (error) {
    console.error("Error fetching markets:", error);
  }
};

export const fetchCoinChart = async (coinId, days, setData) => {
  try {
    const response = await axios.get(
      `${URLS.COINGECKO_URL}/coins/${coinId}/ohlc`,
      {
        params: {
          vs_currency: "usd",
          days: days,
        },
      }
    );
    const data = response.data.map(([timestamp, open, high, low, close]) => ({
      x: new Date(timestamp).toISOString(),
      y: [open, high, low, close],
    }));
    setData((prev) => ({
      ...prev,
      series: [{ name: coinId, data }],
    }));
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
  }
};

export const fetchCoinDetails = async (coinId, setData) => {
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

    setData(response.data);
  } catch (error) {
    console.error("Error fetching coin details:", error);
  }
};

export const fetchGlobalStats = async (setData) => {
  try {
    const response = await axios.get(`${URLS.COINGECKO_URL}/global`);

    setData(response.data.data);
  } catch (error) {
    console.error("Error fetching global stats:", error);
  }
};

export const fetchNewsSources = async (setData) => {
  try {
    const response = await axios.get(`${URLS.NEWS_URL}/sources`, {
      params: {
        category: "business",
        country: "us",
      },
    });

    setData(response.data);
  } catch (error) {
    console.error("Error fetching news sources:", error);
  }
};

export const fetchSearch = async (query) => {
  let response;
  try {
    response = await axios.get(`${URLS.COINGECKO_URL}/search`, {
      params: {
        query: query,
      },
    });
  } catch (error) {
    console.error("Error fetching search results:", error);
  }
  return response.data;
};

export const fetchTopHeadlines = async (setData) => {
  try {
    const response = await axios.get(`${URLS.NEWS_URL}/top-headlines`, {
      params: {
        category: "business",
        country: "us",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
        pageSize: 10,
      },
    });

    setData(response.data.articles);
  } catch (error) {
    console.error("Error fetching top headlines:", error);
  }
};

export const fetchAllNews = async (setData) => {
  try {
    const response = await axios.get(`${URLS.NEWS_URL}/everything`, {
      params: {
        q: "cryptocurrency",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
      },
    });

    setData(response.data.articles);
  } catch (error) {
    console.error("Error fetching news:", error);
  }
};
