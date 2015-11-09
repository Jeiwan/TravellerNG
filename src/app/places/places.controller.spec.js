describe('PlacesController', () => {
  var PlacesController,
      $httpBackend;

  var fakePlaces = [
    {
      name: 'Fake Place'
    },
    {
      name: 'Fake Place 2'
    }
  ];

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    PlacesController = $controller('PlacesController', {});
    $httpBackend = _$httpBackend_;
  }));

  describe('activate()', () => {
    beforeEach(() => {
      $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Place/).respond(200, {results: fakePlaces});
      $httpBackend.flush();
    });

    it('assigns tours to variable "all"', () => {
      expect(PlacesController.all.length).toEqual(2);
    });
  });
});
