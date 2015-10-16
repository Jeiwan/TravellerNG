export function ToursService(CountriesService) {
  'ngInject';
  var t = this,
      tours = [];

  var service = {
    newTour: newTour,
    create: create,
    read: read,
    update: update,
    destroy: destroy,
    countryFor: countryFor
  };

  return service;

  function newTour() {
    return new Tour();
  }

  // Создание тура
  function create(title, countryId, text, price) {
    var newTour = new Tour(title, countryId, text, price);

    if (newTour.validate()) {
      newTour.id = tours[tours.length - 1].id + 1;
      tours.push(newTour);
      saveToLocalStorage();

      return true;
    } else {
      return false;
    }
  }

  // Получение всех туров
  function read() {
    if (localStorage.getItem('tours') !== null) {
      tours = getFromLocalStorage();
    } else {
      tours = [
        new Tour(
          'Супер-пупер-мега-тур',
          8,
          'Антарктический пояс последовательно надкусывает различный материк. Фудзияма, как бы это ни казалось парадоксальным, откровенна. Верховье, на первый взгляд, поднимает комбинированный тур. Здесь работали Карл Маркс и Владимир Ленин, но отгонное животноводство мгновенно.',
          100.0,
          0
        ),
        new Tour(
          'Лучшие курорты Австрии, большие зоны катания и разнообразные трассы',
          2,
          'Водохранилище надкусывает пингвин. Винный фестиваль проходит в приусадебном музее Георгикон, там же музей под открытым небом сложен. Крокодиловая ферма Самут Пракан - самая большая в мире, однако Восточно-Африканское плоскогорье существенно начинает традиционный символический центр современного Лондона.',
          150.0,
          1
        )
      ];
    }

    return tours;
  }

  // Обновление тура
  function update(id, params) {
    if (typeof id === 'undefined') {
      return false;
    }

    var tourToUpdate = tours.find((tour) => tour.id === parseInt(id, 10)),
        tempTour = new Tour(params.title, params.countryId, params.text, params.price);

    if (tempTour.validate()) {
      tourToUpdate.title = params.title;
      tourToUpdate.countryId = params.countryId;
      tourToUpdate.text = params.text;
      tourToUpdate.price = params.price;

      saveToLocalStorage();

      return true;
    } else {
      return false;
    }
  }

  // Удаление тура
  function destroy(id) {
    var tourToDestroy = tours.find((tour) => tour.id === parseInt(id, 10));

    if (tourToDestroy) {
      tours = tours.filter((t) => {
        return t.id !== id;
      });

      saveToLocalStorage();

      return true;
    } else {
      return false;
    }
  }

  // Загрузить туры из localStorage'а
  function getFromLocalStorage()  {
    var storedTours = angular.fromJson(localStorage.getItem('tours'));

    return storedTours.map((tour) => {
      return new Tour(tour.title, tour.countryId, tour.text, tour.price, tour.id);
    });
  };

  // Сохранить туры в localStorage
  function saveToLocalStorage()  {
    localStorage.setItem('tours', angular.toJson(tours));

    return true;
  };

  function countryFor(tour) {
    return CountriesService.read().find((country) => country.id === tour.countryId) || {};
  }
}

function Tour(title, countryId = 0, text, price, id) {
  var t = this;

  this.id = id;
  this.title = title;
  this.countryId = countryId
  this.text = text;
  this.price = price;
  this.state = 'show';

  this.validate = validate;
  this.edit = edit;
  this.show = show;

  // Валидация полей тура
  function validate() {
    var validateTitle = function() {
      return typeof this.title !== 'undefined' && this.title.length > 3;
    };

    var validateText = function() {
      return typeof this.text !== 'undefined' && this.text.length > 3;
    }

    var validatePrice = function() {
      return typeof this.price !== 'undefined' && parseFloat(this.price, 10) > 0;
    }

    var validations = [
      validateTitle,
      validateText,
      validatePrice
    ];

    return validations.every((v) => v.apply(t));
  };

  function edit() {
    t.state = 'edit';
  }

  function show() {
    t.state = 'show';
  }
}
