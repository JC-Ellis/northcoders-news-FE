import { useSearchParams } from "react-router-dom";

export default function SortControls() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSortBy = searchParams.get("sort_by") || "created_at";
  const currentOrder = searchParams.get("order") || "DESC";

  const handleSortChange = (event) => {
    const newSortBy = event.target.value;
    searchParams.set("sort_by", newSortBy);
    setSearchParams(searchParams);
  };

  const toggleOrder = () => {
    const newOrder = currentOrder === "DESC" ? "ASC" : "DESC";
    searchParams.set("order", newOrder);
    setSearchParams(searchParams);
  };

  return (
    <div className="sort-controls" id="sort-controls">
      <label htmlFor="sort-select">
        Sort By: 
        <select
          id="sort-select"
          value={currentSortBy}
          onChange={handleSortChange}
          className="sort-select"
        >
          <option value="created_at">Date</option>
          <option value="votes">Votes</option>
          <option value="comment_count">Comment Count</option>
        </select>
      </label>
      <button onClick={toggleOrder} className="order-toggle">
        Order: {currentOrder === "DESC" ? "Descending" : "Ascending"}
      </button>
    </div>
  );
}