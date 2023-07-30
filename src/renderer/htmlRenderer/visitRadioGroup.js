/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
export function visitRadioGroup(input, options, renderer) {
	let existingNode = renderer.findNode(input, options);
	if (existingNode) {
		updateRadioGroup({
			input,
			existingNode,
			options,
			renderer
		});
		return existingNode;
	}

	return createRadioGroup(input, options, renderer);
}

/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
export function visitRadio(input, options, renderer) {
	let existingNode = renderer.findNode(input, options);
	if (existingNode) {
		updateRadio({
			input,
			existingNode,
			options,
			renderer
		});
		return existingNode;
	}

	return createRadio(input, options, renderer);
}

/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
function createRadioGroup(input, options, renderer) {
	let children = renderer.visitAll(input.getChildren(), {
		...options,
		name: input.getId()
	});

	let base = renderer.visitAbstractInput(input, options);
	let node = document.createElement("div");
	node.dataset.input = "true";
	node.setAttribute("role", "group");

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
 *
 * @param {object} args - Object parameter
 * @param {Group} args.input - Input to visit
 * @param {HTMLElement} args.existingNode - HTMLElement to update
 * @param {object} args.options - Rendering options
 * @param {HtmlRenderer} args.renderer - Renderer initiating the visit
 */
function updateRadioGroup({ input, existingNode, options, renderer }) {
	renderer.visitAll(input.getChildren(), {
		...options,
		name: input.getId()
	});

	renderer.updateInput(input, existingNode, options);
}

/**
 *
 * @param {Group} input - Input to visit
 * @param {object} options - Rendering options
 * @param {HtmlRenderer} renderer - Renderer initiating the visit
 * @return {HTMLElement} - HTMLElement
 */
function createRadio(input, options, renderer) {
	let base = renderer.visitAbstractInput(input, {
		...options,
		required: false,
		noError: true
	});
	let node = document.createElement("input");

	node.dataset.input = "true";
	node.setAttribute("type", "radio");
	node.setAttribute("name", options.name);

	if (options.required) {
		node.setAttribute("required", "true");
	}

	node.addEventListener("change", () => {
		options.onChange(input.getId());
	});

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
function updateRadio({ input, existingNode, options, renderer }) {
	renderer.updateInput(input, existingNode, options);
}
