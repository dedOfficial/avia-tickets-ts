export class CurrencyUI {
  currency: HTMLInputElement;
  dictionary: { USD: string; EUR: string; [k: string]: string };
  constructor() {
    this.currency = <HTMLInputElement>document.getElementById('currency');
    this.dictionary = {
      USD: '$',
      EUR: '€',
    };
  }

  get currencyValue() {
    return this.currency.value;
  }

  getCurrencySymbol() {
    return this.dictionary[this.currencyValue];
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
