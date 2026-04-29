import { useEffect, useState } from "react";

export default function Filters({ state, dispatch }) {
  const filters = state.filters || {};
  const [aocInput, setAocInput] = useState("");
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const update = (newFilters) => {
    dispatch({
      type: "SET_FILTERS",
      payload: { ...filters, ...newFilters },
    });
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      update({ aoc: aocInput });
    }, 400);

    return () => clearTimeout(timer);
  }, [aocInput]);
  useEffect(() => {
    setAocInput(filters.aoc || "");
  }, [filters.aoc]);

  const toggleDay = (index) => {
    const day = index + 1;
    const currentDays = filters.days || [];

    const updatedDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];

    update({ days: updatedDays });
  };

  return (
    <>
      <div className="filters">
        <input
          type="date"
          value={filters.from || ""}
          onChange={(e) => update({ from: e.target.value })}
        />

        <input
          type="date"
          value={filters.to || ""}
          onChange={(e) => update({ to: e.target.value })}
        />

        <select
          value={filters.status || ""}
          onChange={(e) => update({ status: e.target.value })}
        >
          <option value="">Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <input
          placeholder="AOC"
          value={aocInput}
          onChange={(e) => setAocInput(e.target.value.toUpperCase())}
        />

        <select
          value={filters.bodyType || ""}
          onChange={(e) => update({ bodyType: e.target.value })}
        >
          <option value="">Body</option>
          <option value="narrow_body">Narrow</option>
          <option value="wide_body">Wide</option>
        </select>
      </div>

      <div className="day-filters">
        {days.map((d, i) => (
          <button
            key={i}
            type="button"
            className={(filters.days || []).includes(i + 1) ? "active" : ""}
            onClick={() => toggleDay(i)}
          >
            {d}
          </button>
        ))}

        <button
          type="button"
          className="clear-btn"
          onClick={() => dispatch({ type: "CLEAR_FILTERS" })}
        >
          Clear All
        </button>
      </div>
    </>
  );
}
