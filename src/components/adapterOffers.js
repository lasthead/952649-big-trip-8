export default class AdapterOffers {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.offers = this._getOffer(data[`offers`]);
    this._getOffer = this._getOffer.bind(this);
  }
  _getOffer(offers) {
    const temp = offers.map((item, i)=>{
      return {
        id: i,
        title: item.name,
        price: item.price,
        accepted: false};
    });
    return temp;
  }
  static parseOffer(data) {
    return new AdapterOffers(data);
  }
  static parseOffers(data) {
    data.forEach((item, i) => {
      item.id = i;
      i++;
    });
    return data.map(AdapterOffers.parseOffer);
  }
}
