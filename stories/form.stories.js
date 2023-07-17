import { action } from "@storybook/addon-actions";
import AbstractPlugin from "../src/plugin/abstractPlugin";
import Form from "../src/form";
import Group from "../src/definition/group";
import HtmlRenderer from "../src/renderer/htmlRenderer";
import Input from "../src/definition/input";
import joi from "joi";
import Select from "../src/definition/select";
import { WeirdInput, WeirdPlugin } from "./weirdPlugin";

export default {
  title: "Example/Form",
  render: createForm,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/html/configure/story-layout
    layout: "fullscreen"
  }
};

/*
 *
 */
class TestPlugin extends AbstractPlugin {
  constructor(submitLabel = "") {
    super(...arguments); // eslint-disable-line prefer-rest-params
    this._label = submitLabel;
  }

  register(renderer) {
    this.registerFunction(renderer, "_createSubmitButton", (baseFn) => {
      let base = baseFn();
      base.innerText += ` ${this._label}`;

      return base;
    });
  }
}

const spec = [
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
      new Input("surname", ({ state }) => state.info?.gender === "male").label(
        "Surname"
      )
    )
];

const validator = {
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
};

export const Default = {
  args: {
    spec,
    state: {
      phone: "0123456789",
      showInfo: false,
      info: {
        gender: "female"
      }
    },
    validator
  }
};

export const WithClassPlugin = {
  render: createFormWithClassPlugin,
  args: {
    spec,
    state: {
      phone: "0123456789",
      showInfo: false,
      info: {
        gender: "female"
      }
    },
    validator
  }
};

export const WithInstancePlugin = {
  render: createFormWithInstancePlugin,
  args: {
    spec,
    state: {
      phone: "0123456789",
      showInfo: false,
      info: {
        gender: "female"
      }
    },
    validator
  }
};

export const WithCustomInput = {
  render: createFormWithCustomInput,
  args: {
    spec,
    state: {
      phone: "0123456789",
      showInfo: false,
      info: {
        gender: "female"
      }
    },
    validator
  }
};

function createForm(args) {
  let renderer = new HtmlRenderer();
  let form = new Form({
    ...args,
    onSubmit: action("onSubmit")
  });
  return renderer.render(form);
}

function createFormWithClassPlugin(args) {
  class TestRenderer extends HtmlRenderer {} // eslint-disable-line jsdoc/require-jsdoc
  TestRenderer.plugin(new TestPlugin("Ok"));

  let renderer = new TestRenderer();
  let form = new Form({
    ...args,
    onSubmit: action("onSubmit")
  });
  return renderer.render(form);
}

function createFormWithInstancePlugin(args) {
  class TestRenderer extends HtmlRenderer {} // eslint-disable-line jsdoc/require-jsdoc
  TestRenderer.plugin(new TestPlugin("Ok"));
  let renderer = new TestRenderer({ plugins: [new TestPlugin("Foo")] });
  let form = new Form({
    ...args,
    onSubmit: action("onSubmit")
  });
  return renderer.render(form);
}

function createFormWithCustomInput(args) {
  let renderer = new HtmlRenderer({ plugins: [new WeirdPlugin()] });
  args.spec = [new WeirdInput("weird").label("Weird"), ...args.spec];

  let form = new Form({
    ...args,
    onSubmit: action("onSubmit")
  });

  return renderer.render(form);
}
