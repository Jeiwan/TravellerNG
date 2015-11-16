describe('edit_hotel_form', () => {
  var $compile, $rootScope, $templateCache, newHotelForm;

  beforeEach(() => {
    window.module('TravellerNG');

    inject((_$compile_, _$rootScope_, _$templateCache_) => {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      $templateCache = _$templateCache_;
    });

    var template = angular.element($templateCache.get('app/admin/hotels/edit_hotel_form.html'));
    $compile(template)($rootScope);
    $rootScope.$digest();
    newHotelForm = $rootScope.form;
  });

  describe('when all fields are filled correctly', () => {
    it('should be valid', () => {
      newHotelForm.place.$setViewValue('1');
      newHotelForm.title.$setViewValue('Test');
      newHotelForm.stars.$setViewValue('5');
      expect(newHotelForm.$valid).toEqual(true);
    });
  });

  describe('when not all fields are filled correctly', () => {
    it('should not be valid', () => {
      newHotelForm.place.$setViewValue(null);
      newHotelForm.title.$setViewValue('Te');
      newHotelForm.stars.$setViewValue('999');
      expect(newHotelForm.$valid).toEqual(false);
    });
  });
});
