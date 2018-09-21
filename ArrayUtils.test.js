const ArrayUtils = require('./ArrayUtils');

test("empty array doesn't include element", () => {
  expect(ArrayUtils.include([], 'a')).toBe(false);
});

test("array that doesn't include element returns false", () => {
  expect(ArrayUtils.include(['a', 'b', 'c'], 'd')).toBe(false);
});

test("array that include element returns true", () => {
  expect(ArrayUtils.include(['a', 'b', 'c'], 'a')).toBe(true);
});

