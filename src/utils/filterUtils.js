export function applyFilters(flights, filters, search) {
  return flights.filter((f) => {
    const s = search.toLowerCase();

    const matchSearch =
      !search ||
      f.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      f.origin.toLowerCase().includes(search.toLowerCase()) ||
      f.destination.toLowerCase().includes(search.toLowerCase()) ||
      f.aoc.toLowerCase().includes(search.toLowerCase());

    const matchStatus = !filters.status || f.status === filters.status;

    const matchAOC =
      !filters.aoc || f.aoc.toLowerCase().includes(filters.aoc.toLowerCase());

    const matchBody = !filters.bodyType || f.bodyType === filters.bodyType;

    const matchDays =
      !filters.days?.length ||
      filters.days.some((d) => f.daysOfOperation.includes(d));

    const matchDate =
      !filters.from ||
      !filters.to ||
      !(f.endDate < filters.from || f.startDate > filters.to);

    return (
      matchSearch &&
      matchStatus &&
      matchAOC &&
      matchBody &&
      matchDays &&
      matchDate
    );
  });
}
