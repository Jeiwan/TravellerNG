export function HotelsController(HotelsService) {
  'ngInject';
  var hotels = this;

  this.ratingStars = ratingStars;
  this.starsArray = starsArray;

  activate();

  function activate() {
    hotels.all = HotelsService.query();
  }

  function ratingStars(n) {
    return 'glyphicon-star' + (n == 0 ? '-empty' : '');
  }

  function starsArray(hotel) {
    var array = [];

    for (var i = 0; i < 5; i++) {
      if (i < hotel.stars) {
        array.push(1);
      } else {
        array.push(0);
      }
    }

    return array;
  }
}
