class AwesomeDropdown extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const template = document.getElementById('dropdownTemplate');
    shadowRoot.appendChild(template.cloneNode(true));
  }

  connectedCallback() {
    this.open = this.open;

    const templateInstance = this.shadowRoot
      .querySelector('#dropdownTemplate')
      .content.cloneNode(true);
    this.shadowRoot.appendChild(templateInstance);

    this.titleElementBox = this.shadowRoot.querySelector(
      '.magicDropdown__title'
    );
    this.titleText = this.shadowRoot.querySelector('.magicDropdownTitle__text');

    this.titleElementBox.addEventListener('click', () => {
      this.open = !this.open;
    });
    this.titleText.innerHTML = this.title;
  }

  get open() {
    return this.hasAttribute('open');
  }

  set open(bool) {
    if (bool) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  disconnectedCallback() {
    this.titleElementBox.removeEventListener('click');
  }
}

window.customElements.define('awesome-dropdown', AwesomeDropdown);
