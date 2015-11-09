describe('AdminHotelsController', () => {
  var AdminHotelsController,
      $httpBackend;

  var fakeHotels = [
    {
      place: { objectId: '1' },
      objectId: '1',
      title: 'Fake Hotel',
      stars: 5
    },
    {
      place: { objectId: '2' },
      objectId: '2',
      title: 'Fake Hotel 2',
      stars: 3
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
    },
    {
      country: { objectId: '3' },
      objectId: '3',
      name: 'Fake Place 3'
    }
  ];

  var newHotel = {
    place: { objectId: '3' },
    objectId: '3',
    title: 'New Fake Hotel',
    stars: 4
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    AdminHotelsController = $controller('AdminHotelsController', {});
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Hotel/).respond(200, {results: fakeHotels});
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Place/).respond(200, {results: fakePlaces});
    $httpBackend.flush();
  });

  describe('activate()', () => {
    it('assigns hotels to variable "all"', () => {
      expect(AdminHotelsController.all.length).toEqual(fakeHotels.length);
    });

    it('assigns places to variable "places"', () => {
      expect(AdminHotelsController.places.length).toEqual(fakePlaces.length);
    });

    if('fills objectId of new hotel relations', () => {
      expect(AdminHotelsController.new_.place.objectId).toEqual(fakePlaces[0].objectId);
    });
  });

  describe('add()', () => {
    beforeEach(() => {
      $httpBackend.whenPOST(/https:\/\/api\.parse\.com\/1\/classes\/Hotel/).respond(200, {objectId: newHotel.objectId});

      AdminHotelsController.new_.title = newHotel.title;
      AdminHotelsController.new_.stars = newHotel.stars;
      AdminHotelsController.new_.place.objectId = fakePlaces[1].objectId;
      AdminHotelsController.add();
      $httpBackend.flush();
    });

    it('fills title of new hotel relations', () => {
      expect(AdminHotelsController.new_.place.title).toEqual(fakePlaces[1].title);
    });

    it('adds new hotel to "all" array', () => {
      expect(AdminHotelsController.all.length).toEqual(fakeHotels.length + 1);
      var lastHotel = AdminHotelsController.all[AdminHotelsController.all.length-1];
      expect(lastHotel.objectId).toEqual(newHotel.objectId);
      expect(lastHotel.title).toEqual(newHotel.title);
      expect(lastHotel.place.name).toEqual(fakePlaces[1].name);
      expect(lastHotel.place.objectId).toEqual(fakePlaces[1].objectId);
    });

    it('resets new_ variable', () => {
      expect(AdminHotelsController.new_).toEqual({ place: {} });
    });

    it('hides the new tour form', () => {
      expect(AdminHotelsController.state.newForm.visible).toBe(false);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      $httpBackend.whenDELETE(/https:\/\/api\.parse\.com\/1\/classes\/Hotel/).respond(200, {});
      AdminHotelsController.remove({objectId: '1'});
      $httpBackend.flush();
    });

    it('removes hotel from "all" array', () => {
      expect(AdminHotelsController.all.length).toEqual(fakeHotels.length - 1);
    });
  });

  describe('showNewForm()', () => {
    it('shows new form', () => {
      AdminHotelsController.showNewForm();
      expect(AdminHotelsController.state.newForm.visible).toBe(true);
    });
  });

  describe('hideNewForm()', () => {
    it('hides new form', () => {
      AdminHotelsController.hideNewForm();
      expect(AdminHotelsController.state.newForm.visible).toBe(false);
    });
  });

  describe('edit(hotel)', () => {
    var hotel;

    beforeEach(() => {
      hotel = AdminHotelsController.all[1];
      AdminHotelsController.all[0].state = 'edit';

      AdminHotelsController.edit(hotel);
    });

    it('hides all edit forms', () => {
      expect(AdminHotelsController.all[0].state).toEqual('show');
    });

    it('copies hotel to edited and fills relations', () => {
      expect(AdminHotelsController.edited.objectId).toEqual(hotel.objectId);
    });

    it('assigns objectId to the relations of "edited"', () => {
      expect(AdminHotelsController.edited.place.objectId).toEqual(hotel.place.objectId);
    });

    it('shows edit form for the hotel', () => {
      expect(hotel.state).toEqual('edit');
    });
  });

  describe('cancelEdit(hotel)', () => {
    var hotel;

    beforeEach(() => {
      hotel = AdminHotelsController.all[1];
      AdminHotelsController.edit(hotel);
      AdminHotelsController.cancelEdit(hotel);
    });

    it('hides edit form for the hotel', () => {
      expect(hotel.state).toEqual('show');
    });

    it('resets "edited" variable', () => {
      expect(AdminHotelsController.edited).toEqual({ place: {} });
    });
  });

  describe('update(hotel)', () => {
    var hotel;

    describe('when hotel is valid', () => {
      beforeEach(() => {
        hotel = AdminHotelsController.all[0];
        $httpBackend.whenPUT(/https:\/\/api\.parse\.com\/1\/classes\/Hotel\/\d+/).respond(200);

        AdminHotelsController.edit(hotel);
        AdminHotelsController.edited.title = 'Edited Fake Hotel';
        AdminHotelsController.edited.place.objectId = fakePlaces[1].objectId;
        AdminHotelsController.update(hotel);

        $httpBackend.flush();
      });

      it('updates the hotel', () => {
        expect(hotel.title).toEqual('Edited Fake Hotel');
        expect(hotel.place.objectId).toEqual(fakePlaces[1].objectId);
        expect(hotel.place.name).toEqual(fakePlaces[1].name);
      });

      it('resets "edited" variable', () => {
        expect(AdminHotelsController.edited).toEqual({ place: {} });
      });

      it('hides edit hotel form', () => {
        expect(hotel.state).toEqual('show');
      });
    });
  });

  describe('ratingStars(n)', () => {
    describe('when n = 0', () => {
      it('returns glyphicon-star-empty', () => {
        expect(AdminHotelsController.ratingStars(0)).toEqual('glyphicon-star-empty');
      });
    });
    describe('when n = 1', () => {
      it('returns glyphicon-star', () => {
        expect(AdminHotelsController.ratingStars(1)).toEqual('glyphicon-star');
      });
    });
  });

  describe('validate(hotel)', () => {
    describe('when hotel title length is less than 3 characters', () => {
      it('alerts error', () => {
        var hotel = AdminHotelsController.all[0];
        spyOn(window, 'alert');

        AdminHotelsController.edit(hotel);
        AdminHotelsController.edited.title = 'Uh';
        AdminHotelsController.update(hotel);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });

    describe('when hotel stars are greater than 5', () => {
      it('alerts error', () => {
        spyOn(window, 'alert');

        AdminHotelsController.edit(AdminHotelsController.all[0]);
        AdminHotelsController.edited.stars = 6;
        AdminHotelsController.update(AdminHotelsController.all[0]);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });

    describe('when hotel stars are less than 0', () => {
      it('alerts error', () => {
        spyOn(window, 'alert');

        AdminHotelsController.edit(AdminHotelsController.all[0]);
        AdminHotelsController.edited.stars = -10;
        AdminHotelsController.update(AdminHotelsController.all[0]);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });
  });
});
