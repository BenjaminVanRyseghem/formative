import { visitRadio, visitRadioGroup } from "./htmlRenderer/visitRadioGroup";
import { visitSelect } from "./htmlRenderer/visitSelect";
import AbstractRenderer from "./abstractRenderer";
import visitGroup from "./htmlRenderer/visitGroup";
import visitInput from "./htmlRenderer/visitInput";

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

		let { required, noError } = options;
		let result = document.createElement("div");
		result.dataset.id = input.getId();

		let label = input.getLabel(options);
		if (label) {
			let labelNode = document.createElement("label");
			this._renderLabel(labelNode, label, required);
			result.append(labelNode);
		}

		if (!noError) {
			let errorNode = document.createElement("div");
			errorNode.classList.add("error-container");

			result.append(errorNode);
		}

		if (!shouldShow) {
			result.style.display = "none";
		}

		return result;
	}

	visitInput(input, options) {
		return visitInput(input, options, this);
	}

	visitSelect(input, options) {
		return visitSelect(input, options, this);
	}

	visitGroup(input, options) {
		let children = super.visitGroup(input, options);
		return visitGroup(input, options, children, this);
	}

	visitRadioGroup(input, options) {
		return visitRadioGroup(input, options, this);
	}

	visitRadio(input, options) {
		return visitRadio(input, options, this);
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

	updateInput(input, existingNode, options) {
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

	appendOptions({ node, value, selectOptions, onChange }) {
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

	findNode(input) {
		return this._formNode.querySelector(`[data-id='${input.getId()}']`);
	}

	setNodeValue({ node, value }) {
		Promise.resolve(value).then((resolvedValue) => {
			if (resolvedValue !== undefined && resolvedValue !== "") {
				node.setAttribute("value", resolvedValue);
			}
		});
	}

	_clearAllErrors() {
		let errors = this._formNode.querySelectorAll(".error-container");
		for (let error of errors) {
			error.innerHTML = "";
		}
	}

	clearErrorFor(id) {
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
