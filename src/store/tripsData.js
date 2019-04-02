import {getRandomNumberRange, getRandomPhotosArray} from './const';
import {travelWay, about, destinations, offers, price} from './mockData';

export default () => ({
  title: `Taxi to Airport`,
  travelWay: [
    {name: `Taxi`, icon: `🚕`},
    {name: `Bus`, icon: `🚌`},
    {name: `Train`, icon: `🚂`},
    {name: `Ship`, icon: `🛳`},
    {name: `Transport`, icon: `🚊`},
    {name: `Drive`, icon: `🚗`},
    {name: `Flight`, icon: `✈️`},
    {name: `Check-in`, icon: `🏨`},
    {name: `Sightseeing`, icon: `🏛️`},
    {name: `Restaurant`, icon: `🍴`},
  ],
  destination:
    [
      `Amsterdam`,
      `Geneva`,
      `Chamonix`,
      `Athens`,
      `Atlanta`,
      `Airport`,
      `Barcelona`,
      `Bali`,
      `Berlin`,
      `Vancouver`
    ],
  pictures: getRandomPhotosArray(3),
  currency: `€`,
  offers: offers.slice(0, getRandomNumberRange(1, 3)),
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
  dateFrom: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
  dateTo: Date.now() + 1 + Math.floor(Math.random() * 8) * 24 * 60 * 60 * 1000,
  price: [
    `20`,
    `50`,
    `120`,
    `150`,
    `200`
  ][Math.floor(Math.random() * 5)],
});
