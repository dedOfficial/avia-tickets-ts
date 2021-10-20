import '../css/style.css';
import './plugins';

import locations from './store/locations';
import formUI from './views/form';
import currencyUI from './views/currency';
import ticketsUI from './views/tickets';
import favoriteUI from './views/favoriteTickets';
import favorites from './store/favorite';

document.addEventListener('DOMContentLoaded', () => {
  initApp();
  const form = formUI.form;
  const ticketsContainer = <HTMLElement>ticketsUI.container;
  const favoriteContainer = <HTMLElement>favoriteUI.container;

  // Events
  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    onFormSubmit();
  });

  ticketsContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const t = <HTMLElement>e.target;
    if (t && t.matches('a.btn-small')) {
      const departure_at = t.getAttribute('data-departure-date');
      const ticket = locations.lastSearch.filter(
        (item: any) => item.departure_at === departure_at
      )[0];
      favorites.addTicketToFavorite(<never>ticket);
    }

    favoriteUI.renderTickets(favorites.tickets);
  });

  favoriteContainer.addEventListener('click', (e) => {
    e.preventDefault();
    const t = <HTMLElement>e.target;
    if (t && t.matches('a.btn-small')) {
      const departure_at = t.getAttribute('data-departure-date');
      const ticket = locations.lastSearch.filter(
        (item: any) => item.departure_at === departure_at
      )[0];
      favorites.removeTicketFromFavorite(ticket);
    }

    favoriteUI.renderTickets(favorites.tickets);
  });

  // Handlers
  async function initApp() {
    await locations.init();
    formUI.setAutocompleteData(locations.shortCitiesList);
  }

  async function onFormSubmit() {
    // собрать данные из инпутов
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currencyValue;
    // CODE, CODE, 2021-10, 2021-11
    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });
    ticketsUI.renderTickets(locations.lastSearch);
  }
});
