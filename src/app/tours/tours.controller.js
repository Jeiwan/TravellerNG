export function ToursController() {
  var tours = this;

  this.newFormVisible = false;
  this.new_ = new Tour();
  this.edited = new Tour();

  this.add = add;
  this.remove = remove;
  this.showNewForm = showNewForm;
  this.hideNewForm = hideNewForm;
  this.edit = edit;
  this.cancelEdit = cancelEdit;
  this.update = update;
  this.store = store;
  this.get = get;

  activate();

  function activate() {
    if (localStorage.getItem('tours') !== null) {
      tours.all = tours.get();
    } else {
      tours.all = [
        new Tour(
          'Супер-пупер-мега-тур',
          'Египет',
          'Антарктический пояс последовательно надкусывает различный материк. Фудзияма, как бы это ни казалось парадоксальным, откровенна. Верховье, на первый взгляд, поднимает комбинированный тур. Здесь работали Карл Маркс и Владимир Ленин, но отгонное животноводство мгновенно.',
          100.0
        ),
        new Tour(
          'Лучшие курорты Австрии, большие зоны катания и разнообразные трассы',
          'Австрия',
          'Водохранилище надкусывает пингвин. Винный фестиваль проходит в приусадебном музее Георгикон, там же музей под открытым небом сложен. Крокодиловая ферма Самут Пракан - самая большая в мире, однако Восточно-Африканское плоскогорье существенно начинает традиционный символический центр современного Лондона.',
          150.0
        )
      ];
    }
  }

  // Добавление тура в список
  function add() {
    if (this.new_.validate()) {
      tours.all.push(tours.new_);
      tours.new_ = new Tour();
      tours.hideNewForm();

      tours.store();

      return true;
    } else {
      alert('Ошибка валидации');

      return true;
    }
  }

  // Удаление тура из списка
  function remove(tour) {
    tours.all = tours.all.filter((e) => {
      return e.$$hashKey !== tour.$$hashKey;
    });

    tours.store();

    return true;
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
  };

  // Показать форму редактирования тура
  function edit(tour) {
    tours.all.forEach((t) => { t._state = 'show'; });

    for (var k in tour) {
      tours.edited[k] = tour[k];
    }

    tour.edit();

    return true;
  };

  // Отменить редактирование тура
  function cancelEdit(tour) {
    tour.show();
    tours.edited = new Tour();

    return true;
  };

  // Сохранить изменения после редактирования тура
  function update(tour) {
    if (tours.edited.validate()) {
      tour.show();

      for (var k in tours.edited) {
        tour[k] = tours.edited[k];
      }

      tours.store();

      tours.edited = new Tour();

      return true;
    } else {
      alert('Ошибка валидации');

      return false;
    }
  };

  // Сохранить туры в localStorage
  function store()  {
    localStorage.setItem('tours', angular.toJson(tours.all));

    return true;
  };

  // Загрузить туры из localStorage'а
  function get()  {
    var storedTours = angular.fromJson(localStorage.getItem('tours'));

    return storedTours.map((tour) => {
      return new Tour(tour.title, tour.country, tour.text, tour.price);
    });
  };
}

function Tour(title, country, text, price) {
  var t = this;

  this.title = title;
  this.country = country;
  this.text = text;
  this.price = price;
  this._state = 'show';

  this.validate = validate;
  this.edit = edit;
  this.show = show;

  // Валидация полей тура
  function validate() {
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

  function edit() {
    t._state = 'edit';
  }

  function show() {
    t._state = 'show';
  }
}
