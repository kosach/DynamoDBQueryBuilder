const { between } = require('./helpers');

const example = {
  TableName: 'testTable',
  ExpressionAttributeNames: { '#test1': 'test1', '#test2': 'test2' },
  ExpressionAttributeValues: { ':test1': 1, ':test12': 5 },
  FilterExpression: '#test between :test1 and :test2 '
};
describe('Helpers', () => {
  describe('between', () => {
    const baseObj = {
      TableName: 'testTable'
    };
    it('Modify object ', () => {
      between(baseObj, 'test', 1, 5);
      expect(JSON.stringify(example) === JSON.stringify(baseObj)).toBe(true);
    });
  });
});
