// TODO plan:
// Get API method
// *ProjectionExpression
// *ConsistentRead
// *ReturnConsumedCapacity

// TODO create catch method for all errors;

const { operators } = require('./parameters');
const { compare, between } = require('./helpers');
const _params = {};
class QueryBuilder {
  constructor (TableName, Method, Key) {
    if (!TableName) throw 'Table property is required'; // eslint-disable-line
    if (!Method) throw 'Method property is required'; // eslint-disable-line
    Object.assign(_params, { TableName });
    // this parameter will be used for result validation
    this.method = undefined;
  }
  /** @method
  * @name get
  *
  * @param {(string|integer)} Key - Set method and required parameters for Get API method
  * */
  get (Key) {
    if (!Key) return console.log('Key is required field');
    this.method = 'get';
    Object.assign(_params, { Key });
    return this;
  }
  /** @method
  * @name query
  *
  *  Set method and required parameters for Query API method
  * */
  query () {
    this.method = 'query';
    return this;
  }

  /** @method
  * @name select
  *
  * @param {(string|string[])} params - Some select param or array of select params
  * */
  select (params) {
    // TODO add array elements validation
    if (typeof params === 'string' || Array.isArray(params)) {
      if (_params.AttributesToGet) {
        console.log('concat', params);
        _params.AttributesToGet = _params.AttributesToGet.concat(params);
      } else {
        Object.assign(_params, {
          AttributesToGet: params
        });
      }
    } else console.error(`Wrong params - ${params}. It's required and it's must be array or string`);
    return this;
  }

  /** @method
  * @name where
  *
  * @param {string} field - Name of the field
  * @param {string} operator - One of operators '=','<','<=','>','>='
  * @param {eny} value - Field value
  * */
  where (field, operator, value) {
    // TODO Add logical operators AND or OR
    if (typeof field !== 'string' ||
      !operators.includes(operator) ||
      !value) return console.log('Wrong parameters');

    compare(_params, operator, field, value);
    return this;
  }

  /** @method
  * @name between
  *
  * @param {string} field - Start of selection
  * @param {string} since - Start of selection
  * @param {string} until - End of selection
  * */
  between (field, since, until) {
    if (!since && until) return console.log('Wrong parameters');
    between(_params, field, since, until);
    return this;
  }
  getQuery () {
    if (!this.method) return console.log('You must used one from methods ( get(), query() ) before getting query string');
    if (this.method === 'get') {
      if (!_params.Key) {
        return console.log('Key is required!');
      }
    }
    return _params;
  }
}

// Test example
const test = new QueryBuilder('worldview_services', 'query');
const query = test
  .where('test1[0]', '=', 'test111')
  .query('Key')
  .where('HCservice', '=', 'datadog')
  .between('test', 1, 5)
  .getQuery();
console.log(query);
