import Component from './component';
import {rmSpaces} from '../store/const';
export default class Filter extends Component {
  constructor(data) {
    super();
    this._id = data.id;
    this._name = data.name;
    this._checked = data.isChecked;
    this._onFilter = null;
  }
  set onFilter(fn) {
    this._onFilter = fn;
  }
  onChangeFilter(event) {
    return typeof this._onFilter === `function` && this._onFilter(event);
  }
  get template() {
    return `
       <input type="radio" id="filter-${rmSpaces(this._name.toLowerCase())}" ${this._checked ? `checked` : ``} name="filter" value="${this._name.toLowerCase()}" >
       <label class="trip-filter__item" for="filter-${rmSpaces(this._name.toLowerCase())}">${this._name}</label>    
    `;
  }
  bind() {
    this._element.querySelector(`[name='filter']`).addEventListener(`click`, this.onChangeFilter.bind(this));
  }
}
