export function HotelsController(HotelsService) {
  'ngInject';
  var hotels = this;

  this.ratingStars = ratingStars;

  activate();

  function activate() {
    hotels.all = HotelsService.query();
  }

  function ratingStars(n) {
    return 'glyphicon-star' + (n == 0 ? '-empty' : '');
  }
}
