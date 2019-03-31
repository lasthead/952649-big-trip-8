import createElement from "./tripComponents/createElement";

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._state = null;
  }
  get template() {
    throw new Error(`You have to define template.`);
  }
  render(container) {
    if (this._element) {
      container.removeChild(this._element);
      this._element = null;
    }
    this._element = createElement(this.template);
    container.appendChild(this._element);
    this.bind();
  }
  unrender(container) {
    event.preventDefault();
    container.removeChild(this._element);
    this._element = null;
  }
  bind() {}
  unbind() {}
  update() {}
  set submit(fn) {
    this._onSubmit = fn;
  }
  set reset(fn) {
    this._onReset = fn;
  }
}
