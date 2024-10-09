class CustomButton extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM
    this.attachShadow({ mode: 'open' });

    // Apply styles
    const style = document.createElement('style');
    style.textContent = `
      button {
        font-family: 'Inter', sans-serif;
        box-sizing: border-box; 
        width: 100%;
        padding: 8px 16px;
        font-size: 16px;
        border: none;
        border-radius: 12px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        width: ${this.getAttribute('width') || '100%'};
        max-width: ${this.getAttribute('max-width') || '100%'};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button svg {
        margin-right: 8px;
        width: 20px;
        height: 20px;
      }

      button.primary {
        color: #FFFFFF;
        background-color: #6B3C9B;
      }

      button.primary:hover {
        background-color: #844DBA;
      }

      button.primary:focus {
        background-color: #5B2F87;
      }

      button.secondary {
        color: #5B5C5E;
        background-color: #FFFFFF;
        border: 1px solid #BCBCBD;
      }

      button.secondary:hover {
        background-color: #E7E7E7;
        border: 1px solid #BCBCBD;
      }

      button.secondary:focus {
        background-color: #BDBDBD;
        border: 1px solid #BCBCBD;
      }

      button.icon {
        background-color: #FFFFFF; 
        color: #1B1C1E; 
        font-weight: 500;
      }
    `;

    const button = document.createElement('button');
    button.textContent = this.textContent;

    const variant = this.getAttribute('variant') || 'primary';
    button.classList.add(variant);

    const icon = this.getAttribute('icon');
    if (icon) {
      const iconElement = document.createElement('span');
      iconElement.innerHTML = icon;
      button.prepend(iconElement);
      button.classList.add('icon');
    }

    this.shadowRoot.append(style, button);
  }
}

customElements.define('custom-button', CustomButton);
