import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

import CoinGraphSection from "../Sections/CoinGraphSection";
import MarketSection from "../Sections/MarketsSection";
import NewsSection from "../Sections/NewsSection";
import TopHeadlinesSection from "../Sections/TopHeadlinesSection";
import SearchBar from "../Components/SearchBar";

export default function Dashboard() {
  return (
    <div>
      <SearchBar />
      <CoinGraphSection />
      <MarketSection />
      <TopHeadlinesSection />
      <NewsSection />
    </div>
  );
}
