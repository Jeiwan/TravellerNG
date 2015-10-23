export function AdminCountriesController(CountriesService) {
  'ngInject';
  var countries = this;

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
    countries.all = CountriesService.all();
  }

  function add() {
    if (!validate(countries.new_)) {
      alert('Ошибка валидации');
      return false;
    }

    CountriesService.create(countries.new_).$promise.then(result => {
      countries.all.push(angular.extend(result, countries.new_));
      countries.new_ = {};
      hideNewForm();
    }).catch(error => {
      alert('Ошибка создания страны:', error.data.error);
    });
  }

  function remove(country) {
    CountriesService.destroy({objectId: country.objectId}).$promise.then(result => {
      countries.all = countries.all.filter(c => {
        return country.objectId !== c.objectId;
      });
    }).catch(error => {
      alert('Ошибка удаления страны:', error.data.error);
    });
  }

  function edit(country) {
    countries.all.forEach((c) => { c.show(); });
    countries.edited = angular.copy(country);
    country.edit();
  }

  function cancelEdit(country) {
    countries.edited = {};
    country.show();
  }

  function update(country) {
    if (!validate(countries.edited)) {
      alert('Ошибка валидации');
      return false;
    }

    CountriesService.update({ objectId: country.objectId, name: countries.edited.name }).$promise.then(response => {
      country.name = countries.edited.name;
      countries.edited = {};
      country.show();
    }).catch(error => {
      alert('Ошибка обновления страны: ', error.data.error);
    });
  }

  function showNewForm() {
    countries.state.newForm.visible = true;

    return true;
  }

  function hideNewForm() {
    countries.state.newForm.visible = false;

    return true;
  }

  function cancelAdd() {
    countries.new_ = {};
    hideNewForm();

    return true;
  }

  function validate(country) {
    var validations = [validateName];

    return validations.every((v) => v.apply(country));

    function validateName() {
      return this.name !== 'undefined' && this.name.length >= 3;
    }
  }
}
