class CurrencyUI {
  currency: HTMLInputElement;
  constructor() {
    this.currency = <HTMLInputElement>document.getElementById('currency');
  }

  get currencyValue() {
    return this.currency.value;
  }
}

const currencyUI = new CurrencyUI();

export default currencyUI;
