import { useReducer, useEffect } from "react";
import data from "../data/flights.json";
import { applyFilters } from "../utils/filterUtils";

const initialState = {
  flights: [],
  filteredFlights: [],
  filters: {},
  search: "",
  selected: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        flights: action.payload,
        filteredFlights: action.payload,
      };

    case "SET_SEARCH":
      return {
        ...state,
        search: action.payload,
        filteredFlights: applyFilters(
          state.flights,
          state.filters,
          action.payload,
        ),
      };

    case "SET_FILTERS": {
      const newFilters = {
        ...state.filters,
        ...action.payload,
      };

      return {
        ...state,
        filters: newFilters,
        filteredFlights: applyFilters(state.flights, newFilters, state.search),
      };
    }

    case "APPLY":
      return {
        ...state,
        filteredFlights: applyFilters(
          state.flights,
          state.filters,
          state.search,
        ),
      };

    case "UPDATE_ROW": {
      const updatedFlights = state.flights.map((f) =>
        f.id === action.payload.id ? action.payload : f,
      );

      return {
        ...state,
        flights: updatedFlights,
        filteredFlights: applyFilters(
          updatedFlights,
          state.filters,
          state.search,
        ),
      };
    }

    case "DELETE": {
      const updatedFlights = state.flights.filter(
        (f) => !action.payload.includes(f.id),
      );

      return {
        ...state,
        flights: updatedFlights,
        filteredFlights: applyFilters(
          updatedFlights,
          state.filters,
          state.search,
        ),
        selected: [],
      };
    }

    case "TOGGLE_SELECT":
      return {
        ...state,
        selected: state.selected.includes(action.payload)
          ? state.selected.filter((id) => id !== action.payload)
          : [...state.selected, action.payload],
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        filters: {
          from: "",
          to: "",
          status: "",
          aoc: "",
          bodyType: "",
          days: [],
        },
        search: "",
        filteredFlights: applyFilters(state.flights, {}, ""),
      };

    default:
      return state;
  }
}

export function useFlights() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch({ type: "SET_DATA", payload: data.flights });
  }, []);

  // useEffect(() => {
  //   dispatch({ type: "APPLY" });
  // }, [state.search, state.filters]);

  return { state, dispatch };
}
