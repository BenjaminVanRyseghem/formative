import Group from "../src/definition/group";
import Input from "../src/definition/input";
import joi from "joi";
import Select from "../src/definition/select";

export const spec = [
	new Input("phone")
		.format((value) => {
			if (!value) return value;
			let result = "";
			let index = 0;
			for (let char of value) {
				result += char;
				index++;
				if (index === 2) {
					result += " ";
					index = 0;
				}
			}

			return result.trim();
		})
		.transform((value) => {
			if (!value) return value;
			let result = "";
			for (let char of value) {
				if (char === " ") continue;
				result += char;
			}

			return result.trim();
		}),
	new Select("showInfo")
		.label("Show Info")
		.option("Yes", "yes")
		.option("No", "no"),
	new Group("info", ({ state }) => state.showInfo === "yes")
		.label("Info")
		.children(
			new Select("gender")
				.label("Gender")
				.option("Male", "male")
				.option("Female", "female"),
			new Input("name").label("Name"),
			new Input("lastName", ({ state }) => !!state.info?.name).label(
				"Last Name"
			),
			new Input(
				"surname",
				({ state }) => state.info?.gender === "male"
			).label("Surname")
		)
];

export const specForGetterSetter = [
	new Input("phone")
		.format((value) => {
			if (!value) return value;
			let result = "";
			let index = 0;
			for (let char of value) {
				result += char;
				index++;
				if (index === 2) {
					result += " ";
					index = 0;
				}
			}

			return result.trim();
		})
		.transform((value) => {
			if (!value) return value;
			let result = "";
			for (let char of value) {
				if (char === " ") continue;
				result += char;
			}

			return result.trim();
		}),
	new Select("showInfo")
		.label("Show Info")
		.option("Yes", "yes")
		.option("No", "no"),
	new Group("info", ({ state }) => state.getShowInfo() === "yes")
		.label("Info")
		.children(
			new Select("gender")
				.label("Gender")
				.option("Male", "male")
				.option("Female", "female"),
			new Input("name").label("Name"),
			new Input(
				"lastName",
				({ state }) => !!state.getInfo()?.getName()
			).label("Last Name"),
			new Input(
				"surname",
				({ state }) => state.getInfo()?.getGender() === "male"
			).label("Surname")
		)
];

export const validator = {
	showInfo: joi.valid("yes", "no"),
	info: {
		name: joi.string().empty("").trim().when("...showInfo", {
			is: "yes",
			then: joi.required()
		}),
		lastName: joi.string().empty("").trim().when("...showInfo", {
			is: "yes",
			then: joi.required()
		})
	}
};
