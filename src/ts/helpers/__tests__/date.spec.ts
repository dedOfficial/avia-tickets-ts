import { formatDate } from '../date';

describe('date.ts', () => {
  it('Check format', () => {
    expect(formatDate(new Date().getTime(), 'yyyy')).toBe('2021');
  });
});
