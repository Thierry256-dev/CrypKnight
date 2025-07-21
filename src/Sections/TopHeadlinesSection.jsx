import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import * as fetchData from "../Data/FetchData";

function TopHeadlinesSection() {
  const [headlines, setHeadlines] = useState([]);

  const { data, isLoading } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => await fetchData.fetchTopHeadlines(),
  });

  useEffect(() => {
    if (!isLoading && data) setHeadlines(data);
  }, [isLoading, data]);

  return (
    <div className="h-[100%] w-[60%]">
      <h1 className="font-bold text-4xl p-2 opacity-90">Top Headlines</h1>
      {isLoading ? (
        <p>Loading News...</p>
      ) : (
        headlines.length > 0 && (
          <div className="grid grid-cols-1 gap-8 h-[490px] overflow-y-auto ">
            {headlines.map((article) => (
              <div
                className="relative flex gap-2 rounded-2xl bg-black/20 p-2"
                key={article.title}
              >
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-60 h-60 rounded-xl"
                  />
                )}
                <div>
                  <h2 className="font-semibold text-xl opacity-90">
                    {article.title}
                  </h2>
                  <p className="p-2 opacity-70">{article.description}</p>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="italic opacity-30 text-md"
                  >
                    ReadMore
                  </a>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default React.memo(TopHeadlinesSection);
