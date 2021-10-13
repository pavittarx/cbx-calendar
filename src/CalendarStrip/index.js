import { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";

import "./strip.scss";

const DateBlock = ({ date, setDate }) => {
  return <div className="date-block">{date.day}</div>;
};

const StripContainer = ({ initialDate, setInitialDate }) => {
  const [daysList, setDaysList] = useState([]);
  const ref = useRef();

  const limit = 15;

  const getPreviousDays = (date, limit) => {
    const days = [];

    for (let i = limit; i > 0; i--) {
      days.push(date.minus({ days: i }));
    }

    return days;
  };

  const getNextDays = (date, limit) => {
    if (!date) return [];

    const days = [];

    for (let i = 0; i < limit; i++) {
      days.push(date.plus({ days: i }));
    }

    return days;
  };

  useEffect(() => {
    const date = DateTime.fromFormat(initialDate, "yyyy-MM-d");

    setDaysList([...getPreviousDays(date, limit), ...getNextDays(date, limit)]);
  }, [initialDate]);

  useEffect(() => {
    if (!ref?.current) return;

    ref.current.addEventListener("scroll", (e) => {
      const { scrollHeight, scrollTop, offsetHeight } = e.target;

      const end = scrollHeight - (scrollTop + offsetHeight) === 0;

      const length = daysList?.length;

      console.log(daysList[length - 1], daysList instanceof Array);

      if (end)
        setDaysList([...daysList., ...getNextDays(daysList[length - 1], 15)]);
    });
  }, [ref, daysList]);

  return (
    <div ref={ref} className="calendar-strip-ctr">
      {daysList &&
        daysList?.map((day, index) => (
          <DateBlock key={"d" + index} date={day} />
        ))}
    </div>
  );
};

export default StripContainer;
