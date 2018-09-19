const hypernyms = {
  shape: ['circle', 'rectangle', 'triangle'],
  color: ['white', 'black', 'red', 'green', 'blue'],
  position: ['top', 'middle', 'bottom']
};

var fakeHypernymDict = {};

for(const hypernym in hypernyms) {
  for(const word of hypernyms[hypernym]){
    fakeHypernymDict[word] = hypernym;
  }
}

const FakeHypernym = {
  forWord: function(word) {
    return fakeHypernymDict[word];
  }
};

module.exports = FakeHypernym;
