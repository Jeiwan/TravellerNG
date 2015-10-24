export function TourController($routeParams, ToursService) {
  'ngInject';
  var tour = this;

  activate();

  function activate() {
    tour.self = ToursService.get({objectId: $routeParams.id});
  }
}
