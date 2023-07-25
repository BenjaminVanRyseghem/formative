export function visitSelect(input, options, renderer) {
	let existingNode = renderer.findNode(input);
	if (existingNode) {
		_updateSelect(input, existingNode, options, renderer);
		return existingNode;
	}

	return _createSelect(input, options, renderer);
}

function _createSelect(input, options, renderer) {
	let { value, onChange, required } = options;
	let base = renderer.visitAbstractInput(input, options);

	let node = document.createElement("select");
	node.dataset.input = "true";

	renderer.setNodeValue({ node, value });

	let selectOptions = input.getOptions();
	renderer.appendOptions({ node, selectOptions, value, onChange });

	node.addEventListener("change", (event) => {
		onChange(event.target.value);
	});

	if (required) {
		node.setAttribute("required", "true");
	}

	base.insertBefore(node, base.lastChild);

	return base;
}

function _updateSelect(input, existingNode, options, renderer) {
	renderer.updateInput(input, existingNode, options);
}
