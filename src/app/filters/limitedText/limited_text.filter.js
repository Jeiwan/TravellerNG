export function LimitedTextFilter() {
  return function(input, wordsNum = 20) {
    return input.split(' ').slice(0, wordsNum).join(' ') + '…';
  };
}
