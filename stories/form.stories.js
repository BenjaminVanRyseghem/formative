import { action } from "@storybook/addon-actions";
import Form from "../src/form";
import HTMLRenderer from "../src/renderer/HTMLRenderer";
import Input from "../src/definition/input";
import joi from "joi";

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
      new Input("info.name").label("Name"),
      new Input("info.lastName").label("Last Name")
    ],
    state: {
      info: {
        name: "foo"
      }
    },
    validation: {
      info: {
        name: joi.string().empty("").required(),
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
