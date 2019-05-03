
import Component from './component';

export default class TripDay extends Component {
  constructor(dateName, index) {
    super();
    this._day = dateName;
    this._index = index;
  }
  get template() {
    return `
      <section class="trip-day">
        <article class="trip-day__info">
          <span class="trip-day__caption">Day</span>
          <p class="trip-day__number">${this._index}</p>
          <h2 class="trip-day__title">${this._day}</h2>
        </article>
        <div class="trip-day__items"></div>
      </section>
    `;
  }
}
