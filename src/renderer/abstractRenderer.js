/**
 * TODO: Write jsdoc
 */
export default class AbstractRenderer {
	constructor({ plugins = [] } = {}) {
		this._plugins = [...(this.constructor.plugins ?? []), ...plugins];

		for (let plugin of this._plugins) {
			plugin.register(this);
		}
	}

	render(form) {
		return this._visitForm(form);
	}

	visit(entry, options) {
		return entry.accept(this, options);
	}

	visitAll(entries, options) {
		return entries.map((entry) => this.visit(entry, options));
	}

	visitAbstractInput(_input, _options) {}

	visitInput(_input, _options) {}

	visitSelect(_input, _options) {}

	visitGroup(input, options) {
		return this._visitAllInputs(input.getChildren(options), options);
	}

	_visitForm(form) {
		this._form = form;
		return undefined;
	}

	_visitAllInputs(array, baseOptions) {
		return array.map((each) => {
			let value = this._getValueFor(each, baseOptions);
			let onChange = this._makeOnChangeFor(each, baseOptions);
			let required = each.isRequired({
				form: this._form,
				options: baseOptions
			});
			let validate = this._makeValidateFor(each.getId(), baseOptions);

			let options = {
				...baseOptions,
				value,
				onChange,
				validate,
				required
			};

			return this.visit(each, options);
		});
	}

	_visitSpec(form) {
		let spec = form.getSpec();
		return this._visitAllInputs(spec, { state: form.getState() });
	}

	_getValueFor(input, options) {
		return this._form.getValueFor(input, options);
	}

	_makeValidateFor(id) {
		return (valueToValidate) => {
			let error = this._validateValue(id, valueToValidate);

			if (error) {
				this._appendError(id, error);
			}

			return error;
		};
	}

	_makeOnChangeFor(input, options) {
		return (valueToValidate) => {
			let id = input.getId();
			let transformFunction = input.getTransformFn();
			let value = transformFunction
				? transformFunction(valueToValidate, options)
				: valueToValidate;

			let error = this._validateValue(id, value);

			this._isStateLoading(input);
			Promise.resolve(this._form.setValueFor(id, value)).then(() => {
				this._stateChanged();
			});

			if (error) {
				this._appendError(id, error);
			}

			return error;
		};
	}

	_validateValue(id, value) {
		return this._form.makeValidateFor(id)(value);
	}

	_submit() {
		this._clearAllErrors();

		let errors = this._form.submit();
		if (!errors) return;

		let keys = Object.keys(errors);

		for (let key of keys) {
			this._appendError(key, errors[key]);
		}
	}

	_isStateLoading(input) {} // eslint-disable-line no-unused-vars

	_stateChanged() {
		this._clearAllErrors();
	}

	_clearAllErrors() {}

	_clearErrorFor(_id) {}

	_appendError(_key, _error) {}

	static plugin(plugin) {
		this.plugins ??= [];
		this.plugins.push(plugin);
		return this;
	}
}
