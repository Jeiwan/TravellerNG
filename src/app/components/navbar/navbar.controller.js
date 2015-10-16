export function NavbarController($route, AuthService) {
  'ngInject';

  this.isActive = isActive;
  this.currentUserIsAdmin = currentUserIsAdmin;

  function isActive(controller) {
    return $route.current && $route.current.controller == controller ? 'active' : '' || '';
  }

  function currentUserIsAdmin() {
    return AuthService.currentUser().isAdmin;
  }
}
