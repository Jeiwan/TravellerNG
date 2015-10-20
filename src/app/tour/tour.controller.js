export function TourController($routeParams, ToursService) {
  'ngInject';
  var tour = this;

  this.countryFor = ToursService.countryFor;

  activate();

  function activate() {
    tour.self = ToursService.read().find((tour) => tour.id === parseInt($routeParams.id, 10));
  }
}
