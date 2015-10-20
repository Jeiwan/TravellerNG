export function ToursController(ToursService, CountriesService) {
  'ngInject';
  var tours = this;

  this.countries = CountriesService.read();

  this.newFormVisible = false;
  this.new_ = ToursService.newTour();
  this.edited = ToursService.newTour();
  this.countryFilter = null;

  this.countryFor = ToursService.countryFor;
  this.filterByCountry = filterByCountry;
  this.countryFilterApplied = countryFilterApplied;
  this.resetCountryFilter = resetCountryFilter;
  this.limitedText = limitedText;

  activate();

  function activate() {
    tours.all = ToursService.read();
  }

  // Фильтрация туров по стране
  function filterByCountry(value, index, array) {
    return tours.countryFilter === null || value.countryId == parseInt(tours.countryFilter, 10);
  }

  function countryFilterApplied() {
    return tours.countryFilter !== null;
  }

  function resetCountryFilter() {
    tours.countryFilter = null;

    return true;
  }

  function limitedText(tour) {
    return tour.text.split(' ').slice(0, 20).join(' ') + '…';
  }
}
