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
      result.appendChild(child);
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

  _visitSpec(form) {
    let spec = form.getSpec();
    return this.visitAll(spec);
  }

  visitAbstractInput(input, { required }) {
    let result = document.createElement("div");
    result.setAttribute("data-key", input.getId());

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

    return result;
  }

  visitInput(input, { value, onChange, required }) {
    let base = this.visitAbstractInput(input, { value, onChange, required });

    let node = document.createElement("input");
    if (value !== undefined && value !== "") {
      node.setAttribute("value", value);
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

  _clearAllErrors() {
    let errors = this._formNode.querySelectorAll(".error-container");
    for (let error of errors) {
      error.innerHTML = "";
    }
  }

  _appendError(key, error) {
    let errorNode = this._formNode.querySelector(
      `[data-key='${key}'] .error-container`
    );

    errorNode.innerHTML = error.message;
  }
}
