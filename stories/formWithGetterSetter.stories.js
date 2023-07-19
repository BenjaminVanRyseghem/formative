import { action } from "@storybook/addon-actions";
import { specForGetterSetter, validator } from "./utilities";
import Form from "../src/form";
import GetterSetterStateHandler from "../src/state/getterSetterStateHandler";
import HtmlRenderer from "../src/renderer/htmlRenderer";

export default {
	title: "Example/Form",
	parameters: {
		layout: "fullscreen"
	}
};

class InfoModel {
	constructor({ gender = "male" } = {}) {
		this._gender = gender;
	}

	getGender() {
		return this._gender;
	}

	setGender(gender) {
		this._gender = gender;
	}
}

class StateModel {
	constructor({
		phone = "9876543210",
		showInfo = "no",
		info = new InfoModel()
	} = {}) {
		this._phone = phone;
		this._showInfo = showInfo;
		this._info = info;
	}

	getShowInfo() {
		return this._showInfo;
	}

	getInfo() {
		return this._info;
	}

	clone() {
		let instance = new this.constructor();
		for (let key of Object.keys(this)) {
			if (Object.hasOwn(this, key)) {
				instance[key] = this[key];
			}
		}

		return instance;
	}
}

export const WithGetterStateHandler = {
	render: createFormWithCustomInput,
	args: {
		spec: specForGetterSetter,
		state: new StateModel(),
		validator
	}
};

function createFormWithCustomInput(args) {
	let renderer = new HtmlRenderer();
	let form = new Form({
		...args,
		stateHandler: new GetterSetterStateHandler({
			generateMissingFunctions: true
		}),
		onSubmit: action("onSubmit")
	});
	return renderer.render(form);
}
