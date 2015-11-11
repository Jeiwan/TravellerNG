export function AdminPlacesController(PlacesService, CountriesService, $q) {
  'ngInject';
  var places = this;

  this.state = {
    newForm: { visible: false }
  };

  this.edited = emptyPlace();
  this.new_ = emptyPlace();
  this.countries = [];

  this.add = add;
  this.remove = remove;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;

  activate();

  function activate() {
    $q.all([
      PlacesService.query().$promise,
      CountriesService.all().$promise
    ]).then((results) => {
      var placesResult = results[0],
          countries = results[1];

      places.all = placesResult;
      places.countries = countries;
      places.new_.country.objectId = countries[0].objectId;
    });
  }

  function add() {
    if (!validate(places.new_)) {
      alert('Ошибка валидации');
      return false;
    }

    places.new_.country.name = places.countries.find(c => {
      return c.objectId === places.new_.country.objectId;
    }).name;

    PlacesService.create(places.new_).$promise.then(result => {
      places.all.push(angular.extend(result, places.new_));
      places.new_ = emptyPlace();
      hideNewForm();
    }).catch(error => {
      alert('Ошибка создания места:', error.data.error);
    });
  }

  function remove(place) {
    PlacesService.destroy({objectId: place.objectId}).$promise.then(() => {
      places.all = places.all.filter(c => {
        return place.objectId !== c.objectId;
      });
    }).catch(error => {
      alert('Ошибка удаления места:', error.data.error);
    });
  }

  function edit(place) {
    places.all.forEach((p) => { p.show(); });
    angular.copy(place, places.edited);
    place.edit();
  }

  function cancelEdit(place) {
    places.edited = emptyPlace();
    place.show();
  }

  function update(place) {
    if (!validate(places.edited)) {
      alert('Ошибка валидации');
      return false;
    }

    places.edited.country.name = places.countries.find(c => {
      return c.objectId === places.edited.country.objectId;
    }).name;

    PlacesService.update(places.edited).$promise.then(() => {
      angular.copy(places.edited, place);
      places.edited = emptyPlace();
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

  function validate(place) {
    var validations = [validateName];

    return validations.every((v) => v.apply(place));

    function validateName() {
      return this.name !== 'undefined' && this.name.length >= 3;
    }
  }

  function emptyPlace() {
    return { country: {} };
  }
}
