/**
 * Render a Group as an HTML element.
 *
 * @param {object} args - Object parameter
 * @param {Group} args.input - Input to visit
 * @param {object} args.options - Rendering options
 * @param {AbstractInput[]} args.children - List of group children inputs
 * @param {HtmlRenderer} args.renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
export default function visitGroup({ input, options, children, renderer }) {
	let existingNode = renderer.findNode(input, options);
	if (existingNode) {
		updateGroup({
			input,
			existingNode,
			options,
			renderer
		});
		return existingNode;
	}

	return createGroup({
		input,
		options,
		children,
		renderer
	});
}

/**
 * Create a section HTMLElement.
 *
 * @param {object} args - Object parameter
 * @param {Group} args.input - Input to visit
 * @param {object} args.options - Rendering options
 * @param {AbstractInput[]} args.children - List of group children inputs
 * @param {HtmlRenderer} args.renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
function createGroup({ input, options, children, renderer }) {
	let base = renderer.visitAbstractInput(input, options);

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

/**
 * Update an existing section.
 *
 * @param {object} args - Object parameter
 * @param {Group} args.input - Input to visit
 * @param {HTMLElement} args.existingNode - HTMLElement to update
 * @param {object} args.options - Rendering options
 * @param {HtmlRenderer} args.renderer - Renderer initiating the visit
 */
function updateGroup({ input, existingNode, options, renderer }) {
	renderer.updateInput(input, existingNode, options);
}
