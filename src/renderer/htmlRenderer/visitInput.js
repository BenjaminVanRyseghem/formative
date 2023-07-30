/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
export default function visitInput(input, options, renderer) {
	let existingNode = renderer.findNode(input);
	if (existingNode) {
		renderer.updateInput(input, existingNode, options);
		return existingNode;
	}

	return createInput(input, options, renderer);
}

/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
function createInput(input, options, renderer) {
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
