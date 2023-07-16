import { action } from "@storybook/addon-actions";
import Form from "../src/form";
import HTMLRenderer from "../src/renderer/HTMLRenderer";
import Input from "../src/definition/input";
import joi from "joi";
import Select from "../src/definition/select";
import Group from "../src/definition/group";

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
        .option("Yes", true)
        .option("No", false),
      new Group("info", ({ state }) => state.showInfo)
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
    ],
    state: {
      phone: "0123456789",
      showInfo: false,
      info: {
        gender: "female"
      }
    },
    validator: {
      showInfo: joi.bool(),
      info: {
        name: joi.string().empty("").trim().when("...showInfo", {
          is: true,
          then: joi.required()
        }),
        lastName: joi.string().empty("").trim().when("...showInfo", {
          is: true,
          then: joi.required()
        })
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
