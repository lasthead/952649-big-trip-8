
export const mainFilter = document.querySelector(`.trip-filter`);
export const boardTrips = document.querySelector(`.trip-day__items`);
export const boardMainFilters = document.querySelector(`.trip-filter`);

export const rmSpaces = (str) => {
  str = str.replace(/\s/g, ``);
  return str;
};
export const getRandomNumberRange = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};
export const START_DATE = new Date(2018, 1, 1).getTime();
export const END_DATE = new Date(2018, 12, 1).getTime();
export const getRandomDate = (start, end) => {
  return new Date(getRandomNumberRange(end, start)).getTime();
};
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

export const getRandomPhotosArray = (count) => {
  let result = [];
  for (let i = 0; i < count; i++) {
    result.push(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return result;
};
