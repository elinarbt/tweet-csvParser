const dateFnsParse = require('date-fns/parse');

/**
 * Parse string date.
 * @param {string} input
 * @returns {Date}
 */
const parseDate = (input) => {
  return dateFnsParse(input, 'yyyy-MM-dd HH:mm', new Date());
};

module.exports.parseDate = parseDate;
