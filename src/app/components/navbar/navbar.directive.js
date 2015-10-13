export function Navbar() {
  return {
    restrict: 'E',
    controller: 'NavbarController',
    controllerAs: 'vm',
    templateUrl: 'app/components/navbar/navbar.html'
  };
}
