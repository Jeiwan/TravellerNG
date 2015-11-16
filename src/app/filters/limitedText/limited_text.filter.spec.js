describe('LimitedTextFilter', () => {
  var LimitedTextFilter, inputText;

  beforeEach(() => {
    window.module('TravellerNG');

    inject(($filter) => {
      LimitedTextFilter = $filter('limitedText');
    });

    inputText = [];
    for(var i = 0; i < 30; i++) {
      inputText.push('hello');
    }
    inputText = inputText.join(' ');
  });

  describe('when wordsNum is not provided', () => {
    it('returns 20 words of input text', () => {
      expect(LimitedTextFilter(inputText).split(' ').length).toEqual(20);
    });
  });

  describe('when wordsNum is provided', () => {
    it('returns specified number of words of input text', () => {

      expect(LimitedTextFilter(inputText, 10).split(' ').length).toEqual(10);
    });
  });
});
