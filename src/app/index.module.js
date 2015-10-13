import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { ToursController } from './tours/tours.controller.js';

import { NavbarController } from './components/navbar/navbar.controller.js';
import { Navbar } from './components/navbar/navbar.directive.js'


angular.module('TravellerNG', ['ngRoute'])
  .config(config)
  .config(routerConfig)
  .controller('ToursController', ToursController)
  .controller('NavbarController', NavbarController)
  .directive('navbar', Navbar);
