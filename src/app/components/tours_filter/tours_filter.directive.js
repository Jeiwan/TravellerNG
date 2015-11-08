export function ToursFilter(ToursService, CountriesService, HotelsService) {
  'ngInject';
  function controller() {
    var toursFilter = this;

    this.countryFilter = null;
    this.placeFilter = null;
    this.hotelFilter = null;

    this.filter = filter;
    this.filterApplied = filterApplied;
    this.resetFilters = resetFilters;
    this.availableCountries = availableCountries;
    this.availablePlaces = availablePlaces;
    this.availableHotels = availableHotels;

    activate();

    function activate() {
      toursFilter.all = ToursService.query();
    }

    function filter(value, index, array) {
      return (toursFilter.countryFilter === null || value.country.name == toursFilter.countryFilter) &&
        (toursFilter.placeFilter === null || value.place.name === toursFilter.placeFilter) &&
        (toursFilter.hotelFilter === null || value.hotel.title === toursFilter.hotelFilter);
    }

    function filterApplied() {
      return toursFilter.countryFilter !== null || toursFilter.placeFilter !== null || toursFilter.hotelFilter !== null;
    }

    function resetFilters() {
      toursFilter.countryFilter = null;
      toursFilter.placeFilter = null;
      toursFilter.hotelFilter = null;
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
      var tours = toursFilter.all;

      if (toursFilter.countryFilter !== null) {
        tours = tours.filter(tour => tour.country.name === toursFilter.countryFilter);
      }

      var places = tours.map(tour => {
        return tour.place.name;
      });

      function uniques(value, index, self) {
        return self.indexOf(value) === index;
      }

      return places.filter(uniques);
    }

    function availableHotels() {
      var tours = toursFilter.all,
          hotels;

      if (toursFilter.countryFilter !== null) {
        tours = tours.filter(tour => tour.country.name === toursFilter.countryFilter);
      }

      if (toursFilter.placeFilter !== null) {
        tours = tours.filter(tour => tour.place.name === toursFilter.placeFilter);
      }

      hotels = tours.map(tour => tour.hotel.title);

      function uniques(value, index, self) {
        return self.indexOf(value) === index;
      }

      return hotels.filter(uniques);
    }
  }

  return {
    restrict: 'E',
    controller: controller,
    controllerAs: 'toursFilter',
    templateUrl: 'app/components/tours_filter/tours_filter.html'
  };
}
