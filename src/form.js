import joi from "joi";
import JoiValidation from "./validation/joiValidation";
import JsonStateHandler from "./state/jsonStateHandler";
import objectPath from "object-path";

const validationOptions = {
	allowUnknown: true
};

/**
 * TODO: Write jsdoc
 */
export default class Form {
	constructor({
		spec,
		state = {},
		validator,
		stateHandler = new JsonStateHandler(),
		validation = new JoiValidation(),
		onSubmit
	}) {
		this._spec = spec;
		this._validator = validator;
		this._onSubmit = onSubmit;
		this._stateHandler = stateHandler;
		this._state = this._stateHandler.clone(state);
		this._validation = validation;
		this._originalState = state;
	}

	getSpec() {
		return this._spec;
	}

	getValueFor(input, options) {
		let id = input.getId();
		let baseValue = this._stateHandler.get(this._state, id);
		let formatFn = input.getFormatFn();
		if (!formatFn) return baseValue;
		return formatFn(baseValue, options);
	}

	setValueFor(id, value) {
		this._stateHandler.set(this._state, id, value);
	}

	getState() {
		return this._state;
	}

	resetState() {
		this._state = this._stateHandler.clone(this._originalState);
	}

	isRequired(id) {
		if (!this._validator) return false;

		return this._validation.isRequired({
			id,
			stateHandler: this._stateHandler,
			state: this._state,
			validator: this._validator
		});
	}

	makeValidateFor(id) {
		return (value) => {
			if (!this._validator) {
				return {};
			}

			return this._validation.makeValidateFor({
				id,
				value,
				stateHandler: this._stateHandler,
				state: this._state,
				validator: this._validator,
				form: this
			});
		};
	}

	submit() {
		let result = this._state;

		if (this._validator) {
			let errors = this._validation.validate({
				state: this._state,
				stateHandler: this._stateHandler,
				validator: this._validator,
				form: this
			});

			if (errors) return errors;
		}

		this._onSubmit?.(result);
		return null;
	}

	forEachInput(fn) {
		for (let input of this._spec) {
			input.forEach(fn, { state: this._state });
		}
	}
}
