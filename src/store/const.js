
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

export const getRandomNumberRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

export const getRandomPhotosArray = (count) => {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return result;
};
