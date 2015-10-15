export function NavbarDirective() {
  return {
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'navbar',
    templateUrl: 'app/components/navbar/navbar.html'
  };
}
