import {getRandomNumberRange, getRandomPhotosArray, getRandomDate, START_DATE, END_DATE} from './const';
import {travelWay, about, destinations, offers, price} from './mockData';
const COUNT_EVENTS = 10;
export const mockData = ()=>{
  const objectsArray = [];
  for (let i = 0; i < COUNT_EVENTS; i++) {
    objectsArray.push(tripObject(i));
  }
  return objectsArray;
};

export const filters = [
  {
    id: `0`,
    name: `Everything`,
    isChecked: true,
  },
  {
    id: `1`,
    name: `Future`,
    isChecked: false,
  },
  {
    id: `2`,
    name: `Past`,
    isChecked: false,
  },
];

const tripObject = (id) => {
  const startDate = getRandomDate(START_DATE, END_DATE);
  const endDate = getRandomDate(startDate, END_DATE);
  return {
    id: id,
    title: `Taxi to Airport`,
    travelWay: travelWay,
    destination: destinations,
    pictures: getRandomPhotosArray(3),
    currency: `€`,
    offers: offers,
    about: [
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      `Cras aliquet varius magna, non porta ligula feugiat eget.`,
      `Fusce tristique felis at fermentum pharetra.`,
      `Aliquam id orci ut lectus varius viverra.`,
      `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
      `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
      `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
      `Sed sed nisi sed augue convallis suscipit in sed felis.`,
      `Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.`,
      `In rutrum ac purus sit amet tempus`
    ][Math.floor(Math.random() * 4)],
    dateFrom: startDate,
    dateTo: endDate,
    price: [
      `20`,
      `50`,
      `120`,
      `150`,
      `200`
    ][Math.floor(Math.random() * 5)],
  };
};
