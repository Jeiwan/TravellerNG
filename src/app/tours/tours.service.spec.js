describe('ToursService', function() {
  var ToursService,
      $httpBackend,
      url = /^https:\/\/api\.parse\.com\/1\/classes\/Tour/;

  var fakeTours = [
    {
      country: {},
      place: {},
      hotel: {},
      objectId: '1',
      title: 'Fake Tour',
      text: 'Fake Tour Description',
      price: '100.0'
    },
    {
      country: {},
      place: {},
      hotel: {},
      objectId: '2',
      title: 'Fake Tour 2',
      text: 'Fake Tour 2 Description',
      price: '1000.0'
    }
  ];

  var newTour = {
    country: {},
    place: {},
    hotel: {},
    title: 'New Fake Tour',
    text: 'New Fake Tour Description',
    price: '500.0'
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject((_ToursService_, _$httpBackend_) => {
    ToursService = _ToursService_;
    $httpBackend = _$httpBackend_;
  }));

  describe('query', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200);
      $httpBackend.expectGET(url).respond(200);

      ToursService.query();

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns tours', () => {
      $httpBackend.whenGET(url).respond(200, {results: fakeTours});

      var response = ToursService.query();
      $httpBackend.flush();

      expect(response[0].objectId).toEqual(fakeTours[0].objectId);
      expect(response[0].title).toEqual(fakeTours[0].title);
      expect(response[0].text).toEqual(fakeTours[0].text);
      expect(response[0].price).toEqual(fakeTours[0].price);
      expect(response[1].objectId).toEqual(fakeTours[1].objectId);
      expect(response[1].title).toEqual(fakeTours[1].title);
      expect(response[1].text).toEqual(fakeTours[1].text);
      expect(response[1].price).toEqual(fakeTours[1].price);
    });
  });

  describe('get', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenGET(url).respond(200, fakeTours[0]);
      $httpBackend.expectGET(url).respond(200);

      ToursService.get({objectId: fakeTours[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns a tour', () => {
      $httpBackend.whenGET(url).respond(200, fakeTours[0]);

      var response = ToursService.get({objectId: fakeTours[0].objectId});
      $httpBackend.flush();

      expect(response.objectId).toEqual(fakeTours[0].objectId);
      expect(response.title).toEqual(fakeTours[0].title);
      expect(response.text).toEqual(fakeTours[0].text);
      expect(response.price).toEqual(fakeTours[0].price);
    });
  });

  describe('create', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenPOST(url).respond(200);
      $httpBackend.expectPOST(url).respond(200);

      ToursService.save(newTour);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns objectId and createdAt', () => {
      $httpBackend.whenPOST(url).respond(200, {createdAt: '2015-11-08T05:30:06.265Z', objectId: '3'});

      var response = ToursService.save(newTour);
      $httpBackend.flush();

      expect(response.objectId).toEqual('3');
      expect(response.createdAt).toEqual('2015-11-08T05:30:06.265Z');
    });
  });

  describe('update', () => {
    var editedTour = fakeTours[0];
    editedTour.title = 'Edited Fake Tour';

    it('sends request to Parse.com', () => {
      $httpBackend.whenPUT(url).respond(200);
      $httpBackend.expectPUT(url).respond(200);

      ToursService.update(editedTour);

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });

    it('returns updated object', () => {
      $httpBackend.whenPUT(url).respond(200, editedTour);

      var response = ToursService.update(editedTour);
      $httpBackend.flush();

      expect(response.objectId).toEqual(editedTour.objectId);
      expect(response.title).toEqual(editedTour.title);
      expect(response.text).toEqual(editedTour.text);
      expect(response.price).toEqual(editedTour.price);
    });
  });

  describe('remove', () => {
    it('sends request to Parse.com', () => {
      $httpBackend.whenDELETE(url).respond(200);
      $httpBackend.expectDELETE(url).respond(200);

      ToursService.remove({objectId: fakeTours[0].objectId});

      expect($httpBackend.verifyNoOutstandingExpectation).not.toThrow();
    });
  });
});
