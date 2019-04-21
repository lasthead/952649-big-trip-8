import Component from './component';
import flatpickr from "flatpickr";
import {timeFormatter, travelTypeIcons} from "../store/const";
import {destinations, offers} from "../main";

export default class TripEdit extends Component {
  constructor(data) {
    super();
    this._travelType = data.travelType;
    this._travelTypeChecked = data.travelType;
    this._destination = data.destination;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._currency = data.currency;
    this._price = data.price;
    this._offers = data.offers;
    this._description = data.description;
    this._pictures = data.pictures;
    this._element = null;
    this._onSubmit = null;
    this._onReset = null;
    this._onDelete = null;
    console.log(offers);
  }

  _processForm(formData) {
    const entry = {
      travelType: {},
      destination: ``,
      time: ``,
      price: ``,
      offers: [],
      isFavorite: false,
    };
    const tripEditMapper = this.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      tripEditMapper[property] && tripEditMapper[property](value);
    }
    entry.destination[0].isChecked = true;
    //console.log(entry);
    return entry;
  }

  _filterObjectById(itemId, object) {
    let foundOffer = object.filter(item => item.id === Number(itemId))[0];
    return foundOffer;
  }

  _filterObjectByName(itemName, object) {
    let foundOffer = object.filter(item => item.name === itemName);
    return foundOffer;
  }

  _onResetTripForm() {
    return typeof this._onSubmit === `function` && this._onReset();
  }

  _partialUpdate() {
    this._element.innerHTML = this.template;
  }

  _onSaveTripForm(evt) {
    evt.preventDefault();
    const formData = new FormData(this._element.querySelector(`.point__form`));
    const newData = this._processForm(formData);
    typeof this._onSubmit === `function` && this._onSubmit(newData);
  }

  _initFlatPickr() {
    flatpickr(this._element.querySelector(`.date__from`), {
      'mode': `range`,
      'enableTime': true,
      'dateFormat': `H:i`,
      'defaultDate': [this._dateFrom],
      'minDate': `today`,
      'time_24hr': true,
      'appendTo': this._element,
      onChange(selectedDates) {
        this._dateFrom = selectedDates[0];
        this._dateTo = selectedDates[1];
      },
    });
    flatpickr(this._element.querySelector(`.date__to`), {
      'mode': `range`,
      'enableTime': true,
      'dateFormat': `H:i`,
      'defaultDate': [this._dateTo],
      'minDate': `today`,
      'time_24hr': true,
      'appendTo': this._element,
      onChange(selectedDates) {
        this._dateFrom = selectedDates[0];
        this._dateTo = selectedDates[1];
      },
    });
  }

  createMapper(target) {
    return {
      [`travel-way`]: (value) => target.travelType = this._filterObjectById(value, this._travelType),
      destination: (value) => target.destination = this._filterObjectByName(value, this._destination),
      time: (value) => target.time = value,
      price: (value) => target.price = value,
      offer: (value) => target.offers.push(this._filterObjectById(value, this._offers)),
      favorite: (value) => target.isFavorite = value,
    };
  }

  get template() {
    return `<article class="point">
      <form class="point__form" action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>
    
          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">${travelTypeIcons[this._travelTypeChecked]}</label>
            <input value="${this._travelTypeChecked}" type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
            <div class="travel-way__select">
              <div class="travel-way__select-group">
              <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${this._travelTypeChecked.toLowerCase().trim()}" name="travel-way" value="">
               <label class="travel-way__select-label" for="travel-way-${this._travelTypeChecked.toLowerCase().trim()}">${travelTypeIcons[this._travelTypeChecked]} ${this._travelTypeChecked}</label>
               ${this._getOffersOptions()}
              </div>
            </div>
          </div>
    
          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">Flight to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination.name}" name="destination">
            <datalist id="destination-select">
              ${this._getDestinationOptions()}
            </datalist>
          </div>
          
          <div class="point__time">
            choose time
            <input class="point__input date__from" type="text" value="${timeFormatter(this._dateFrom)}" name="date-start" placeholder="${this._dateFrom}">
            <input class="point__input date__to" type="text" value="${timeFormatter(this._dateTo)}" name="date-end" placeholder="${this._dateTo}">
          </div>
    
          <label class="point__price">
            write price
            <span class="point__price-currency">€</span>
            <input class="point__input" type="text" value="${this._price}" name="price">
          </label>
    
          <div class="point__buttons">
            <button class="point__button point__button--save" type="submit">Save</button>
            <button class="point__button" type="reset">Delete</button>
          </div>
    
          <div class="paint__favorite-wrap">
            <input type="checkbox" class="point__favorite-input visually-hidden" id="favorite" name="favorite">
            <label class="point__favorite" for="favorite">favorite</label>
          </div>
        </header>
    
        <section class="point__details">
          <section class="point__offers">
            <h3 class="point__details-title">offers</h3>
    
            <div class="point__offers-wrap">
              ${[...this._offers].map((offer) => `
              <input ${offer.accepted ? `checked` : ``} class="point__offers-input visually-hidden" type="checkbox" id="${offer.title.toLowerCase().trim()}" name="offer" value="${offer.id}">
              <label for="${offer.title.toLowerCase().trim()}" class="point__offers-label">
                <span class="point__offer-service">${offer.title}</span> €<span class="point__offer-price">${offer.price}</span>
              </label>
              `).join(``)}
            </div>
    
          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._description}</p>
            <div class="point__destination-images">
            ${[...this._pictures].map((picture) => `
              <img src="${picture.src}" alt="${picture.description}" class="point__destination-image">
            `).join(``)}
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
    </article>`.trim();
  }

  _getDestinationOptions() {
    const result = [];
    for (const destination of destinations) {
      const dataElement = `<option value="${destination.name}"></option>`;
      result.push(dataElement);
    }
    return result.join(``);
  }

  _getOffersOptions() {
    const result = [];
    for (const offer of offers) {
      const dataElement = `
         <input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-${offer.type.toLowerCase().trim()}" name="travel-way" value="">
         <label class="travel-way__select-label" for="travel-way-${offer.type.toLowerCase().trim()}">${travelTypeIcons[offer.type]} ${offer.type}</label>
      `;
      result.push(dataElement);
    }
    return result.join(``);
  }

  onClick(fn) {
    this._onClick = fn;
  }

  bind() {
    this._element.querySelector(`button[type="submit"]`)
      .addEventListener(`click`, this._onSaveTripForm.bind(this));
    this._element.querySelector(`button[type="reset"]`)
      .addEventListener(`click`, this._onResetTripForm.bind(this));
    this._initFlatPickr();
    //console.log(this);
  }

  _onChangeDate() {
  }

  _onChangeRepeated() {
  }

  set onSubmit(fn) {
    this._onSubmit = fn;
  }

  set onDelete(fn) {
    this._onDelete = fn;
  }
}
