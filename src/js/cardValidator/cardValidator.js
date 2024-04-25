import { cartProperties } from './cardNumberObj';

export default class cardValidator {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  cardNumberValid() {
    const digits = this.cardNumber.split('').map(Number);
    let sum = 0;

    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      if (i % 2 === 0) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  determinantPaymentSystem() {
    return cartProperties[this.cardNumber.split('').map(Number)[0]].title.toLowerCase();
  }
}
