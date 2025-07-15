import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import NewsCard from "./NewsCard";

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      await fetchData.fetchAllNews(news, setNews);
      setIsLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div>
      <h1>Latest News</h1>
      {isLoading ? (
        <p>Loading News...</p>
      ) : (
        news.map((article) => (
          <NewsCard
            key={article.url}
            title={article.title}
            description={article.description}
            image={article.urlToImage}
          />
        ))
      )}
    </div>
  );
}
