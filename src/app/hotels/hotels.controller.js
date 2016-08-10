export function HotelsController(HotelsService) {
  'ngInject';
  var hotels = this;

  activate();

  function activate() {
    hotels.all = HotelsService.query();
  }
}
