export function visitRadioGroup(input, options, renderer) {
	let existingNode = renderer.findNode(input, options);
	if (existingNode) {
		_updateRadioGroup(input, existingNode, options, renderer);
		return existingNode;
	}

	return _createRadioGroup(input, options, renderer);
}

export function visitRadio(input, options, renderer) {
	let existingNode = renderer.findNode(input, options);
	if (existingNode) {
		_updateRadio(input, existingNode, options);
		return existingNode;
	}

	return _createRadio(input, options, renderer);
}

function _createRadioGroup(input, options, renderer) {
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

function _updateRadioGroup(input, existingNode, options, renderer) {
	renderer.visitAll(input.getChildren(), {
		...options,
		name: input.getId()
	});

	renderer.updateInput(input, existingNode, options);
}

function _createRadio(input, options, renderer) {
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

function _updateRadio(input, existingNode, options, renderer) {
	renderer.updateInput(input, existingNode, options);
}
