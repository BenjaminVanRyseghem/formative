import AbstractInput from "./abstractInput";

/**
 * TODO: Write jsdoc
 */
export default class Group extends AbstractInput {
	constructor(id, showFunction) {
		if (typeof id === "function") {
			showFunction = id; // eslint-disable-line no-param-reassign
			id = null; // eslint-disable-line no-param-reassign
		}
		super(id, showFunction);
		this._children = [];
	}

	children(...children) {
		this._children = children;
		for (let child of children) {
			child.setParentId(this.getId());
		}
		return this;
	}

	getChildren(options) {
		return this._resolve(this._children, options);
	}

	accept(renderer, options) {
		return renderer.visitGroup(this, options);
	}

	isRequired({ form, options }) {
		return this.getChildren(options).every((child) =>
			child.isRequired({ form })
		);
	}

	findInputWithId(id, options) {
		if (this.getId() === id) return this;
		for (let child of this.getChildren(options)) {
			let found = child.findInputWithId(id, options);
			if (found) return found;
		}

		return null;
	}

	perform(fn, options) {
		for (let child of this.getChildren(options)) {
			child.perform(fn, options);
		}
	}
}
