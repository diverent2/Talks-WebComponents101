# HTML templates

`HTMLTemplateElement`

´<template>´

Allows to reserve snippet-like html template pieces.

## traits

- won´t be rendered until used.
- can be initated by a script.

## Examples

```html
<template id="textTemplate">
  <h2>show me something <i class="text"></i></h2>
</template>
<h2>Your well-known DOM content</h2>
```

will only render `Your well-known DOM content`

### insert into main DOM

```js
const txt_template = document.getElementById('textTemplate');

const singleTextInstance = document.importNode(txt_template.content, true);

txt_template.querySelector('.text').innerHTML = '✨magical✨';

document.appendChild(txt_template);
```

#### What happens

`document.importNode` creates a copy of a node without pasting it **while keeping the original template alive** making it reusable. (What we very much want!)

first param `txt_template.content`:

second param (deep) `true`: describes if the tree should include the full node-tree (all children) or just the selected one.

//default: `false`

can also be added to another document fragment `<template>`

## THIS IS HUGE!

One could create multiple _native_ templates using this API that handle the same data completely different.

So using the same service someone might be able to also create something completly different for some other context. (content structure)

Also no longer huge piles of template strings

```js
const html = `
<h2>Template in JS can be quite annoying</h2>
`;
```

## Gotcha

- will be added to the main DOM, so
  **no** scoping for css/js.
- can only be inserted using JS
- won´t be initialsed using document ready(?)
