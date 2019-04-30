export default class AdapterTrips {
  constructor(data) {

    this.id = data[`id`];
    this.name = data[`name`] || ``;
    this.isFavorite = Boolean(data[`is_favorite`]);
    this.dateFrom = data[`date_from`];
    this.dateTo = data[`date_to`];
    this.price = data[`base_price`];
    this.destination = data[`destination`];
    this.description = data[`destination`][`description`];
    this.pictures = data[`destination`][`pictures`];
    this.travelType = data[`type`];
    this.offers = data[`offers`];
  }
  static toRAW(data) {
    return {
      'id': data.id,
      'type': data.travelType,
      'destination': {
        'name': data.destination.name,
        'description': data.destination.description,
        'pictures': [...data.destination.pictures.values()],
      },
      'date_from': data.dateFrom,
      'date_to': data.dateTo,
      'base_price': data.price,
      'offers': [...data.offers.values()],
      'is_favorite': data.isFavorite
    };
  }
  static parsePoint(data) {
    return new AdapterTrips(data);
  }

  static parsePoints(data) {
    data.forEach((item, i) => {
      item.id = i;
      i++;
    });
    return data.map(AdapterTrips.parsePoint);
  }
}

