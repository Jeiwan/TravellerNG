describe('AdminCountriesController', () => {
  var AdminCountriesController,
      $httpBackend;

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
    objectId: '3',
    name: 'New Fake Country',
  };

  beforeEach(window.module('TravellerNG'));

  beforeEach(inject(($controller, _$httpBackend_) => {
    AdminCountriesController = $controller('AdminCountriesController', {});
    $httpBackend = _$httpBackend_;
  }));

  beforeEach(() => {
    $httpBackend.whenGET(/https:\/\/api\.parse\.com\/1\/classes\/Country/).respond(200, {results: fakeCountries});
    $httpBackend.flush();
  });

  describe('activate()', () => {
    it('assigns countries to variable "all"', () => {
      expect(AdminCountriesController.all.length).toEqual(fakeCountries.length);
    });
  });

  describe('add()', () => {
    beforeEach(() => {
      $httpBackend.whenPOST(/https:\/\/api\.parse\.com\/1\/classes\/Country/).respond(200, {objectId: newCountry.objectId});

      AdminCountriesController.new_.name = newCountry.name;
      AdminCountriesController.add();
      $httpBackend.flush();
    });

    it('adds new country to "all" array', () => {
      expect(AdminCountriesController.all.length).toEqual(fakeCountries.length + 1);
      var lastCountry = AdminCountriesController.all[AdminCountriesController.all.length-1];
      expect(lastCountry.objectId).toEqual(newCountry.objectId);
      expect(lastCountry.name).toEqual(newCountry.name);
    });

    it('resets new_ variable', () => {
      expect(AdminCountriesController.new_).toEqual({});
    });

    it('hides the new tour form', () => {
      expect(AdminCountriesController.state.newForm.visible).toBe(false);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      $httpBackend.whenDELETE(/https:\/\/api\.parse\.com\/1\/classes\/Country/).respond(200, {});
      AdminCountriesController.remove({objectId: '1'});
      $httpBackend.flush();
    });

    it('removes country from "all" array', () => {
      expect(AdminCountriesController.all.length).toEqual(fakeCountries.length - 1);
    });
  });

  describe('showNewForm()', () => {
    it('shows new form', () => {
      AdminCountriesController.showNewForm();
      expect(AdminCountriesController.state.newForm.visible).toBe(true);
    });
  });

  describe('hideNewForm()', () => {
    it('hides new form', () => {
      AdminCountriesController.hideNewForm();
      expect(AdminCountriesController.state.newForm.visible).toBe(false);
    });
  });

  describe('edit(country)', () => {
    var country;

    beforeEach(() => {
      country = AdminCountriesController.all[1];
      AdminCountriesController.all[0].state = 'edit';

      AdminCountriesController.edit(country);
    });

    it('hides all edit forms', () => {
      expect(AdminCountriesController.all[0].state).toEqual('show');
    });

    it('copies country to edited and fills relations', () => {
      expect(AdminCountriesController.edited.objectId).toEqual(country.objectId);
    });

    it('shows edit form for the country', () => {
      expect(country.state).toEqual('edit');
    });
  });

  describe('cancelEdit(country)', () => {
    var country;

    beforeEach(() => {
      country = AdminCountriesController.all[1];
      AdminCountriesController.edit(country);
      AdminCountriesController.cancelEdit(country);
    });

    it('hides edit form for the country', () => {
      expect(country.state).toEqual('show');
    });

    it('resets "edited" variable', () => {
      expect(AdminCountriesController.edited).toEqual({});
    });
  });

  describe('update(country)', () => {
    var country;

    describe('when country is valid', () => {
      beforeEach(() => {
        country = AdminCountriesController.all[0];
        $httpBackend.whenPUT(/https:\/\/api\.parse\.com\/1\/classes\/Country\/\d+/).respond(200);
        AdminCountriesController.edit(country);
        AdminCountriesController.edited.name = 'Edited Fake Country';
        AdminCountriesController.update(country);
        $httpBackend.flush();
      });

      it('updates the country', () => {
        expect(country.name).toEqual('Edited Fake Country');
      });

      it('resets "edited" variable', () => {
        expect(AdminCountriesController.edited).toEqual({});
      });

      it('hides edit country form', () => {
        expect(country.state).toEqual('show');
      });
    });
  });

  describe('validate(country)', () => {
    describe('when country name length is less than 3 characters', () => {
      it('alerts error', () => {
        spyOn(window, 'alert');
        var country = AdminCountriesController.all[0];

        AdminCountriesController.edit(country);
        AdminCountriesController.edited.name = 'Uh';
        AdminCountriesController.update(country);
        expect(window.alert).toHaveBeenCalledWith('Ошибка валидации');
      });
    });
  });
});
