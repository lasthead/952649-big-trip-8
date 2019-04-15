
import {timeFormatter} from '../store/const';
import tripOffers from './tripComponents/tripOffers';
import Component from './component';

export default class Trip extends Component {
  constructor(data) {
    super();
    this._travelWay = data.travelWay.filter((it)=> it.isChecked === true)[0];
    this._destination = data.destination.filter((it)=> it.isChecked === true)[0];
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._currency = data.currency;
    this._price = data.price;
    this._offers = data.offers;
    this._onClick = null;
  }
  _onEditButtonClick() {
    return typeof this._onClick === `function` && this._onClick();
  }
  get template() {
    //console.log(this);
    return `<article class="trip-point">
          <i class="trip-icon">${ this._travelWay.icon }</i>
          <h3 class="trip-point__title">${ this._travelWay.name } to ${ this._destination.name }</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${ timeFormatter(this._dateFrom) }</span>
            <span class="trip-point__duration">${ timeFormatter(this._dateTo) }</span>
          </p>
          <p class="trip-point__price"> ${ this._currency } ${ this._price }</p>
          <ul class="trip-point__offers">
            ${ tripOffers(this._offers.filter((it)=> it.isChecked === true)) }
          </ul>
        </article>
`;
  }
  set onClick(fn) {
    this._onClick = fn;
  }
  bind() {
    this._element.addEventListener(`click`, this._onEditButtonClick.bind(this));
  }
  update(data) {
    this._travelWay = data.travelWay.filter((it)=> it.isChecked === true)[0];
    this._destination = data.destination.filter((it)=> it.isChecked === true)[0];
    this._price = data.price;
    //this._offers = data.offers.filter((it)=> it.isChecked === true)[0];
    console.log(this);
  }
}
