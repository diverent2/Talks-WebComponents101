# How to

```html
<our-component></our-component>
```

new unregistered el is `HTMLUnknownElement`

- default style
- no methods
- but default interactivity

## Define element

using the customElementRegistry API

```js
window.customElements.define('our-component', MyElement);
```

```js
//callback promise
customElements.whenDefined('our-element').then(() => {
  // our-element is now defined
});
```

- Enhances it with class definition.
  -> `upgrading`

## class

```js
class OurComponent extends HTMLElement {
  constructor() {
    // init state only
    // set up shadow DOM
    super();
  }

  connectedCallback() {
    // here the element has been inserted into the DOM
    // componentDidMount in react
  }
}
```

## Lifecycle

constructor
--> component created
ex. `document.createElement`
`attributeChangedCallback(...)` //runs once after creation

`connectedCallback`
--> component has been inserted into DOM
ex. document ready / or added (`document.body.appendChild`)

`attributeChangedCallback(attr, oldVal, newVal)`
--> when attr inside
observedAttributes-Array reads change

`disconnectedCallback`
--> when removed from DOM (cleanup)
! not when window/tab gets closed

`adoptedCallback`
--> fires when element is adopted into another part of the DOM

### Constructor

handle initial setup on a basic level.
Can´t setup attributes or events.

compare to: `document.createElement` only creating the element using the constructor. No values set or changed.

```js
  constructor() {
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = `
      <style>
      {}
      </style>

      <div></div>
    `;
     this.container = this.shadowRoot('#container');
  }

```

### connectedCallback

handles initial setup and is
used to add content to an element, set up event listeners

### attributeChangedCallback(attr, oldVal, newVal)

will get called when an attribute value defined inside the
`observedAttributes`-Array changes.

```js
class OurComponent extends HTMLElement {
  static get observedAttributes() {
    return ['attr2watch'];
  }

  connectedCallback() {
    [...]
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    //update if changed
    if (newValue !== oldValue) {
      this[attrName] = this.hasAttribute(attrName);
    }
  }
}
```

> A property exists on a JavaScript object whereas an attribute exists on an HTMLElement, this lifecycle method helps us keep the two in sync.

- getter/setter--> update attribute when pro gets updated.

```js

get attr2watch() {
  return this.getAttribute(attr2watch); //?
}

set attr2watch(val) {
  this.setAttribute('attr2watch', val);
}
```

- `attributeChangedCallback` update prop when attr. change

It´s considered a best pratice to keep the property and attribute values in sync but it isn´t mandatory.

### disconnectedCallback

--> when removed from DOM (cleanup)
! not when window/tab gets closed

- remove event listeners
- clean up `MutationObserver`
