import Component from './component';
import flatpickr from "flatpickr";

export default class TripEdit extends Component {
  constructor(data) {
    super();
    this._travelWay = data.travelWay;
    this._travelWayChecked = data.travelWay.filter((it)=> it.isChecked === true)[0];
    this._destination = data.destination;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._currency = data.currency;
    this._price = data.price;
    this._offers = data.offers;
    this._about = data.about;
    this._pictures = data.pictures;
    this._element = null;
    this._onSubmit = null;
    this._onReset = null;
  }
  _processForm(formData) {
    const entry = {
      travelWay: {},
      destination: ``,
      time: ``,
      price: ``,
      offers: [],
      isFavorite: false
    };
    const tripEditMapper = this.createMapper(entry);
    for (const pair of formData.entries()) {
      const [property, value] = pair;
      tripEditMapper[property] && tripEditMapper[property](value);
    }
    return entry;
  }

  _filterObject(itemId, object) {
    let foundOffer = object.filter(item => item.id === Number(itemId))[0];
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
    flatpickr(this._element.querySelector(`.date-value`), {
      'mode': `range`,
      'enableTime': true,
      'dateFormat': `H:i`,
      'defaultDate': [this._dateFrom, this._dateTo],
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
      [`travel-way`]: (value) => target.travelWay = this._filterObject(value, this._travelWay),
      destination: (value) => target.destination = value,
      time: (value) => target.time = value,
      price: (value) => target.price = value,
      offer: (value) => target.offers.push(this._filterObject(value, this._offers)),
      favorite: (value) => target.isFavorite = value
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
            <label class="travel-way__label" for="travel-way__toggle">${this._travelWayChecked.icon}️</label>
            <input value="${this._travelWayChecked.name}" type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${ [...this._travelWay].map((it) =>
    `<input class="travel-way__select-input visually-hidden" type="radio" ${it.isChecked ? `checked` : ``} id="travel-way-${it.name.toLowerCase().trim()}" name="travel-way" value="${it.id}">
                <label class="travel-way__select-label" for="travel-way-${it.name.toLowerCase().trim()}">${it.icon} ${it.name}</label>`).join(``) }
              </div>
            </div>
          </div>
    
          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">Flight to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="${this._destination[0]}" name="destination">
            <datalist id="destination-select">
              ${ [...this._destination].map((it) => `<option value="${it}"></option>`).join(``)}
            </datalist>
          </div>
    
          <label class="point__time">
            choose time
            <input class="point__input date-value" type="text" value="" name="time" placeholder="00:00 — 00:00">
          </label>
    
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
              ${ [...this._offers].map((offer) => `
              <input ${offer.isChecked ? `checked` : ``} class="point__offers-input visually-hidden" type="checkbox" id="${offer.name.toLowerCase().trim()}" name="offer" value="${offer.id}">
              <label for="${offer.name.toLowerCase().trim()}" class="point__offers-label">
                <span class="point__offer-service">${offer.name}</span> ${offer.currency}<span class="point__offer-price">${offer.price}</span>
              </label>
              `).join(``) }
            </div>
    
          </section>
          <section class="point__destination">
            <h3 class="point__details-title">Destination</h3>
            <p class="point__destination-text">${this._about}</p>
            <div class="point__destination-images">
            ${ [...this._pictures].map((picture) => `
              <img src="${ picture }" alt="picture from place" class="point__destination-image">
            `).join(``) }
            </div>
          </section>
          <input type="hidden" class="point__total-price" name="total-price" value="">
        </section>
      </form>
    </article>`.trim();
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
  _onChangeDate() {}
  _onChangeRepeated() {}
  set onSubmit(fn) {
    this._onSubmit = fn;
  }
}
