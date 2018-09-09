const CompromiseDoc = require('./compromise_doc');

test('empty doc returns an empty object', () => {
  expect(CompromiseDoc.toAst({})).toEqual({});
});
