import objectPath from "object-path";

/**
 * TODO: Write jsdoc
 */
export default class Form {
  constructor({ spec, state = {}, validation, onSubmit }) {
    this._spec = spec;
    this._state = { ...state };
    this._validation = validation;
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
    if (!this._validation) return false;

    let validation = objectPath.get(this._validation, id);
    if (!validation) return false;
    return validation.$_getFlag("presence") === "required";
  }

  submit() {
    let result = this._state;

    if (this._validation) {
      let errors = this._validateFields({
        fields: Object.keys(this._validation),
        state: result
      });

      if (Object.keys(errors).length) {
        return errors;
      }
    }

    this._onSubmit?.(result);
    return null;
  }

  _validateFields({ fields, state, prefix = "", errors = {} }) {
    for (let field of fields) {
      let key = `${prefix}${field}`;
      let validator = objectPath.get(this._validation, key);
      if (isObject(validator)) {
        this._validateFields({
          fields: Object.keys(validator),
          state,
          prefix: `${key}.`,
          errors
        });
      } else {
        let { error } = validator.validate(objectPath.get(state, key), {
          errors: {
            label: false
          }
        });
        if (error) {
          errors[key] = error;
        }
      }
    }

    return errors;
  }
}

function isObject(validator) {
  return typeof validator === "object" && !validator.$;
}
