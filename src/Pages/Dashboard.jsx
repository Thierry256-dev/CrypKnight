import { useEffect, useState } from "react";

import { fetchMarkets } from "../Data/FetchMarkets";

export default function Dashboard() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    fetchMarkets(markets, setMarkets);
  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>
        Welcome to the dashboard. Here you can find an overview of your
        activities.
      </p>
    </div>
  );
}
