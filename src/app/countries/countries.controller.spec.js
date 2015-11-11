describe('CountriesController', () => {
  var CountriesController,
      $httpBackend;

  var fakeCountries = [
    {
      name: 'Fake Country'
    },
    {
      name: 'Fake Country 2'
    }
  ];

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    CountriesController = $controller('CountriesController', {});
    $httpBackend = _$httpBackend_;
  }));

  describe('activate()', () => {
    beforeEach(() => {
      $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Country/).respond(200, {results: fakeCountries});
      $httpBackend.flush();
    });

    it('assigns tours to variable "all"', () => {
      expect(CountriesController.all.length).toEqual(2);
    });
  });
});
