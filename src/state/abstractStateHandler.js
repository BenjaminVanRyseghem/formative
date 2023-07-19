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

	convertForValidation({ state: _, validation: __, validator: ___ }) {
		throw new Error("[convertForValidation] Must be overridden");
	}
}
