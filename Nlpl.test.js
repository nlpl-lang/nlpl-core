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
        original: 'draw'
      }
    ]);
  });

  test('sentence with a verb and a noun', () => {
    expect(Nlpl.tokenize('draw circle')).toEqual([
      {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['Infinitive', 'PresentTense', 'Verb', 'VerbPhrase'],
        original: 'draw'
      },
      {
        hypernym: 'shape',
        normalized: 'circle',
        partOfSpeech: 'singular',
        tags:  ['Noun', 'Singular'],
        original: 'circle'
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
        original: 'draw'
      }])
    ).toEqual({
      function: {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['tag1', 'tag2'],
        original: 'draw'
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
          original: 'draw'
        },
        {
          normalized: 'circle',
          hypernym: 'shape',
          partOfSpeech: 'singular',
          tags: ['tag1', 'tag2'],
          original: 'circle'
       }
      ])
    ).toEqual({
      function: {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['tag1', 'tag2'],
        original: 'draw'
      },
      arguments: {
        shape: {
          normalized: 'circle',
          hypernym: 'shape',
          partOfSpeech: 'singular',
          tags: ['tag1', 'tag2'],
          original: 'circle'
        }
      }
    });
  });

  test('token array with verb, noun, determiner, preposition', () => {
    expect(
      Nlpl.parse([
        {
          normalized: 'draw',
          partOfSpeech: 'verb',
          tags: ['tag1', 'tag2'],
          original: 'draw'
        },
        {
          normalized: 'red',
          hypernym: 'color',
          partOfSpeech: 'adjective',
          tags: ['tag1', 'tag2'],
          original: 'red'
        },
        {
          normalized: 'circle',
          hypernym: 'shape',
          partOfSpeech: 'singular',
          tags: ['tag1', 'tag2'],
          original: 'circle'
        },
        {
          normalized: 'in',
          partOfSpeech: 'preposition',
          tags: ['tag1'],
          original: 'in'
        },
        {
          normalized: 'the',
          partOfSpeech: 'determiner',
          tags: ['tag1'],
          original: 'the'
        },
        {
          normalized: 'middle',
          hypernym: 'position',
          partOfSpeech: 'noun',
          tags: ['tag1'],
          original: 'middle'
        }
      ])
    ).toEqual({
      function: {
        normalized: 'draw',
        partOfSpeech: 'verb',
        tags: ['tag1', 'tag2'],
        original: 'draw'
      },
      arguments: {
        color: {
          normalized: 'red',
          hypernym: 'color',
          partOfSpeech: 'adjective',
          tags: ['tag1', 'tag2'],
          original: 'red'
        },
        shape: {
          normalized: 'circle',
          hypernym: 'shape',
          partOfSpeech: 'singular',
          tags: ['tag1', 'tag2'],
          original: 'circle'
        },
        position: {
          normalized: 'middle',
          hypernym: 'position',
          partOfSpeech: 'noun',
          tags: ['tag1'],
          original: 'middle'
        }
      }
    });
  });
});
