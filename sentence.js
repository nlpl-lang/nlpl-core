const nlp = require('compromise');
const hypernym = require('./fake-hypernym');

const Sentence = {
  toAst: function(sentence) {
    const doc = nlp(sentence);

    const verb = doc.verbs().toInfinitive().out();

    if(verb === '') {
      return { error: 'No verb in sentence' };
    }

    var sentence_arguments = {};
    var words = doc.not('#Verb').terms().out('array');

    words.forEach(w => sentence_arguments[hypernym.forWord(w)] = w);

    return {
      function: verb,
      arguments: sentence_arguments
    };
  }
};

module.exports = Sentence;
