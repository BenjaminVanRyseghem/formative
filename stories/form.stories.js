import { action } from "@storybook/addon-actions";
import Form from "../src/form";
import HTMLRenderer from "../src/renderer/HTMLRenderer";
import Input from "../src/definition/input";
import joi from "joi";
import Select from "../src/definition/select";

export default {
  title: "Example/Form",
  render: createForm,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/html/configure/story-layout
    layout: "fullscreen"
  }
};

export const Default = {
  args: {
    spec: [
      new Select("info.gender")
        .label("Gender")
        .option("Male", "male")
        .option("Female", "female"),
      new Input("info.name").label("Name"),
      new Input("info.lastName", ({ state }) => !!state.info?.name).label(
        "Last Name"
      ),
      new Input(
        "info.surname",
        ({ state }) => state.info?.gender === "male"
      ).label("Surname")
    ],
    state: {
      info: {
        gender: "female"
      }
    },
    validator: {
      info: {
        name: joi.string().empty("").required().trim(),
        lastName: joi.string().empty("").required()
      }
    }
  }
};

function createForm(args) {
  let renderer = new HTMLRenderer();
  let form = new Form({
    ...args,
    onSubmit: action("onSubmit")
  });
  return renderer.render(form);
}
