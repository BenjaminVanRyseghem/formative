/**
 * TODO: Write jsdoc
 */
export default class AbstractInput {
	constructor(id, showFunction = () => true) {
		this._id = id;
		this._showFn = showFunction;
	}

	transform(fn) {
		this._transformFn = fn;
		return this;
	}

	getTransformFn() {
		return this._transformFn;
	}

	format(fn) {
		this._formatFn = fn;
		return this;
	}

	getFormatFn() {
		return this._formatFn;
	}

	getId() {
		if (!this._parentId) return this._id;

		return `${this._parentId}.${this._id}`;
	}

	setParentId(id) {
		this._parentId = id;
	}

	label(label) {
		this._label = label;
		return this;
	}

	getLabel(options) {
		return this._resolve(this._label, options);
	}

	validationLabel(label) {
		this._validationLabel = label;
		return this;
	}

	getValidationLabel() {
		return this._validationLabel ?? this._label;
	}

	shouldShow(options) {
		if (typeof this._showFn === "function") {
			return this._showFn(options);
		}

		return this._showFn;
	}

	accept(renderer, options) {
		return renderer.visitAbstractInput(this, options);
	}

	isRequired({ form }) {
		return form.isRequired(this.getId());
	}

	findInputWithId(id) {
		return this.getId() === id ? this : null;
	}

	perform(fn, options) {
		fn(this, options);
	}

	_resolve(objectOrFunction, options = {}) {
		if (typeof objectOrFunction === "function") {
			return objectOrFunction(options);
		}

		return objectOrFunction;
	}
}
