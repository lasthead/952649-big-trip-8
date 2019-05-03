
import Component from './component';

export default class Sort extends Component {
  constructor({name, checked = false}) {
    super();
    this._name = name;
    this._checked = checked;
    this._onSort = null;
  }
  get template() {
    return `<input type="radio" name="trip-sorting" id="sorting-${this._name.toLowerCase()}" value="${this._name.toLowerCase()}" ${this._checked ? `checked` : ``}>
    <label class="trip-sorting__item trip-sorting__item--event" for="sorting-${this._name.toLowerCase()}">${this._name}</label>`;
  }
  set onClick(fn) {
    this._onSort = fn;
  }
  onSort(event) {
    return typeof this._onSort === `function` && this._onSort(event);
  }
  bind() {
    this._element.querySelector(`[name='trip-sorting']`).addEventListener(`click`, this.onSort.bind(this));
  }
}
