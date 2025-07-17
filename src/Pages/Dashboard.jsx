import CoinGraphSection from "../Sections/CoinGraphSection";
import TopHeadlinesSection from "../Sections/TopHeadlinesSection";
import SearchBar from "../Components/SearchBar";
import GlobalStatsSection from "../Sections/GlobalStatsSection";
import ExchangesSection from "../Sections/ExchangesSection";

export default function Dashboard() {
  return (
    <div className="flex p-6 w-auto text-read max-h-screen overflow-y-hidden">
      <div className="w-[70%]">
        <CoinGraphSection />
        <div className="h-[100%]">
          <TopHeadlinesSection />
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-4 h-screen p-2">
        <SearchBar />
        <ExchangesSection />
        <GlobalStatsSection />
      </div>
    </div>
  );
}
