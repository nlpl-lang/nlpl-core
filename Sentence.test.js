const Sentence = require('./Sentence');

test('blank sentence returns an empty object', () => {
  expect(Sentence.toAst('')).toEqual({
    error: 'No verb in sentence'
  });
});

test('sentence returns verb as function name', () => {
  expect(Sentence.toAst('draw')).toEqual({
    function: 'draw',
    arguments: {}
  });
});

test('sentence returns noun as argument', () => {
  expect(Sentence.toAst('draw circle')).toEqual({
    function: 'draw',
    arguments: { shape: 'circle' }
  });
});

test('sentence returns non-verb words as arguments', () => {
  expect(Sentence.toAst('draw red circle')).toEqual({
    function: 'draw',
    arguments: { color: 'red', shape: 'circle' }
  });
});

test('sentence returns non-(verb, determiner, preposition) words as arguments', () => {
  expect(Sentence.toAst('draw a red circle in the middle')).toEqual({
    function: 'draw',
    arguments: { color: 'red', shape: 'circle', position: 'middle' }
  });
});
