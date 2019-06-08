# WIP

## keep control over state

- state is kept on a per-componet basis.
- can be accesed via object properties.

- components need to be designed that way (need to know what to listen to, what format, etc.)

### from outside (extenally)

after component mount

```js
el.setAttribute;
```

### work together

```html
<funky-dial min="0" max="100" id="my-dial"></funky-dial>
<light-bulb value="100" listen-to="#my-dial"></light-bulb>
```

```js
const dial = document.getElementById('funky-dial');
const bulb = document.getElementById('light-bulb');

dial.addEventListener('some-dial-event', function(e) {
  bulb.setAttribute('value', e.detail.value);
});
```

### control children

- a Web-component wrapper can allow for state management over multiple dependend elements.
  --> can allow for child events `Inter-component messaging`

## attributes vs properties

- attribute value does not change on input
- property value does

> "In theory it would be possible to pass complex values to attributes by serializing them, but this could hurt performance and since you have access to the component’s methods you won’t need this. If you do however want to have databinding through attributes as provided by frameworks like React and Angular, you could have a look at Polymer."

### Attributes

- default values / initial state
- attributes are used to handle initial state of an element.

```html
<input value="default" />
```

### Properties

- used to access state

### Keeping them in sync

"Custom Elements don´t _need_ to update their attributes on interaction"

but it´s convinient to add it in some cases:

Reflect html property to attribute using a setter;

`<input name="name" disabled>`
will be toggled by
`document.querySelector('input').disabled = true;`

```js
set disabled(isDisabled) {
  if(isDisabled) {
    this.setAttribute('disabled', '');
  }
  else {
    this.removeAttribute('disabled');
  }
}

get disabled() {
  return this.hasAttribute('disabled');
}
```
