import AbstractValidation from "./abstractValidation";
import joi from "joi";
import objectPath from "object-path";

const validationOptions = {
	allowUnknown: true
};

/**
 * TODO: Write jsdoc
 */
export default class JoiValidation extends AbstractValidation {
	isRequired({ id, stateHandler, state, validator }) {
		let allValues = stateHandler.convertForValidation({
			state,
			validation: this,
			context: { stateHandler, validator }
		});

		objectPath.set(allValues, id, undefined);

		let result = joi.compile(validator).validate(allValues, {
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

	makeValidateFor({ id, value, stateHandler, state, validator, form }) {
		let allValues = stateHandler.convertForValidation({
			state,
			validation: this,
			context: { stateHandler, validator }
		});

		objectPath.set(allValues, id, value);

		let namedValidation = this._appendLabelsToValidators({
			validator,
			form
		});
		let result = joi
			.compile(namedValidation)
			.validate(allValues, { ...validationOptions, abortEarly: false });

		return result.error?.details?.find(
			(detail) => detail.path.join(".") === id
		);
	}

	validate({ state, stateHandler, validator, form }) {
		let allValues = stateHandler.convertForValidation({
			state,
			validation: this,
			context: { stateHandler, validator },
			validator
		});

		let namedValidation = this._appendLabelsToValidators({
			validator,
			form
		});

		let result = joi
			.compile(namedValidation)
			.validate(allValues, { ...validationOptions, abortEarly: false });

		return gatherErrors(result.error);
	}

	convertJsonState({ state }) {
		return structuredClone(state);
	}

	convertGetterSetterState({ state, context }) {
		let result = {};

		traverseObject(context.validator, ({ path }) => {
			let value = context.stateHandler.get(state, path);
			objectPath.set(result, path, value);
		});

		return result;
	}

	_appendLabelsToValidators({ validator, form }) {
		let result = {};

		form.forEachInput((input, options) => {
			let id = input.getId();
			let inputValidator = objectPath.get(validator, id);
			if (!inputValidator) return;

			let label = input.getValidationLabel(options);

			let namedValidator = label
				? inputValidator.label(label)
				: inputValidator;

			objectPath.set(result, id, namedValidator);
		});

		return result;
	}
}

/**
 * Recursively traverse a nested joi schema, and invoke `fn` on each
 * value.
 *
 * @param {object} schema - Joi schema to traverse
 * @param {Function} fn - Function to invoke on each value. The function is
 *   called with `key`, `value` and `path`, where `path` uses dot-notation
 * @param {string} path - Current path used to reach the schema being
 *   traversed. When it is not empty, it ends with a dot
 */
function traverseObject(schema, fn, path = "") {
	for (let key of Object.keys(schema)) {
		let value = schema[key];
		if (typeof value === "object" && !joi.isSchema(value)) {
			traverseObject(schema[key], fn, `${path + key}.`);
		} else {
			fn({ key, value, path: path + key });
		}
	}
}

/**
 * Group all errors in a literal object. Each pair has an input id as key, and
 * the validation error of the input as value.
 *
 * @param {object} error - Error object returned by Joi
 * @return {{}}
 */
function gatherErrors(error) {
	if (!error) return undefined;

	let result = {};

	for (let detail of error.details) {
		result[detail.path.join(".")] = detail;
	}

	return result;
}
