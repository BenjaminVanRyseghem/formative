import AbstractInput from "./abstractInput";

/**
 * TODO: Write jsdoc
 */
export default class Input extends AbstractInput {
  accept(renderer, options) {
    return renderer.visitInput(this, options);
  }
}
