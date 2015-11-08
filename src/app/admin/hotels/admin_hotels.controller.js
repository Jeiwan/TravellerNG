export function AdminHotelsController(HotelsService, PlacesService) {
  'ngInject';
  var hotels = this;

  this.state = {
    newForm: { visible: false }
  };

  this.edited = {};
  this.new_ = { place: {} };

  this.add = add;
  this.remove = remove;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;
  this.cancelAdd = cancelAdd;
  this.ratingStars = ratingStars;

  activate();

  function activate() {
    hotels.all = HotelsService.query();
    hotels.places = PlacesService.query();
  }

  function add() {
    if (!validate(hotels.new_)) {
      alert('Ошибка валидации');
      return false;
    }

    hotels.new_.place.name = hotels.places.find(p => {
      return p.objectId === hotels.new_.place.objectId;
    }).name;

    HotelsService.create(hotels.new_).$promise.then(result => {
      hotels.all.push(angular.extend(result, hotels.new_));
      hotels.new_ = {};
      hideNewForm();
    }).catch(error => {
      alert('Ошибка создания гостиницы:', error.data.error);
    });
  }

  function remove(hotel) {
    HotelsService.destroy({objectId: hotel.objectId}).$promise.then(result => {
      hotels.all = hotels.all.filter(c => {
        return hotel.objectId !== c.objectId;
      });
    }).catch(error => {
      alert('Ошибка удаления гостиницы:', error.data.error);
    });
  }

  function edit(hotel) {
    hotels.all.forEach((c) => { c.show(); });
    hotels.edited = angular.copy(hotel);
    hotel.edit();
  }

  function cancelEdit(hotel) {
    hotels.edited = {};
    hotel.show();
  }

  function update(hotel) {
    if (!validate(hotels.edited)) {
      alert('Ошибка валидации');
      return false;
    }

    hotels.edited.place.name = hotels.places.find(p => {
      return p.objectId === hotels.edited.place.objectId;
    }).name;

    HotelsService.update(hotels.edited).$promise.then(response => {
      angular.extend(hotel, response);
      hotel.place = hotels.edited.place;
      hotels.edited = {};
      hotel.show();
    }).catch(error => {
      alert('Ошибка обновления гостиницы: ', error.data.error);
    });
  }

  function showNewForm() {
    hotels.state.newForm.visible = true;

    return true;
  }

  function hideNewForm() {
    hotels.state.newForm.visible = false;

    return true;
  }

  function cancelAdd() {
    hotels.new_ = {};
    hideNewForm();

    return true;
  }

  function ratingStars(n) {
    return 'glyphicon-star' + (n == 0 ? '-empty' : '');
  }

  function validate(hotel) {
    var validations = [validateTitle, validateStars];

    return validations.every((v) => v.apply(hotel));

    function validateTitle() {
      return this.title !== 'undefined' && this.title.length >= 3;
    }

    function validateStars() {
      return this.stars !== 'undefined' && this.stars > 0 && this.stars <= 5;
    }
  }
}
