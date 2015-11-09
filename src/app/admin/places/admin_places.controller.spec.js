describe('AdminPlacesController', () => {
  var AdminPlacesController,
      $httpBackend;

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

  var newPlace = {
    country: { objectId: '1' },
    objectId: '3',
    name: 'New Fake Place',
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    AdminPlacesController = $controller('AdminPlacesController', {});
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Country/).respond(200, {results: fakeCountries});
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Place/).respond(200, {results: fakePlaces});
    $httpBackend.flush();
  });

  describe('activate()', () => {
    it('assigns places to variable "all"', () => {
      expect(AdminPlacesController.all.length).toEqual(fakePlaces.length);
    });

    it('assigns countries to variable "countries"', () => {
      expect(AdminPlacesController.countries.length).toEqual(fakeCountries.length);
    });

    if('fills objectId of new place relations', () => {
      expect(AdminPlacesController.new_.country.objectId).toEqual(fakeCountries[0].objectId);
    });
  });

  describe('add()', () => {
    beforeEach(() => {
      $httpBackend.whenPOST(/https:\/\/api\.parse\.com\/1\/classes\/Place/).respond(200, {objectId: newPlace.objectId});
      AdminPlacesController.new_.name = newPlace.name;
      AdminPlacesController.new_.country.objectId = fakeCountries[1].objectId;
      AdminPlacesController.add();
      $httpBackend.flush();
    });

    it('adds new place to "all" array', () => {
      expect(AdminPlacesController.all.length).toEqual(fakePlaces.length + 1);
      var lastPlace = AdminPlacesController.all[AdminPlacesController.all.length-1];
      expect(lastPlace.objectId).toEqual(newPlace.objectId);
      expect(lastPlace.name).toEqual(newPlace.name);
      expect(lastPlace.country.name).toEqual(fakeCountries[1].name);
    });

    it('resets new_ variable', () => {
      expect(AdminPlacesController.new_).toEqual({ country: {} });
    });

    it('hides the new tour form', () => {
      expect(AdminPlacesController.state.newForm.visible).toBe(false);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      $httpBackend.whenDELETE(/https:\/\/api\.parse\.com\/1\/classes\/Place/).respond(200, {});
      AdminPlacesController.remove({objectId: '1'});
      $httpBackend.flush();
    });

    it('removes place from "all" array', () => {
      expect(AdminPlacesController.all.length).toEqual(fakePlaces.length - 1);
    });
  });

  describe('showNewForm()', () => {
    it('shows new form', () => {
      AdminPlacesController.showNewForm();
      expect(AdminPlacesController.state.newForm.visible).toBe(true);
    });
  });

  describe('hideNewForm()', () => {
    it('hides new form', () => {
      AdminPlacesController.hideNewForm();
      expect(AdminPlacesController.state.newForm.visible).toBe(false);
    });
  });

  describe('edit(place)', () => {
    var place;

    beforeEach(() => {
      place = AdminPlacesController.all[1];
      AdminPlacesController.all[0].state = 'edit';

      AdminPlacesController.edit(place);
    });

    it('hides all edit forms', () => {
      expect(AdminPlacesController.all[0].state).toEqual('show');
    });

    it('copies place to edited and fills relations', () => {
      expect(AdminPlacesController.edited.objectId).toEqual(place.objectId);
    });

    it('assigns objectId to the relations of "edited"', () => {
      expect(AdminPlacesController.edited.country.objectId).toEqual(place.country.objectId);
    });

    it('shows edit form for the place', () => {
      expect(place.state).toEqual('edit');
    });
  });

  describe('cancelEdit(place)', () => {
    var place;

    beforeEach(() => {
      place = AdminPlacesController.all[1];
      AdminPlacesController.edit(place);
      AdminPlacesController.cancelEdit(place);
    });

    it('hides edit form for the place', () => {
      expect(place.state).toEqual('show');
    });

    it('resets "edited" variable', () => {
      expect(AdminPlacesController.edited).toEqual({ country: {} });
    });
  });

  describe('update(place)', () => {
    var place;

    describe('when place is valid', () => {
      beforeEach(() => {
        place = AdminPlacesController.all[0];
        $httpBackend.whenPUT(/https:\/\/api\.parse\.com\/1\/classes\/Place\/\d+/).respond(200);
        AdminPlacesController.edit(place);
        AdminPlacesController.edited.name = 'Edited Fake Place';
        AdminPlacesController.edited.country.objectId = fakeCountries[1].objectId;
        AdminPlacesController.update(place);
        $httpBackend.flush();
      });

      it('updates the place', () => {
        expect(place.name).toEqual('Edited Fake Place');
        expect(place.country.objectId).toEqual(fakeCountries[1].objectId);
        expect(place.country.name).toEqual(fakeCountries[1].name);
      });

      it('resets "edited" variable', () => {
        expect(AdminPlacesController.edited).toEqual({ country: {} });
      });

      it('hides edit place form', () => {
        expect(place.state).toEqual('show');
      });
    });
  });

  describe('validate(place)', () => {
    describe('when place name length is less than 3 characters', () => {
      it('alerts error', () => {
        var place = AdminPlacesController.all[0];
        spyOn(window, 'alert');

        AdminPlacesController.edit(place);
        AdminPlacesController.edited.name = 'Uh';
        AdminPlacesController.update(place);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });
  });
});
