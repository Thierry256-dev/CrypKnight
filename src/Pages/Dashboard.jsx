import CoinGraphSection from "../Sections/CoinGraphSection";
import MarketSection from "../Sections/MarketsSection";
import TopHeadlinesSection from "../Sections/TopHeadlinesSection";
import SearchBar from "../Components/SearchBar";
import GlobalStatsSection from "../Sections/GlobalStatsSection";

export default function Dashboard() {
  return (
    <div className="flex p-6 w-auto dark text-read dark:bg-primary max-h-screen overflow-y-hidden">
      <div className="w-[70%]">
        <CoinGraphSection />
        <div className="h-[100%]">
          <TopHeadlinesSection />
        </div>
      </div>
      <div className="w-[30%]">
        <SearchBar />
        <GlobalStatsSection />
      </div>

      {/* <MarketSection />
     
       */}
    </div>
  );
}
