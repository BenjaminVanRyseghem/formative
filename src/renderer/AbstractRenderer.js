/**
 * TODO: Write jsdoc
 */
export default class AbstractRenderer {
  render(form) {
    return this._visitForm(form);
  }

  visit(entry, options) {
    return entry.accept(this, options);
  }

  visitAll(entries, options) {
    return entries.map((entry) => this.visit(entry, options));
  }

  visitAbstractInput(input, options) {}

  visitSelect(input, options) {}

  visitInput(input, options) {}

  _visitForm(form) {
    this._form = form;
    return undefined;
  }

  _visitAllInputs(array, baseOptions) {
    return array.map((each) => {
      let value = this._getValueFor(each.getId());
      let onChange = this._makeOnChangeFor(each.getId());
      let required = this._form.isRequired(each.getId());

      let options = Object.assign({}, baseOptions, {
        value,
        onChange,
        required
      });

      return this.visit(each, options);
    });
  }

  _visitSpec(form) {
    let spec = form.getSpec();
    return this._visitAllInputs(spec, { state: form.getState() });
  }

  _getValueFor(id) {
    return this._form.getValueFor(id);
  }

  _makeOnChangeFor(id) {
    return (value) => {
      this._form.setValueFor(id, value);
      this._stateChanged();
    };
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

  _stateChanged() {
    this._clearAllErrors();
  }

  _clearAllErrors() {}

  _appendError() {}
}
