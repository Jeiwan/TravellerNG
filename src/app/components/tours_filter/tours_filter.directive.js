export function ToursFilter(ToursService, CountriesService) {
  'ngInject';
  function controller() {
    var toursFilter = this;

    this.countryFilter = null;
    this.placeFilter = null;

    this.filter = filter;
    this.filterApplied = filterApplied;
    this.resetFilters = resetFilters;
    this.availableCountries = availableCountries;
    this.availablePlaces = availablePlaces;

    activate();

    function activate() {
      toursFilter.all = ToursService.query();
    }

    function filter(value, index, array) {
      return (toursFilter.countryFilter === null || value.country.name == toursFilter.countryFilter) &&
        (toursFilter.placeFilter === null || value.place.name === toursFilter.placeFilter);
    }

    function filterApplied() {
      return toursFilter.countryFilter !== null || toursFilter.placeFilter !== null;
    }

    function resetFilters() {
      toursFilter.countryFilter = null;
      toursFilter.placeFilter = null;
    }

    function availableCountries() {
      var countries = toursFilter.all.map(tour => {
        return tour.country.name;
      });

      function uniques(value, index, self) {
        return self.indexOf(value) === index;
      }

      return countries.filter(uniques);
    }

    function availablePlaces() {
      var places = toursFilter.all.map(tour => {
        return tour.place.name;
      });

      function uniques(value, index, self) {
        return self.indexOf(value) === index;
      }

      return places.filter(uniques);
    }
  }

  return {
    restrict: 'E',
    controller: controller,
    controllerAs: 'toursFilter',
    templateUrl: 'app/components/tours_filter/tours_filter.html'
  };
}
