# Shadow DOM

- encapsulated version of the DOM
- everything inside the document scope is called `light DOM`
- everything inside a shadow root

## traits

- allows to isolate DOM fragments
- incl. CSS **and** css selectors
- encapsulation:
  > like an <iframe> where the content is cut off from the rest of the document; however, when we create a shadow root, we still have total control over that part of our page, but scoped to a context.

## selector scoping

light DOM selector works as usual:
`document.querySelector('selector')`
will return DOM element `selector`

`shadowRoot.querySelector('selector')` will return shadowDOM element `selector`

however shadow root children can´t be selected from document scope: `shadowRoot.querySelector('selector-inside-shadowdom')` will return `selector element.`(parent)

> "For example, If we have a shadow root with a `<button>` inside of it, calling shadowRoot.querySelector('button') would return our button, but no invocation of the document’s query selector will return that element because it belongs to a different DocumentOrShadowRoot instance."

Reason: they belong to a different `DocumentOrShadowRoot` instance.

## old example

### iframe

ok no.

### Dropdown menu

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
