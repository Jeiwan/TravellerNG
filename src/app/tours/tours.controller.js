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
  this.tours.push(this.newTour);
  this.newTour = new Tour();
  this.hideForm();

  return true;
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
