import NewsSection from "../Sections/NewsSection";
import TopHeadlinesSection from "../Sections/TopHeadlinesSection";

export default function News() {
  return (
    <div className="flex p-8 flex-col h-screen overflow-y-auto">
      <h1 className="text-4xl font-bold">News</h1>
      <div>
        <TopHeadlinesSection />
      </div>
      <div>
        <NewsSection />
      </div>
    </div>
  );
}
