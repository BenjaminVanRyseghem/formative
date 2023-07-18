import { action } from "@storybook/addon-actions";
import { spec, validator } from "./utilities";
import { WeirdInput, WeirdPlugin } from "./weirdPlugin";
import Form from "../src/form";
import HtmlRenderer from "../src/renderer/htmlRenderer";

export default {
	title: "Example/Form",
	parameters: {
		layout: "fullscreen"
	}
};

export const WithCustomInput = {
	render: createFormWithCustomInput,
	args: {
		spec,
		state: {
			phone: "0123456789",
			showInfo: "no",
			info: {
				gender: "female"
			}
		},
		validator
	}
};

function createFormWithCustomInput(args) {
	let renderer = new HtmlRenderer({ plugins: [new WeirdPlugin()] });
	args.spec = [new WeirdInput("weird").label("Weird"), ...args.spec];

	let form = new Form({
		...args,
		onSubmit: action("onSubmit")
	});

	return renderer.render(form);
}
