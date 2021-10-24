import mockAxios from 'jest-mock-axios';

import api from '../apiService';
import config from '../../config/apiConfig';

const countries = [{ code: 'RUS', name: 'Russia' }];
const cities = [{ country_code: 'RUS', name: 'Moscow', code: 'MS' }];
const airlines = [{ country_code: 'RUS', name: 'Airline', code: 'AVIA' }];

const errMsg = 'Error';
const err = new Error(errMsg);

describe('Test Api Service', () => {
  it('Success fetch cities', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: cities });
    await expect(api.cities()).resolves.toEqual(cities);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${config.url}/cities`,
      undefined
    );
  });

  it('Fetch failure cities', async () => {
    mockAxios.get.mockRejectedValueOnce(err);
    await expect(api.cities()).rejects.toThrow(err);
  });

  it('Success fetch countries', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: countries });
    await expect(api.countries()).resolves.toEqual(countries);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${config.url}/countries`,
      undefined
    );
  });

  it('Fetch failure countrie', async () => {
    mockAxios.get.mockRejectedValueOnce(err);
    await expect(api.countries()).rejects.toThrow(err);
  });

  it('Success fetch airlines', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: airlines });
    await expect(api.airlines()).resolves.toEqual(airlines);
    expect(mockAxios.get).toHaveBeenCalledWith(
      `${config.url}/airlines`,
      undefined
    );
  });

  it('Fetch failure airlines', async () => {
    mockAxios.get.mockRejectedValueOnce(err);
    await expect(api.airlines()).rejects.toThrow(err);
  });
});
