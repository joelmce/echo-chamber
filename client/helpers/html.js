function html(...args) {
  const [type, attributes, children] = parseArguments(args);

  const element = document.createElement(type);
  setAttributes(element, attributes);
  element.append(...children);

  return element;
}

function parseArguments(args) {
  const type = isString(args[0]) ? args.shift() : 'div';
  const attributes = {};
  const children = [];

  args.forEach((arg) => {
    isAttribute(arg) ? Object.assign(attributes, arg) : children.push(arg);
  });

  if (attributes.class) attributes.className = attributes.class;

  return [type, attributes, children.flat(Infinity)];
}

const isArray = Array.isArray;
const isString = (x) => typeof x === 'string';
const isObject = (x) => typeof x === 'object' && x !== null;
const isElement = (x) => x instanceof HTMLElement;
const isAttribute = (x) => isObject(x) && !isArray(x) && !isElement(x);
const setAttributes = (el, attrs) => {
  for (const [key, value] of Object.entries(attrs)) {
    // this handles dataset objects and style objects
    if (isObject(value)) {
      Object.assign(el[key], value);
    } else {
      Object.assign(el, { [key]: value });
    }
  }
};

export default html;
