const nlp = require('compromise');

const Sentence = {
  toAst: function(sentence) {
    const doc = nlp(sentence);

    const verbs = doc.verbs().data();

    if(verbs.length === 0) {
      return {};
    }

    return {
      function: verbs[0].conjugations.Infinitive,
      arguments: []
    };
  }
};

module.exports = Sentence;
