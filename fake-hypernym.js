const shapes = ['circle', 'rectangle', 'triangle'];
const colors = ['white', 'black', 'red', 'green', 'blue'];

const fakeHypernymDict = {
  circle: 'shape',
  rectangle: 'shape',
  triangle: 'shape',
  white: 'color',
  black: 'color',
  red: 'color',
  green: 'color',
  blue: 'color'
};

const FakeHypernym = {
  forWord: function(word) {
    return fakeHypernymDict[word];
  }
};

module.exports = FakeHypernym;
