import { List } from "react-window";
import FlightRow from "./FlightRow";

export default function FlightTable({ flights, dispatch, selected }) {
  if (!flights || flights.length === 0) {
    return <div className="no-data">✈️ No flights found</div>;
  }
  return (
    <List
      rowCount={flights.length}
      rowHeight={60}
      height={500}
      width={1200}
      rowComponent={Row}
      rowProps={{ flights, dispatch, selected }}
    />
  );
}

function Row({ index, style, flights, dispatch, selected }) {
  console.log("number", flights.length);
  return (
    <FlightRow
      style={style}
      flight={flights[index]}
      dispatch={dispatch}
      selected={selected}
    />
  );
}
