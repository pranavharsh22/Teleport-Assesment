# ✈️ Flight Schedule Management Table

A React-based internal tool to manage flight schedules with features like filtering, search, inline editing, and virtual scrolling.

---

## 🚀 Features

* Virtualized table rendering using **react-window**
* 🔍 Search (with debouncing) by:

  * Flight Number
  * Origin
  * Destination
  * AOC

* 🎯 Advanced Filters (AND logic):

  * Date range (operational overlap)
  * Days of operation
  * Status (Active / Inactive)
  * AOC
  * Body type

*  Inline Editing:

  * Edit STD (time), Date range, and Status
  * Save / Cancel actions
  * Simulated async save with loading indicator
*  Status Toggle (instant update)
*  Single & Multi Delete
*  Responsive design with horizontal scrolling
*  “No Flights Found” empty state

---

##  Project Structure

```
src/
│── components/
│   ├── FlightTable.jsx
│   ├── FlightRow.jsx
│   ├── Filters.jsx
│   ├── SearchBar.jsx
│
│── hooks/
│   └── useFlights.js
│
│── utils/
│   └── filterUtils.js
│
│── data/
│   └── flights.json
│
│── App.jsx
│── index.js
```

---

##  Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd flight-schedule
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

App will run at:

```
http://localhost:3000
```

---

## 📦 Dependencies

* React
* react-window

---

## 🧠 Key Implementation Details

### ✔ Virtual Scrolling

Implemented using `react-window` to efficiently render large datasets.

### ✔ Filtering Logic

All filters are combined using **AND logic** and applied on local state.

### ✔ Debounced Search

Search input is debounced to improve performance and avoid unnecessary renders.

### ✔ Inline Editing

* Local state used for editing rows
* Async simulation with loading indicator
* Cancel restores original values

### ✔ State Management

Used `useReducer` for predictable and scalable state updates.

---

##  Assumptions

* All data operations are handled on the client-side
* No backend/API integration required
* Async save is simulated using `setTimeout`

---

##  UI Notes

* Table supports horizontal scrolling for smaller screens
* Clean and minimal UI for internal tool usage
* Responsive layout for tablet/mobile

---



---

## 👨‍💻 Author

Pranav Kumar

---
