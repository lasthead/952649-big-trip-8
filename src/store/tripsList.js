export const trips = () =>(
  {
    title: `Taxi to Airport`,
    type: [
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
    ][Math.floor(Math.random() * 10)],
    destinations:
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
      ][Math.floor(Math.random() * 10)],
    picture: `http://picsum.photos/300/150?r=${Math.random()}`,
    currency: `€`,
    offers: [
      {
        name: `Add luggage`,
        price: 20,
        currency: `€`,
      },
      {
        name: `Switch to comfort class`,
        price: 20,
        currency: `€`,
      },
      {
        name: `Add meal`,
        price: 20,
        currency: `€`,
      },
      {
        name: `Choose seats`,
        price: 20,
        currency: `€`,
      },
    ],
    about: new Set([
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
    ]),
    dateFrom: Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000,
    dateTo: Date.now() + 1 + Math.floor(Math.random() * 8) * 24 * 60 * 60 * 1000,
    price: [
      `20`,
      `50`,
      `120`,
      `150`,
      `200`
    ][Math.floor(Math.random() * 5)],
  }
);
