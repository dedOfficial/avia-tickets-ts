import axios from 'axios';
import config, { TConfig } from '../config/apiConfig';

type THeaders = {
  [key: string]: string;
};

// type TData = {
//   data: [{ [k: string]: any }];
//   status: number;
//   statusText: string;
//   headers: THeaders;
//   config: { url: string; method: string; headers: THeaders };
//   request: { [k: string]: any };
// };

// type TData = [{ [k: string]: any }];

interface IAviaTickets {
  countries(): Promise<unknown>;
  cities(): Promise<unknown>;
  prices(params: any): void;
  airlines(): Promise<unknown>;
}

/**
 * /countries -> array of countries
 * /cities -> array of cities
 * /prices/cheap -> array of accessible flights
 */
export class Api implements IAviaTickets {
  private url: string;

  constructor(config: TConfig) {
    this.url = config.url;
  }

  protected async getData(url: string, params?: any) {
    try {
      const response = await axios.get(url, params);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async countries() {
    return await this.getData(`${this.url}/countries`);
  }

  async cities() {
    return await this.getData(`${this.url}/cities`);
  }

  async prices(params: any) {
    return await this.getData(`${this.url}/prices/cheap`, { params });
  }

  async airlines() {
    return await this.getData(`${this.url}/airlines`);
  }
}

const api = new Api(config);

export default api;
