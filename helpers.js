const { truncateFieldName } = require('./services');

/**
 * Helper 
 * @name ExpressionAttributeNames
 * changes the obj to add to it ExpressionAttributeNames object
 * @param {object} obj
 * @param {string} field
 */
const ExpressionAttributeNames = (obj, field) => {
  if( !obj.ExpressionAttributeNames ) obj.ExpressionAttributeNames = {};
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

const ExpressionAttributeValues = (obj, field, value) =>{
  if( !obj.ExpressionAttributeValues ) obj.ExpressionAttributeValues = {};
  obj.ExpressionAttributeValues[`:${truncateFieldName(field)}`] = value;
};

/**
 * Helper 
 * @name FilterExpression
 * changes the obj to add to it FilterExpression string 
 * @param {object} obj
 * @param {string} operator
 * @param {eny} value
 */

const FilterExpression = (obj, operator, field) => {
  if (!obj.FilterExpression ) obj.FilterExpression =`#${field} ${operator} :${truncateFieldName(field)} `
  else obj.FilterExpression += `AND #${field} ${operator} :${truncateFieldName(field)} `;
}

module.exports = {
  ExpressionAttributeNames,
  ExpressionAttributeValues,
  FilterExpression,
}
