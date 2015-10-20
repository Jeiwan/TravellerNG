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
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode(true);
}
