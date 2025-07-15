import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

import CoinGraphSection from "../Sections/CoinGraphSection";
import MarketSection from "../Sections/MarketsSection";
import NewsSection from "../Sections/NewsSection";
import TopHeadlinesSection from "../Sections/TopHeadlinesSection";

export default function Dashboard() {
  return (
    <div>
      <CoinGraphSection />
      <MarketSection />
      <TopHeadlinesSection />
      <NewsSection />
    </div>
  );
}
