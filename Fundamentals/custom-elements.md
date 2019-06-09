# Custom Elements

- just like HTML elements `<div>`, `header` or `input`
- work as an addition to the html 5 standards.

> give us a path to define custom HTML tags that can be used in any document that contains the defining class.

- consist of two parts: **tag name** and **class** that extends the build in `HTMLElement` class.

- custom elements **always** feature a `-`
  --> this makes sure one can avoid naming collisions with browser vendors.

## Class

- extend HTMLElement
  --> create hooks into attr. change lifecyle

```js
class Demo extends HTMLElement {
  constructor() {
    super();
    [...]
  }
}
```

## Lifecyle

constructor -> attributeChangedCallback -> connectedCallback

"every element should have some syntacitic meaning"

### constructor

- first function to get called
- initialzes html default state
- initialzes component configuration (compare to data-attr)

- changes before mounting the component need to happen _here_

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    const content = `
      <style>...</style>

      <div></div>
    `;
    this.container = content;
  }
}
```

`this` = reference to custom element instance.

### connectedCallback

- try to move as much functionality as possible in here

```js
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello world</h1>`;
  }
}

customElements.define('my-component', MyComponent);
```

### attributeChangedCallback(attr, oldVal, newVal)

- observedAttributes listeners will get called when attribute value defined inside `observedAttributes[]` changes.

- will also get called OnInit()

- will watch only these values. --> performance optimization

```js
class OurComponent extends HTMLElement {

  static get observedAttributes() {
    return ['foo', 'bar'];
  }

  [...]

  attributeChangedCallback(attrName, oldValue, newValue) {

    switch(attr) {
      case 'foo':
        // do something with `foo`
        break;
      case 'bar':
        // do something with `bar`
        break;

    }
  }
}
```

### disconnectedCallback

- called when element gets removed from DOM
- intended for cleanup
- ! will not be called when window or tab gets closed !
