import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

import { ToursController } from './tours/tours.controller.js';


angular.module('tnTrips', ['ngRoute'])
  .config(config)
  .config(routerConfig)
  .controller('ToursController', ToursController);
