export function run($rootScope, $route, $location, AuthService) {
  'ngInject';

  $rootScope.$on('$locationChangeStart', function(event, next, current) {
    var currentRoute = $route.routes[$location.path()] || $route.routes['/tours/:id'];

    if (currentRoute.restricted && !AuthService.currentUser().isAdmin) {
      $location.path('/');

      return false;
    } else {
      return true;
    }
  });
}
