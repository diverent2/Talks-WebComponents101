# Custom Elements

`customElements`

Just like HTML elements `<div>`, `header` or `input`

> gives us a path to define custom HTML tags that can be used in any document that contains the defining class.

Like your well known Angular components.

## traits

- consist of two parts: **tag name** and **class** that extends the build in `HTMLElement` class.
- they contain their own semantics, behaviors, markup.
- may be shared
- native
- will work everywhere with minimal effort. (your fav frameworks)

> dedicated to the continued backward compatibility of the spec, all but guaranteeing that components written according to the specifications will not suffer from breaking API changes

## naming

custom elements **always** feature a `-`
this makes sure one can avoid naming collisions with browser vendors.

## How to

```js
class MyComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<h1>Hello world</h1>`;
  }
}

customElements.define('my-component', MyComponent);
```

`this` = reference to custom element instance.
