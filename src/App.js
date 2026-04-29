import { useFlights } from "./hooks/userFlights";
import FlightTable from "./components/FlightTable";
import Filters from "./components/Filters";
import SearchBar from "./components/SearchBar";

export default function App() {
  const { state, dispatch } = useFlights();

  return (
    <div className="app-container">
      <h2>Flight Schedule</h2>

      <div className="toolbar">
        <div className="toolbar-left">
          <SearchBar state={state} dispatch={dispatch} />
        </div>

        <div className="toolbar-center">
          <Filters state={state} dispatch={dispatch} />
        </div>

        <div className="toolbar-right">
          <button
            className="danger"
            onClick={() =>
              dispatch({ type: "DELETE", payload: state.selected })
            }
          >
            Delete Selected
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table">
          <div className="table-header">
            <div></div>
            <div>Flight</div>
            <div>AOC</div>
            <div>Origin</div>
            <div>Dest</div>
            <div>STD</div>
            <div>Date</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          <FlightTable
            flights={state.filteredFlights}
            dispatch={dispatch}
            selected={state.selected}
          />
        </div>
      </div>
    </div>
  );
}
