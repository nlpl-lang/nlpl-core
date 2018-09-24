const Nlpl = require('./Nlpl');

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
        partOfSpeech: 'singular',
        tags:  ['Noun', 'Singular'],
        word: 'circle'
      }
    ]);
  });
});

describe('Nlpl#parse', () => {
  test('empty token array', () => {
    expect(Nlpl.parse([])).toEqual({ function: {}, arguments: {} });
  });

  test('token array with one verb', () => {
    expect(
      Nlpl.parse([{
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['tag1', 'tag2'],
        word: 'draw'
      }])
    ).toEqual({
      function: {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['tag1', 'tag2'],
        word: 'draw'
      },
      arguments: {}
    });
  });

  test('token array with verb and noun', () => {
    expect(
      Nlpl.parse([
        {
          normalized: 'draw',
          partOfSpeech: 'verb',
          tags: ['tag1', 'tag2'],
          word: 'draw'
        },
        {
          normalized: 'circle',
          hypernym: 'shape',
          partOfSpeech: 'singular',
          tags: ['tag1', 'tag2'],
          word: 'circle'
       }
      ])
    ).toEqual({
      function: {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['tag1', 'tag2'],
        word: 'draw'
      },
      arguments: {
        shape: {
          normalized: 'circle',
          hypernym: 'shape',
          partOfSpeech: 'singular',
          tags: ['tag1', 'tag2'],
          word: 'circle'
        }
      }
    });
  });
});
