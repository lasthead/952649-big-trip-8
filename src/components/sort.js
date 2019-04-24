
import Component from './component';

export default class Sort extends Component {
  constructor({title, checked = false}) {
    super();
    this._title = title;
    this._checked = checked;
    this._onSort = null;
  }
  get template() {
    return `<input type="radio" name="trip-sorting" id="sorting-${this._title.toLowerCase()}" value="event" ${this._checked ? `checked` : ``}>
    <label class="trip-sorting__item trip-sorting__item--event" for="sorting-${this._title.toLowerCase()}">${this._title}</label>`;
  }
  set onClick(fn) {
    this._onClick = fn;
  }
  set onSort(fn) {
    this._onSort = fn;
  }
  bind() {
    this._element.querySelector(`[name='trip-sorting']`).addEventListener(`click`, this.onChangeFilter.bind(this));
  }
}
