import AbstractStateHandler from "./abstractStateHandler";
import objectPath from "object-path";

/**
 * TODO: Write jsdoc
 */
export default class JsonStateHandler extends AbstractStateHandler {
	get(state, id) {
		return objectPath.get(state, id);
	}

	set(state, id, value) {
		objectPath.set(state, id, value);
	}

	clone(state) {
		return structuredClone(state);
	}

	convertForValidation({ state, validation, context }) {
		return validation.convertJsonState({ state, context });
	}
}
