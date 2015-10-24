export function AdminToursController(ToursService, CountriesService, PlacesService) {
  'ngInject';
  var tours = this;

  this.state = {
    newForm: { visible: false }
  };
  this.new_ = { country: {}, place: {} };
  this.edited = { country: {}, place: {} };
  this.countryFilter = null;
  this.countries = [];
  this.places = [];

  this.add = add;
  this.remove = remove;
  this.newFormVisible = newFormVisible;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;

  activate();

  function activate() {
    tours.all = ToursService.query();
    CountriesService.all().$promise.then(result => {
      tours.countries = result;
      tours.new_.country.objectId = result[0].objectId;
    });
    PlacesService.query().$promise.then(result => {
      tours.places = result;
      tours.new_.place.objectId = result[0].objectId;
    });
  }

  // Добавление тура в список
  function add() {
    tours.new_.country.name = tours.countries.find(c => {
      return c.objectId === tours.new_.country.objectId;
    }).name;
    tours.new_.place.name = tours.places.find(p => {
      return p.objectId === tours.new_.place.objectId;
    }).name;

    ToursService.create(tours.new_).$promise.then(result => {
      tours.all.push(angular.extend(result, tours.new_));
      tours.new_ = {};
      tours.hideNewForm();
    }).catch(error => {
      alert('Ошибка создания тура:', error.data.error);
    });
  }

  // Удаление тура из списка
  function remove(tour) {
    ToursService.destroy({objectId: tour.objectId}).$promise.then(result => {
      tours.all = tours.all.filter(t => {
        return tour.objectId !== t.objectId;
      });
    }).catch(error => {
      alert('Ошибка удаления тура:', error.data.error);
    });
  }

  // Показать форму добавления нового тура
  function showNewForm() {
    tours.state.newForm.visible = true;
  }

  // Спрятать форму добавления нового тура
  function hideNewForm() {
    tours.state.newForm.visible = false;
  }

  // Показать форму редактирования тура
  function edit(tour) {
    tours.all.forEach((t) => { t.show(); });
    tours.edited = angular.copy(tour);
    tours.edited.country.objectId = tour.country.objectId;
    tours.edited.place.objectId = tour.place.objectId;
    tour.edit();
  }

  // Отменить редактирование тура
  function cancelEdit(tour) {
    tour.show();
    this.edited = {};
  }

  // Сохранить изменения после редактирования тура
  function update(tour) {
    if (!validate(tours.edited)) {
      alert('Ошибка валидации');
      return false;
    }

    tours.edited.country.name = tours.countries.find(c => {
      return c.objectId === tours.edited.country.objectId;
    }).name;

    tours.edited.place.name = tours.places.find(p => {
      return p.objectId === tours.edited.place.objectId;
    }).name;

    ToursService.update(tours.edited).$promise.then(response => {
      response.country = tours.edited.country;
      response.place = tours.edited.place;
      response.objectId = tour.objectId;
      angular.copy(response, tour);
      tours.edited = {};
      tour.show();
    }).catch(error => {
      alert('Ошибка обновления страны: ', error.data.error);
    });
  }

  function newFormVisible() {
    return tours.state.newForm.visible === true;
  }

  function validate(tour) {
    var validations = [
      validateTitle,
      validateText,
      validatePrice
    ];

    return validations.every((v) => v.apply(tour));

    function validateTitle() {
      return typeof this.title !== 'undefined' && this.title.length > 3;
    };

    function validateText() {
      return typeof this.text !== 'undefined' && this.text.length > 3;
    }

    function validatePrice() {
      return typeof this.price !== 'undefined' && parseFloat(this.price, 10) > 0;
    }
  };
}
