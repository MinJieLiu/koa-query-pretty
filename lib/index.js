'use strict';

// Regex
const regex = {
  integer: /^-?\d+$/,
  decimal: /^-?\d*\.?\d+$/,
  boolean: /^(true|false)$/,
};

/**
 * Format value
 * @param value
 * @return {*}
 */
const parseValue = (value) => {
  if (regex.integer.test(value)) {
    return parseInt(value, 10);
  } else if (regex.decimal.test(value)) {
    return parseFloat(value);
  } else if (regex.boolean.test(value)) {
    return value === 'true';
  }
  return value;
};

/**
 * Pretty query middleware for koa
 */
module.exports = ({ override = true } = {}) => async (ctx, next) => {
  const query = ctx.query;
  const result = {};
  // Transform
  Object.keys(query).filter(n => n).forEach((key) => {
    const value = query[key];
    result[key] = Array.isArray(value) ? value.map(n => parseValue(n)) : parseValue(value);
  });
  // Assign
  if (override) {
    Object.assign(ctx.query, result);
  } else {
    ctx.prettyQuery = result;
  }
  await next();
};
