export function AdminHotelsController(HotelsService, PlacesService, $q) {
  'ngInject';
  var hotels = this;

  this.state = {
    newForm: { visible: false }
  };

  this.edited = emptyHotel();
  this.new_ = emptyHotel();
  this.places = [];

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
    $q.all([
      HotelsService.query().$promise,
      PlacesService.query().$promise
    ]).then(results => {
      var hotelsResult = results[0],
          places = results[1];

      hotels.all = hotelsResult;
      hotels.places = places;
      hotels.new_.place.objectId = places[0].objectId;
    });
  }

  function add() {
    if (!validate(hotels.new_)) {
      alert('Ошибка валидации');
      return false;
    }

    hotels.new_.place.name = hotels.places.find(p => {
      return p.objectId === hotels.new_.place.objectId;
    }).name;

    HotelsService.save(hotels.new_).$promise.then(result => {
      hotels.all.push(angular.extend(result, hotels.new_));
      hotels.new_ = emptyHotel();
      hideNewForm();
    }).catch(error => {
      alert('Ошибка создания гостиницы:', error.data.error);
    });
  }

  function remove(hotel) {
    HotelsService.remove({objectId: hotel.objectId}).$promise.then(() => {
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
    hotels.edited.place.objectId = hotel.place.objectId;
    hotel.edit();
  }

  function cancelEdit(hotel) {
    hotels.edited = emptyHotel();
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

    HotelsService.update(hotels.edited).$promise.then(() => {
      angular.extend(hotel, hotels.edited);
      hotel.place = hotels.edited.place;
      hotels.edited = emptyHotel();
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
      return typeof this.title !== 'undefined' && this.title.length >= 3;
    }

    function validateStars() {
      return typeof this.stars !== 'undefined' && this.stars > 0 && this.stars <= 5;
    }
  }

  function emptyHotel() {
    return { place: {} };
  }
}
