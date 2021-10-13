import { useState, useEffect } from "react";
import "./styles.scss";

import Calendar from "./Calendar";
import CalendarStrip from "./CalendarStrip";

export default function App() {
  const [date, setDate] = useState("2021-03-10");

  return (
    <div className="app">
      <h1>Calendar</h1>
      <CalendarStrip initialDate={date} setInitialDate={setDate} />
    </div>
  );
}
