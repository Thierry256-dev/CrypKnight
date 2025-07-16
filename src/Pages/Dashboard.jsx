import CoinGraphSection from "../Sections/CoinGraphSection";
import MarketSection from "../Sections/MarketsSection";
import NewsSection from "../Sections/NewsSection";
import TopHeadlinesSection from "../Sections/TopHeadlinesSection";
import SearchBar from "../Components/SearchBar";
import GlobalStatsSection from "../Sections/GlobalStatsSection";

export default function Dashboard() {
  return (
    <div className="flex p-6 w-[100%] dark text-read dark:bg-primary h-[100vh]">
      <div className="w-[70%]">
        <CoinGraphSection />
        <div className="h-[100%] overflow-y-auto">
          <NewsSection />
        </div>
      </div>
      <div className="w-[30%]">
        <SearchBar />
        <GlobalStatsSection />
      </div>

      {/* <MarketSection />
      <TopHeadlinesSection /> */}
    </div>
  );
}
