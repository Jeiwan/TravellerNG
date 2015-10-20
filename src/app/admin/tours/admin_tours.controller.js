export function AdminToursController(ToursService, CountriesService) {
  'ngInject';
  var tours = this;

  this.all = ToursService.read();
  this.countries = CountriesService.read();

  this.newFormVisible = false;
  this.new_ = ToursService.newTour();
  this.edited = ToursService.newTour();
  this.countryFilter = null;

  this.add = add;
  this.remove = remove;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;
  this.countryFor = ToursService.countryFor;
  this.filterByCountry = filterByCountry;
  this.countryFilterApplied = countryFilterApplied;
  this.resetCountryFilter = resetCountryFilter;

  activate();

  function activate() {
    tours.all = ToursService.read();
  }

  // Добавление тура в список
  function add() {
    if (ToursService.create(
          this.new_.title,
          this.new_.countryId,
          this.new_.text,
          this.new_.price
    )) {
      this.new_ = ToursService.newTour();
      tours.hideNewForm();

      return true;
    } else {
      alert('Ошибка валидации');

      return false;
    }
  }

  // Удаление тура из списка
  function remove(id) {
    if (ToursService.destroy(id)) {
      tours.all = ToursService.read();
      return true;
    } else {
      alert('Тур не найден');

      return false;
    }
  }

  // Показать форму добавления нового тура
  function showNewForm() {
    tours.newFormVisible = true;

    return true;
  }

  // Спрятать форму добавления нового тура
  function hideNewForm() {
    tours.newFormVisible = false;

    return true;
  }

  // Показать форму редактирования тура
  function edit(tour) {
    tours.all.forEach((t) => { t.show(); });

    for (var k in tour) {
      tours.edited[k] = tour[k];
    }

    tour.edit();

    return true;
  }

  // Отменить редактирование тура
  function cancelEdit(tour) {
    tour.show();
    this.edited = ToursService.newTour();

    return true;
  }

  // Сохранить изменения после редактирования тура
  function update(tour) {
    if (ToursService.update(tour.id, tours.edited)) {
      tour.show();
      this.edited = ToursService.newTour();

      return true;
    } else {
      alert('Ошибка валидации');

      return false;
    }
  }

  // Фильтрация туров по стране
  function filterByCountry(value, index, array) {
    return tours.countryFilter === null || value.countryId == parseInt(tours.countryFilter, 10);
  }

  function countryFilterApplied() {
    return tours.countryFilter !== null;
  }

  function resetCountryFilter() {
    tours.countryFilter = null;

    return true;
  }
}
