const Sentence = require('./sentence');

test('blank sentence returns an empty object', () => {
  expect(Sentence.toAst('')).toEqual({});
});

test('sentence returns verb as function name', () => {
  expect(Sentence.toAst('draw')).toEqual({
    function: 'draw',
    arguments: []
  });
});

test('sentence returns nouns as arguments', () => {
  expect(Sentence.toAst('draw circle')).toEqual({
    function: 'draw',
    arguments: ['circle']
  });
});
