export function ToursController(ToursService, CountriesService) {
  'ngInject';
  var tours = this;

  this.limitedText = limitedText;

  activate();

  function activate() {
    tours.all = ToursService.query();
  }

  function limitedText(tour) {
    return tour.text.split(' ').slice(0, 20).join(' ') + '…';
  }
}
