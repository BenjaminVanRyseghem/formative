import joi, { valid } from "joi";
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

  getValueFor(input, options) {
    let id = input.getId();
    let baseValue = objectPath.get(this._state, id);
    let formatFn = input.getFormatFn();
    if (!formatFn) return baseValue;
    return formatFn(baseValue, options);
  }

  setValueFor(id, value) {
    return objectPath.set(this._state, id, value);
  }

  getState() {
    return this._state;
  }

  isRequired(id) {
    if (!this._validator) return false;

    let allValues = structuredClone(this._state);
    objectPath.set(allValues, id, undefined);

    let result = joi.compile(this._validator).validate(allValues, {
      ...validationOptions,
      abortEarly: false,
      errors: {
        render: false,
        stack: false,
        wrap: false
      }
    });

    let error = result.error?.details?.find(
      (detail) => detail.path.join(".") === id
    );

    if (!error) return false;

    return error.type === "any.required";
  }

  makeValidateFor(id) {
    return (value) => {
      if (!this._validator) {
        return {};
      }

      let allValues = structuredClone(this._state);
      objectPath.set(allValues, id, value);

      let namedValidation = this._appendLabelsToValidators();
      let result = joi
        .compile(namedValidation)
        .validate(allValues, { ...validationOptions, abortEarly: false });

      return {
        error: result.error?.details?.find(
          (detail) => detail.path.join(".") === id
        ),
        value: result.value ? objectPath.get(result.value, id) : undefined
      };
    };
  }

  _findInputWithId(id, options) {
    for (let input of this._spec) {
      let found = input.findInputWithId(id, options);
      if (found) return found;
    }

    return null;
  }

  submit() {
    let result = this._state;

    if (this._validator) {
      let namedValidation = this._appendLabelsToValidators();
      let { error, value } = joi
        .compile(namedValidation)
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
      input.forEach(fn, { state: this._state });
    }
  }

  _appendLabelsToValidators() {
    let result = {};

    this.forEachInput((input, options) => {
      let id = input.getId();
      let validator = objectPath.get(this._validator, id);
      if (!validator) return;

      let label = input.getLabel(options);

      let namedValidator = label
        ? validator.label(input.getLabel())
        : validator;

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
