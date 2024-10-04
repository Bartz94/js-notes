class CustomTypography extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['font-weight', 'font-size', 'color'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.updateStyles();
  }

  updateStyles() {
    const fontWeight = this.getAttribute('font-weight') || '400';
    const fontSize = this.getAttribute('font-size') || '14px';
    const color = this.getAttribute('color') || '#1B1C1E';

    this.shadowRoot.innerHTML = `
        <style>
          p {
            font-weight: ${fontWeight};
            font-size: ${fontSize};
            margin: 0;
            color: ${color};
          }
        </style>
        <p><slot></slot></p>
      `;
  }

  connectedCallback() {
    this.updateStyles();
  }
}

customElements.define('custom-typography', CustomTypography);
