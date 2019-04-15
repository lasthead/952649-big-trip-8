import Component from './component';
export default class Filter extends Component {
  constructor(data) {
    super();
    this._onFilter = null;
  }
  set onFilter(fn) {
    return typeof this._onFilter === `function` && this._onReset();
  }
  template() {
    return `
       <input type="radio" id="filter-everything" name="filter" value="everything" checked>
       <label class="trip-filter__item" for="filter-everything">Everything</label>
    `;
  }
}
