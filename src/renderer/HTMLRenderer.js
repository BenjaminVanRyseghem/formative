import AbstractRenderer from "./AbstractRenderer";

/**
 *
 */
export default class HTMLRenderer extends AbstractRenderer {
  _visitForm(form) {
    super._visitForm(form);

    let result = document.createElement("form");
    this._formNode = result;

    let children = this._visitSpec(form);
    for (let child of children) {
      if (child) {
        result.appendChild(child);
      }
    }

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.innerHTML = "Submit";
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      event.preventDefault();
      this._submit();
    });

    result.appendChild(button);

    return result;
  }

  visitAbstractInput(input, options) {
    let shouldShow = input.shouldShow(options);

    let { required } = options;
    let result = document.createElement("div");
    result.setAttribute("data-id", input.getId());

    let label = input.getLabel();
    if (label) {
      let labelNode = document.createElement("label");
      labelNode.innerHTML = label;

      if (required) {
        labelNode.innerHTML += "*";
      }

      result.appendChild(labelNode);
    }

    let errorNode = document.createElement("div");
    errorNode.classList.add("error-container");

    result.appendChild(errorNode);

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

  _stateChanged() {
    super._stateChanged();
    this._visitSpec(this._form);
  }

  _createInput(input, options) {
    let { value, onChange, required } = options;
    let base = this.visitAbstractInput(input, options);

    let node = document.createElement("input");
    if (value !== undefined && value !== "") {
      node.setAttribute("value", value);
    }
    node.addEventListener("keyup", (event) => {
      onChange(event.target.value);
    });

    if (required) {
      node.setAttribute("required", "true");
    }

    base.insertBefore(node, base.lastChild);

    return base;
  }

  _updateInput(input, existingNode, options) {
    let { value } = options;
    let shouldShow = input.shouldShow(options);

    if (value !== undefined && value !== "") {
      existingNode.setAttribute("value", value);
    }

    if (shouldShow) {
      existingNode.style.display = "initial";
    } else {
      existingNode.style.display = "none";
    }
  }

  _createSelect(input, options) {
    let { value, onChange, required } = options;
    let base = this.visitAbstractInput(input, options);

    let node = document.createElement("select");

    if (value !== undefined && value !== "") {
      node.setAttribute("value", value);
    }

    let selectedFound = false;

    let selectOptions = input.getOptions();
    for (let option of selectOptions) {
      let optionNode = document.createElement("option");
      optionNode.innerHTML = option.label;
      optionNode.value = option.value;

      if (value === option.value) {
        optionNode.setAttribute("selected", "true");
        selectedFound = true;
      }

      node.appendChild(optionNode);
    }

    if (!selectedFound) {
      setTimeout(() => {
        onChange(selectOptions[0].value);
      }, 0);
    }

    node.addEventListener("change", (event) => {
      onChange(event.target.value);
    });

    if (required) {
      node.setAttribute("required", "true");
    }

    base.insertBefore(node, base.lastChild);

    return base;
  }

  _updateSelect(input, existingNode, options) {
    let { value } = options;
    let shouldShow = input.shouldShow(options);

    if (value !== undefined && value !== "") {
      existingNode.setAttribute("value", value);
    }

    if (shouldShow) {
      existingNode.style.display = "initial";
    } else {
      existingNode.style.display = "none";
    }
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

  _appendError(key, error) {
    let errorNode = this._formNode.querySelector(
      `[data-id='${key}'] .error-container`
    );

    errorNode.innerHTML = error.message;
  }
}
