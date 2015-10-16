export function CountriesController(CountriesService) {
  'ngInject';
  var countries = this;

  activate();

  function activate() {
    countries.all = CountriesService.read();
  }
}
