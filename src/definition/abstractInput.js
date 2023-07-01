/**
 * TODO: Write jsdoc
 */
export default class AbstractInput {
  constructor(id, showFn = () => true) {
    this._id = id;
    this._showFn = showFn;
  }

  getId() {
    return this._id;
  }

  label(label) {
    this._label = label;
    return this;
  }

  getLabel() {
    return this._label;
  }

  accept(renderer, options) {
    return renderer.visitAbstractInput(this, options);
  }
}
