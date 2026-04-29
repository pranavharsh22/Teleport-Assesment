import { useEffect, useState } from "react";

export default function SearchBar({ state, dispatch }) {
  const [text, setText] = useState(state.search || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_SEARCH", payload: text });
    }, 400);

    return () => clearTimeout(timer);
  }, [text, dispatch]);

  useEffect(() => {
    setText(state.search || "");
  }, [state.search]);

  return (
    <input
      type="text"
      placeholder="Search flight / origin / destination / AOC"
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}
