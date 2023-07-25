export default function visitGroup(input, options, children, renderer) {
	let existingNode = renderer.findNode(input, options);
	if (existingNode) {
		_updateGroup(input, existingNode, options, renderer);
		return existingNode;
	}

	return _createGroup(input, options, children, renderer);
}

function _createGroup(input, options, children, renderer) {
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

function _updateGroup(input, existingNode, options, renderer) {
	renderer.updateInput(input, existingNode, options);
}
