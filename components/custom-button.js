class CustomButton extends HTMLElement {
  constructor() {
    super();

    // Create shadow DOM
    this.attachShadow({ mode: 'open' });

    // Apply styles
    const style = document.createElement('style');
    style.textContent = `
        button {
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          width: ${this.getAttribute('width') || '100%'}; 
          width: ${this.getAttribute('max-width') || '100%'};
          margin: 0 auto;
        }

        button.primary {
          color: #FFFFFF; 
          background-color: #6B3C9B;
          font-weight: 500;
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
      `;

    // Create button
    const button = document.createElement('button');
    button.textContent = this.textContent;
    const variant = this.getAttribute('variant') || 'primary';
    button.classList.add(variant);

    this.shadowRoot.append(style, button);
  }
}

customElements.define('custom-button', CustomButton);
