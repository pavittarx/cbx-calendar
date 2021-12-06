export const getPreviousDays = (date, limit) => {
  const days = [];

  for (let i = limit; i > 0; i--) {
    days.push(date.minus({ days: i }));
  }

  return days;
};

export const getNextDays = (date, limit) => {
  if (!date) return [];

  const days = [];

  for (let i = 1; i < limit; i++) {
    days.push(date.plus({ days: i }));
  }

  return days;
};


// export const getPreviousDays = (date, { limit, count }) => {
//   const range = [(limit * count) - limit, limit * count];

//   console.log(range);
// }