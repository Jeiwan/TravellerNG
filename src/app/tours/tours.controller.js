/*@ngInject*/
export class ToursController {
  constructor() {
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

  addTour() {
    this.tours.push(this.newTour);
    this.newTour = new Tour();
  }

  removeTour(tour) {
    this.tours = this.tours.filter((e) => {
      return e.$$hashKey !== tour.$$hashKey;
    });
    return true;
  }

  showForm() {
    this.formVisible = true;
    return true;
  }

  hideForm() {
    this.formVisible = false;
    return true;
  }
}

class Tour {
  constructor(title, country, text, price) {
    this.title = title;
    this.country = country;
    this.text = text;
    this.price = price;
  }
}
