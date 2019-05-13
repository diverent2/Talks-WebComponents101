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

window.customElements.define('our-component', ourComponent);
