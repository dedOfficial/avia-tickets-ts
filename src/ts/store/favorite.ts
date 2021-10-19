import currencyUI from '../views/currency';

class Favorite {
  tickets: any[] = [];
  container: any;
  getCurrencySymbol: any;

  constructor(currency: any) {
    this.container = document.getElementById('dropdown1');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency);
  }

  addTicketToFavorite(ticket: any) {
    if (!this.tickets.length) {
      this.tickets.push(ticket);
      return;
    }

    this.tickets = this.tickets.filter(
      (item) => JSON.stringify(item) !== JSON.stringify(ticket)
    );
    this.tickets.push(ticket);
    return;
  }

  removeTicketFromFavorite(ticket: any) {
    if (!this.tickets.length) {
      return;
    }

    this.tickets = this.tickets.filter(
      (item) => JSON.stringify(item) !== JSON.stringify(ticket)
    );
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  renderTickets(tickets: any) {
    this.clearContainer();

    let fragment = '';
    const currency = this.getCurrencySymbol();

    tickets.forEach((ticket: any) => {
      const template = Favorite.favoriteTicketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);
  }

  static favoriteTicketTemplate(ticket: any, currency: string) {
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
}

const favorites = new Favorite(currencyUI);

export default favorites;
