import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";
import ArticleCard from "../Components/ArticleCard";

export default function TopHeadlinesSection() {
  const [headlines, setHeadlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHeadlines = async () => {
      setIsLoading(true);
      await fetchData.fetchTopHeadlines(setHeadlines);
      setIsLoading(false);
      console.log(headlines);
    };
    fetchHeadlines();
  }, []);
  return (
    <div>
      <h1>Latest News</h1>
      {isLoading ? (
        <p>Loading News...</p>
      ) : (
        headlines.map((article) => (
          <div key={article.url}>
            <ArticleCard
              title={article.title}
              description={article.description}
              image={article.urlToImage}
            />
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </div>
        ))
      )}
    </div>
  );
}
