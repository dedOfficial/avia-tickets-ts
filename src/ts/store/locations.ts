import api, { Api } from '../services/apiService';

class Locations {
  api: Api;
  countries: any;
  cities: any;
  shortCitiesList: any;

  constructor(api: Api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
    this.shortCitiesList = null;
  }

  async init() {
    const res = await Promise.all([this.api.countries(), this.api.cities()]);

    const [countries, cities] = res;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCitiesList = this.createShortCitiesList(this.cities);

    return res;
  }

  getCityCodeByKey(key: string) {
    return this.cities[key].code;
  }

  createShortCitiesList(cities: any) {
    return Object.entries(cities).reduce(
      (acc: { [k: string]: null }, [key]) => {
        acc[key] = null;
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
        const countryName = this.getCountryNameByCityCode(city.country_code);
        const cityName = city.name || city.name_translations.en;
        const key = `${cityName},${countryName}`;
        acc[key] = city;
        return acc;
      },
      {}
    );
  }

  getCountryNameByCityCode(code: string) {
    return this.countries[code].name;
  }

  async fetchTickets(params: any) {
    const response = await this.api.prices(params);
    console.log(response);
  }
}

const locations = new Locations(api);

export default locations;
