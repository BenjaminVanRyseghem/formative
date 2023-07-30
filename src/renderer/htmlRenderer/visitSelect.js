/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
export function visitSelect(input, options, renderer) {
	let existingNode = renderer.findNode(input);
	if (existingNode) {
		updateSelect({
			input,
			existingNode,
			options,
			renderer
		});
		return existingNode;
	}

	return createSelect(input, options, renderer);
}

/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
function createSelect(input, options, renderer) {
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

/**
 *
 * @param {object} args - Object parameter
 * @param {Group} args.input - Input to visit
 * @param {HTMLElement} args.existingNode - HTMLElement to update
 * @param {object} args.options - Rendering options
 * @param {HtmlRenderer} args.renderer - Renderer initiating the visit
 */
function updateSelect({ input, existingNode, options, renderer }) {
	renderer.updateInput(input, existingNode, options);
}
