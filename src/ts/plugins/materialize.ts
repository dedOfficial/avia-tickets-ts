import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';

// Init dropdown
const dropdowns = document.querySelectorAll('.dropdown-trigger');
M.Dropdown.init(dropdowns);

// Init select
const select = document.querySelectorAll('select');

M.FormSelect.init(select);

export function getSelectInstance(DOMelem: Element) {
  return M.FormSelect.getInstance(DOMelem);
}

// Init autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete, {
  data: {},
});

export function getAutocompleteInstance(DOMelem: Element) {
  return M.Autocomplete.getInstance(DOMelem);
}

// Init datepicker
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
  showClearBtn: true,
  format: 'yyyy-mm',
});

export function getDatepickerInstance(DOMelem: Element) {
  return M.Datepicker.getInstance(DOMelem);
}
