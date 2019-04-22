export default class AdapterDestinations {
  constructor(data) {
    this.id = data[`id`];
    this.name = data[`name`];
    this.description = data[`description`];
    this.pictures = data[`pictures`];
  }

  static parseDestination(data) {
    return new AdapterDestinations(data);
  }
  static parseDestinations(data) {
    data.forEach((item, i) => {
      item.id = i;
      i++;
    });
    return data.map(AdapterDestinations.parseDestination);
  }
}
