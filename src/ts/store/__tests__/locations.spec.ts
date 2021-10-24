import locationsInstance, { Locations } from '../locations';
import { formatDate } from '../../helpers/date';
import api from '../../services/apiService';

import Api from '../../services/__mocks__/apiService';

const countries = [{ code: 'RUS', name: 'Russia' }];
const cities = [{ country_code: 'RUS', name: 'Moscow', code: 'MS' }];
const airlines = [{ country_code: 'RUS', name: 'Airline', code: 'AVIA' }];

const mockedApiInstance = new Api({ url: '' });

describe('test the locations.ts store', () => {
  beforeEach(() => {
    locationsInstance.countries =
      locationsInstance.serializeCountries(countries);
    locationsInstance.cities = locationsInstance.serializeCities(cities);
    locationsInstance.airlines = locationsInstance.serializeAirlines(airlines);
  });

  it('Check that locationsInstance is the instance of the Locations class', () => {
    expect(locationsInstance).toBeInstanceOf(Locations);
  });

  it('Success the locations instance create', () => {
    const instance = new Locations(api, { formatDate });
    expect(instance.countries).toBe(null);
    expect(instance.shortCitiesList).toBe(null);
    expect(instance.api).toEqual(api);
    expect(instance.formatDate).toEqual(formatDate);
    expect(instance.airlines).toBe(null);
    expect(instance.cities).toBe(null);
  });

  it('Check that countries serialize is correct', () => {
    const res = locationsInstance.serializeCountries(countries);
    const expectedData = {
      RUS: { code: 'RUS', name: 'Russia' },
    };
    expect(res).toEqual(expectedData);
  });

  it('Check that cities serialize is correct', () => {
    const res = locationsInstance.serializeCities(cities);
    const expectedData = {
      MS: {
        country_code: 'RUS',
        name: 'Moscow',
        code: 'MS',
        country_name: 'Russia',
        full_name: 'Moscow, Russia',
      },
    };
    expect(res).toEqual(expectedData);
  });

  it('Check that airlines serialize is correct', () => {
    const res = locationsInstance.serializeAirlines(airlines);
    const expectedData = {
      AVIA: {
        country_code: 'RUS',
        name: 'Airline',
        code: 'AVIA',
        logo: 'http://pics.avs.io/200/200/AVIA.png',
      },
    };
    expect(res).toEqual(expectedData);
  });

  it('Check cities, countries, airlines serialize with incorrect data', () => {
    const resCities = locationsInstance.serializeCities(null);
    const resCountries = locationsInstance.serializeCountries(null);
    const resAirlines = locationsInstance.serializeAirlines(null);
    const expectedData = {};
    expect(resCities).toEqual(expectedData);
    expect(resCountries).toEqual(expectedData);
    expect(resAirlines).toEqual(expectedData);
  });

  it('Check correct get the city by code', () => {
    const res = locationsInstance.getCityNameByCode('MS');
    expect(res).toBe('Moscow');
  });

  it('Check correct get the city code by key', () => {
    const res = locationsInstance.getCityCodeByKey('Moscow, Russia');
    expect(res).toBe('MS');
  });

  it('Check correct get the airline name and logo by code', () => {
    const name = locationsInstance.getAirlineNameByCode('AVIA');
    const logo = locationsInstance.getAirlineLogoByCode('AVIA');
    expect(name).toBe('Airline');
    expect(logo).toBe('http://pics.avs.io/200/200/AVIA.png');
  });

  it('Check correct creating of the short cities list', () => {
    const res = locationsInstance.createShortCitiesList(
      locationsInstance.cities
    );
    const expected = { 'Moscow, Russia': null };
    expect(res).toEqual(expected);
  });

  it('Check correct the init method call', () => {
    const instance = new Locations(mockedApiInstance, { formatDate });
    expect(instance.init()).resolves.toEqual([countries, cities, airlines]);
  });
});
