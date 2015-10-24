import { config } from './index.config';
import { routerConfig } from './index.route';
import { run } from './index.run';

import { AuthService } from './auth/auth.service.js';

import { ToursService } from './tours/tours.service.js';
import { ToursController } from './tours/tours.controller.js';
import { TourController } from './tour/tour.controller.js';

import { CountriesService } from './countries/countries.service.js';
import { CountriesController } from './countries/countries.controller.js';

import { PlacesService } from './places/places.service.js';
import { PlacesController } from './places/places.controller.js';

import { NavbarController } from './components/navbar/navbar.controller.js';
import { NavbarDirective } from './components/navbar/navbar.directive.js'
import { ToursFilter } from './components/tours_filter/tours_filter.directive.js';

import { AdminToursController } from './admin/tours/admin_tours.controller.js';
import { AdminCountriesController } from './admin/countries/admin_countries.controller.js';
import { AdminPlacesController } from './admin/places/admin_places.controller.js';


angular.module('TravellerNG', ['ngRoute', 'ngResource'])
  .config(config)
  .config(routerConfig)
  .run(run)
  .service('AuthService', AuthService)
  .service('CountriesService', CountriesService)
  .service('PlacesService', PlacesService)
  .service('ToursService', ToursService)
  .controller('AdminCountriesController', AdminCountriesController)
  .controller('AdminToursController', AdminToursController)
  .controller('AdminPlacesController', AdminPlacesController)
  .controller('CountriesController', CountriesController)
  .controller('PlacesController', PlacesController)
  .controller('ToursController', ToursController)
  .controller('TourController', TourController)
  .controller('NavbarController', NavbarController)
  .directive('navbar', NavbarDirective)
  .directive('toursFilter', ToursFilter);
