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
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search"
        />
        <div>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            searchResults.length !== 0 && (
              <div>
                {searchResults.slice(0, 6).map((result) => (
                  <li
                    key={result.id}
                    onMouseDown={() => handleSearchNavigation(result.id)}
                  >
                    <img src={result.large} />
                    {result.name}
                  </li>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
