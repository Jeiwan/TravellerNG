export function PlacesController(PlacesService) {
  'ngInject';
  var places = this;

  activate();

  function activate() {
    places.all = PlacesService.query();
  }
}
