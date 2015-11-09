describe('HotelsController', () => {
  var HotelsController,
      $httpBackend;

  var fakeHotels = [
    {
      title: 'Fake Hotel'
    },
    {
      title: 'Fake Hotel 2'
    }
  ];

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    HotelsController = $controller('HotelsController', {});
    $httpBackend = _$httpBackend_;
  }));

  describe('activate()', () => {
    beforeEach(() => {
      $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Hotel/).respond(200, {results: fakeHotels});
      $httpBackend.flush();
    });

    it('assigns tours to variable "all"', () => {
      expect(HotelsController.all.length).toEqual(2);
    });
  });

  describe('ratingStars(n)', () => {
    describe('when n = 0', () => {
      it('returns glyphicon-star-empty', () => {
        expect(HotelsController.ratingStars(0)).toEqual('glyphicon-star-empty');
      });
    });
    describe('when n = 1', () => {
      it('returns glyphicon-star', () => {
        expect(HotelsController.ratingStars(1)).toEqual('glyphicon-star');
      });
    });
  });
});
