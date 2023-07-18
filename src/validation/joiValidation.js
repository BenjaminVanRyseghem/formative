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

			let label = input.getLabel(options);

			let namedValidator = label
				? inputValidator.label(input.getLabel())
				: inputValidator;

			objectPath.set(result, id, namedValidator);
		});

		return result;
	}
}

function traverseObject(object, fn, prefix = "") {
	for (let key of Object.keys(object)) {
		let value = object[key];
		if (typeof value === "object" && !joi.isSchema(value)) {
			traverseObject(object[key], fn, `${prefix + key}.`);
		} else {
			fn({ key, value, path: prefix + key });
		}
	}
}

/**
 *
 * @param error
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
