import { useEffect, useState } from "react";
import * as fetchData from "../Data/FetchData";

export default function ExchangesSection() {
  const [exchanges, setExchanges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExch = async () => {
      setIsLoading(true);
      await fetchData.fetchExchanges(setExchanges);
      setIsLoading(false);
    };
    fetchExch();
  }, []);

  return (
    <div className="flex flex-col px-4 py-2 h-[650px] bg-secondary/8 rounded-xl gap-2">
      <h2 className="text-2xl font-bold text-read/90 p-2">Top Exchanges</h2>
      {isLoading ? (
        <p>Loading Exhanges</p>
      ) : (
        <div className="flex flex-col overflow-y-auto gap-4">
          {exchanges.map((obj) => (
            <div key={obj.id} className="flex gap-4 bg-black/30 p-2 rounded-lg">
              <img
                src={obj.image}
                alt={obj.name}
                className="rounded-full w-20"
              />
              <div className="flex flex-col gap-2 w-100">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">{obj.name}</h3>
                  <p className="text-sm text-read/80">{obj.country}</p>
                </div>
                <div>
                  <p className="text-read/80">
                    Volume:
                    <span className="text-green-400">
                      {" "}
                      {obj.trade_volume_24h_btc}
                    </span>
                  </p>
                  <a
                    href={obj.url}
                    target="_blank"
                    className="italic text-read/40 text-sm hover:text-read/60"
                  >
                    Official Website
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
