import { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";

import { getPreviousDays, getNextDays } from "../_utils/daysList";

import _ from "underscore";

import "./strip.scss";

const DateBlock = ({ date, ref, setDate }) => {
  return <div ref={ref} className="date-block" onClick={() => setDate(date.toFormat("yyyy-MM-dd"))}>{date.day}</div>;
};

const StripContainer = ({ initialDate }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [daysList, setDaysList] = useState([]);

  const limit = window.innerHeight / 40;

  useEffect(() => {
    const date = DateTime.fromFormat(initialDate, "yyyy-MM-d");

    setDaysList([...getPreviousDays(date, limit), ...getNextDays(date, limit)]);

  }, [initialDate]);

  const onWheel = _.debounce((e) => {
    const direction = e.deltaY > 0 ? "down" : "up";

    const firstDay = daysList[0];
    const lastDay = [...daysList].pop();

    if (direction === "up") {
      const days = getPreviousDays(firstDay, limit);

      startDay = days[0];
      endDay = [...days].pop();

      setDaysList(days);
    }

    if (direction === "down") {

      const days = getNextDays(lastDay, limit);

      startDay = days[0];
      endDay = [...days].pop();

      setDaysList(days);
    }
  }, 2000, true);

  return (
    <div className="calendar-strip-ctr" onWheel={onWheel}>
      {daysList &&
        daysList?.map((day, index) => (
          <DateBlock key={"d" + index} date={day} selectedDate={selectedDate} setDate={setSelectedDate} />
        ))}
    </div>
  );
};

export default StripContainer;
