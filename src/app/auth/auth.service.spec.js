describe('AuthService', () => {
  var AuthService;

  beforeEach(window.module('TravellerNG'));
  beforeEach(inject((_AuthService_) => {
    AuthService = _AuthService_;
  }));

  describe('currentUser', () => {
    it('returns current user info', () => {
      expect(AuthService.currentUser().name).toEqual('Jeiwan');
      expect(AuthService.currentUser().isAdmin).toEqual(true);
    });
  });
});
