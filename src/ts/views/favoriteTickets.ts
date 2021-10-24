import { TicketsUI } from './tickets';
import currencyUI, { CurrencyUI } from '../views/currency';

class FavoriteUI extends TicketsUI {
  constructor(currency: CurrencyUI) {
    super(currency);
    this.container = document.getElementById('dropdown1');
  }

  protected ticketTemplate(ticket: any, currency: string) {
    return `
      <div class="favorite-item  d-flex align-items-start">
        <img
          src="${ticket.airline_logo}"
          class="favorite-item-airline-img"
        />
        <div class="favorite-item-info d-flex flex-column">
          <div
            class="favorite-item-destination d-flex align-items-center"
          >
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${ticket.origin_name} </span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${ticket.destination_name}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${ticket.departure_at}</span>
            <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: 1</span>
            <span class="ticket-flight-number">Номер рейса: 26</span>
          </div>
          <a
            class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto"
            data-departure-date="${ticket.departure_at}"
            >Delete</a
          >
        </div>
      </div>
    `;
  }

  showEmptyMessage() {
    return;
  }
}

const favoriteUI = new FavoriteUI(currencyUI);

export default favoriteUI;
