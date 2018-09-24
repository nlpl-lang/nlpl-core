const ArrayUtils = require('./ArrayUtils');
const nlp = require('compromise');
const hypernym = require('./FakeHypernym');

const Nlpl = {
  tokenize: function(sentence) {
    const doc = nlp(sentence);

    const terms = doc.terms().data();

    const tokens = terms.map(function(term) {
      if(ArrayUtils.include(['Verb', 'Infinitive'], term.bestTag)) {
        return {
          normalized: nlp(term.text).verbs().toInfinitive().out(),
          partOfSpeech: 'verb',
          tags: term.tags,
          word: term.text
        };
      }

      return {
        normalized: term.text,
        hypernym: hypernym.forWord(term.text),
        partOfSpeech: term.bestTag.toLowerCase(),
        tags: term.tags,
        word: term.text
      };
    });

    return tokens;
  },
  parse: function(tokens) {
    const ast = tokens.filter(
      (token) => !ArrayUtils.include(['determiner', 'preposition'], token.partOfSpeech)
    ).reduce(
      (acc, token) => {
        if(token.partOfSpeech === 'verb') {
          acc.function = token;
        }
        else {
          acc.arguments[hypernym.forWord(token.normalized)] = token;
        }

        return acc;
      },
      { function: {}, arguments: {} }
    );

    return ast;
  }
};

module.exports = Nlpl;
