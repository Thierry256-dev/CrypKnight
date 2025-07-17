import { useState, useEffect } from "react";
import * as fetchData from "../Data/FetchData";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      const data = await fetchData.fetchSearch(searchQuery.trim());
      if (data.length !== 0) {
        setSearchResults(data.coins);
        setIsLoading(false);
      } else {
        return;
      }
    };
    fetchSearchResults();
  }, [searchQuery]);

  const handleSearchNavigation = (coinId) => {
    setSearchQuery("");
    setSearchQuery([]);
    navigate(`/coindetails/${coinId}`);
  };
  return (
    <>
      <div className="relative flex items-center flex-col p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Your Favorite Coin"
          className="bg-gray-800 p-2 w-100 rounded-lg text-lg focus:border-accent"
        />
        <div className="absolute top-18 bg-black/20 backdrop-blur-sm w-100 rounded-md">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            searchResults.length !== 0 && (
              <ul className="flex flex-col p-2 gap-2">
                {searchResults.slice(0, 6).map((result) => (
                  <li
                    key={result.id}
                    onMouseDown={() => handleSearchNavigation(result.id)}
                    className="flex items-center gap-4 transition duration-200 p-2 rounded-md hover:bg-white/10 cursor-pointer"
                  >
                    <img
                      src={result.large}
                      alt={result.name}
                      className="w-10"
                    />
                    {result.name}
                  </li>
                ))}
              </ul>
            )
          )}
        </div>
      </div>
    </>
  );
}
