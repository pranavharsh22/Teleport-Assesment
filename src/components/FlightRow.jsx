import { useState } from "react";

export default function FlightRow({ flight, style, dispatch, selected }) {
  const [edit, setEdit] = useState(false);
  const [local, setLocal] = useState(flight);
  const [original, setOriginal] = useState(flight);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const save = () => {
    setLoading(true);
    setError(false);

    setTimeout(() => {
      if (Math.random() < 0.2) {
        setError(true);
        setLocal(original);

        setTimeout(() => setError(false), 2000);
      } else {
        dispatch({ type: "UPDATE_ROW", payload: local });
        setEdit(false);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className={`row ${edit ? "editing" : ""} ${loading ? "loading" : ""}`}
      style={style}
    >
      <div className="checkbox">
        <input
          type="checkbox"
          checked={selected.includes(flight.id)}
          onChange={() =>
            dispatch({ type: "TOGGLE_SELECT", payload: flight.id })
          }
        />
      </div>

      <div>{flight.flightNumber}</div>
      <div>{flight.aoc}</div>
      <div>{flight.origin}</div>
      <div>{flight.destination}</div>

      <div>
        {edit ? (
          <input
            value={local.std}
            onChange={(e) => setLocal({ ...local, std: e.target.value })}
          />
        ) : (
          flight.std
        )}
      </div>

      <div className="date">
        {edit ? (
          <>
            <input
              type="date"
              value={local.startDate}
              onChange={(e) =>
                setLocal({ ...local, startDate: e.target.value })
              }
            />
            <input
              type="date"
              value={local.endDate}
              onChange={(e) => setLocal({ ...local, endDate: e.target.value })}
            />
          </>
        ) : (
          `${flight.startDate} → ${flight.endDate}`
        )}
      </div>

      <div>
        {edit ? (
          <select
            value={local.status}
            onChange={(e) => setLocal({ ...local, status: e.target.value })}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        ) : (
          <span
            className={`status ${
              flight.status === "Active" ? "active" : "inactive"
            }`}
            onClick={() =>
              dispatch({
                type: "UPDATE_ROW",
                payload: {
                  ...flight,
                  status: flight.status === "Active" ? "Inactive" : "Active",
                },
              })
            }
          >
            {flight.status}
          </span>
        )}
      </div>

      <div className="actions">
        {edit ? (
          <>
            <button onClick={save} disabled={loading}>
              {loading ? <span className="spinner"></span> : "Save"}
            </button>

            <button
              className="secondary"
              onClick={() => {
                setLocal(original);
                setEdit(false);
                setError(false);
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => {
                setOriginal(flight);
                setLocal(flight);
                setEdit(true);
              }}
            >
              Edit
            </button>

            <button
              className="danger"
              onClick={() => dispatch({ type: "DELETE", payload: [flight.id] })}
            >
              Delete
            </button>
          </>
        )}

        {error && <span className="error-text">⚠ Failed</span>}
      </div>
    </div>
  );
}
