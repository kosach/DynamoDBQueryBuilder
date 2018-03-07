const { truncateFieldName } = require('./services');

/**
 * Helper
 * @name ExpressionAttributeNames
 * changes the obj to add to it ExpressionAttributeNames object
 * @param {object} obj
 * @param {string} field
 */
const ExpressionAttributeNames = (obj, field) => {
  if (!obj.ExpressionAttributeNames) obj.ExpressionAttributeNames = {};
  obj.ExpressionAttributeNames[`#${truncateFieldName(field)}`] = truncateFieldName(field);
};

/**
 * Helper
 * @name ExpressionAttributeValues
 * changes the obj to add to it ExpressionAttributeValues object
 * @param {object} obj
 * @param {string} field
 * @param {eny} value
 */

const ExpressionAttributeValues = (obj, field, value) => {
  if (!obj.ExpressionAttributeValues) obj.ExpressionAttributeValues = {};
  obj.ExpressionAttributeValues[`:${truncateFieldName(field)}`] = value;
};

/**
 * Helper
 * @name FilterExpression
 * changes the obj to add to it FilterExpression string
 * @param {object} obj
 * @param {string} operator
 * @param {string} field
 * @param {eny} value
 */

const compare = (obj, operator, field, value) => {
  ExpressionAttributeNames(obj, field);
  ExpressionAttributeValues(obj, field, value);
  if (!obj.FilterExpression) obj.FilterExpression = `#${field} ${operator} :${truncateFieldName(field)} `;
  else obj.FilterExpression += `AND #${field} ${operator} :${truncateFieldName(field)} `;
};

const between = (obj, field, since, until) => {
  ExpressionAttributeNames(obj, `${field}1`);
  ExpressionAttributeNames(obj, `${field}2`);
  ExpressionAttributeValues(obj, `${field}1`, since);
  ExpressionAttributeValues(obj, `${field}12`, until);
  if (!obj.FilterExpression) obj.FilterExpression = `#${field} between :${field}1 and :${field}2 `;
  else obj.FilterExpression += `AND #${field} between :${field}1 and :${field}2 `;
};

module.exports = {
  compare,
  between
};
