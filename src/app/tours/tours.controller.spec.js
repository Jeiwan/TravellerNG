describe('ToursController', () => {
  var ToursController,
      $httpBackend;

  var fakeTours = [
    {
      title: 'Fake Tour',
      text: 'Fake Tour Description',
      price: '100.0'
    },
    {
      title: 'Fake Tour 2',
      text: 'Fake Tour 2 Description',
      price: '1000.0'
    }
  ];

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    ToursController = $controller('ToursController', {});
    $httpBackend = _$httpBackend_;
  }));

  describe('activate()', () => {
    beforeEach(() => {
      $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Tour/).respond(200, {results: fakeTours});
      $httpBackend.flush();
    });

    describe('tours acquisition', () => {
      it('assigns tours to variable "all"', () => {
        expect(ToursController.all.length).toEqual(2);
      });
    });
  });
});
