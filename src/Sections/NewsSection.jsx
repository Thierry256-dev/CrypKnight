import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";
import ArticleCard from "../Components/ArticleCard";

function NewsSection() {
  const [news, setNews] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: async () => await fetchData.fetchAllNews(),
  });

  useEffect(() => {
    if (data && !isLoading) setNews(data);
  }, [data, isLoading]);

  return (
    <div className="flex flex-col px-4">
      <h1 className="text-4xl py-2 font-bold">Latest News</h1>
      {isLoading ? (
        <p>Loading News...</p>
      ) : (
        news.length > 0 && (
          <div className="grid grid-cols-2 gap-8">
            {news.map((article) => (
              <ArticleCard
                key={article.url}
                title={article.title}
                description={article.description}
                image={article.urlToImage}
                url={article.url}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default React.memo(NewsSection);
