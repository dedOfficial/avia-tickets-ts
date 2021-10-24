import api, { Api } from '../services/apiService';
import { formatDate } from '../helpers/date';

class Locations {
  api: Api;
  countries: any;
  cities: any;
  shortCitiesList: any;
  airlines: any;
  lastSearch: any;
  formatDate: Function;

  constructor(api: Api, helpers: { formatDate: Function }) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
    this.airlines = null;
    this.formatDate = helpers.formatDate;
  }

  async init() {
    const res = await Promise.all([
      this.api.countries(),
      this.api.cities(),
      this.api.airlines(),
    ]);

    const [countries, cities, airlines] = res;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);
    this.airlines = this.serializeAirlines(airlines);
    console.log(this.airlines);

    return res;
  }

  getCityCodeByKey(key: string) {
    const city: any = Object.values(this.cities).find(
      (item: any) => item.full_name === key
    );
    return city.code;
  }

  getCityNameByCode(code: string) {
    return this.cities[code].name;
  }

  getAirlineNameByCode(code: string) {
    return this.airlines[code] ? this.airlines[code].name : '';
  }

  getAirlineLogoByCode(code: string) {
    return this.airlines[code] ? this.airlines[code].logo : '';
  }

  createShortCitiesList(cities: any) {
    return Object.entries(cities).reduce(
      (acc: { [k: string]: null }, [, city]: any) => {
        acc[city.full_name] = null;
        return acc;
      },
      {}
    );
  }

  serializeAirlines(airlines: any) {
    return airlines.reduce(
      (acc: { [k: string]: any }, item: { code: string; [k: string]: any }) => {
        item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
        item.name = item.name || item.name_translations.en;
        acc[item.code] = item;
        return acc;
      },
      {}
    );
  }

  serializeCountries(countries: any) {
    // { 'Country code': { ... } }

    return countries.reduce(
      (
        acc: { [k: string]: any },
        country: { code: string; [k: string]: any }
      ) => {
        acc[country.code] = country;
        return acc;
      },
      {}
    );
  }

  serializeCities(cities: any) {
    // { 'City name, Country name': null }
    return cities.reduce(
      (acc: { [k: string]: any }, city: { name: string; [k: string]: any }) => {
        const country_name = this.getCountryNameByCityCode(city.country_code);
        const cityName = city.name || city.name_translations.en;
        const full_name = `${cityName}, ${country_name}`;
        acc[city.code] = {
          ...city,
          country_name,
          full_name,
        };
        return acc;
      },
      {}
    );
  }

  getCountryNameByCityCode(code: string) {
    return this.countries[code].name;
  }

  async fetchTickets(params: any) {
    const response: any = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
    console.log(this.lastSearch);
  }

  serializeTickets(tickets: any) {
    return Object.values(tickets).map((ticket: any) => {
      return {
        ...ticket,
        origin_name: this.getCityNameByCode(ticket.origin),
        destination_name: this.getCityNameByCode(ticket.destination),
        airline_logo: this.getAirlineLogoByCode(ticket.airline),
        airline_name: this.getAirlineNameByCode(ticket.airline),
        departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
        return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
      };
    });
  }
}

const locations = new Locations(api, { formatDate });

export default locations;
