describe('CountriesService', function() {
  var CountriesService,
      $httpBackend,
      url = /^https:\/\/api\.parse\.com\/1\/classes\/Country/;

  var fakeCountries = [
    {
      objectId: '1',
      name: 'Fake Country'
    },
    {
      objectId: '2',
      name: 'Fake Country 2'
    }
  ];

  var newCountry = {
    name: 'New Fake Country'
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject((_CountriesService_, _$httpBackend_) => {
    CountriesService = _CountriesService_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/^app\//).respond(200);
  });

  describe('all', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200);
      $httpBackend.expectGET(url).respond(200);

      CountriesService.all();

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns tours', () => {
      $httpBackend.whenGET(url).respond(200, {results: fakeCountries});

      var response = CountriesService.all();
      $httpBackend.flush();

      expect(response[0].objectId).toEqual(fakeCountries[0].objectId);
      expect(response[0].name).toEqual(fakeCountries[0].name);
      expect(response[1].objectId).toEqual(fakeCountries[1].objectId);
      expect(response[1].name).toEqual(fakeCountries[1].name);
    });
  });

  describe('get', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200, fakeCountries[0]);
      $httpBackend.expectGET(url).respond(200);

      CountriesService.get({objectId: fakeCountries[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns a tour', () => {
      $httpBackend.whenGET(url).respond(200, fakeCountries[0]);

      var response = CountriesService.get({objectId: fakeCountries[0].objectId});
      $httpBackend.flush();

      expect(response.objectId).toEqual(fakeCountries[0].objectId);
      expect(response.name).toEqual(fakeCountries[0].name);
    });
  });

  describe('create', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenPOST(url).respond(200);
      $httpBackend.expectPOST(url).respond(200);

      CountriesService.create(newCountry);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns objectId and createdAt', () => {
      $httpBackend.whenPOST(url).respond(200, {createdAt: '2015-11-08T05:30:06.265Z', objectId: '3'});

      var response = CountriesService.create(newCountry);
      $httpBackend.flush();

      expect(response.objectId).toEqual('3');
      expect(response.createdAt).toEqual('2015-11-08T05:30:06.265Z');
    });
  });

  describe('update', () => {
    var editedCountry = fakeCountries[0];
    editedCountry.name = 'Edited Fake Country';

    it('sends request to Parse.com', () => {
      $httpBackend.whenPUT(url).respond(200);
      $httpBackend.expectPUT(url).respond(200);

      CountriesService.update(editedCountry);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns updated object', () => {
      $httpBackend.whenPUT(url).respond(200, editedCountry);

      var response = CountriesService.update(editedCountry);
      $httpBackend.flush();

      expect(response.objectId).toEqual(editedCountry.objectId);
      expect(response.name).toEqual(editedCountry.name);
    });
  });

  describe('destroy', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenDELETE(url).respond(200);
      $httpBackend.expectDELETE(url).respond(200);

      CountriesService.destroy({objectId: fakeCountries[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });
});
