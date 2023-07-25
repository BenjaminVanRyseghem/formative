import AbstractInput from "./abstractInput";

/**
 * TODO: Write jsdoc
 */
export class Radio extends AbstractInput {
	accept(renderer, options) {
		return renderer.visitRadio(this, options);
	}
}

/**
 * TODO: Write jsdoc
 */
export default class RadioGroup extends AbstractInput {
	constructor(...args) {
		super(...args);

		this._children = [];
	}

	radio(child) {
		this._children.push(child);
		return this;
	}

	getChildren() {
		return this._children;
	}

	accept(renderer, options) {
		return renderer.visitRadioGroup(this, options);
	}
}
