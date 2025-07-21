import * as URLS from "../services/urls.js";
import axios from "axios";

export const fetchCoinsArea = async (coinId, days) => {
  let data;
  try {
    const response = await axios.get(
      `${URLS.COINGECKO_URL}/coins/${coinId}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: days,
        },
      }
    );
    data = response.data.prices.map(([timestamp, price]) => ({
      x: new Date(timestamp).toISOString(),
      y: price,
    }));
  } catch (error) {
    console.error("Error fetching markets_charts:", error);
  }

  return [{ name: coinId, data }];
};

export const fetchMarkets = async () => {
  let data;
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

    data = response.data;
  } catch (error) {
    console.error("Error fetching markets:", error);
  }

  return data;
};

export const fetchCoinChart = async (coinId, days) => {
  let data;
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
    data = response.data.map(([timestamp, open, high, low, close]) => ({
      x: new Date(timestamp).toISOString(),
      y: [open, high, low, close],
    }));
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
  }
  return [{ name: coinId, data }];
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

export const fetchExchanges = async () => {
  let response;
  try {
    response = await axios.get(`${URLS.COINGECKO_URL}/exchanges`, {
      params: {
        per_page: 50,
      },
    });
  } catch (error) {
    console.error("Error fetching exchanges:", error);
  }

  return response.data;
};

export const fetchTrending = async () => {
  let response;
  try {
    response = await axios.get(`${URLS.COINGECKO_URL}/search/trending`);
  } catch (error) {
    console.error("Error fetching trending data:", error);
  }
  return response.data;
};

export const fetchGlobalStats = async () => {
  let response;
  try {
    response = await axios.get(`${URLS.COINGECKO_URL}/global`);
  } catch (error) {
    console.error("Error fetching global stats:", error);
  }

  return response.data.data;
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

export const fetchTopHeadlines = async () => {
  let response;
  try {
    response = await axios.get(`${URLS.NEWS_URL}/top-headlines`, {
      params: {
        category: "business",
        country: "us",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
        pageSize: 20,
      },
    });
  } catch (error) {
    console.error("Error fetching top headlines:", error);
  }

  return response.data.articles;
};

export const fetchAllNews = async () => {
  const now = new Date();
  let response;

  try {
    response = await axios.get(`${URLS.NEWS_URL}/everything`, {
      params: {
        q: "cryptocurrency",
        apiKey: import.meta.env.VITE_NEWS_API_KEY,
        from: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString,
        to: now.toISOString(),
        pageSize: 50,
      },
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return response.data.articles;
};
