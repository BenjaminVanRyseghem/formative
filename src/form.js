import joi from "joi";
import objectPath from "object-path";

const validationOptions = {
  allowUnknown: true
};

/**
 * TODO: Write jsdoc
 */
export default class Form {
  constructor({ spec, state = {}, validator, onSubmit }) {
    this._spec = spec;
    this._state = { ...state };
    this._validator = validator;
    this._onSubmit = onSubmit;
    this._originalState = state;
  }

  getSpec() {
    return this._spec;
  }

  getValueFor(id) {
    return objectPath.get(this._state, id);
  }

  setValueFor(id, value) {
    return objectPath.set(this._state, id, value);
  }

  getState() {
    return this._state;
  }

  isRequired(id) {
    if (!this._validator) return false;

    let validator = objectPath.get(this._validator, id);
    if (!validator) return false;
    return validator.$_getFlag("presence") === "required";
  }

  makeValidateFor(id) {
    return (value) => {
      let validator = objectPath.get(this._validator, id);
      let input = this._findInputWithId(id);

      if (!validator) return null;

      let namedValidator = validator.label(input.getLabel());
      return namedValidator.validate(value, validationOptions);
    };
  }

  _findInputWithId(id) {
    for (let input of this._spec) {
      let found = input.findInputWithId(id);
      if (found) return found;
    }

    return null;
  }

  submit() {
    let result = this._state;

    if (this._validator) {
      let namedValidation = this._appendLabelsToValidators();
      let { error, value } = joi
        .object(namedValidation)
        .validate(result, { ...validationOptions, abortEarly: false });

      if (error) return gatherErrors(error);
      this._onSubmit?.(value);
      return null;
    }

    this._onSubmit?.(result);
    return null;
  }

  forEachInput(fn) {
    for (let input of this._spec) {
      input.forEach(fn);
    }
  }

  _appendLabelsToValidators() {
    let result = {};

    this.forEachInput((input) => {
      let id = input.getId();
      let validator = objectPath.get(this._validator, id);
      if (!validator) return;

      let namedValidator = validator.label(input.getLabel());
      objectPath.set(result, id, namedValidator);
    });

    return result;
  }
}

/**
 *
 * @param error
 * @return {{}}
 */
function gatherErrors(error) {
  let result = {};

  for (let detail of error.details) {
    result[detail.path.join(".")] = detail;
  }

  return result;
}
