import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import ArticleCard from "../Components/ArticleCard";

export default function NewsSection() {
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      await fetchData.fetchAllNews(setNews);
      setIsLoading(false);
    };
    fetchNews();
  }, []);

  return (
    <div className="flex flex-col px-4">
      <h1 className="text-4xl py-2 font-bold">Latest News</h1>
      {isLoading ? (
        <p>Loading News...</p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {news.map((article) => (
            <ArticleCard
              key={article.url}
              title={article.title}
              description={article.description}
              image={article.urlToImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}
