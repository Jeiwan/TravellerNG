export function ToursController(ToursService) {
  'ngInject';
  var tours = this;

  this.limitedText = limitedText;
  this.showTour = showTour;
  this.editTout = editTour;
  this.tourIsShown = tourIsShown;
  this.tourIsEdited = tourIsEdited;

  activate();

  function activate() {
    tours.all = ToursService.query();
  }

  function limitedText(tour) {
    return tour.text.split(' ').slice(0, 20).join(' ') + '…';
  }

  function editTour(tour) {
    tour.state = 'edit';
  }

  function showTour(tour) {
    tour.state = 'show';
  }

  function tourIsShown(tour) {
    return typeof tour.state === 'undefined' || tour.state === 'show';
  }

  function tourIsEdited(tour) {
    return typeof tour.state !== 'undefined' && tour.state === 'edit';
  }
}
