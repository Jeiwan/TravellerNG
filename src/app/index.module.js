import { config } from './index.config';
import { routerConfig } from './index.route';
import { run } from './index.run';

import { AuthService } from './auth/auth.service.js';

import { ToursService } from './tours/tours.service.js';
import { ToursController } from './tours/tours.controller.js';
import { TourController } from './tour/tour.controller.js';

import { CountriesService } from './countries/countries.service.js';
import { CountriesController } from './countries/countries.controller.js';

import { NavbarController } from './components/navbar/navbar.controller.js';
import { NavbarDirective } from './components/navbar/navbar.directive.js'

import { AdminToursController } from './admin/tours/admin_tours.controller.js';
import { AdminCountriesController } from './admin/countries/admin_countries.controller.js';


angular.module('TravellerNG', ['ngRoute'])
  .config(config)
  .config(routerConfig)
  .run(run)
  .service('AuthService', AuthService)
  .service('CountriesService', CountriesService)
  .service('ToursService', ToursService)
  .controller('AdminCountriesController', AdminCountriesController)
  .controller('AdminToursController', AdminToursController)
  .controller('CountriesController', CountriesController)
  .controller('ToursController', ToursController)
  .controller('TourController', TourController)
  .controller('NavbarController', NavbarController)
  .directive('navbar', NavbarDirective);
