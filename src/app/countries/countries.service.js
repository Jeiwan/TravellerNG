export function CountriesService() {
  var countries = [];

  var service = {
    create: create,
    read: read,
    update: update,
    destroy: destroy
  };

  return service;

  function create(country) {
    var newCountry = new Country(country.name);

    if (newCountry.validate() && validate(newCountry)) {
      newCountry.id = countries[countries.length - 1].id + 1;
      countries.push(newCountry);
      sortCountries();
      saveToLocalStorage();

      return true;
    } else {
      return false;
    }
  }

  function read() {
    if (localStorage.getItem('countries') !== null) {
      countries = getFromLocalStorage();
    } else {
      countries = [
        new Country('Австралия', 0),
        new Country('Австрия', 1),
        new Country('Бельгия', 2),
        new Country('Германия', 3),
        new Country('Египет', 4),
        new Country('Индия', 5),
        new Country('Исландия', 6),
        new Country('Россия', 7),
        new Country('США', 8),
        new Country('Таиланд', 9),
        new Country('Турция', 10),
        new Country('Франция', 11),
        new Country('Япония', 12)
      ];
    }

    return countries;
  }

  function update(country) {
    var countryToUpdate = countries.find((c) => c.id === parseInt(country.id, 10)),
        tempCountry = new Country(country.name);


    if (countryToUpdate !== undefined && countryToUpdate.name === country.name) {
      return true;
    } else if (countryToUpdate !== undefined && validate(tempCountry)) {
      countryToUpdate.name = country.name;
      sortCountries();
      saveToLocalStorage();

      return true;
    } else {
      return false;
    }
  }

  function destroy(country) {
    countries = countries.filter((c) => c.id !== country.id);
    saveToLocalStorage();

    return true;
  }

  function getFromLocalStorage() {
    var storedCountries = angular.fromJson(localStorage.getItem('countries'));

    return storedCountries.map((country) => {
      return new Country(country.name, country.id);
    });
  }

  function saveToLocalStorage() {
    localStorage.setItem('countries', angular.toJson(countries));

    return true;
  }

  function validate(country) {
    return country.validate() && !countries.some((c) => c.name.toLowerCase() === country.name.toLowerCase());
  }

  function sortCountries() {
    countries = countries.sort((a, b) => {
      var aname = a.name.toLowerCase(),
          bname = b.name.toLowerCase();

      if (aname > bname) {
        return 1;
      } else if (aname < bname) {
        return -1;
      } else if (aname === bname) {
        return 0;
      }
    });

    return true;
  }
}

function Country(name, id) {
  var t = this;

  this.name = name;
  this.id = id;
  this.state = 'show';

  this.show = show;
  this.edit = edit;
  this.isShown = isShown;
  this.isEdited = isEdited;
  this.validate = validate;

  function show() {
    t.state = 'show';

    return true;
  }

  function edit() {
    t.state = 'edit';

    return true;
  }

  function isShown() {
    return t.state === 'show';
  }

  function isEdited() {
    return t.state === 'edit';
  }

  function validate() {
    function validateName() {
      return this.name !== 'undefined' && this.name.length >= 3;
    }

    var validations = [
      validateName
    ];

    return validations.every((v) => v.apply(t));
  }
}
