const Sentence = require('./sentence');

test('blank sentence returns an empty object', () => {
  expect(Sentence.toAst('')).toEqual({});
});

test('verb sentence returns ast', () => {
  expect(Sentence.toAst('draw')).toEqual({
    function: 'draw',
    arguments: []
  });
});
