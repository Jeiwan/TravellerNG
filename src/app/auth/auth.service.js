export function AuthService() {
  var service = {
    currentUser: currentUser
  };

  return service;

  function currentUser() {
    return { name: 'Jeiwan', isAdmin: true };
  }
}
