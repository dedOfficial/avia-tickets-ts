import api, { Api } from '../services/apiService';

class Locations {
  api: Api;
  countries: any;
  cities: any;

  constructor(api: Api) {
    this.api = api;
    this.countries = null;
    this.cities = null;
  }

  async init() {
    const res = await Promise.all([this.api.countries(), this.api.cities()]);

    const [countries, cities] = res;
    this.countries = countries;
    this.cities = cities;

    return res;
  }

  getCitiesByCountryCode(code: string) {
    return this.cities.filter(
      (city: { name: string; code: string; [k: string]: any }) =>
        city.country_code === code
    );
  }
}

const locations = new Locations(api);

export default locations;
