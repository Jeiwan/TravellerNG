export function ToursController() {
  this.formVisible = false;
  this.newTour = new Tour();
  this.editedTour = new Tour();

  if (localStorage.getItem('tours') !== null) {
    this.tours = this.getTours();
  } else {
    this.tours = [{
      title: 'Супер-пупер-мега-тур',
      country: 'Египет',
      text: 'Антарктический пояс последовательно надкусывает различный материк. Фудзияма, как бы это ни казалось парадоксальным, откровенна. Верховье, на первый взгляд, поднимает комбинированный тур. Здесь работали Карл Маркс и Владимир Ленин, но отгонное животноводство мгновенно.',
      price: 100.0
    }, {
      title: 'Лучшие курорты Австрии, большие зоны катания и разнообразные трассы',
      country: 'Австрия',
      text: 'Водохранилище надкусывает пингвин. Винный фестиваль проходит в приусадебном музее Георгикон, там же музей под открытым небом сложен. Крокодиловая ферма Самут Пракан - самая большая в мире, однако Восточно-Африканское плоскогорье существенно начинает традиционный символический центр современного Лондона.',
      price: 150.0
    }];
  }
}

// Добавление тура в список
ToursController.prototype.addTour = function() {
  if (this.newTour.validate()) {
    this.tours.push(this.newTour);
    this.newTour = new Tour();
    this.hideForm();

    this.storeTours();

    return true;
  } else {
    alert('Ошибка валидации');

    return true;
  }
};

// Удаление тура из списка
ToursController.prototype.removeTour = function(tour) {
  this.tours = this.tours.filter((e) => {
    return e.$$hashKey !== tour.$$hashKey;
  });

  this.storeTours();

  return true;
};

// Показать форму добавления нового тура
ToursController.prototype.showForm = function() {
  this.formVisible = true;

  return true;
};

// Спрятать форму добавления нового тура
ToursController.prototype.hideForm = function() {
  this.formVisible = false;

  return true;
};

// Показать форму редактирования тура
ToursController.prototype.editTour = function(tour) {
  this.tours.forEach((t) => { t.editFormVisible = false; });
  for (var k in tour) {
    this.editedTour[k] = tour[k];
  }
  tour.editFormVisible = true;

  return true;
};

// Отменить редактирование тура
ToursController.prototype.cancelEditTour = function(tour) {
  tour.editFormVisible = false;
  this.editedTour = new Tour();

  return true;
};

// Сохранить изменения после редактирования тура
ToursController.prototype.updateTour = function(tour) {
  if (this.editedTour.validate()) {
    tour.editFormVisible = false;

    for (var k in this.editedTour) {
      tour[k] = this.editedTour[k];
    }

    this.storeTours();

    this.editedTour = {};

    return true;
  } else {
    alert('Ошибка валидации');

    return false;
  }
};

// Сохранить туры в localStorage
ToursController.prototype.storeTours = function()  {
  localStorage.setItem('tours', angular.toJson(this.tours));

  return true;
};

// Загрузить туры из localStorage'а
ToursController.prototype.getTours = function()  {
  var tours = localStorage.getItem('tours');

  return JSON.parse(tours);
};

function Tour(title, country, text, price) {
  this.title = title;
  this.country = country;
  this.text = text;
  this.price = price;
  this.editFormVisible = false;
}

// Валидация полей тура
Tour.prototype.validate = function() {
  var t = this;

  var validateTitle = function() {
    return typeof this.title !== 'undefined' && this.title.length > 3;
  };

  var validateCountry = function() {
    return typeof this.country !== 'undefined' && this.country.length >= 3;
  }

  var validateText = function() {
    return typeof this.text !== 'undefined' && this.text.length > 3;
  }

  var validatePrice = function() {
    return typeof this.price !== 'undefined' && parseFloat(this.price, 10) > 0;
  }

  var validations = [
    validateTitle,
    validateCountry,
    validateText,
    validatePrice
  ];

  return validations.every((v) => v.apply(t));
};
