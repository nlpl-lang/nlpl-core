const CompromiseDoc = require('./compromise_doc');

test('blank sentence returns an empty object', () => {
  expect(CompromiseDoc.toAst('')).toEqual({});
});

test('verb sentence returns ast', () => {
  expect(CompromiseDoc.toAst('draw')).toEqual({
    function: 'draw',
    arguments: []
  });
});
