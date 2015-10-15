export function routerConfig ($routeProvider) {
  'ngInject';
  $routeProvider
    .when('/', {
      templateUrl: 'app/tours/tours.html',
      controller: 'ToursController',
      controllerAs: 'tours'
    })
    .otherwise({
      redirectTo: '/'
    });
}
