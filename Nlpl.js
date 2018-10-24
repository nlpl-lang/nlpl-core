const ArrayUtils = require('./ArrayUtils');
const nlp = require('compromise');
const hypernym = require('./FakeHypernym');

const Stdlib = {
  eval: function(ast) {
    const div = document.createElement('div');
    div.style.backgroundColor = ast.arguments.color.normalized;

    div.style.height = '100px';
    div.style.width = '100px';

    if(ast.arguments.shape.normalized === 'circle') {
      div.style.borderRadius = '50%';
    }

    return div;
  }
};

const Nlpl = {
  eval: function(ast) {
    return Stdlib.eval(ast);
  },
  tokenize: function(sentence) {
    const doc = nlp(sentence);

    const terms = doc.terms().data();

    const tokens = terms.map(function(term) {
      if(ArrayUtils.include(['Verb', 'Infinitive'], term.bestTag)) {
        return {
          normalized: nlp(term.text).verbs().toInfinitive().out(),
          partOfSpeech: 'verb',
          tags: term.tags,
          original: term.text
        };
      }

      return {
        normalized: term.text,
        hypernym: hypernym.forWord(term.text),
        partOfSpeech: term.bestTag.toLowerCase(),
        tags: term.tags,
        original: term.text
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
