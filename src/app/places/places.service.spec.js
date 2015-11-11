describe('PlacesService', function() {
  var PlacesService,
      $httpBackend,
      url = /^https:\/\/api\.parse\.com\/1\/classes\/Place/;

  var fakePlaces = [
    {
      country: { objectId: '1' },
      objectId: '1',
      name: 'Fake Place'
    },
    {
      country: { objectId: '2' },
      objectId: '2',
      name: 'Fake Place 2'
    }
  ];

  var newPlace = {
    country: {},
    name: 'New Fake Place'
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject((_PlacesService_, _$httpBackend_) => {
    PlacesService = _PlacesService_;
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/^app\//).respond(200);
  });

  describe('query', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200);
      $httpBackend.expectGET(url).respond(200);

      PlacesService.query();

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns tours', () => {
      $httpBackend.whenGET(url).respond(200, {results: fakePlaces});

      var response = PlacesService.query();
      $httpBackend.flush();

      expect(response[0].objectId).toEqual(fakePlaces[0].objectId);
      expect(response[0].name).toEqual(fakePlaces[0].name);
      expect(response[1].objectId).toEqual(fakePlaces[1].objectId);
      expect(response[1].name).toEqual(fakePlaces[1].name);
    });
  });

  describe('get', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200, fakePlaces[0]);
      $httpBackend.expectGET(url).respond(200);

      PlacesService.get({objectId: fakePlaces[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns a tour', () => {
      $httpBackend.whenGET(url).respond(200, fakePlaces[0]);

      var response = PlacesService.get({objectId: fakePlaces[0].objectId});
      $httpBackend.flush();

      expect(response.objectId).toEqual(fakePlaces[0].objectId);
      expect(response.name).toEqual(fakePlaces[0].name);
    });
  });

  describe('create', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenPOST(url).respond(200);
      $httpBackend.expectPOST(url).respond(200);

      PlacesService.create(newPlace);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns objectId and createdAt', () => {
      $httpBackend.whenPOST(url).respond(200, {createdAt: '2015-11-08T05:30:06.265Z', objectId: '3'});

      var response = PlacesService.create(newPlace);
      $httpBackend.flush();

      expect(response.objectId).toEqual('3');
      expect(response.createdAt).toEqual('2015-11-08T05:30:06.265Z');
    });
  });

  describe('update', () => {
    var editedPlace = fakePlaces[0];
    editedPlace.name = 'Edited Fake Place';

    it('sends request to Parse.com', () => {
      $httpBackend.whenPUT(url).respond(200);
      $httpBackend.expectPUT(url).respond(200);

      PlacesService.update(editedPlace);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns updated object', () => {
      $httpBackend.whenPUT(url).respond(200, editedPlace);

      var response = PlacesService.update(editedPlace);
      $httpBackend.flush();

      expect(response.objectId).toEqual(editedPlace.objectId);
      expect(response.name).toEqual(editedPlace.name);
    });
  });

  describe('destroy', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenDELETE(url).respond(200);
      $httpBackend.expectDELETE(url).respond(200);

      PlacesService.destroy({objectId: fakePlaces[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });
});
