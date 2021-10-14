import { useState, useEffect, useRef } from "react";
import { DateTime } from "luxon";

import { getPreviousDays, getNextDays } from "../_utils/daysList";

import "./strip.scss";

const DateBlock = ({ date, ref, setDate }) => {
  return <div ref={ref} className="date-block">{date.day}</div>;
};

const StripContainer = ({ initialDate, setInitialDate }) => {
  const [daysList, setDaysList] = useState([]);
  const containerRef = useRef();
  const targetRef = useRef();

  const limit = window.innerHeight / 40;

  let startDay;
  let endDay;
  let dragCount = 0;

  useEffect(() => {
    const date = DateTime.fromFormat(initialDate, "yyyy-MM-d");

    // setDaysList([...getPreviousDays(date, limit), ...getNextDays(date, limit)]);

    setDaysList([...getNextDays(date, limit)]);

  }, [initialDate]);

  

  useEffect(() => {

    if (!containerRef.current && !targetRef.current && !daysList.length)
      return;

    containerRef.current.scroll(0, 20);

    containerRef.current.addEventListener("wheel", (e) => {
      const senstivity = 10;

      if (!daysList || !daysList.length) return;

      if (Math.abs(e.deltaY) < senstivity)
        return;


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

    })

  }, [containerRef.current, targetRef.current, daysList])

  return (
    <div ref={containerRef} className="calendar-strip-ctr">
      {daysList &&
        daysList?.map((day, index) => (
          <DateBlock key={"d" + index} date={day} />
        ))}
    </div>
  );
};

export default StripContainer;
