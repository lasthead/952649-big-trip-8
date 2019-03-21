
export const mainFilter = document.querySelector(`.trip-filter`);
export const boardTrips = document.querySelector(`.trip-day__items`);
export const dayFormatter = new Intl.DateTimeFormat(`en-US`, {
  day: `numeric`
});

export const monthFormatter = new Intl.DateTimeFormat(`en-US`, {
  month: `long`
});

export const timeFormatter = (timestamp) => {
  let date = new Date(timestamp);
  return date.toLocaleTimeString(`en-US`, {hour: `numeric`, minute: `numeric`});
};
