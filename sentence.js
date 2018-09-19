const nlp = require('compromise');

const Sentence = {
  toAst: function(sentence) {
    const doc = nlp(sentence);

    const verb = doc.verbs().toInfinitive().out();

    if(verb === '') {
      return {};
    }

    var sentence_arguments = doc.not('#Verb').terms().out('array');

    return {
      function: verb,
      arguments: sentence_arguments
    };
  }
};

module.exports = Sentence;
