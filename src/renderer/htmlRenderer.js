import AbstractRenderer from "./abstractRenderer";

/**
 *
 */
export default class HtmlRenderer extends AbstractRenderer {
	_visitForm(form) {
		super._visitForm(form);

		let result = document.createElement("form");
		this._formNode = result;

		let children = this._visitSpec(form);
		for (let child of children) {
			if (child) {
				result.append(child);
			}
		}

		result.append(this._createSubmitButton());

		return result;
	}

	_createSubmitButton() {
		let button = document.createElement("button");
		button.setAttribute("type", "button");
		button.innerHTML = "Submit";

		button.addEventListener("click", (event) => {
			event.stopPropagation();
			event.preventDefault();
			this._submit();
		});

		return button;
	}

	visitAbstractInput(input, options) {
		let shouldShow = input.shouldShow(options);

		let { required } = options;
		let result = document.createElement("div");
		result.dataset.id = input.getId();

		let label = input.getLabel(options);
		if (label) {
			let labelNode = document.createElement("label");
			this._renderLabel(labelNode, label, required);
			result.append(labelNode);
		}

		let errorNode = document.createElement("div");
		errorNode.classList.add("error-container");

		result.append(errorNode);

		if (!shouldShow) {
			result.style.display = "none";
		}

		return result;
	}

	visitInput(input, options) {
		let existingNode = this._findNode(input);
		if (existingNode) {
			this._updateInput(input, existingNode, options);
			return existingNode;
		}

		return this._createInput(input, options);
	}

	visitSelect(input, options) {
		let existingNode = this._findNode(input);
		if (existingNode) {
			this._updateSelect(input, existingNode, options);
			return existingNode;
		}

		return this._createSelect(input, options);
	}

	visitGroup(input, options) {
		let existingNode = this._findNode(input, options);
		if (existingNode) {
			this._updateGroup(input, existingNode, options);
			return existingNode;
		}

		return this._createGroup(input, options);
	}

	_createGroup(input, options) {
		let children = super.visitGroup(input, options);
		let base = this.visitAbstractInput(input, options);

		let node = document.createElement("section");
		node.dataset.input = "true";

		for (let child of children) {
			node.append(child);
		}

		if (options.required) {
			node.setAttribute("required", "true");
		}

		base.insertBefore(node, base.lastChild);

		return base;
	}

	_renderLabel(node, label, required) {
		if (!node) return;
		node.innerHTML = label;

		if (required) {
			node.innerHTML += "*";
		}
	}

	_stateChanged() {
		super._stateChanged();
		this._visitSpec(this._form);
	}

	_createInput(input, options) {
		let { value, onChange, required, validate } = options;
		let base = this.visitAbstractInput(input, options);

		let node = document.createElement("input");
		node.dataset.input = "true";

		if (value !== undefined && value !== "") {
			node.setAttribute("value", value);
		}

		node.addEventListener("keyup", (event) => {
			if (event.key === "Tab") return;
			onChange(event.target.value);
		});

		node.addEventListener("focus", () => {
			this._clearErrorFor(input.getId());
		});

		node.addEventListener("blur", (event) => {
			validate(event.target.value);
		});

		if (required) {
			node.setAttribute("required", "true");
		}

		base.insertBefore(node, base.lastChild);

		return base;
	}

	_updateInput(input, existingNode, options) {
		let { value, required } = options;
		let shouldShow = input.shouldShow(options);

		let label = input.getLabel(options);
		let existingLabel = existingNode.querySelector("label");
		this._renderLabel(existingLabel, label, required);

		if (value !== undefined && value !== "") {
			existingNode.querySelector("[data-input]").value = value;
		}

		existingNode.style.display = shouldShow ? "initial" : "none";
	}

	_createSelect(input, options) {
		let { value, onChange, required } = options;
		let base = this.visitAbstractInput(input, options);

		let node = document.createElement("select");
		node.dataset.input = "true";

		if (value !== undefined && value !== "") {
			node.setAttribute("value", value);
		}

		let selectOptions = input.getOptions();
		this._appendOptions({ node, selectOptions, value, onChange });

		node.addEventListener("change", (event) => {
			onChange(event.target.value);
		});

		if (required) {
			node.setAttribute("required", "true");
		}

		base.insertBefore(node, base.lastChild);

		return base;
	}

	_appendOptions({ node, value, selectOptions, onChange }) {
		let selectedFound = false;
		for (let option of selectOptions) {
			let optionNode = document.createElement("option");
			optionNode.innerHTML = option.label;
			optionNode.value = option.value;

			if (value === option.value) {
				optionNode.setAttribute("selected", "true");
				selectedFound = true;
			}

			node.append(optionNode);
		}
		if (!selectedFound) {
			setTimeout(() => {
				onChange(selectOptions[0].value);
			}, 0);
		}
	}

	_updateSelect(input, existingNode, options) {
		this._updateInput(input, existingNode, options);
	}

	_updateGroup(input, existingNode, options) {
		super.visitGroup(input, options);
		this._updateInput(input, existingNode, options);
	}

	_findNode(input) {
		return this._formNode.querySelector(`[data-id='${input.getId()}']`);
	}

	_clearAllErrors() {
		let errors = this._formNode.querySelectorAll(".error-container");
		for (let error of errors) {
			error.innerHTML = "";
		}
	}

	_clearErrorFor(id) {
		let errorContainer = this._formNode.querySelector(
			`[data-id='${id}'] .error-container`
		);
		if (!errorContainer) return;
		errorContainer.innerHTML = "";
	}

	_appendError(key, error) {
		let errorNode = this._formNode.querySelector(
			`[data-id='${key}'] .error-container`
		);

		errorNode.innerHTML = error.message;
	}
}
