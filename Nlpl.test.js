const Nlpl = require('./nlpl');

describe('Nlpl#tokenize', () => {
  test('blank sentence returns an empty array of tokens', () => {
    expect(Nlpl.tokenize('')).toEqual([]);
  });

  test('sentence with a verb token', () => {
    expect(Nlpl.tokenize('draw')).toEqual([
      {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['Infinitive', 'PresentTense', 'Verb', 'VerbPhrase'],
        word: 'draw'
      }
    ]);
  });

  test('sentence with a verb and a noun', () => {
    expect(Nlpl.tokenize('draw circle')).toEqual([
      {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['Infinitive', 'PresentTense', 'Verb', 'VerbPhrase'],
        word: 'draw'
      },
      {
        hypernym: 'shape',
        normalized: 'circle',
        partOfSpeech: 'Singular',
        tags:  ['Noun', 'Singular'],
        word: 'circle'
      }
    ]);
  });
});
