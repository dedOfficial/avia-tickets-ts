import {
  getAutocompleteInstance,
  getDatepickerInstance,
} from '../plugins/materialize';

class FormUI {
  private _form: any;
  origin: HTMLInputElement;
  destination: HTMLInputElement;
  depart: HTMLElement;
  return: HTMLElement;
  originAutocomplete: any;
  destinationAutocomplete: any;
  departDatepicker: any;
  returnDatepicker: any;

  constructor(autocompleteInstance: any, datepickerInstance: any) {
    this._form = document.forms['locationControls'];
    this.origin = <HTMLInputElement>(
      document.getElementById('autocomplete-origin')
    );
    this.destination = <HTMLInputElement>(
      document.getElementById('autocomplete-destination')
    );
    this.depart = <HTMLElement>document.getElementById('datepicker-depart');
    this.return = <HTMLElement>document.getElementById('datepicker-return');

    this.originAutocomplete = autocompleteInstance(this.origin);
    this.destinationAutocomplete = autocompleteInstance(this.destination);
    this.departDatepicker = datepickerInstance(this.depart);
    this.returnDatepicker = datepickerInstance(this.return);
  }

  get form() {
    return this._form;
  }

  get originValue() {
    return this.origin.value;
  }

  get destinationValue() {
    return this.destination.value;
  }

  get departDateValue() {
    return this.departDatepicker.toString();
  }

  get returnDateValue() {
    return this.returnDatepicker.toString();
  }

  setAutocompleteData(data: any) {
    this.originAutocomplete.updateData(data);
    this.destinationAutocomplete.updateData(data);
  }
}

const formUI = new FormUI(getAutocompleteInstance, getDatepickerInstance);

export default formUI;
