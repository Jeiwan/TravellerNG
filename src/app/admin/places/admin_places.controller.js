export function AdminPlacesController(PlacesService) {
  'ngInject';
  var places = this;

  this.state = {
    newForm: { visible: false }
  };

  this.edited = {};
  this.new_ = {};

  this.add = add;
  this.remove = remove;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;
  this.cancelAdd = cancelAdd;

  activate();

  function activate() {
    places.all = PlacesService.query();
  }

  function add() {
    if (!validate(places.new_)) {
      alert('Ошибка валидации');
      return false;
    }

    PlacesService.create(places.new_).$promise.then(result => {
      places.all.push(angular.extend(result, places.new_));
      places.new_ = {};
      hideNewForm();
    }).catch(error => {
      alert('Ошибка создания места:', error.data.error);
    });
  }

  function remove(place) {
    PlacesService.destroy({objectId: place.objectId}).$promise.then(result => {
      places.all = places.all.filter(c => {
        return place.objectId !== c.objectId;
      });
    }).catch(error => {
      alert('Ошибка удаления места:', error.data.error);
    });
  }

  function edit(place) {
    places.all.forEach((c) => { c.show(); });
    places.edited = angular.copy(place);
    place.edit();
  }

  function cancelEdit(place) {
    places.edited = {};
    place.show();
  }

  function update(place) {
    if (!validate(places.edited)) {
      alert('Ошибка валидации');
      return false;
    }

    PlacesService.update({ objectId: place.objectId, name: places.edited.name }).$promise.then(response => {
      place.name = places.edited.name;
      places.edited = {};
      place.show();
    }).catch(error => {
      alert('Ошибка обновления места: ', error.data.error);
    });
  }

  function showNewForm() {
    places.state.newForm.visible = true;

    return true;
  }

  function hideNewForm() {
    places.state.newForm.visible = false;

    return true;
  }

  function cancelAdd() {
    places.new_ = {};
    hideNewForm();

    return true;
  }

  function validate(place) {
    var validations = [validateName];

    return validations.every((v) => v.apply(place));

    function validateName() {
      return this.name !== 'undefined' && this.name.length >= 3;
    }
  }
}
