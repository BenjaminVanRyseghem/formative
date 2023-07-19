import AbstractStateHandler from "./abstractStateHandler";

/**
 * TODO: Write jsdoc
 */
export default class GetterSetterStateHandler extends AbstractStateHandler {
	constructor({ generateMissingFunctions = false } = {}) {
		super(...arguments);

		this._generateMissingFunctions = generateMissingFunctions;
	}

	get(state, id) {
		let result = state;
		let segments = this._convertToGetters(id);

		for (let { segment, name } of segments) {
			let getter = result[name];
			if (!getter) {
				if (this._generateMissingFunctions) {
					result[name] = function get() {
						// eslint-disable-line func-names
						return this[`_${segment}`];
					};

					getter = result[name];
				} else {
					return undefined;
				}
			}

			result = getter.call(result);
		}

		return result;
	}

	set(state, id, value) {
		let keys = id.split(".");
		let lastKey = keys.pop();
		let lastObject = keys.length ? this.get(state, keys.join(".")) : state;

		let name = this._convertToSetterName(lastKey);
		let setter = lastObject[name];
		if (!setter) {
			if (this._generateMissingFunctions) {
				lastObject[name] = function set(newValue) {
					// eslint-disable-line func-names
					this[`_${lastKey}`] = newValue;
				};

				setter = lastObject[name];
			} else {
				return;
			}
		}

		setter.call(lastObject, value);
	}

	convertForValidation({ state, validation, context }) {
		return validation.convertGetterSetterState({ state, context });
	}

	_convertToGetters(id) {
		let keys = id.split(".");
		return keys.map((segment) => ({
			segment,
			name: this._convertToGetterName(segment)
		}));
	}

	_convertToGetterName(segment) {
		return `get${this._capitalize(segment)}`;
	}

	_convertToSetterName(segment) {
		return `set${this._capitalize(segment)}`;
	}

	_capitalize(string) {
		let [first, ...rest] = string;
		return `${first.toUpperCase()}${rest.join("")}`;
	}
}
