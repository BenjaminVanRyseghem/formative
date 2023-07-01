/**
 * TODO: Write jsdoc
 */
export default class AbstractRenderer {
  render(form) {
    return this._visitForm(form);
  }

  _visitForm(form) {
    this._form = form;
  }

  visit(entry, options) {
    return entry.accept(this, options);
  }

  visitAll(array, ...args) {
    return array.map((each) => {
      let value = this._getValueFor(each.getId());
      let onChange = this._makeOnChangeFor(each.getId());
      let required = this._form.isRequired(each.getId());

      let options = Object.assign({}, args, {
        value,
        onChange,
        required
      });

      return this.visit(each, options);
    });
  }

  _getValueFor(id) {
    return this._form.getValueFor(id);
  }

  _makeOnChangeFor(id) {
    return (value) => this._form.setValueFor(id, value);
  }

  _submit() {
    this._clearAllErrors();

    let errors = this._form.submit();
    if (!errors) return;

    let keys = Object.keys(errors);
    if (!keys.length) return;

    for (let key of keys) {
      this._appendError(key, errors[key]);
    }
  }
}
