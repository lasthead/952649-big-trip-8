import createElement from "./tripComponents/createElement";

export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate Component, only concrete one.`);
    }
    this._element = null;
    this._state = null;
  }
  get element() {
    return this._element;
  }
  get template() {
    throw new Error(`You have to define template.`);
  }
  get _partialUpdate() {
    throw new Error(`You have to define partialUpdate.`);
  }
  render() {
    //console.log(createElement(this.template).childNodes);
    this._element = createElement(this.template);
    this.bind();
    return this._element;
  }
  unrender() {
    this.unbind();
    this._element.remove();
    this._element = null;
  }
  reRender() {
    this.unbind();
    this._partialUpdate();
    this.bind();
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
