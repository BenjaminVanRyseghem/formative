import AbstractInput from "../src/definition/abstractInput";
import AbstractPlugin from "../src/plugin/abstractPlugin";

// eslint-disable-next-line jsdoc/require-jsdoc
export class WeirdInput extends AbstractInput {
  accept(renderer, options) {
    return renderer.visitWeirdInput(this, options);
  }
}

// eslint-disable-next-line jsdoc/require-jsdoc
export class WeirdPlugin extends AbstractPlugin {
  register(renderer) {
    this.registerFunction(renderer, "visitWeirdInput", (input, options) => {
      let node = document.createElement("div");
      node.innerHTML = input.getLabel(options);
      return node;
    });
  }
}
