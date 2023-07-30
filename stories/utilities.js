import Group from "../src/definition/group";
import Input from "../src/definition/input";
import joi from "joi";
import RadioGroup, { Radio } from "../src/definition/radioGroup";
import Select from "../src/definition/select";

/**
 * Helper function generating a spec.
 *
 * @param {object} args - Object parameter
 * @param {Function} args.infoShowPredicate - Predicate returning true when
 *   then info group should be displayed
 * @param {Function} args.lastNameShowPredicate - Predicate returning true when
 *   the last-name input should be displayed
 * @param {Function} args.surNameShowPredicate - Predicate returning true when
 *   the surname input should be displayed
 * @return {AbstractInput[]} Form spec
 */
function makeSpec({
	infoShowPredicate = ({ state }) => state.showInfo === "yes",
	lastNameShowPredicate = ({ state }) => !!state.info?.name,
	surNameShowPredicate = ({ state }) => state.info?.gender === "male"
} = {}) {
	return [
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
		new RadioGroup("fruit")
			.label("Favorite fruit?")
			.validationLabel("Fruit")
			.radio(new Radio("apple").label("Apple"))
			.radio(new Radio("orange").label("Orange"))
			.radio(new Radio("pineapple").label("Pineapple")),
		new Group("info", infoShowPredicate)
			.label("Info")
			.children(
				new Select("gender")
					.label("Gender")
					.option("Male", "male")
					.option("Female", "female"),
				new Input("name").label("Name"),
				new Input("lastName", lastNameShowPredicate).label("Last Name"),
				new Input("surname", surNameShowPredicate).label("Surname")
			)
	];
}

export const validator = {
	showInfo: joi.valid("yes", "no"),
	fruit: joi.valid("apple", "orange", "pineapple").required(),
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

export const spec = makeSpec();
export const specForGetterSetter = makeSpec({
	infoShowPredicate: ({ state }) => state.getShowInfo() === "yes",
	lastNameShowPredicate: ({ state }) => !!state.getInfo()?.getName(),
	surNameShowPredicate: ({ state }) => state.getInfo()?.getGender() === "male"
});
