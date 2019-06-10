class AwesomeDropdown extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = document.getElementById('dropdownTemplate').content;
    shadowRoot.appendChild(template.cloneNode(true));

    this.titleElementBox = this.shadowRoot.querySelector(
      '.magicDropdown__title'
    );
    this.titleText = this.shadowRoot.querySelector('.magicDropdownTitle__text');
  }

  connectedCallback() {
    this.open = this.open;
    this.titleElementBox.addEventListener('click', () => {
      this.open = !this.open;
    });
    this.titleText.innerHTML = this.title;
  }

  get open() {
    console.log('get');
    return this.hasAttribute('open');
  }

  set open(bool) {
    if (bool) {
      this.setAttribute('open', '');
      console.log('add');
    } else {
      this.removeAttribute('open');
      console.log('remo');
    }
  }

  disconnectedCallback() {
    this.titleElementBox.removeEventListener('click');
  }
}

window.customElements.define('awesome-dropdown', AwesomeDropdown);
