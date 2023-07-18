import AbstractInput from "./abstractInput";

/**
 * TODO: Write jsdoc
 */
export default class Group extends AbstractInput {
	constructor(id, showFn) {
		if (typeof id === "function") {
			showFn = id; // eslint-disable-line no-param-reassign
			id = null; // eslint-disable-line no-param-reassign
		}
		super(id, showFn);
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

	forEach(fn, options) {
		for (let child of this.getChildren(options)) {
			child.forEach(fn, options);
		}
	}
}
