class CustomInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.classList.add('custom-input-wrapper');

    const variant = this.getAttribute('variant') || 'text';
    const placeholder = this.getAttribute('placeholder') || '';

    // Create input element based on variant
    let inputElement;
    if (variant === 'text') {
      inputElement = document.createElement('input');
      inputElement.type = 'text';
      inputElement.placeholder = placeholder;
    } else if (variant === 'text-area') {
      inputElement = document.createElement('textarea');
      inputElement.placeholder = placeholder;
    } else if (variant === 'icon') {
      inputElement = document.createElement('div');
      inputElement.classList.add('icon-input');
      const icon = document.createElement('span');
      icon.innerHTML = `
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.9 20.975L13.325 14.4C12.825 14.8333 12.2417 15.1708 11.575 15.4125C10.9083 15.6541 10.2 15.775 9.45 15.775C7.65 15.775 6.125 15.15 4.875 13.9C3.625 12.65 3 11.1416 3 9.37498C3 7.60831 3.625 6.09998 4.875 4.84998C6.125 3.59998 7.64167 2.97498 9.425 2.97498C11.1917 2.97498 12.6958 3.59998 13.9375 4.84998C15.1792 6.09998 15.8 7.60831 15.8 9.37498C15.8 10.0916 15.6833 10.7833 15.45 11.45C15.2167 12.1166 14.8667 12.7416 14.4 13.325L21 19.875L19.9 20.975ZM9.425 14.275C10.775 14.275 11.925 13.7958 12.875 12.8375C13.825 11.8791 14.3 10.725 14.3 9.37498C14.3 8.02498 13.825 6.87081 12.875 5.91248C11.925 4.95414 10.775 4.47498 9.425 4.47498C8.05833 4.47498 6.89583 4.95414 5.9375 5.91248C4.97917 6.87081 4.5 8.02498 4.5 9.37498C4.5 10.725 4.97917 11.8791 5.9375 12.8375C6.89583 13.7958 8.05833 14.275 9.425 14.275Z" fill="#5B5C5E"/>
              </svg>`;
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = placeholder;
      inputElement.appendChild(icon);
      inputElement.appendChild(input);
    } else {
      console.warn('Nieobsługiwany wariant: ', variant);
    }

    wrapper.appendChild(inputElement);

    const style = document.createElement('style');
    style.textContent = `
          .custom-input-wrapper {
              height: 40px;
              padding: 8px 12px;
              display: flex;
              align-items: center;
              gap: 12px;
              border-radius: 12px 0 0 0;
              background-color: #EEEFF0;
              transition: background-color 0.3s ease;
          }

          .custom-input-wrapper:hover {
              background-color: #DCDEE0;
          }

          .custom-input-wrapper:focus-within {
              background-color: white;
          }

          input, textarea {
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
              background-color: transparent;
              font-size: 16px;
          }

          .icon-input {
              display: flex;
              align-items: center;
              gap: 8px;
          }

          .icon-input input {
              flex: 1;
          }

          span {
              font-size: 16px;
          }
      `;

    this.shadowRoot.append(style, wrapper);

    // // Reference to input element
    // this.inputElement = inputElement.querySelector('input') || inputElement.querySelector('textarea');

    // // Add event listener to input 
    // if (this.inputElement) {
    //   this.inputElement.addEventListener('input', () => {
    //     this.dispatchEvent(new CustomEvent('input', {
    //       detail: { value: this.value },
    //       bubbles: true,
    //       composed: true
    //     }));
    //   });
    // }

    console.log('inputElement:', this.inputElement);
  }
}

customElements.define('custom-input', CustomInput);
