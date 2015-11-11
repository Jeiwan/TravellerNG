export function AdminToursController(ToursService, CountriesService, PlacesService, HotelsService, $q) {
  'ngInject';
  var tours = this;

  this.state = {
    newForm: { visible: false }
  };
  this.new_ = emptyTour();
  this.edited = emptyTour();
  this.all = [];
  this.countries = [];
  this.places = [];
  this.hotels = [];

  this.add = add;
  this.remove = remove;
  this.newFormVisible = newFormVisible;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;
  this.possibleHotels = possibleHotels;
  this.possiblePlaces = possiblePlaces;

  activate();

  function activate() {
    $q.all([
      ToursService.query().$promise,
      CountriesService.query().$promise,
      PlacesService.query().$promise,
      HotelsService.query().$promise
    ]).then(results => {
      var toursResult = results[0],
          countries = results[1],
          places = results[2],
          hotels = results[3];

      tours.all = toursResult;

      tours.countries = countries;
      tours.new_.country.objectId = countries[0].objectId;

      tours.places = places;
      tours.new_.place.objectId = places[0].objectId;

      tours.hotels = hotels;
      tours.new_.hotel.objectId = hotels[0].objectId;
    });
  }

  // Добавление тура в список
  function add() {
    if (!validate(tours.new_)) {
      alert('Ошибка валидации');
      return false;
    }

    tours.new_.country.name = tours.countries.find(c => {
      return c.objectId === tours.new_.country.objectId;
    }).name;
    tours.new_.place.name = tours.places.find(p => {
      return p.objectId === tours.new_.place.objectId;
    }).name;
    tours.new_.hotel.title = tours.hotels.find(h => {
      return h.objectId === tours.new_.hotel.objectId;
    }).title;

    ToursService.save(tours.new_).$promise.then(result => {
      tours.all.push(angular.extend(result, tours.new_));
      this.new_ = emptyTour();
      tours.hideNewForm();
    }).catch(error => {
      alert('Ошибка создания тура:', error.data.error);
    });
  }

  // Удаление тура из списка
  function remove(tour) {
    ToursService.remove({objectId: tour.objectId}).$promise.then(() => {
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
    this.edited = emptyTour();
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

    tours.edited.hotel.title = tours.hotels.find(h => {
      return h.objectId === tours.edited.hotel.objectId;
    }).title;

    ToursService.update(tours.edited).$promise.then(() => {
      angular.extend(tour, tours.edited);
      this.edited = emptyTour();
      tour.show();
    }).catch(error => {
      alert('Ошибка обновления страны: ', error.data.error);
    });
  }

  function newFormVisible() {
    return tours.state.newForm.visible === true;
  }

  function possibleHotels(tour) {
    if (typeof tours.hotels === 'undefined') {
      return [];
    }

    return tours.hotels.filter(h => h.place.objectId === tour.place.objectId);
  }

  function possiblePlaces(tour) {
    if (typeof tours.places === 'undefined') {
      return [];
    }

    return tours.places.filter(h => h.country.objectId === tour.country.objectId);
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
    }

    function validateText() {
      return typeof this.text !== 'undefined' && this.text.length > 3;
    }

    function validatePrice() {
      return typeof this.price !== 'undefined' && parseFloat(this.price, 10) > 0;
    }
  }

  function emptyTour() {
    return { country: {}, place: {}, hotel: {} };
  }
}
