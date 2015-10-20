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
    countries.all = CountriesService.read();
  }

  function add() {
    if (CountriesService.create(countries.new_)) {
      countries.new_ = {};
      hideNewForm();

      return true;
    } else {
      alert('Ошибка валидации');

      return false;
    }
  }

  function remove(country) {
    CountriesService.destroy(country);
    activate();

    return true;
  }

  function edit(country) {
    countries.edited.name = country.name;
    countries.edited.id = country.id;
    country.edit();

    return true;
  }

  function cancelEdit(country) {
    countries.edited = {};
    country.show();

    return true;
  }

  function update(country) {
    if (CountriesService.update(countries.edited)) {
      countries.edited = {};
      activate();
      country.show();

      return true;
    } else {
      alert('Ошибка редактирования страны');

      return false;
    }
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
}
