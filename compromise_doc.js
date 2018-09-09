const nlp = require('compromise');

const CompromiseDoc = {
  toAst: function(sentence) {
    const doc = nlp(sentence);
    const verbTags = ['Infinitive', 'Verb'];

    const terms = doc.terms().data();
    const firstVerb = terms.find((t) => verbTags.indexOf(t.bestTag) !== -1);

    if(!firstVerb) {
      return {};
    }

    return {
      function: firstVerb.text,
      arguments: []
    };
  }
};

module.exports = CompromiseDoc;
