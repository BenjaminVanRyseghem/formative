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

  visitInput(input, options) {}

  visitSelect(input, options) {}

  visitGroup(input, options) {
    return this._visitAllInputs(input.getChildren(options), options);
  }

  _visitForm(form) {
    this._form = form;
    return undefined;
  }

  _visitAllInputs(array, baseOptions) {
    return array.map((each) => {
      let value = this._getValueFor(each, baseOptions);
      let onChange = this._makeOnChangeFor(each, baseOptions);
      let required = each.isRequired({
        form: this._form,
        options: baseOptions
      });
      let validate = this._makeValidateFor(each.getId(), baseOptions);

      let options = Object.assign({}, baseOptions, {
        value,
        onChange,
        validate,
        required
      });

      return this.visit(each, options);
    });
  }

  _visitSpec(form) {
    let spec = form.getSpec();
    return this._visitAllInputs(spec, { state: form.getState() });
  }

  _getValueFor(input, options) {
    return this._form.getValueFor(input, options);
  }

  _makeValidateFor(id) {
    return (valueToValidate) => {
      let result = this._validateValue(id, valueToValidate);
      let error = result?.error;

      if (error) {
        this._appendError(id, error);
      }

      return result;
    };
  }

  _makeOnChangeFor(input, options) {
    return (valueToValidate) => {
      let id = input.getId();
      let transformFn = input.getTransformFn();
      let transformedValue = transformFn
        ? transformFn(valueToValidate, options)
        : valueToValidate;

      let result = this._validateValue(id, transformedValue);
      let error = result?.error;
      let value = result?.value ?? transformedValue;

      this._form.setValueFor(id, value);
      this._stateChanged();

      if (error) {
        this._appendError(id, error);
      }

      return result;
    };
  }

  _validateValue(id, value) {
    return this._form.makeValidateFor(id)(value);
  }

  _submit() {
    this._clearAllErrors();

    let errors = this._form.submit();
    if (!errors) return;

    let keys = Object.keys(errors);

    for (let key of keys) {
      this._appendError(key, errors[key]);
    }
  }

  _stateChanged() {
    this._clearAllErrors();
  }

  _clearAllErrors() {}

  _clearErrorFor(id) {}

  _appendError(key, error) {}
}
