describe('AdminToursController', () => {
  var AdminToursController,
      $httpBackend;

  var fakeTours = [
    {
      country: { objectId: '1' },
      place: { objectId: '1' },
      hotel: { objectId: '1' },
      objectId: '1',
      title: 'Fake Tour',
      text: 'Fake Tour Description',
      price: '100.0'
    },
    {
      country: { objectId: '2' },
      place: { objectId: '2' },
      hotel: { objectId: '2' },
      objectId: '2',
      title: 'Fake Tour 2',
      text: 'Fake Tour 2 Description',
      price: '1000.0'
    }
  ];

  var emptyTour = { country: {}, place: {}, hotel: {} };

  var newTour = {
    country: {},
    place: {},
    hotel: {},
    objectId: '3',
    title: 'New Fake Tour',
    text: 'New Fake Tour Description',
    price: '500.0'
  };

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

  var fakeHotels = [
    {
      place: { objectId: '1' },
      objectId: '1',
      titel: 'Fake Hotel',
      stars: '5'
    },
    {
      place: { objectId: '2' },
      objectId: '2',
      titel: 'Fake Hotel 2',
      stars: '3'
    }
  ];

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

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    AdminToursController = $controller('AdminToursController', {});
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Tour/).respond(200, {results: fakeTours});
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Place/).respond(200, {results: fakePlaces});
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Hotel/).respond(200, {results: fakeHotels});
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Country/).respond(200, {results: fakeCountries});
    $httpBackend.flush();
  });

  describe('activate()', () => {
    it('assigns tours to variable "all"', () => {
      expect(AdminToursController.all.length).toEqual(fakeTours.length);
    });

    it('assigns countries to variable "countries"', () => {
      expect(AdminToursController.countries.length).toEqual(fakeCountries.length);
    });

    it('assigns places to variable "places"', () => {
      expect(AdminToursController.places.length).toEqual(fakePlaces.length);
    });

    it('assigns hotels to variable "hotels"', () => {
      expect(AdminToursController.hotels.length).toEqual(fakeHotels.length);
    });

    if('fills objectId of new tour relations', () => {
      expect(AdminToursController.new_.country.objectId).toEqual(fakeCountries[0].objectId);
      expect(AdminToursController.new_.place.objectId).toEqual(fakePlaces[0].objectId);
      expect(AdminToursController.new_.hotel.objectId).toEqual(fakeHotels[0].objectId);
    });
  });

  describe('add()', () => {
    beforeEach(() => {
      $httpBackend.whenPOST(/https:\/\/api\.parse\.com\/1\/classes\/Tour/).respond(200, {objectId: newTour.objectId});
      AdminToursController.new_.title = newTour.title;
      AdminToursController.new_.text = newTour.text;
      AdminToursController.new_.price = newTour.price;
      AdminToursController.new_.country.objectId = fakeCountries[1].objectId;
      AdminToursController.new_.hotel.objectId = fakeHotels[1].objectId;
      AdminToursController.new_.place.objectId = fakePlaces[1].objectId;
      AdminToursController.add();
      $httpBackend.flush();
    });

    it('adds new tour to "all" array', () => {
      expect(AdminToursController.all.length).toEqual(fakeTours.length + 1);
      var lastTour = AdminToursController.all[AdminToursController.all.length-1];
      expect(lastTour.objectId).toEqual(newTour.objectId);
      expect(lastTour.title).toEqual(newTour.title);
      expect(lastTour.text).toEqual(newTour.text);
      expect(lastTour.price).toEqual(newTour.price);
      expect(lastTour.country.name).toEqual(fakeCountries[1].name);
      expect(lastTour.place.name).toEqual(fakePlaces[1].name);
      expect(lastTour.hotel.title).toEqual(fakeHotels[1].name);
    });

    it('resets new_ variable', () => {
      expect(AdminToursController.new_).toEqual({ country: {}, place: {}, hotel: {} });
    });

    it('hides the new tour form', () => {
      expect(AdminToursController.state.newForm.visible).toBe(false);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      $httpBackend.whenDELETE(/https:\/\/api\.parse\.com\/1\/classes\/Tour/).respond(200, {});
      AdminToursController.remove({objectId: '1'});
      $httpBackend.flush();
    });

    it('removes tour from "all" array', () => {
      expect(AdminToursController.all.length).toEqual(fakeTours.length - 1);
    });
  });

  describe('showNewForm()', () => {
    it('shows new form', () => {
      AdminToursController.showNewForm();
      expect(AdminToursController.state.newForm.visible).toBe(true);
    });
  });

  describe('hideNewForm()', () => {
    it('hides new form', () => {
      AdminToursController.hideNewForm();
      expect(AdminToursController.state.newForm.visible).toBe(false);
    });
  });

  describe('edit(tour)', () => {
    var tour;

    beforeEach(() => {
      tour = AdminToursController.all[1];
      AdminToursController.all[0].state = 'edit';
      AdminToursController.edit(tour);
    });

    it('hides all edit forms', () => {
      expect(AdminToursController.all[0].state).toEqual('show');
    });

    it('copies tour to edited and fills relations', () => {
      expect(AdminToursController.edited.objectId).toEqual(tour.objectId);
    });

    it('assigns objectId to the relations of "edited"', () => {
      expect(AdminToursController.edited.country.objectId).toEqual(tour.country.objectId);
      expect(AdminToursController.edited.place.objectId).toEqual(tour.place.objectId);
    });

    it('shows edit form for the tour', () => {
      expect(tour.state).toEqual('edit');
    });
  });

  describe('cancelEdit(tour)', () => {
    var tour;

    beforeEach(() => {
      tour = AdminToursController.all[1];
      AdminToursController.edit(tour);
      AdminToursController.cancelEdit(tour);
    });

    it('hides edit form for the tour', () => {
      expect(tour.state).toEqual('show');
    });

    it('resets "edited" variable', () => {
      expect(AdminToursController.edited).toEqual({ country: {}, place: {}, hotel: {} });
    });
  });

  describe('update(tour)', () => {
    var tour;

    describe('when tour is valid', () => {
      beforeEach(() => {
        tour = AdminToursController.all[0];
        $httpBackend.whenPUT(/https:\/\/api\.parse\.com\/1\/classes\/Tour\/\d+/).respond(200);
        AdminToursController.edit(tour);
        AdminToursController.edited.title = 'Edited Fake Tour';
        AdminToursController.update(tour);
        $httpBackend.flush();
      });

      it('updates the tour', () => {
        expect(tour.title).toEqual('Edited Fake Tour');
        expect(tour.country.name).toEqual(fakeCountries[0].name);
        expect(tour.place.name).toEqual(fakePlaces[0].name);
        expect(tour.hotel.title).toEqual(fakeHotels[0].title);
      });

      it('resets "edited" variable', () => {
        expect(AdminToursController.edited).toEqual({ country: {}, place: {}, hotel: {} });
      });

      it('hides edit tour form', () => {
        expect(tour.state).toEqual('show');
      });
    });
  });

  describe('newFormVisible()', () => {
    describe('when new tour form is visible', () => {
      it('returns true', () => {
        AdminToursController.state.newForm.visible = true;
        expect(AdminToursController.newFormVisible()).toEqual(true);
      });
    });

    describe('when new tour form is hidden', () => {
      it('returns false', () => {
        AdminToursController.state.newForm.visible = false;
        expect(AdminToursController.newFormVisible()).toEqual(false);
      });
    });
  });

  describe('possibleHotels(tour)', () => {
    var tour;

    beforeEach(() => {
      tour = AdminToursController.all[0];
    });

    describe('when hotels is not defined', () => {
      it('returns empty array', () => {
        AdminToursController.hotels = undefined;
        expect(AdminToursController.possibleHotels(tour)).toEqual([]);
      });
    });

    describe('when there are hotels', () => {
      it('returns hotels for the tour place', () => {
        expect(AdminToursController.possibleHotels(tour)[0].title).toEqual(fakeHotels[0].title);
      });
    });
  });

  describe('possiblePlaces(tour)', () => {
    var tour;

    beforeEach(() => {
      tour = AdminToursController.all[0];
    });

    describe('when places is not defined', () => {
      it('returns empty array', () => {
        AdminToursController.places = undefined;
        expect(AdminToursController.possiblePlaces(tour)).toEqual([]);
      });
    });

    describe('when there are places', () => {
      it('returns places for the tour country', () => {
        expect(AdminToursController.possiblePlaces(tour)[0].title).toEqual(fakePlaces[0].title);
      });
    });
  });

  describe('validate(tour)', () => {
    describe('when tour title length is less than 3 characters', () => {
      it('alerts error', () => {
        var tour = AdminToursController.all[0];
        spyOn(window, 'alert');

        AdminToursController.edit(tour);
        AdminToursController.edited.title = 'Uh';
        AdminToursController.update(tour);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });

    describe('when tour text length is less than 3 characters', () => {
      it('alerts error', () => {
        spyOn(window, 'alert');

        AdminToursController.edit(AdminToursController.all[0]);
        AdminToursController.edited.text = 'Uh';
        AdminToursController.update(AdminToursController.all[0]);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });

    describe('when tour price length is less than 0', () => {
      it('alerts error', () => {
        spyOn(window, 'alert');

        AdminToursController.edit(AdminToursController.all[0]);
        AdminToursController.edited.price = -100;
        AdminToursController.update(AdminToursController.all[0]);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });
  });
});
