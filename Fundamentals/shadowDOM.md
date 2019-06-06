# Shadow DOM

- encapsulated version of the DOM
- document scope = `light DOM`
- everything SD is inside a `#shadow-root`

## traits

- incl. CSS **and** css selectors
- allows styling from the outside (using shadow root)
- truly scoped CSS (current frameworks only fake this using `#id`)

## Shadow Dom is not new

- `Shadow DOM` has existed for a very long time in native HTML elements.
- can be made visible using `Show user agent Shadow DOM` (chrome)

### Example `<video>`

contains controls, pause/play buttons, ...

currtly only accessable via [webkit pseudo selctors](https://codepen.io/BainjaminLafalize/pen/GiJwn)

One big difference:
When we create a `#shadow-root` we will **keep** total control over the element, but scoped to its content/context.

## Example

### create shadowRoot

```js
const shadowRoot = this.attachShadow({ mode: 'open' });
```

- `mode: 'open'` (default)
  can be expected in dev tools, interactable (querying, custom css, exposing events)

- `mode: 'closed'` (not recommanded)
  no event listening, , no interaction with consumer

### add html

```js
const shadowRoot = this.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `<p>Hello world</p>`;
```

`shadowRoot.innerHTML` assigns html as a pasive HTML fragment.
will get defined for later use.

Not visible/no js gets applied until inserted into light DOM.

## styling shadow DOM

> NO “huge addition-only stylesheets”
>
> - Danny Moerkerke

### from inside

- inside style tag
  regular external stylesheet (`<link rel="stylesheet">`)
  :host selector style component itself.

allows for contextual styling

```css
:host([disabled]) {
  opacity: 0.5;
}
```

### from outside

#### defaults

inherits some properties like font or color.

```css
host {
  all: initial;
}
```

### override

You can override styles at the `#shadow-root`

```css
#container {
  [...]
}
```

**HOWEVER**
You can´t style shadowDOM nodes from outside (main DOM). [YET*]

- `::part` and `::theme` are coming to tackle this.

currently recomanded way is to use css-vars

```css
:host {
  --background-color: #ffffff;
}

#container {
  background-color: var(--background-color);
}
```

## Methods

Once created all methods become part of public JavaScript API.

select webcomponent using:

light DOM (as expected):
`document.querySelector('selector')`

shadow root children can´t be selected from document scope: `shadowRoot.querySelector('selector-inside-shadowdom')` will return `selector element.`(parent)

Reason: belongs to a different `DocumentOrShadowRoot` instance.

using getters/setters will provide access to property management.

## `<slot>` for descendant

shadow root can include content from outer document (main DOM) using `<slot>`

can contain user provided markup //light DOM

elements inserted into shadowDOM using slots are called `distributed nodes`

can be named or will be read in order

### old example

ex. `<select>` element inserts options by the name `<option>` and renders it into the dropdown menu.

### modern example

```html
<image-gallery>
  <img src="foo.jpg" slot="image" />
  <img src="bar.jpg" slot="image" />
</image-gallery>

<div id="container">
  <div class="images">
    <slot name="image"></slot>
  </div>
</div>
```

```html
<div id="container">
  <div class="images">
    <slot name="image">
      <img src="foo.jpg" slot="image" />
      <img src="bar.jpg" slot="image" />
    </slot>
  </div>
</div>
```

### styling `slots`

will keep styling from before.

select top level:

```css
::slotted(img) {
  float: left;
}
```

selecting something deeper ex. `::slotted(section img)` **won´t work**

compare to `host`

### interaction with slots

`slot.assignedNodes()` find element in slot

`element.assignedSlot()` find slot of element

include fallback content `slot.assignedNodes({flatten: true})`

event: `slotchange` detect add/removal (no subnodes!)

```js
slot.addEventListener('slotchange', e => {
  const changedSlot = e.target;
  console.log(changedSlot.assignedNodes());
});
```

! chrome fires when first inserted, FF and Safari do not!
