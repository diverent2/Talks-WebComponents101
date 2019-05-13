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
connectedCallback
--> component has been inserted into DOM
ex. document ready / or added (`document.body.appendChild`)

`attributeChangedCallback(attr, oldVal, newVal)`
--> when attr inside
observedAttributes-Array reads change

disconnectedCallback
--> when removed from DOM (cleanup)
! not when window/tab gets closed

### Constructor

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
