import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

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
    <div className="h-[100%] w-[60%]">
      <h1 className="font-bold text-4xl p-2 text-read/90">Top Headlines</h1>
      {isLoading ? (
        <p>Loading News...</p>
      ) : (
        <div className="grid grid-cols-1 gap-8 h-[490px] overflow-y-auto ">
          {headlines.map((article) => (
            <div className="relative flex gap-2 rounded-2xl bg-black/20 p-2">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-60 h-60 rounded-xl"
                />
              )}
              <div>
                <h2 className="font-semibold text-xl text-read/90">
                  {article.title}
                </h2>
                <p className="p-2 text-read/70">{article.description}</p>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="italic text-read/30 text-md"
                >
                  ReadMore
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
