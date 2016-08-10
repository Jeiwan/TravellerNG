export function StarsFilter($sce) {
  'ngInject';

  return function(input, maxStars = 5) {
    input = parseInt(input, 10);

    var fullStarClass = 'glyphicon-star',
        emptyStarClass = fullStarClass + '-empty',
        starsArray = [];

    for (var i = 0; i < maxStars; i++) {
      if (i < input) {
        starsArray.push(1);
      } else {
        starsArray.push(0);
      }
    }

    var stars = starsArray.map(s => {
      var starClass = s === 1 ? fullStarClass : emptyStarClass;
      return '<span data-star="' + (s === 1 ? 'full' : 'empty') + '" class="rating-star glyphicon ' + starClass + '"></span>';
    });

    return $sce.trustAsHtml(stars.join(''));
  };
}
