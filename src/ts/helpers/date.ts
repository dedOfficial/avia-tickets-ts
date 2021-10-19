import { format } from 'date-fns';

/**
 *
 * @param {String} str
 * @param {String} type
 * @returns {String}
 */
export function formatDate(str: string, type: string) {
  const date = new Date(str);
  return format(date, type);
}
