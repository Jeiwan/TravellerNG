describe('TourController', () => {
  var TourController,
      $httpBackend;

  var fakeTour = {
    objectId: '1',
    title: 'Fake Tour',
    text: 'Fake Tour Description',
    price: '100.0'
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    TourController = $controller('TourController', {});
    $httpBackend = _$httpBackend_;
  }));

  describe('activate()', () => {
    beforeEach(() => {
      $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Tour/).respond(200, fakeTour);
      $httpBackend.flush();
    });

    it('assigns tour to variable "self"', () => {
      expect(TourController.self.objectId).toEqual(fakeTour.objectId);
      expect(TourController.self.title).toEqual(fakeTour.title);
      expect(TourController.self.text).toEqual(fakeTour.text);
      expect(TourController.self.price).toEqual(fakeTour.price);
    });
  });
});
