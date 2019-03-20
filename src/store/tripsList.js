export const trips =
  [
    {
      title: `Taxi to Airport`,
      icon: {
        Taxi: `🚕`,
        Bus: `🚌`,
        Train: `🚂`,
        Ship: `🛳️`,
        Transport: `🚊`,
        Drive: `🚗`,
        Flight: `✈️`,
        CheckIn: `🏨`,
        Sightseeing: `🏛️`,
        Restaurant: `🍴`
      },
      picture: `http://picsum.photos/300/150?r=${Math.random()}`,
      timetable: `10:00 - 11:00`,
      duration: `1h 30m`,
      price: 20,
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
        `In rutrum ac purus sit amet tempus`]),
    },
  ];
