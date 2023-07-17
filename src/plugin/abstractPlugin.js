/**
 * TODO: Write jsdoc
 */
export default class AbstractPlugin {
  registerFunction(renderer, name, fn) {
    let baseFn = renderer[name]?.bind(renderer);
    renderer[name] = (...args) => fn.call(renderer, ...args, baseFn);
  }
}
