import { cartProperties } from '../cardValidator/cardNumberObj';
import cardValidator from '../cardValidator/cardValidator';

export default class RenderPage {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.cardImage = this.cardImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  static get submitSelector() {
    return '.submit';
  }

  static get inputSelector() {
    return '.input';
  }

  static get formElement() {
    return '.validate-number-form';
  }

  static get form() {
    return `
    <form class="validate-number-form">
      <div class="control">
        <input type="text" placeholder="Номер вашей карты" id="number-input" class="input">
        <button class="submit">Click to Validate</button>
      </div>
    </form>
    `;
  }

  cardImage() {
    const div = document.createElement('div');
    div.className = 'image-cards';
    for (const cart in cartProperties) {
      const childDiv = document.createElement('div');
      childDiv.className = cartProperties[cart].title.toLowerCase();
      childDiv.classList.add('inactive');
      const img = document.createElement('img');
      img.src = cartProperties[cart].imagePath;
      childDiv.insertAdjacentElement('afterbegin', img);
      div.insertAdjacentElement('beforeend', childDiv);
    }
    return div;
  }

  buildpage() {
    this.parentElement.insertAdjacentElement('afterbegin', this.cardImage());
    this.parentElement.insertAdjacentHTML('beforeend', RenderPage.form);
    this.formElement = this.parentElement.querySelector(RenderPage.formElement);
    this.formElement.addEventListener('submit', this.onSubmit);
  }

  onSubmit(e) {
    e.preventDefault();
    this.input = this.parentElement.querySelector(RenderPage.inputSelector);
    this.value = this.input.value;
    this.validator = new cardValidator(this.value);
    const imageCards = Array.from(this.parentElement.querySelector('.image-cards').children);
    if (this.validator.cardNumberValid()) {
      imageCards.forEach((element) => {
        if (!element.classList.contains('inactive')) {
          element.classList.add('inactive');
        }
        if (element.classList.contains(this.validator.determinantPaymentSystem())) {
          element.classList.remove('inactive');
        }
      });
    } else {
      document.forms[0].reset();
      imageCards.forEach((element) => {
        if (!element.classList.contains('inactive')) {
          element.classList.add('inactive');
        }
      });
      alert('Неправильно введен номер карты. Введите заново.');
    }
  }
}
