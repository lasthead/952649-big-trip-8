import Component from './component';

export default class Trip extends Component {
  constructor(data) {
    super();
    this._title = data.title;
    this._type = data.type;
    this._destinations = data.destinations;
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

  _onSaveTripForm() {
    return typeof this._onSubmit === `function` && this._onSubmit();
  }
  _onResetTripForm() {
    return typeof this._onSubmit === `function` && this._onReset();
  }
  _partialUpdate() {
    this._element.innerHTML = this.template;
  }
  _onSubmitButtonClick(evt) {
    evt.preventDefault();
    typeof this._onSubmit === `function` && this._onSubmit();
  }
  get template() {
    return `<article class="point">
      <form action="" method="get">
        <header class="point__header">
          <label class="point__date">
            choose day
            <input class="point__input" type="text" placeholder="MAR 18" name="day">
          </label>
    
          <div class="travel-way">
            <label class="travel-way__label" for="travel-way__toggle">✈️</label>
            <input type="checkbox" class="travel-way__toggle visually-hidden" id="travel-way__toggle">
            <div class="travel-way__select">
              <div class="travel-way__select-group">
                ${ [...this._type].map((it) =>
    `<input class="travel-way__select-input visually-hidden" type="radio" id="travel-way-taxi" name="travel-way" value="taxi">
                <label class="travel-way__select-label" for="travel-way-taxi">${it.icon} ${it.name}</label>`).join(``) }
              </div>
            </div>
          </div>
    
          <div class="point__destination-wrap">
            <label class="point__destination-label" for="destination">Flight to</label>
            <input class="point__destination-input" list="destination-select" id="destination" value="Chamonix" name="destination">
            <datalist id="destination-select">
              ${ [...this._destinations].map((it) => `<option value="${it}"></option>`).join(``)}
            </datalist>
          </div>
    
          <label class="point__time">
            choose time
            <input class="point__input" type="text" value="00:00 — 00:00" name="time" placeholder="00:00 — 00:00">
          </label>
    
          <label class="point__price">
            write price
            <span class="point__price-currency">€</span>
            <input class="point__input" type="text" value="160" name="price">
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
              <input class="point__offers-input visually-hidden" type="checkbox" id="${offer.name.trim()}" name="offer" value="add-luggage">
              <label for="${offer.name.trim()}" class="point__offers-label">
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
  }
  _onChangeDate() {}
  _onChangeRepeated() {}
  set onSubmit(fn) {
    this._onSubmit = fn;
  }
  update(data) {
    this._title = data.title;
    this._type = data.type;
    this._destinations = data.destinations;
    this._dateFrom = data.dateFrom;
    this._dateTo = data.dateTo;
    this._currency = data.currency;
    this._price = data.price;
    this._offers = data.offers;
  }
}
