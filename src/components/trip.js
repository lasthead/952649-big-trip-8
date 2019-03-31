
import {timeFormatter} from '../store/const';
import tripOffers from './tripComponents/tripOffers';
import Component from './component';

export default class Trip extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._type = data.type[Math.floor(Math.random() * 10)];
    this._destinations = data.destinations[Math.floor(Math.random() * 10)];
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
    return `<article class="trip-point">
          <i class="trip-icon">${ this._type.icon }</i>
          <h3 class="trip-point__title">${ this._type.name } to ${ this._destinations }</h3>
          <p class="trip-point__schedule">
            <span class="trip-point__timetable">${ timeFormatter(this._dateFrom) }</span>
            <span class="trip-point__duration">${ timeFormatter(this._dateTo) }</span>
          </p>
          <p class="trip-point__price"> ${ this._currency } ${ this._price }</p>
          <ul class="trip-point__offers">
            ${ tripOffers(this._offers) }
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
    this._title = data.title;
    this._tags = data.tags;
    this._color = data.color;
    this._repeatingDays = data.repeatingDays;
  }
}
