import { Api } from '../apiService';

export default class MockedApi extends Api {
  protected getData = () => Promise.resolve();

  countries = () => Promise.resolve([{ code: 'RUS', name: 'Russia' }]);

  cities = () =>
    Promise.resolve([{ country_code: 'RUS', name: 'Moscow', code: 'MS' }]);

  airlines = () =>
    Promise.resolve([{ country_code: 'RUS', name: 'Airline', code: 'AVIA' }]);

  prices = (params: any) => Promise.resolve();
}
