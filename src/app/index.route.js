export function routerConfig ($routeProvider, $locationProvider) {
  'ngInject';
  var resolve = {
    currentUser: function(AuthService) {
      'ngInject';
      return AuthService.currentUser();
    }
  };

  $routeProvider
    .when('/', {
      templateUrl: 'app/tours/tours.html',
      controller: 'ToursController',
      controllerAs: 'tours',
      resolve: resolve
    })
    .when('/tours/:id', {
      templateUrl: 'app/tour/tour.html',
      controller: 'TourController',
      controllerAs: 'tour',
      resolve: resolve
    })
    .when('/countries', {
      templateUrl: 'app/countries/countries.html',
      controller: 'CountriesController',
      controllerAs: 'countries',
      resolve: resolve
    })
    .when('/places', {
      templateUrl: 'app/places/places.html',
      controller: 'PlacesController',
      controllerAs: 'places',
      resolve: resolve
    })
    .when('/hotels', {
      templateUrl: 'app/hotels/hotels.html',
      controller: 'HotelsController',
      controllerAs: 'hotels',
      resolve: resolve
    })
    .when('/admin/tours', {
      templateUrl: 'app/admin/tours/tours.html',
      controller: 'AdminToursController',
      controllerAs: 'tours',
      restricted: true,
      resolve: resolve
    })
    .when('/admin/countries', {
      templateUrl: 'app/admin/countries/countries.html',
      controller: 'AdminCountriesController',
      controllerAs: 'countries',
      restricted: true,
      resolve: resolve
    })
    .when('/admin/places', {
      templateUrl: 'app/admin/places/places.html',
      controller: 'AdminPlacesController',
      controllerAs: 'places',
      restricted: true,
      resolve: resolve
    })
    .when('/admin/hotels', {
      templateUrl: 'app/admin/hotels/hotels.html',
      controller: 'AdminHotelsController',
      controllerAs: 'hotels',
      restricted: true,
      resolve: resolve
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}
