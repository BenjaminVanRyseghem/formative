import objectPath from "object-path";

/**
 * TODO: Write jsdoc
 */
export default class AbstractStateHandler {
	/**
	 * @abstract
	 * @param {*} state -
	 * @param {string} id -
	 * @return {*}
	 */
	get(state, id) {
		return objectPath.get(state, id);
	}

	/**
	 * @abstract
	 * @param {*} state -
	 * @param {string} id -
	 * @param {*} value -
	 */
	set(state, id, value) {
		objectPath.set(state, id, value);
	}

	/**
	 * @abstract
	 * @param {*} state -
	 * @return {*}
	 */
	clone(state) {
		return structuredClone(state);
	}

	convertForValidation({ state, validation, validator }) {
		throw new Error("[convertForValidation] Must be overridden");
	}
}
