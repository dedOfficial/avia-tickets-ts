import { format } from 'date-fns';

/**
 *
 * @param {String} str
 * @param {String} type
 * @returns {String}
 */
export function formatDate(time: string | number, type: string) {
  const date = new Date(time);
  return format(date, type);
}
