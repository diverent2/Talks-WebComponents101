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

---

## selector scoping

Once created you can use all DOM methods as you would normally use on document object by using this.shadoRoot.querySelector

light DOM selector works as usual:
`document.querySelector('selector')`
will return DOM element `selector`

`shadowRoot.querySelector('selector')` will return shadowDOM element `selector`

however shadow root children can´t be selected from document scope: `shadowRoot.querySelector('selector-inside-shadowdom')` will return `selector element.`(parent)

> "For example, If we have a shadow root with a `<button>` inside of it, calling shadowRoot.querySelector('button') would return our button, but no invocation of the document’s query selector will return that element because it belongs to a different DocumentOrShadowRoot instance."

Reason: they belong to a different `DocumentOrShadowRoot` instance.

## Example apply shadow DOM

```html
<!--Shadow-root begin -->
<style>
  button {
    color: #f9f871;
    background: #ff6f91;
    margin: 10px 20px;
  }
</style>
<button>Custom button 😍</button>
<!--Shadow-root end-->
```

```html
<button id="shadowButton">Default Button 🙄</button>
<button>Default Button 🙄</button>

<script>
  const shadowRoot = document
    .getElementById('shadowButton')
    .attachShadow({ mode: 'open' });
  shadowRoot.innerHTML = `
  <!--Shadow-root begin -->
    <style>
        button {
        color: #f9f871;
        background: #ff6f91;
        margin: 10px 20px;
        }
    </style>
    <button>Custom button 😍</button>
  <!--Shadow-root end-->`;
</script>
```

## But wait there´s more

- shadow root can include content from outer document (main DOM) using `<slot>`
