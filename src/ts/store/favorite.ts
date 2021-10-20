interface IFavorite {
  tickets: any[];
  addTicketToFavorite(ticket: any): void;
  removeTicketFromFavorite(ticket: any): void;
}

class Favorite implements IFavorite {
  tickets: any[] = [];

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
}

const favorites = new Favorite();

export default favorites;
