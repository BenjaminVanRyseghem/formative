import AbstractInput from "./abstractInput";

/**
 * TODO: Write jsdoc
 */
export default class Select extends AbstractInput {
	constructor(...args) {
		super(...args);
		this._options = [];
	}

	accept(renderer, options) {
		return renderer.visitSelect(this, options);
	}

	option(label, value) {
		this._options.push({ label, value });
		return this;
	}

	getOptions() {
		return this._options;
	}
}
