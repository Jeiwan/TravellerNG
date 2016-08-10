export function ToursController(ToursService) {
  'ngInject';
  var tours = this;

  activate();

  function activate() {
    tours.all = ToursService.query();
  }
}
