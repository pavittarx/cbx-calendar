import { useState, useEffect } from "react";
import { DateTime } from "luxon";

import "./calendar.scss";

const EmptyElements = ({ count, children }) => {
  const elements = [];

  for (let i = 0; i < parseInt(count); i++) {
    elements.push(children);
  }

  return <> {elements} </>;
};

const DateBlock = ({ date, isActive }) => {
  return (
    <div className={"block" + (isActive ? " active" : "")}> {date.day} </div>
  );
};

const MonthView = ({ date }) => {
  const startDate = date.startOf("month");
  const endDate = date.endOf("month");

  const elements = [];

  for (let i = startDate; i <= endDate; i = i.plus({ days: 1 })) {
    elements.push(<DateBlock date={i} isActive={i.ordinal === date.ordinal} />);
  }

  return <> {elements} </>;
};

const Calendar = ({ date, setDate }) => {
  const headerList = ["M", "T", "W", "T", "F", "S", "S"];
  const [calendarDate, setCalendarDate] = useState(DateTime.now());

  useEffect(() => {
    if (!date) return;
    const calendarDate = DateTime.fromFormat(date, "yyyy-MM-d");
    setCalendarDate(calendarDate);
  }, [date]);

  return (
    <div className="calendar-ctr">
      <div className="header">
        {headerList.map((item, idx) => (
          <div key={"h-" + idx} className="block">
            {item}
          </div>
        ))}
      </div>
      <div className="c-area">
        <EmptyElements count={calendarDate?.startOf("month").weekday - 1 || 1}>
          <div className="block"></div>
        </EmptyElements>
        <MonthView
          date={calendarDate}
          setCalendarDate={(date) => setDate(date.toFormat("yyyy-MM-d"))}
        />
      </div>
    </div>
  );
};

export default Calendar;
