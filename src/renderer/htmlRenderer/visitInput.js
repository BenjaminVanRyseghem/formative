export default function visitInput(input, options, renderer) {
	let existingNode = renderer.findNode(input);
	if (existingNode) {
		renderer.updateInput(input, existingNode, options);
		return existingNode;
	}

	return _createInput(input, options, renderer);
}

function _createInput(input, options, renderer) {
	let { value, onChange, required, validate } = options;
	let base = renderer.visitAbstractInput(input, options);

	let node = document.createElement("input");
	node.dataset.input = "true";

	renderer.setNodeValue({ node, value });

	node.addEventListener("keyup", (event) => {
		if (event.key === "Tab") return;
		onChange(event.target.value);
	});

	node.addEventListener("focus", () => {
		renderer.clearErrorFor(input.getId());
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
