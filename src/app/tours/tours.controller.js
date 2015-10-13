export function ToursController() {
  this.formVisible = false;
  this.newTour = new Tour();

  this.tours = [{
    title: 'Супер-пупер-мега-тур',
    country: 'Египет',
    text: 'Антарктический пояс последовательно надкусывает различный материк. Фудзияма, как бы это ни казалось парадоксальным, откровенна. Верховье, на первый взгляд, поднимает комбинированный тур. Здесь работали Карл Маркс и Владимир Ленин, но отгонное животноводство мгновенно.',
    price: 100.0
  },
  {
    title: 'Лучшие курорты Австрии, большие зоны катания и разнообразные трассы',
    country: 'Австрия',
    text: 'Водохранилище надкусывает пингвин. Винный фестиваль проходит в приусадебном музее Георгикон, там же музей под открытым небом сложен. Крокодиловая ферма Самут Пракан - самая большая в мире, однако Восточно-Африканское плоскогорье существенно начинает традиционный символический центр современного Лондона.',
    price: 150.0
  }
  ];
}

ToursController.prototype.addTour = function() {
  if (this.newTour.validate()) {
    this.tours.push(this.newTour);
    this.newTour = new Tour();
    this.hideForm();

    return true;
  } else {
    alert('Ошика валидации');

    return true;
  }

}

ToursController.prototype.removeTour = function(tour) {
  this.tours = this.tours.filter((e) => {
    return e.$$hashKey !== tour.$$hashKey;
  });

  return true;
}

ToursController.prototype.showForm = function() {
  this.formVisible = true;

  return true;
}

ToursController.prototype.hideForm = function() {
  this.formVisible = false;

  return true;
}

function Tour(title, country, text, price) {
  this.title = title;
  this.country = country;
  this.text = text;
  this.price = price;
}

Tour.prototype.validate = function() {
  var t = this;

  var validateTitle = function() {
    return typeof this.title !== 'undefined' && this.title.length > 3;
  };

  var validateCountry = function() {
    return typeof this.country !== 'undefined' && this.country.length > 3;
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
}
