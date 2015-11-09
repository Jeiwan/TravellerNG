describe('HotelsService', function() {
  var HotelsService,
      $httpBackend,
      url = /^https:\/\/api\.parse\.com\/1\/classes\/Hotel/;

  var fakeHotels = [
    {
      place: {},
      objectId: '1',
      name: 'Fake Hotel',
      stars: '5'
    },
    {
      place: {},
      objectId: '2',
      name: 'Fake Hotel 2',
      stars: '3'
    }
  ];

  var newHotel = {
    place: {},
    name: 'New Fake Hotel'
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject((_HotelsService_, _$httpBackend_) => {
    HotelsService = _HotelsService_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/^app\//).respond(200);
  });

  describe('query', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200);
      $httpBackend.expectGET(url).respond(200);

      HotelsService.query();

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns tours', () => {
      $httpBackend.whenGET(url).respond(200, {results: fakeHotels});

      var response = HotelsService.query();
      $httpBackend.flush();

      expect(response[0].objectId).toEqual(fakeHotels[0].objectId);
      expect(response[0].name).toEqual(fakeHotels[0].name);
      expect(response[0].stars).toEqual(fakeHotels[0].stars);
      expect(response[1].objectId).toEqual(fakeHotels[1].objectId);
      expect(response[1].name).toEqual(fakeHotels[1].name);
      expect(response[1].stars).toEqual(fakeHotels[1].stars);
    });
  });

  describe('get', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200, fakeHotels[0]);
      $httpBackend.expectGET(url).respond(200);

      HotelsService.get({objectId: fakeHotels[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns a tour', () => {
      $httpBackend.whenGET(url).respond(200, fakeHotels[0]);

      var response = HotelsService.get({objectId: fakeHotels[0].objectId});
      $httpBackend.flush();

      expect(response.objectId).toEqual(fakeHotels[0].objectId);
      expect(response.name).toEqual(fakeHotels[0].name);
      expect(response.stars).toEqual(fakeHotels[0].stars);
    });
  });

  describe('create', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenPOST(url).respond(200);
      $httpBackend.expectPOST(url).respond(200);

      HotelsService.save(newHotel);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns objectId and createdAt', () => {
      $httpBackend.whenPOST(url).respond(200, {createdAt: '2015-11-08T05:30:06.265Z', objectId: '3'});

      var response = HotelsService.save(newHotel);
      $httpBackend.flush();

      expect(response.objectId).toEqual('3');
      expect(response.createdAt).toEqual('2015-11-08T05:30:06.265Z');
    });
  });

  describe('update', () => {
    var editedHotel = fakeHotels[0];
    editedHotel.name = 'Edited Fake Hotel';

    it('sends request to Parse.com', () => {
      $httpBackend.whenPUT(url).respond(200);
      $httpBackend.expectPUT(url).respond(200);

      HotelsService.update(editedHotel);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns updated object', () => {
      $httpBackend.whenPUT(url).respond(200, editedHotel);

      var response = HotelsService.update(editedHotel);
      $httpBackend.flush();

      expect(response.objectId).toEqual(editedHotel.objectId);
      expect(response.name).toEqual(editedHotel.name);
      expect(response.stars).toEqual(editedHotel.stars);
    });
  });

  describe('remove', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenDELETE(url).respond(200);
      $httpBackend.expectDELETE(url).respond(200);

      HotelsService.remove({objectId: fakeHotels[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });
});
